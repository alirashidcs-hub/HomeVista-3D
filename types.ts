export interface HousingScheme {
  id: string;
  title: string;
  tag?: string;
  imageUrl: string;
  description: string;
  priceRange: string;
}

export interface Plot {
  id: string;
  name: string;
  area: string;
  areaSqFt: number;
  price: string;
  priceNumeric: number;
  status: 'Available' | 'Reserved' | 'Sold' | 'Premium';
  gridPos: { row: number; col: number };
}

export interface HouseFootprint {
  id: string;
  title: string;
  collection: string;
  description: string;
  areaText: string;
  areaSqFt: number;
  basePrice: number;
  imageUrl: string;
}

export interface MaterialOption {
  id: string;
  name: string;
  category: 'Walls' | 'Floors' | 'Furniture' | 'Lighting' | 'Exterior';
  priceDelta: number;
  priceText: string;
  imageUrl: string;
  texturePattern?: string;
}

export interface CostCategory {
  title: string;
  subtitle: string;
  grade: string;
  estimatedCost: number;
  icon: string;
}

export interface ConsultationBooking {
  fullName: string;
  email: string;
  phone: string;
  inquiryType: string;
  projectNotes?: string;
  plotId?: string;
  appointmentDate?: string;
}
