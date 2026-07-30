'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { getOrders, saveOrder } from '@/lib/orders';
import { getRtoBlacklist, addCustomerToRtoBlacklist } from '@/lib/rtoBlacklist';
import { Order, RtoBlacklistItem } from '@/lib/types';
import { Package, Truck, Download, ShieldCheck, RefreshCw, AlertTriangle, UserX, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [rtoBlacklist, setRtoBlacklist] = useState<RtoBlacklistItem[]>([]);
  const [activeTab, setActiveTab] = useState<'ORDERS' | 'RTO_BLACKLIST'>('ORDERS');
  const [selectedRtoOrder, setSelectedRtoOrder] = useState<Order | null>(null);
  const [rtoReason, setRtoReason] = useState('Customer refused delivery / Fake address at doorstep');

  useEffect(() => {
    setOrders(getOrders());
    setRtoBlacklist(getRtoBlacklist());
  }, []);

  const handleMarkAsRto = (order: Order) => {
    setSelectedRtoOrder(order);
  };

  const confirmRtoReturn = () => {
    if (!selectedRtoOrder) return;

    // 1. Update Order Fulfillment Status to RTO_RETURNED
    const updatedOrder: Order = {
      ...selectedRtoOrder,
      fulfillment_status: 'RTO_RETURNED',
      is_rto_returned: true,
      rto_reason: rtoReason
    };

    const newOrders = saveOrder(updatedOrder);
    setOrders(newOrders);

    // 2. Add customer phone and email to persistent RTO Blacklist
    const newBlacklist = addCustomerToRtoBlacklist({
      phone: selectedRtoOrder.customer_phone,
      email: selectedRtoOrder.customer_email,
      customer_name: selectedRtoOrder.customer_name,
      reason: rtoReason,
      returned_order_number: selectedRtoOrder.order_number
    });

    setRtoBlacklist(newBlacklist);
    setSelectedRtoOrder(null);
    alert(`Order ${selectedRtoOrder.order_number} marked as RTO RETURNED. Customer (${selectedRtoOrder.customer_phone}) is now restricted to Full Prepaid Option Only on future orders.`);
  };

  const handleDownloadInvoice = (order: Order) => {
    const invoiceContent = `
================================================================================
                    DE VIBE - TAX INVOICE & FULFILLMENT SLIP
                    BahaMut Apparel (Marketed & Fulfilled by De Vibe)
                    Address: Revdi Bazar, Kalupur, Ahmedabad, Gujarat
================================================================================
Invoice No: INV-${order.order_number}
Date: ${new Date(order.created_at).toLocaleString('en-IN')}
Order ID: ${order.order_number}
AWB Number: ${order.awb_number || 'N/A'}
Courier: ${order.courier_provider || 'Shipyaari / Delhivery'}

CUSTOMER BILLING & SHIPPING DETAILS:
--------------------------------------------------------------------------------
Name: ${order.customer_name}
Phone: ${order.customer_phone}
Email: ${order.customer_email}
Address: ${order.shipping_address.street}, ${order.shipping_address.city}, ${order.shipping_address.state} - ${order.shipping_address.pincode}

ORDER PAYMENT & FINANCIAL SUMMARY:
--------------------------------------------------------------------------------
Payment Type: ${order.payment_type}
Advance Deposit Paid via Razorpay: ₹${order.advance_amount.toLocaleString('en-IN')}
Remaining Cash Balance Due at Doorstep: ₹${order.cod_balance_due.toLocaleString('en-IN')}
Total Invoice Value: ₹${order.total_amount.toLocaleString('en-IN')}

ITEMS PURCHASED:
--------------------------------------------------------------------------------
${order.items
  .map(
    (item, idx) =>
      `${idx + 1}. ${item.product.title} | Size: ${item.selectedSize} | Qty: ${item.quantity} | ₹${(
        item.product.price * item.quantity
      ).toLocaleString('en-IN')}`
  )
  .join('\n')}

================================================================================
Legal Disclaimer:
© 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.
Revdi Bazar, Kalupur, Ahmedabad, Gujarat.
================================================================================
    `;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice_${order.order_number}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-slate-200 pb-6 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 text-white text-xs font-black px-3 py-1 rounded-md uppercase">
              De Vibe Seller Portal
            </span>
            <span className="text-xs font-bold text-slate-500">Revdi Bazar, Kalupur, Ahmedabad</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mt-1">Order Fulfillment & RTO Blacklist Registry</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products/new"
            className="min-h-[48px] px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl shadow-md uppercase tracking-wider flex items-center gap-2"
          >
            + AI Catalog Publisher
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-8 w-fit">
        <button
          onClick={() => setActiveTab('ORDERS')}
          className={`min-h-[44px] px-6 text-xs font-black rounded-xl transition-all ${
            activeTab === 'ORDERS'
              ? 'bg-slate-900 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Customer Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('RTO_BLACKLIST')}
          className={`min-h-[44px] px-6 text-xs font-black rounded-xl transition-all flex items-center gap-2 ${
            activeTab === 'RTO_BLACKLIST'
              ? 'bg-rose-700 text-white shadow-md'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <UserX className="w-4 h-4" /> RTO Blacklist Registry ({rtoBlacklist.length})
        </button>
      </div>

      {/* Tab 1: Orders List */}
      {activeTab === 'ORDERS' && (
        <div className="space-y-6">
          {orders.map(order => (
            <div
              key={order.id}
              className={`bg-white rounded-3xl p-6 border shadow-sm space-y-4 ${
                order.fulfillment_status === 'RTO_RETURNED'
                  ? 'border-rose-300 bg-rose-50/20'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-lg text-slate-900">{order.order_number}</span>
                    {order.payment_type === 'PARTIAL_COD' ? (
                      <span className="bg-amber-50 text-amber-800 text-[10px] font-black px-2.5 py-0.5 rounded border border-amber-200">
                        PARTIAL COD (₹200 Paid)
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded border border-emerald-200">
                        FULL PREPAID
                      </span>
                    )}

                    {order.fulfillment_status === 'RTO_RETURNED' && (
                      <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase shadow-sm">
                        RTO RETURNED
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 font-semibold mt-1 block">
                    Placed: {new Date(order.created_at).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {order.fulfillment_status !== 'RTO_RETURNED' && (
                    <button
                      onClick={() => handleMarkAsRto(order)}
                      className="min-h-[40px] px-3.5 py-1.5 text-xs font-black text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <UserX className="w-4 h-4 text-rose-600" /> Record RTO Return
                    </button>
                  )}

                  <button
                    onClick={() => handleDownloadInvoice(order)}
                    className="min-h-[40px] px-3.5 py-1.5 text-xs font-black text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-xl flex items-center gap-1.5 transition-all"
                  >
                    <Download className="w-4 h-4 text-blue-600" /> Download GST Invoice
                  </button>
                </div>
              </div>

              {/* Order Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                {/* Customer Details */}
                <div className="space-y-1 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="font-black text-slate-900 block text-sm">{order.customer_name}</span>
                  <p className="text-slate-600 font-medium">{order.customer_phone}</p>
                  <p className="text-slate-600 font-medium">{order.customer_email}</p>
                  <p className="text-slate-700 font-semibold pt-1">
                    {order.shipping_address.street}, {order.shipping_address.city} - {order.shipping_address.pincode}
                  </p>
                </div>

                {/* Items & Fulfillment */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="font-black text-slate-900 block uppercase tracking-wider text-[11px]">Courier Shipment Details:</span>
                  <p className="font-bold text-slate-800">Provider: {order.courier_provider || 'Shipyaari Direct'}</p>
                  <p className="font-bold text-blue-700">AWB Track: {order.awb_number || 'SY-BM-8849102'}</p>
                  {order.rto_reason && (
                    <p className="text-rose-700 font-extrabold pt-1">
                      RTO Reason: {order.rto_reason}
                    </p>
                  )}
                </div>

                {/* Financial Summary */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <span className="font-black text-slate-900 block uppercase tracking-widest text-[11px]">Financial Balance:</span>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Advance Razorpay Deposit:</span>
                    <span className="font-black text-emerald-700">₹{order.advance_amount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-medium">
                    <span>Doorstep Cash Balance:</span>
                    <span className="font-black text-slate-900">₹{order.cod_balance_due.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between font-black text-sm text-slate-900 border-t border-slate-200 pt-1">
                    <span>Total Invoice:</span>
                    <span>₹{order.total_amount.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: RTO Blacklist Registry */}
      {activeTab === 'RTO_BLACKLIST' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 p-5 rounded-3xl space-y-2 text-rose-950">
            <h3 className="text-base font-black flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" /> Persistent RTO Risk Registry Active
            </h3>
            <p className="text-xs font-semibold leading-relaxed">
              Customers in this registry are automatically blocked from using Partial COD when entering their mobile number or email at checkout. They are forced to checkout via <strong>Full Prepaid Option Only</strong>.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-900 text-white uppercase text-[10px] font-black tracking-widest">
                  <tr>
                    <th className="py-4 px-5">Customer Name</th>
                    <th className="py-4 px-5">Mobile Number</th>
                    <th className="py-4 px-5">Email Address</th>
                    <th className="py-4 px-5">Return Reason</th>
                    <th className="py-4 px-5">Order #</th>
                    <th className="py-4 px-5">Restriction Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rtoBlacklist.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors font-medium">
                      <td className="py-4 px-5 font-black text-slate-900">{item.customer_name}</td>
                      <td className="py-4 px-5 text-slate-800 font-bold">{item.phone}</td>
                      <td className="py-4 px-5 text-slate-600">{item.email}</td>
                      <td className="py-4 px-5 text-rose-700 font-bold">{item.reason}</td>
                      <td className="py-4 px-5 text-slate-800 font-black">{item.returned_order_number}</td>
                      <td className="py-4 px-5">
                        <span className="bg-rose-600 text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                          PREPAID ONLY
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* RTO Return Confirmation Modal */}
      {selectedRtoOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <UserX className="w-6 h-6 text-rose-600" />
              <div>
                <h3 className="text-lg font-black text-slate-900">Mark Order {selectedRtoOrder.order_number} as RTO Returned</h3>
                <p className="text-xs text-slate-500 font-semibold">Restrict customer to Full Prepaid Option on future orders</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">Specify Return Reason:</label>
              <textarea
                rows={3}
                value={rtoReason}
                onChange={e => setRtoReason(e.target.value)}
                className="w-full p-3 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-rose-500 font-semibold"
                placeholder="e.g. Customer refused delivery at doorstep / Door closed"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedRtoOrder(null)}
                className="min-h-[44px] px-5 text-xs font-black text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={confirmRtoReturn}
                className="min-h-[44px] px-6 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl uppercase tracking-wider shadow-md"
              >
                Confirm RTO & Restrict Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
