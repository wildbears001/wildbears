import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // 'All', 'Paid', 'Pending', 'COD'
  const [statusFilter, setStatusFilter] = useState('All');
  const [showPreOrder, setShowPreOrder] = useState(null);

  // ================= FETCH ORDERS =================
  useEffect(() => {
    const fetchAllOrders = async () => {
      if (!token) return;
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/order/list`,
          {},
          { headers: { token } }
        );
        if (data.success) setOrders(data.orders.reverse());
        else toast.error(data.message);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAllOrders();
  }, [token]);

  // ================= FILTERED ORDERS =================
  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => {
         if (statusFilter === 'Paid') return order.payment === true && order.paymentMethod !== 'COD';
         if (statusFilter === 'Pending') return order.payment === false && order.paymentMethod !== 'COD';
         if (statusFilter === 'COD') return order.paymentMethod === 'COD';
         return true; // 'All'
      })
      .filter(order => order._id.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(order => {
        if (showPreOrder === null) return true;
        return showPreOrder
          ? order.items.some(item => item.isPreOrder)
          : order.items.every(item => !item.isPreOrder);
      });
  }, [orders, statusFilter, searchQuery, showPreOrder]);


  // ================= STATUS CHANGE =================
  const handleStatusChange = async (event, orderId) => {
    const status = event.target.value;
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      );
      if (data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status } : order
          )
        );
        toast.success(`Order status updated to ${status}`);
      }
    } catch {
      toast.error("Failed to update status.");
    }
  };

  // ================= PDF LOGIC =================
  const downloadNewOrdersPDF = async () => {
    const downloaded = JSON.parse(localStorage.getItem('downloadedOrders')) || [];
    const newOrders = filteredOrders.filter(order => !downloaded.includes(order._id));
    if (newOrders.length === 0) {
      toast.info('No new orders to download');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    const PAGE_WIDTH = 210;
    const MARGIN = 15;

    for (let index = 0; index < newOrders.length; index++) {
      const order = newOrders[index];
      if (index > 0) pdf.addPage();

      let y = 20;
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(20);
      pdf.text('INVOICE', MARGIN, y);

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Invoice Date: ${new Date(order.date).toLocaleDateString()}`, PAGE_WIDTH - MARGIN, y, { align: 'right' });

      y += 10;
      pdf.setDrawColor(180);
      pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);

      y += 8;
      pdf.setFontSize(11);
      pdf.text(`Order ID: ${order._id}`, MARGIN, y);

      const qrData = await QRCode.toDataURL(order._id);
      pdf.addImage(qrData, 'PNG', PAGE_WIDTH - MARGIN - 32, y - 6, 28, 28);

      y += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Bill To:', MARGIN, y);
      pdf.setFont('helvetica', 'normal');
      y += 6;
      pdf.text(`${order.address?.firstName} ${order.address?.lastName}`, MARGIN, y);
      y += 5;
      pdf.text(order.address?.street || '', MARGIN, y);
      y += 5;
      pdf.text(`${order.address?.city} - ${order.address?.pincode}, ${order.address?.state}`, MARGIN, y);
      y += 5;
      pdf.text(order.address?.country || '', MARGIN, y);
      y += 5;
      pdf.text(`Phone: ${order.address?.phone}`, MARGIN, y);
      y += 5;
      pdf.text(`Email: ${order.address?.email}`, MARGIN, y);

      y += 10;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Payment Details:', MARGIN, y);
      pdf.setFont('helvetica', 'normal');
      y += 6;
      pdf.text(`Payment Method: ${order.paymentMethod}`, MARGIN, y);
      y += 5;
      pdf.text(`Payment Status: ${order.payment ? 'Paid' : 'Pending'}`, MARGIN, y);

      y += 12;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Items', MARGIN, y);
      y += 5;
      pdf.setDrawColor(150);
      pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
      y += 6;
      pdf.setFontSize(10);
      pdf.text('Product', MARGIN, y);
      pdf.text('Qty', PAGE_WIDTH - 70, y);
      pdf.text('Size', PAGE_WIDTH - 50, y);
      pdf.text('Type', PAGE_WIDTH - 30, y);
      y += 4;
      pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
      y += 6;

      pdf.setFont('helvetica', 'normal');
      order.items.forEach(item => {
        pdf.text(item.name, MARGIN, y);
        pdf.text(String(item.quantity), PAGE_WIDTH - 70, y);
        pdf.text(item.size, PAGE_WIDTH - 50, y);
        pdf.text(item.isPreOrder ? 'Pre-Order' : 'Normal', PAGE_WIDTH - 30, y);
        y += 6;
      });

      pdf.setDrawColor(0);
      pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y);
      y += 10;

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(16);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`TOTAL AMOUNT: ${currency}${order.amount}`, PAGE_WIDTH / 2, y, { align: 'center' });

      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(120);
      pdf.text('Thank you for shopping with WILDBEARS', PAGE_WIDTH / 2, 285, { align: 'center' });
    }

    pdf.save(`wildbears_invoices_${new Date().toISOString().slice(0, 10)}.pdf`);
    const updatedDownloaded = [...new Set([...downloaded, ...newOrders.map(o => o._id)])];
    localStorage.setItem('downloadedOrders', JSON.stringify(updatedDownloaded));
    toast.success(`Downloaded ${newOrders.length} invoice(s)`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-gray-800">Order Management</h3>
          <p className="text-sm text-gray-500 mt-1">Monitor, process, and track your store orders</p>
        </div>
        <button
          onClick={downloadNewOrdersPDF}
          className="px-5 py-2.5 bg-[#6B4E2E] text-white rounded-xl text-sm font-bold tracking-wide hover:bg-[#5a4225] transition-colors shadow-md shadow-[#6B4E2E]/20 whitespace-nowrap"
        >
          DOWNLOAD PENDING INVOICES
        </button>
      </div>

      {/* ================= FILTER PANEL ================= */}
      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col lg:flex-row gap-6 mb-8">
        
        <div className="flex-1">
           <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Search Orders</label>
           <input
             type="text"
             placeholder="Search by Order ID..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-[#6B4E2E] transition-all"
           />
        </div>

        <div>
           <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Payment Status</label>
           <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0">
             {['All', 'Paid', 'Pending', 'COD'].map(tab => (
               <button
                 key={tab}
                 onClick={() => setStatusFilter(tab)}
                 className={`px-4 xl:px-6 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                   statusFilter === tab 
                     ? (tab === 'Paid' ? 'bg-green-100 text-green-700' : tab === 'Pending' ? 'bg-orange-100 text-orange-700' : tab === 'COD' ? 'bg-red-100 text-red-700' : 'bg-gray-200 text-gray-900')
                     : 'text-gray-500 hover:bg-gray-50'
                 }`}
               >
                 {tab}
               </button>
             ))}
           </div>
        </div>

        <div>
           <label className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 block">Order Type</label>
           <div className="flex bg-white border border-gray-200 rounded-lg overflow-hidden shrink-0">
             <button
                onClick={() => setShowPreOrder(null)}
                className={`px-4 py-2.5 text-sm font-semibold transition-colors ${showPreOrder === null ? 'bg-[#6B4E2E] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                All
             </button>
             <button
                onClick={() => setShowPreOrder(false)}
                className={`px-4 py-2.5 text-sm font-semibold transition-colors ${showPreOrder === false ? 'bg-[#6B4E2E] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                Normal
             </button>
             <button
                onClick={() => setShowPreOrder(true)}
                className={`px-4 py-2.5 text-sm font-semibold transition-colors ${showPreOrder === true ? 'bg-yellow-400 text-yellow-900' : 'text-gray-500 hover:bg-gray-50'}`}
             >
                Pre-Order
             </button>
           </div>
        </div>

      </div>

      {/* ================= TABLE LIST ================= */}
      <div className="space-y-4">
        {filteredOrders.length > 0 ? filteredOrders.map(order => (
          <div
            key={order._id}
            className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-6 bg-white border border-gray-200 rounded-xl p-6 transition-shadow shadow-sm hover:shadow-md"
          >
            {/* COLUMN 1: Items & Address */}
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center shrink-0 border border-gray-100">
                  <img className="w-6" src={assets.parcel_icon} alt="parcel" />
               </div>
               <div>
                  <h4 className="font-bold text-gray-800 text-base mb-2">Order Items ({order.items.length})</h4>
                  <ul className="space-y-1 mb-4">
                     {order.items.map((item, i) => (
                        <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#6B4E2E]"></span>
                           <span className="font-medium text-gray-800">{item.name}</span> 
                           x {item.quantity} (Size: {item.size})
                        </li>
                     ))}
                  </ul>

                  <h4 className="font-bold text-gray-800 text-xs uppercase tracking-wide mb-1">Shipping To</h4>
                  <p className="text-sm font-medium text-gray-700">{order.address?.firstName} {order.address?.lastName}</p>
                  <p className="text-sm text-gray-500">{order.address?.street}, {order.address?.city}, {order.address?.state} {order.address?.pincode}</p>
                  <p className="text-sm text-gray-500">{order.address?.phone}</p>
               </div>
            </div>

            {/* COLUMN 2: Meta */}
            <div className="flex flex-col justify-center space-y-2">
               <div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">ID</span>
                 <span className="text-sm font-medium text-gray-800 font-mono">{order._id.slice(-8).toUpperCase()}</span>
               </div>
               <div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Date</span>
                 <span className="text-sm font-medium text-gray-800">{new Date(order.date).toLocaleDateString()}</span>
               </div>
               <div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Method</span>
                 <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                    order.paymentMethod === 'COD' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                 }`}>{order.paymentMethod}</span>
               </div>
               <div>
                 <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Paid</span>
                 <span className={`inline-flex px-2 py-0.5 rounded text-xs font-bold ${
                    order.payment ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                 }`}>{order.payment ? 'Yes' : 'No'}</span>
               </div>
            </div>

            {/* COLUMN 3: Price */}
            <div className="flex items-center lg:justify-center">
              <span className="text-3xl lg:text-2xl font-black text-[#6B4E2E] tracking-tight">{currency}{order.amount}</span>
            </div>

            {/* COLUMN 4: Status Action */}
            <div className="flex items-center justify-end">
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(e, order._id)}
                className="w-full max-w-[200px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl font-bold text-gray-700 focus:ring-2 focus:ring-[#6B4E2E] outline-none cursor-pointer"
              >
                {["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"].map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        )) : (
          <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-500 font-medium">No orders found matching these exact criteria.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Orders;
