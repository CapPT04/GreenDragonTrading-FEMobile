export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
  color?: string;
  itemCount: number;
}

export interface Transaction {
  id: string;
  productId: string;
  type: "in" | "out";
  quantity: number;
  price: number;
  timestamp: string;
  note?: string;
}
