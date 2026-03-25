export interface Expense {
  label: string
  value: number
  color: string
}

export interface Property {
  id: string
  name: string
  address: string
  type: 'Multi-family' | 'Single-family'
  units?: number
  market: 'Los Angeles' | 'Chicago' | 'Phoenix'
  value: number
  monthlyIncome: number
  capRate: number
  occupancy: number
  isGrandCru: boolean
  image: string
  purchasePrice: number
  annualReturn: number
  cashOnCash: number
  appreciation: number
  monthlyIncomeHistory: number[]
  expenses: Expense[]
  trend: number // monthly % change
}

export const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar']

export const properties: Property[] = [
  {
    id: 'normandie',
    name: '1247 S Normandie Ave',
    address: '1247 S Normandie Ave, Los Angeles, CA',
    type: 'Multi-family',
    units: 8,
    market: 'Los Angeles',
    value: 1200000,
    monthlyIncome: 8200,
    capRate: 7.2,
    occupancy: 100,
    isGrandCru: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    purchasePrice: 980000,
    annualReturn: 11.4,
    cashOnCash: 8.6,
    appreciation: 22.4,
    monthlyIncomeHistory: [7600, 7700, 7900, 8000, 8000, 8100, 8200, 8200, 8200, 8100, 8200, 8200],
    expenses: [
      { label: 'Mortgage', value: 4200, color: '#7A3B4E' },
      { label: 'Taxes', value: 780, color: '#5A7C52' },
      { label: 'Maintenance', value: 600, color: '#C2956B' },
      { label: 'Insurance', value: 220, color: '#8B6E8E' },
      { label: 'Management', value: 820, color: '#D4CFC6' },
    ],
    trend: 2.1,
  },
  {
    id: 'larchmont',
    name: 'Larchmont Courtyard',
    address: '218 N Larchmont Blvd, Los Angeles, CA',
    type: 'Multi-family',
    units: 12,
    market: 'Los Angeles',
    value: 2100000,
    monthlyIncome: 14800,
    capRate: 6.1,
    occupancy: 92,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    purchasePrice: 1820000,
    annualReturn: 9.2,
    cashOnCash: 6.8,
    appreciation: 15.4,
    monthlyIncomeHistory: [13600, 13900, 14200, 14400, 14400, 14600, 14800, 14800, 14700, 14800, 14800, 14800],
    expenses: [
      { label: 'Mortgage', value: 7800, color: '#7A3B4E' },
      { label: 'Taxes', value: 1365, color: '#5A7C52' },
      { label: 'Maintenance', value: 1050, color: '#C2956B' },
      { label: 'Insurance', value: 380, color: '#8B6E8E' },
      { label: 'Management', value: 1480, color: '#D4CFC6' },
    ],
    trend: 0.8,
  },
  {
    id: 'venice',
    name: '834 Venice Blvd',
    address: '834 Venice Blvd, Los Angeles, CA',
    type: 'Single-family',
    units: undefined,
    market: 'Los Angeles',
    value: 680000,
    monthlyIncome: 3400,
    capRate: 5.8,
    occupancy: 100,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
    purchasePrice: 590000,
    annualReturn: 8.1,
    cashOnCash: 5.4,
    appreciation: 15.3,
    monthlyIncomeHistory: [3100, 3100, 3200, 3200, 3400, 3400, 3400, 3400, 3400, 3400, 3400, 3400],
    expenses: [
      { label: 'Mortgage', value: 1820, color: '#7A3B4E' },
      { label: 'Taxes', value: 442, color: '#5A7C52' },
      { label: 'Maintenance', value: 340, color: '#C2956B' },
      { label: 'Insurance', value: 110, color: '#8B6E8E' },
      { label: 'Management', value: 340, color: '#D4CFC6' },
    ],
    trend: -0.3,
  },
  {
    id: 'silverlake',
    name: 'Silver Lake Fourplex',
    address: '2841 Glendale Blvd, Los Angeles, CA',
    type: 'Multi-family',
    units: 4,
    market: 'Los Angeles',
    value: 920000,
    monthlyIncome: 5600,
    capRate: 6.9,
    occupancy: 100,
    isGrandCru: true,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
    purchasePrice: 740000,
    annualReturn: 10.8,
    cashOnCash: 7.9,
    appreciation: 24.3,
    monthlyIncomeHistory: [5000, 5100, 5200, 5400, 5400, 5500, 5600, 5600, 5600, 5600, 5600, 5600],
    expenses: [
      { label: 'Mortgage', value: 2980, color: '#7A3B4E' },
      { label: 'Taxes', value: 598, color: '#5A7C52' },
      { label: 'Maintenance', value: 460, color: '#C2956B' },
      { label: 'Insurance', value: 162, color: '#8B6E8E' },
      { label: 'Management', value: 560, color: '#D4CFC6' },
    ],
    trend: 1.4,
  },
  {
    id: 'marvista',
    name: 'Mar Vista Duplex',
    address: '3912 Grandview Blvd, Los Angeles, CA',
    type: 'Multi-family',
    units: 2,
    market: 'Los Angeles',
    value: 750000,
    monthlyIncome: 4100,
    capRate: 6.2,
    occupancy: 50,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    purchasePrice: 660000,
    annualReturn: 7.6,
    cashOnCash: 5.1,
    appreciation: 13.6,
    monthlyIncomeHistory: [4100, 4100, 4100, 4100, 4100, 4100, 2050, 2050, 4100, 4100, 4100, 4100],
    expenses: [
      { label: 'Mortgage', value: 2440, color: '#7A3B4E' },
      { label: 'Taxes', value: 488, color: '#5A7C52' },
      { label: 'Maintenance', value: 375, color: '#C2956B' },
      { label: 'Insurance', value: 128, color: '#8B6E8E' },
      { label: 'Management', value: 410, color: '#D4CFC6' },
    ],
    trend: -2.8,
  },
  {
    id: 'logansquare',
    name: 'Logan Square Sixplex',
    address: '2540 N Kedzie Ave, Chicago, IL',
    type: 'Multi-family',
    units: 6,
    market: 'Chicago',
    value: 480000,
    monthlyIncome: 4200,
    capRate: 8.1,
    occupancy: 83,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&h=600&fit=crop',
    purchasePrice: 390000,
    annualReturn: 12.2,
    cashOnCash: 9.4,
    appreciation: 23.1,
    monthlyIncomeHistory: [3800, 3900, 4000, 4000, 4100, 4200, 4200, 3500, 4200, 4200, 4200, 4200],
    expenses: [
      { label: 'Mortgage', value: 1620, color: '#7A3B4E' },
      { label: 'Taxes', value: 528, color: '#5A7C52' },
      { label: 'Maintenance', value: 480, color: '#C2956B' },
      { label: 'Insurance', value: 148, color: '#8B6E8E' },
      { label: 'Management', value: 420, color: '#D4CFC6' },
    ],
    trend: 0.5,
  },
  {
    id: 'pilsen',
    name: 'Pilsen Walk-up',
    address: '1816 W 18th St, Chicago, IL',
    type: 'Multi-family',
    units: 4,
    market: 'Chicago',
    value: 340000,
    monthlyIncome: 2800,
    capRate: 7.6,
    occupancy: 100,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop',
    purchasePrice: 268000,
    annualReturn: 11.6,
    cashOnCash: 8.8,
    appreciation: 26.9,
    monthlyIncomeHistory: [2500, 2500, 2600, 2700, 2800, 2800, 2800, 2800, 2800, 2800, 2800, 2800],
    expenses: [
      { label: 'Mortgage', value: 1060, color: '#7A3B4E' },
      { label: 'Taxes', value: 374, color: '#5A7C52' },
      { label: 'Maintenance', value: 340, color: '#C2956B' },
      { label: 'Insurance', value: 106, color: '#8B6E8E' },
      { label: 'Management', value: 280, color: '#D4CFC6' },
    ],
    trend: 1.2,
  },
  {
    id: 'hydepark',
    name: 'Hyde Park Single',
    address: '5248 S Blackstone Ave, Chicago, IL',
    type: 'Single-family',
    units: undefined,
    market: 'Chicago',
    value: 290000,
    monthlyIncome: 1900,
    capRate: 7.1,
    occupancy: 100,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop',
    purchasePrice: 228000,
    annualReturn: 10.4,
    cashOnCash: 7.8,
    appreciation: 27.2,
    monthlyIncomeHistory: [1700, 1700, 1800, 1800, 1900, 1900, 1900, 1900, 1900, 1900, 1900, 1900],
    expenses: [
      { label: 'Mortgage', value: 780, color: '#7A3B4E' },
      { label: 'Taxes', value: 319, color: '#5A7C52' },
      { label: 'Maintenance', value: 290, color: '#C2956B' },
      { label: 'Insurance', value: 86, color: '#8B6E8E' },
      { label: 'Management', value: 190, color: '#D4CFC6' },
    ],
    trend: 0.2,
  },
  {
    id: 'scottsdale',
    name: 'Scottsdale Ranch',
    address: '8821 E Pinnacle Peak Rd, Scottsdale, AZ',
    type: 'Single-family',
    units: undefined,
    market: 'Phoenix',
    value: 410000,
    monthlyIncome: 2600,
    capRate: 7.4,
    occupancy: 100,
    isGrandCru: false,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    purchasePrice: 318000,
    annualReturn: 11.8,
    cashOnCash: 8.2,
    appreciation: 29.0,
    monthlyIncomeHistory: [2200, 2300, 2400, 2500, 2500, 2600, 2600, 2600, 2600, 2600, 2600, 2600],
    expenses: [
      { label: 'Mortgage', value: 1020, color: '#7A3B4E' },
      { label: 'Taxes', value: 451, color: '#5A7C52' },
      { label: 'Maintenance', value: 410, color: '#C2956B' },
      { label: 'Insurance', value: 118, color: '#8B6E8E' },
      { label: 'Management', value: 260, color: '#D4CFC6' },
    ],
    trend: 1.8,
  },
  {
    id: 'tempe',
    name: 'Tempe Triplex',
    address: '1204 E Apache Blvd, Tempe, AZ',
    type: 'Multi-family',
    units: 3,
    market: 'Phoenix',
    value: 350000,
    monthlyIncome: 2800,
    capRate: 8.8,
    occupancy: 100,
    isGrandCru: true,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    purchasePrice: 258000,
    annualReturn: 14.2,
    cashOnCash: 11.6,
    appreciation: 35.7,
    monthlyIncomeHistory: [2200, 2300, 2400, 2600, 2600, 2800, 2800, 2800, 2800, 2800, 2800, 2800],
    expenses: [
      { label: 'Mortgage', value: 830, color: '#7A3B4E' },
      { label: 'Taxes', value: 385, color: '#5A7C52' },
      { label: 'Maintenance', value: 350, color: '#C2956B' },
      { label: 'Insurance', value: 98, color: '#8B6E8E' },
      { label: 'Management', value: 280, color: '#D4CFC6' },
    ],
    trend: 3.2,
  },
]

