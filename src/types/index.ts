export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  categoryId: number;
  available: boolean;
  isVegetarian?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export interface Order {
  id: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface Business {
  id: number;
  name: string;
  slug: string;
  logoUrl?: string;
  whatsappNumber: string;
  address?: string;
  openingHours?: string;
}
