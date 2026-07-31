import { Order } from './types';

export interface MyBillBookInvoiceRow {
  invoice_number: string;
  invoice_date: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  pincode: string;
  item_name: string;
  hsn_code: string;
  quantity: number;
  unit_price: number;
  discount: number;
  taxable_value: number;
  gst_rate: number; // 5% for apparel <= 1000, 12% for apparel > 1000
  total_item_amount: number;
  payment_mode: string;
  advance_collected: number;
  balance_due: number;
}

export function getHsnCode(category?: string, price: number = 1299): string {
  if (category === 'TEE') return '6109'; // T-Shirts & Singlets (Knitted)
  if (category === 'BOTTOMWEAR') return '6203'; // Trousers & Denim (Woven)
  return '6205'; // Men's Woven Cotton Shirts
}

export function getGstRate(price: number): number {
  return price <= 1000 ? 5 : 12; // Standard Indian Apparel GST slab
}

export function convertOrdersToMyBillBookRows(orders: Order[]): MyBillBookInvoiceRow[] {
  const rows: MyBillBookInvoiceRow[] = [];

  orders.forEach(order => {
    const formattedDate = new Date(order.created_at).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    const fullAddress = `${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state}`;

    order.items.forEach(item => {
      const price = item.product.price;
      const gstRate = getGstRate(price);
      const hsnCode = getHsnCode(item.product.category, price);
      const qty = item.quantity;
      const totalAmount = price * qty;
      const taxableValue = Math.round((totalAmount / (1 + gstRate / 100)) * 100) / 100;

      rows.push({
        invoice_number: order.order_number.replace('BM-2026-', 'INV-DEVIBE-'),
        invoice_date: formattedDate,
        customer_name: order.customer_name,
        customer_phone: order.customer_phone,
        customer_address: fullAddress,
        pincode: order.shipping_address.pincode,
        item_name: `${item.product.title} (Size: ${item.selectedSize})`,
        hsn_code: hsnCode,
        quantity: qty,
        unit_price: price,
        discount: 0,
        taxable_value: taxableValue,
        gst_rate: gstRate,
        total_item_amount: totalAmount,
        payment_mode: order.payment_type === 'PARTIAL_COD' ? 'PARTIAL_COD (Razorpay + Cash)' : 'PREPAID',
        advance_collected: order.advance_amount,
        balance_due: order.cod_balance_due
      });
    });
  });

  return rows;
}

export function generateMyBillBookCsv(orders: Order[]): string {
  const rows = convertOrdersToMyBillBookRows(orders);

  const headers = [
    'Invoice Number',
    'Invoice Date',
    'Customer Name',
    'Phone Number',
    'Shipping Address',
    'PIN Code',
    'Item Name',
    'HSN/SAC Code',
    'Quantity',
    'Unit Price (INR)',
    'Discount',
    'Taxable Value',
    'GST Rate (%)',
    'Total Amount',
    'Payment Mode',
    'Advance Paid (INR)',
    'Doorstep Balance Due (INR)'
  ];

  const csvLines = [headers.join(',')];

  rows.forEach(r => {
    const line = [
      `"${r.invoice_number}"`,
      `"${r.invoice_date}"`,
      `"${r.customer_name.replace(/"/g, '""')}"`,
      `"${r.customer_phone}"`,
      `"${r.customer_address.replace(/"/g, '""')}"`,
      `"${r.pincode}"`,
      `"${r.item_name.replace(/"/g, '""')}"`,
      `"${r.hsn_code}"`,
      r.quantity,
      r.unit_price,
      r.discount,
      r.taxable_value,
      r.gst_rate,
      r.total_item_amount,
      `"${r.payment_mode}"`,
      r.advance_collected,
      r.balance_due
    ].join(',');

    csvLines.push(line);
  });

  return csvLines.join('\n');
}
