export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  comparePrice?: number;
  size: string;
  category: string;
  categorySlug: string;
  sku: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  featured: boolean;
  image: string; // emoji placeholder
  certifications?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: ShippingAddress;
  createdAt: string;
  updatedAt: string;
}

export interface ShippingAddress {
  fullName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  county: string;
  postcode: string;
  phone: string;
}

export interface Category {
  name: string;
  slug: string;
  description: string;
  icon: string;
}
