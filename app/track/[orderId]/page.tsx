'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getOrderByNumber } from '@/lib/orders';
import { Order } from '@/lib/types';
import { PackageCheck, Truck, CheckCircle2, MapPin, Clock, ArrowLeft, ShieldCheck, Tag, ExternalLink } from 'lucide-react';

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const orderIdParam = params?.orderId as string;

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (orderIdParam) {
      const found = getOrderByNumber(orderIdParam);
      if (found) {
        setOrder(found);
      }
    }
  }, [orderIdParam]);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-sans space-y-4">
        <PackageCheck className="w-12 h-12 text-blue-400 mx-auto animate-bounce" />
        <h2 className="text-2xl font-black text-white">Order #{orderIdParam} Not Found</h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto font-medium">
          Please verify your order number or check your email confirmation sent by De Vibe.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 min-h-[48px] px-6 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl uppercase tracking-wider"
        >
          Return to BahaMut Homepage
        </Link>
      </div>
    );
  }

  const milestones = [
    { title: 'Order Placed', desc: 'Received at De Vibe Hub', completed: true },
    { title: 'Razorpay Deposit Verified', desc: `₹${order.advance_amount} Deposit Received`, completed: order.payment_status === 'DEPOSIT_PAID' || order.payment_status === 'FULLY_PAID' },
    { title: 'Courier Dispatched', desc: `${order.courier_provider || 'Shipyaari'} Waybill Generated`, completed: order.fulfillment_status === 'DISPATCHED' || order.fulfillment_status === 'DELIVERED' },
    { title: 'Out For Delivery', desc: 'Doorstep Courier Agent Assigned', completed: order.fulfillment_status === 'OUT_FOR_DELIVERY' || order.fulfillment_status === 'DELIVERED' },
    { title: 'Delivered & COD Collected', desc: order.cod_balance_due > 0 ? `Collect ₹${order.cod_balance_due} Cash` : 'Fully Paid', completed: order.fulfillment_status === 'DELIVERED' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans space-y-8">
      {/* Top Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-700/80">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider">
              LIVE SHIPMENT STATUS
            </span>
            <span className="text-xs text-slate-400 font-bold">BahaMut Apparel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Order #{order.order_number}
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-semibold">
            Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        </div>

        {/* Balance Due Card */}
        <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-1 text-right sm:text-left md:text-right">
          <span className="text-[10px] text-slate-400 font-black block uppercase tracking-wider">
            {order.payment_type === 'PARTIAL_COD' ? 'Remaining Cash Balance Due:' : 'Payment Status:'}
          </span>
          <span className="text-2xl font-black text-amber-400">
            {order.cod_balance_due > 0 ? `₹${order.cod_balance_due.toLocaleString('en-IN')}` : 'FULLY PAID (₹0 DUE)'}
          </span>
          <span className="text-[10px] text-slate-400 block font-semibold">
            ₹{order.advance_amount} Deposit Paid via Razorpay
          </span>
        </div>
      </div>

      {/* Shipment Milestone Progress Bar */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl space-y-6">
        <h3 className="text-lg font-black text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <Truck className="w-5 h-5 text-blue-400" /> Courier Milestone Timeline
        </h3>

        <div className="relative border-l-2 border-blue-500/30 ml-4 space-y-8 py-2">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-8 group">
              <div
                className={`absolute -left-[17px] top-0 w-8 h-8 rounded-full flex items-center justify-center font-black text-xs shadow-md ${
                  m.completed ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'
                }`}
              >
                {m.completed ? <CheckCircle2 className="w-5 h-5" /> : idx + 1}
              </div>

              <div>
                <h4 className={`font-black text-base ${m.completed ? 'text-white' : 'text-slate-500'}`}>
                  {m.title}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5 font-medium">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Details & Courier Waybill Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-black text-base text-white border-b border-slate-800 pb-2">
            Logistics & AWB Waybill
          </h3>
          <div className="space-y-3 text-xs font-medium">
            <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">Assigned Logistics Partner:</span>
              <span className="font-black text-blue-400">{order.courier_provider || 'Shipyaari'}</span>
            </div>
            <div className="flex justify-between items-center bg-slate-900/80 p-3 rounded-xl border border-slate-800">
              <span className="text-slate-400">AWB Waybill Number:</span>
              <span className="font-black text-white flex items-center gap-1 font-mono">
                {order.awb_number || 'SY-BM-8849102'}
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              </span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl space-y-4">
          <h3 className="font-black text-base text-white border-b border-slate-800 pb-2">
            Delivery Destination Address
          </h3>
          <div className="text-xs text-slate-300 space-y-1 font-medium">
            <p className="font-black text-white text-sm">{order.customer_name}</p>
            <p>{order.shipping_address.street}</p>
            <p>{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
            <p className="font-semibold text-slate-400 pt-1">Phone: {order.customer_phone}</p>
          </div>
        </div>
      </div>

      {/* Footer Legal Lockup Line */}
      <div className="pt-4 text-center text-xs text-slate-400 font-bold border-t border-slate-800">
        © 2026 BahaMut Apparel. Marketed, billed, and fulfilled by De Vibe.
      </div>
    </div>
  );
}
