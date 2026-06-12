export const BUSINESS = {
  name: 'Malhotra Sons India',
  est: 1995,
  phone: '9811260822',
  phoneIntl: '919811260822',
  address: 'Delhi, India',
  mapsQuery: 'Malhotra Sons India tyre Delhi',
  whatsappMessage:
    'Hello Malhotra Sons India, I would like a wholesale quote for tyres.',
}

export const whatsappLink = (msg = BUSINESS.whatsappMessage) =>
  `https://wa.me/${BUSINESS.phoneIntl}?text=${encodeURIComponent(msg)}`

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Brands', href: '#brands' },
  { label: 'Contact', href: '#contact' },
]

export const TRUST_ITEMS = [
  '30+ Years',
  'All Major Brands',
  'PAN India Delivery',
  'All Categories',
  'B2B Wholesale',
]

export const CATEGORIES = [
  { name: 'Passenger Car', desc: 'Hatchbacks, sedans & SUVs in every size and speed rating.', icon: 'car' },
  { name: 'Two Wheeler', desc: 'Scooters, commuters & superbikes from every major maker.', icon: 'bike' },
  { name: 'Truck & Bus', desc: 'Heavy-duty radials & bias for long-haul fleets.', icon: 'truck' },
  { name: 'Tractor & Farm', desc: 'Rear, front & implement tyres built for Indian soil.', icon: 'tractor' },
  { name: 'OTR / Industrial', desc: 'Loaders, graders, forklifts & port equipment.', icon: 'crane' },
  { name: 'LCV & Van', desc: 'Light commercial workhorses, city to highway.', icon: 'van' },
  { name: 'Three Wheeler', desc: 'Auto-rickshaw & cargo three-wheeler ranges.', icon: 'auto' },
  { name: 'Tubes & Flaps', desc: 'Butyl tubes & flaps across all rim sizes.', icon: 'tube' },
]

export const BRANDS = [
  'MRF', 'CEAT', 'Apollo', 'JK Tyre', 'Bridgestone', 'Michelin', 'Goodyear',
  'Yokohama', 'Continental', 'TVS Eurogrip', 'Maxxis', 'BKT', 'Ralco',
  'Dunlop', 'Hankook', 'Pirelli', 'Toyo',
]

export const WHY_US = [
  {
    title: '30+ Years of Trust',
    desc: 'Three decades of honoured commitments. Dealers across India have grown their business on our word since 1995.',
  },
  {
    title: 'Deepest Stock in Delhi',
    desc: 'From a 12-inch scooter tyre to a 49-inch OTR giant. If it rolls in India, it is on our racks, ready to ship today.',
  },
  {
    title: 'True Wholesale Pricing',
    desc: 'We buy in volume directly, so you get genuine distributor rates with no middle layers and no inflated margins.',
  },
  {
    title: 'PAN India Delivery',
    desc: 'Reliable, fast dispatch to every state. Your consignment leaves Delhi the day you confirm.',
  },
]
