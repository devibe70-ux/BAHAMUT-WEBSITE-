'use client';

import React from 'react';
import { X, Printer, Download, ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { Order } from '@/lib/types';
import { getHsnCode, getGstRate } from '@/lib/mybillbook';

interface GSTInvoiceModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GSTInvoiceModal({ order, isOpen, onClose }: GSTInvoiceModalProps) {
  if (!isOpen || !order) return null;

  const invoiceNumber = order.order_number.replace('BM-2026-', 'INV-DEVIBE-');
  const invoiceDate = new Date(order.created_at).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleExportSingleMyBillBook = () => {
    const csvContent = [
      'Invoice Number,Invoice Date,Customer Name,Phone Number,Shipping Address,PIN Code,Item Name,HSN/SAC Code,Quantity,Unit Price,Taxable Value,GST Rate,Total Amount,Payment Mode,Advance Paid,Balance Due',
      ...order.items.map(item => {
        const p = item.product.price;
        const gst = getGstRate(p);
        const hsn = getHsnCode(item.product.category, p);
        const taxable = Math.round((p * item.quantity / (1 + gst / 100)) * 100) / 100;
        return `"${invoiceNumber}","${invoiceDate}","${order.customer_name}","${order.customer_phone}","${order.shipping_address.street}, ${order.shipping_address.city}","${order.shipping_address.pincode}","${item.product.title} (Size: ${item.selectedSize})","${hsn}",${item.quantity},${p},${taxable},${gst},${p * item.quantity},"${order.payment_type}",${order.advance_amount},${order.cod_balance_due}`;
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `MyBillBook_Invoice_${invoiceNumber}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-white w-full max-w-3xl rounded-3xl border border-slate-200 shadow-2xl overflow-hidden space-y-0 max-h-[90vh] flex flex-col">
        {/* Header (Hidden during print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-600 text-white rounded-xl">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black">B2C GST Tax Invoice & MyBillBook Sync</h2>
              <p className="text-xs text-slate-400 font-medium">Order #{order.order_number}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportSingleMyBillBook}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" /> MyBillBook CSV
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl flex items-center gap-1.5 transition-all shadow-md"
            >
              <Printer className="w-4 h-4" /> Print GST Invoice
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div id="printable-gst-invoice" className="p-8 space-y-6 overflow-y-auto bg-white text-slate-900 font-sans text-xs">
          {/* Top Seller & Customer Block */}
          <div className="flex justify-between items-start border-b border-slate-300 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl font-black tracking-tight text-slate-900">BahaMut</span>
                <span className="text-xs font-extrabold bg-slate-100 px-2 py-0.5 rounded border border-slate-300">by De Vibe</span>
              </div>
              <p className="font-extrabold text-slate-800">De Vibe Apparel Fulfillment Hub</p>
              <p className="text-slate-600">Revdi Bazar, Kalupur, Ahmedabad, Gujarat - 380002</p>
              <p className="text-slate-600">GSTIN: <strong className="font-black text-slate-900">24AAAAA0000A1Z5</strong></p>
              <p className="text-slate-600">Support Email: support@devibe.in | Mobile: +91 98765 43210</p>
            </div>

            <div className="text-right space-y-1">
              <span className="bg-slate-900 text-white text-[10px] font-black px-3 py-1 rounded uppercase tracking-wider inline-block">
                TAX INVOICE
              </span>
              <p className="font-black text-sm text-slate-900">Invoice #: {invoiceNumber}</p>
              <p className="text-slate-600">Date: {invoiceDate}</p>
              <p className="text-slate-600">AWB #: <strong>{order.awb_number || 'SY-BM-8849102'}</strong> ({order.courier_provider || 'Shipyaari'})</p>
            </div>
          </div>

          {/* Customer Billed To */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Billed & Shipped To:</p>
              <p className="font-black text-sm text-slate-900 mt-1">{order.customer_name}</p>
              <p className="text-slate-700">{order.shipping_address.street}</p>
              <p className="text-slate-700">{order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}</p>
              <p className="text-slate-700">Phone: <strong>{order.customer_phone}</strong></p>
            </div>

            <div className="text-right space-y-1">
              <p className="text-[10px] font-black uppercase text-slate-500 tracking-wider">Payment Information:</p>
              <p className="font-bold text-slate-800">Mode: <span className="font-black text-blue-700">{order.payment_type}</span></p>
              <p className="text-slate-700">Advance Paid (Razorpay): <strong className="text-emerald-700 font-black">₹{order.advance_amount}</strong></p>
              <p className="text-slate-700">Doorstep COD Balance Due: <strong className="text-slate-900 font-black">₹{order.cod_balance_due}</strong></p>
              <p className="text-[10px] text-slate-500 italic mt-2">Compatible with MyBillBook Billing App</p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border border-slate-300 rounded-2xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-100 text-slate-900 font-black uppercase text-[10px] border-b border-slate-300">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">Item Description</th>
                  <th className="p-3">HSN Code</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Taxable Val</th>
                  <th className="p-3 text-right">GST Rate</th>
                  <th className="p-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-medium text-slate-800">
                {order.items.map((item, idx) => {
                  const p = item.product.price;
                  const gst = getGstRate(p);
                  const hsn = getHsnCode(item.product.category, p);
                  const taxable = Math.round((p * item.quantity / (1 + gst / 100)) * 100) / 100;
                  return (
                    <tr key={idx}>
                      <td className="p-3 font-bold">{idx + 1}</td>
                      <td className="p-3 font-black text-slate-900">{item.product.title} (Size: {item.selectedSize})</td>
                      <td className="p-3 font-mono">{hsn}</td>
                      <td className="p-3 text-center font-bold">{item.quantity}</td>
                      <td className="p-3 text-right">₹{p}</td>
                      <td className="p-3 text-right">₹{taxable}</td>
                      <td className="p-3 text-right">{gst}%</td>
                      <td className="p-3 text-right font-black">₹{p * item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tax Summary & Total */}
          <div className="flex justify-between items-start pt-2">
            <div className="max-w-md space-y-1 text-[11px] text-slate-600">
              <p className="font-bold text-slate-800">Declaration & Terms:</p>
              <p>1. Goods sold are manufactured from 100% Woven Cotton in Ahmedabad mills.</p>
              <p>2. Pre-shrunk fabric. 7-day doorstep replacement policy applies.</p>
              <p>3. This is a computer-generated tax invoice verified by De Vibe Billing Engine.</p>
            </div>

            <div className="w-64 bg-slate-50 p-4 rounded-2xl border border-slate-300 space-y-2 text-right">
              <div className="flex justify-between text-slate-600 font-semibold">
                <span>Subtotal:</span>
                <span>₹{order.total_amount}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-semibold">
                <span>CGST (2.5% / 6%):</span>
                <span>Included</span>
              </div>
              <div className="flex justify-between text-slate-600 font-semibold">
                <span>SGST (2.5% / 6%):</span>
                <span>Included</span>
              </div>
              <div className="border-t border-slate-300 pt-2 flex justify-between font-black text-sm text-slate-900">
                <span>Total Invoice Value:</span>
                <span>₹{order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
