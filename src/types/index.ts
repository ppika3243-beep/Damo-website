export type DeliveryZone = 'Inside Dhaka' | 'Dhaka Suburbs' | 'Outside Dhaka';

export type PaymentMethod = 'Cash on Delivery' | 'bKash' | 'Nagad';

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: "Men's" | "Women's" | 'Unisex';
  badge?: 'Best Seller' | 'New' | 'Popular' | 'Trending';
  description: string;
  details: string[];
  fabric: string;
  gsm?: string;
  fit: string;
  care: string[];
  availableSizes: string[];
  colors: { name: string; hex: string }[];
  images: string[];
  isNewArrival?: boolean;
  inStock: boolean;
}

export interface CartItem {
  id: string; // generated unique cart item id (product.id + '-' + size)
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  color?: string;
}

export interface OrderPayload {
  orderId: string;
  customerName: string;
  mobile: string;
  product: string;
  size: string;
  quantity: number;
  deliveryZone: DeliveryZone;
  district: string;
  address: string;
  paymentMethod: PaymentMethod;
  paymentStatus: string;
  deliveryNote: string;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  orderStatus: string;
  adminNote: string;
}

export interface OrderSubmissionResult {
  success: boolean;
  orderId?: string;
  message?: string;
  payload?: OrderPayload;
  timestamp?: string;
}

export interface StoredOrder {
  orderId: string;
  customerName: string;
  mobile: string;
  itemsSummary: string;
  deliveryZone: DeliveryZone;
  district: string;
  address: string;
  paymentMethod: PaymentMethod;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
  date: string;
  orderStatus: string;
  items: CartItem[];
}
