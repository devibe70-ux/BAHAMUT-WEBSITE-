import { Order } from './types';

export type OrderDetails = any;

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1001',
    order_number: 'BM-2026-1001',
    customer_name: 'Rajesh Sharma',
    customer_email: 'rajesh.sharma@example.com',
    customer_phone: '+91 98765 43210',
    shipping_address: {
      fullName: 'Rajesh Sharma',
      email: 'rajesh.sharma@example.com',
      phone: '+91 98765 43210',
      street: 'Flat 402, Navrangpura Heights, CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015'
    },
    payment_status: 'DEPOSIT_PAID',
    payment_type: 'PARTIAL_COD',
    advance_amount: 200,
    cod_balance_due: 1099,
    total_amount: 1299,
    items: [
      {
        product: {
          id: 'prod-001',
          slug: 'ahmedabad-woven-chambray-navy',
          title: 'De Vibe Classic Chambray Shirt - Deep Navy',
          description: 'Direct-from-manufacturer 100% Breathable Woven Cotton crafted in Ahmedabad.',
          target_demographic: 'UNIFIED_13_65',
          fabric_details: '100% Breathable Woven Cotton (Ahmedabad Mills)',
          price: 1299,
          original_mrp: 2499,
          stock_quantity: 45,
          images: [
            'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
          ],
          sizes: ['38', '40', '42', '44', '46'],
          is_active: true,
          created_at: '2026-07-01T10:00:00Z'
        },
        selectedSize: '40',
        quantity: 1
      }
    ],
    razorpay_order_id: 'order_N3x9P2qL01z88',
    razorpay_payment_id: 'pay_N3x9Z9yW4310a',
    courier_provider: 'Shipyaari',
    awb_number: 'SY-BM-8849102',
    fulfillment_status: 'DISPATCHED',
    created_at: '2026-07-29T14:30:00Z'
  }
];

export function getOrders(): Order[] {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bahamut_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
  }
  return INITIAL_ORDERS;
}

export function saveOrder(order: any): Order[] {
  const current = getOrders();
  const index = current.findIndex(o => o.id === order.id || o.order_number === order.order_number);
  let updated: Order[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = order;
  } else {
    updated = [order, ...current];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('bahamut_orders', JSON.stringify(updated));
  }
  return updated;
}

export function saveOrderToMemory(order: any): Order[] {
  return saveOrder(order);
}

export function getOrderByNumber(orderIdOrNumber: string): Order | undefined {
  const orders = getOrders();
  const normalized = orderIdOrNumber.trim().toUpperCase();
  return orders.find(
    o =>
      o.order_number.toUpperCase() === normalized ||
      o.id.toUpperCase() === normalized ||
      o.order_number.replace('BM-2026-', '') === normalized
  );
}
