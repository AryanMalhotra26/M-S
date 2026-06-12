import { useMemo, useRef, Suspense, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Environment, Lightformer, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = '/tyre.glb'
useGLTF.preload(MODEL_URL, true, true)

/* Piecewise-linear keyframe interpolation over scroll progress */
function kf(p, stops, values) {
  if (p <= stops[0]) return values[0]
  for (let i = 1; i < stops.length; i++) {
    if (p <= stops[i]) {
      const t = (p - stops[i - 1]) / (stops[i] - stops[i - 1])
      return THREE.MathUtils.lerp(values[i - 1], values[i], t)
    }
  }
  return values[values.length - 1]
}

const STOPS = [0, 0.18, 0.38, 0.58, 0.78, 1]
const POSE = {
  x: [1.85, 1.85, -1.85, -1.85, 0, 0],
  y: [-0.15, -0.15, -0.15, -0.15, -0.95, -0.95],
  rotY: [-0.55, -0.55, 0.55, 0.55, -0.12, -0.12],
  scale: [1, 1, 1, 1, 1.05, 1.05],
}

function buildMaterials() {
  return {
    rubber: new THREE.MeshStandardMaterial({
      color: '#1b1b1e',
      roughness: 0.82,
      metalness: 0.05,
      envMapIntensity: 0.8,
    }),
    alloy: new THREE.MeshStandardMaterial({
      color: '#d9d9de',
      roughness: 0.25,
      metalness: 1,
      envMapIntensity: 1.3,
    }),
    graphite: new THREE.MeshStandardMaterial({
      color: '#2c2c31',
      roughness: 0.5,
      metalness: 0.85,
      envMapIntensity: 1,
    }),
    disc: new THREE.MeshStandardMaterial({
      color: '#55555c',
      roughness: 0.42,
      metalness: 0.95,
      envMapIntensity: 1.1,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: '#ff5310',
      roughness: 0.35,
      metalness: 0.35,
      envMapIntensity: 1,
    }),
  }
}

function materialFor(name, m) {
  const n = name.toLowerCase()
  if (n.includes('tire') || n.includes('tyre')) return m.rubber
  if (n.includes('caliper')) return m.accent
  if (n.includes('dics') || n.includes('disc')) return m.disc
  if (n.includes('graphite')) return m.graphite
  return m.alloy
}

/* If the model fails to load, render nothing rather than breaking the page */
class ModelBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(error) {
    console.error('Tyre model failed to load:', error)
    if (import.meta.env.DEV) window.__wheelError = String(error?.message || error)
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function Wheel({ progress }) {
  const { scene } = useGLTF(MODEL_URL, true, true)
  const pose = useRef()
  const spin = useRef()

  const { spinGroup, staticGroup, normScale } = useMemo(() => {
    const materials = buildMaterials()
    scene.updateMatrixWorld(true)

    const spinG = new THREE.Group()
    const statG = new THREE.Group()
    const meshes = []
    scene.traverse((o) => o.isMesh && meshes.push(o))
    meshes.forEach((src) => {
      const mesh = new THREE.Mesh(src.geometry, materialFor(src.name, materials))
      mesh.applyMatrix4(src.matrixWorld)
      mesh.castShadow = true
      // The brake caliper stays fixed while the wheel spins around it
      const isCaliper = src.name.toLowerCase().includes('caliper')
      ;(isCaliper ? statG : spinG).add(mesh)
    })

    const box = new THREE.Box3().setFromObject(spinG)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    // Wheel radius from the two large extents (axle runs along the smallest)
    const radius = Math.max(size.y, size.z) / 2
    spinG.position.copy(center.clone().negate())
    statG.position.copy(center.clone().negate())

    if (import.meta.env.DEV) {
      window.__wheelDebug = {
        meshCount: meshes.length,
        spinChildren: spinG.children.length,
        statChildren: statG.children.length,
        center: center.toArray(),
        size: size.toArray(),
        radius,
        normScale: 1.55 / radius,
      }
    }
    return { spinGroup: spinG, staticGroup: statG, normScale: 1.42 / radius }
  }, [scene])

  useFrame((state) => {
    const p = progress ? progress.get() : 0
    if (pose.current) {
      const vw = state.viewport.width
      // Phone-width canvas: smaller wheel, pushed to the lower half so the
      // stage text (top) stays readable
      const mobile = vw < 4.2
      const xMax = Math.min(1.85, vw * (mobile ? 0.33 : 0.27))
      pose.current.position.x = (kf(p, STOPS, POSE.x) / 1.85) * xMax
      const yBase = kf(p, STOPS, POSE.y)
      pose.current.position.y = mobile ? yBase * 0.55 - 0.7 : yBase
      const s = kf(p, STOPS, POSE.scale)
      pose.current.scale.setScalar(mobile ? s * 0.7 : s)
      pose.current.rotation.y =
        kf(p, STOPS, POSE.rotY) + state.pointer.x * 0.07
      pose.current.rotation.x = 0.1 + state.pointer.y * -0.05
    }
    // Rolling: spin around the axle (model-local X) as the page scrolls
    if (spin.current) spin.current.rotation.x = p * 9.5
  })

  return (
    <group ref={pose}>
      <group rotation={[0, -Math.PI / 2, 0]} scale={normScale}>
        <group ref={spin}>
          <primitive object={spinGroup} />
        </group>
        <primitive object={staticGroup} />
      </group>
    </group>
  )
}

export default function TyreScene({ progress }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 8.4], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[2, 3, 6]} intensity={2} color="#ffffff" />
        <spotLight
          position={[6, 7, 5]}
          angle={0.5}
          penumbra={1}
          intensity={240}
          color="#ffffff"
          castShadow
        />
        <pointLight position={[-6, -2, -4]} intensity={40} color="#fff1e8" />

        <ModelBoundary>
          <Wheel progress={progress} />
        </ModelBoundary>

        <ContactShadows
          position={[0, -2.42, 0]}
          opacity={0.32}
          scale={14}
          blur={2.6}
          far={4}
          color="#3a3a35"
        />

        <Environment resolution={256}>
          <Lightformer intensity={3.5} position={[0, 5, 0]} scale={[10, 1, 8]} color="#ffffff" />
          <Lightformer
            intensity={2.5}
            position={[5, 1, 4]}
            rotation={[0, -Math.PI / 4, 0]}
            scale={[4, 6, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={1.8}
            position={[-6, 0, -3]}
            rotation={[0, Math.PI / 3, 0]}
            scale={[4, 8, 1]}
            color="#fff3ec"
          />
        </Environment>
      </Suspense>
    </Canvas>
  )
}
