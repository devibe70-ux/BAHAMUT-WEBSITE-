export type Demographic = 'UNIFIED_13_65' | 'YOUTH' | 'CLASSIC';
export type Size = 'S' | 'M' | 'L' | 'XL' | 'XXL';
export type PaymentStatus = 'DEPOSIT_PAID' | 'FULLY_PAID' | 'FAILED' | 'REFUNDED';
export type PaymentType = 'PARTIAL_COD' | 'PREPAID';
export type FulfillmentStatus = 'UNFULFILLED' | 'DISPATCHED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'RTO_RETURNED' | 'CANCELLED';

export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  target_demographic: Demographic;
  fabric_details: string;
  price: number;
  original_mrp: number;
  stock_quantity: number;
  rating?: number;
  review_count?: number;
  express_delivery?: string;
  images: string[];
  sizes: Size[];
  pattern?: string;
  fit?: string;
  sleeve?: string;
  color?: string;
  is_active: boolean;
  created_at: string;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CartItem {
  product: Product;
  selectedSize: Size;
  quantity: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  payment_status: PaymentStatus;
  payment_type: PaymentType;
  advance_amount: number;
  cod_balance_due: number;
  total_amount: number;
  items: CartItem[];
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  courier_provider?: string;
  awb_number?: string;
  fulfillment_status: FulfillmentStatus;
  is_rto_returned?: boolean;
  rto_reason?: string;
  created_at: string;
}

export interface RtoBlacklistItem {
  id: string;
  phone: string;
  email: string;
  customer_name: string;
  reason: string;
  returned_order_number: string;
  added_at: string;
}