export const portfolioHistory = [
  { month: 'Apr', value: 3820000 },
  { month: 'May', value: 3870000 },
  { month: 'Jun', value: 3910000 },
  { month: 'Jul', value: 3880000 },
  { month: 'Aug', value: 3940000 },
  { month: 'Sep', value: 3990000 },
  { month: 'Oct', value: 4020000 },
  { month: 'Nov', value: 4060000 },
  { month: 'Dec', value: 4080000 },
  { month: 'Jan', value: 4100000 },
  { month: 'Feb', value: 4160000 },
  { month: 'Mar', value: 4220000 },
]

export const recentActivity = [
  { id: 1, text: 'Rent collected', property: '1247 S Normandie Ave', time: '2h ago', icon: 'payment' },
  { id: 2, text: 'Lease renewed', property: 'Unit 4B, Larchmont Courtyard', time: '1d ago', icon: 'lease' },
  { id: 3, text: 'Maintenance request resolved', property: 'Pilsen Walk-up', time: '2d ago', icon: 'maintenance' },
  { id: 4, text: 'Rent collected', property: 'Tempe Triplex', time: '3d ago', icon: 'payment' },
]

export function formatCurrency(val: number, compact = false): string {
  if (compact) {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val)
}

export function getTotalValue(): number {
  return properties.reduce((sum, p) => sum + p.value, 0)
}

export function getTotalMonthlyIncome(): number {
  return properties.reduce((sum, p) => sum + p.monthlyIncome, 0)
}

export function getAvgCapRate(): number {
  return parseFloat((properties.reduce((sum, p) => sum + p.capRate, 0) / properties.length).toFixed(1))
}

export function getAvgOccupancy(): number {
  return Math.round(properties.reduce((sum, p) => sum + p.occupancy, 0) / properties.length)
}
