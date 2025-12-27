// // import React, { useEffect, useState, useMemo } from 'react'
// // import axios from 'axios'
// // import { backendUrl, currency } from '../App'
// // import { toast } from 'react-toastify'
// // import { assets } from '../assets/assets'

// // const Orders = ({ token }) => {
// //   const [orders, setOrders] = useState([])
// //   const [searchQuery, setSearchQuery] = useState('')
// //   const [showPaid, setShowPaid] = useState(true)
// //   const [showPreOrder, setShowPreOrder] = useState(null) // null = all, true = pre-order, false = normal

// //   useEffect(() => {
// //     const fetchAllOrders = async () => {
// //       if (!token) return
// //       try {
// //         const { data } = await axios.post(`${backendUrl}/api/order/list`, {}, { headers: { token } })
// //         if (data.success) setOrders(data.orders.reverse())
// //         else toast.error(data.message)
// //       } catch (error) {
// //         toast.error(error.message)
// //       }
// //     }
// //     fetchAllOrders()
// //   }, [token])

// //   const handleStatusChange = async (event, orderId) => {
// //     const status = event.target.value
// //     try {
// //       const { data } = await axios.post(
// //         `${backendUrl}/api/order/status`,
// //         { orderId, status },
// //         { headers: { token } }
// //       )
// //       if (data.success) {
// //         setOrders(prev => prev.map(order =>
// //           order._id === orderId ? { ...order, status } : order
// //         ))
// //       }
// //     } catch (error) {
// //       toast.error("Failed to update status.")
// //     }
// //   }

// //   const filteredOrders = useMemo(() => {
// //     return orders
// //       .filter(order => order.payment === showPaid)
// //       .filter(order => order._id.toLowerCase().includes(searchQuery.toLowerCase()))
// //       .filter(order => {
// //         if (showPreOrder === null) return true
// //         return showPreOrder
// //           ? order.items.some(item => item.isPreOrder)
// //           : order.items.every(item => !item.isPreOrder)
// //       })
// //   }, [orders, showPaid, searchQuery, showPreOrder])

// //   const renderAddress = (address = {}) => (
// //     <>
// //       <p className="font-medium">{address.firstName} {address.lastName}</p>
// //       <p>{address.street},</p>
// //       <p>{address.city}-{address.pincode}, {address.state}, {address.country}</p>
// //       <p>{address.email}</p>
// //       <p>{address.phone}</p>
// //     </>
// //   )

// //   const renderItems = (items = []) => items.map((item, idx) => (
// //     <div key={idx} className="mb-3 p-2 bg-gray-50 rounded-md">
// //       <p className="font-bold">{item.name}</p>
// //       <p className="ml-2"><span className="font-semibold">Qty:</span> {item.quantity}</p>
// //       <p className="ml-2"><span className="font-semibold">Size:</span> {item.size}</p>
// //       {item.isPreOrder && (
// //         <p className="ml-2 mt-1">
// //           <span className="bg-red-100 text-red-600 px-2 py-0.5 rounded-md text-xs font-semibold">
// //             Pre-Order
// //           </span>
// //         </p>
// //       )}
// //     </div>
// //   ))

// //   return (
// //     <div>
// //       <h3 className="text-xl font-semibold mb-4">Order Page</h3>

// //       <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
// //         <input
// //           type="text"
// //           placeholder="Search by Order ID"
// //           value={searchQuery}
// //           onChange={(e) => setSearchQuery(e.target.value)}
// //           className="p-2 w-full sm:w-1/2 border border-gray-400 rounded-md"
// //         />

// //         <div className="flex flex-wrap gap-2">
// //           <button
// //             onClick={() => setShowPaid(prev => !prev)}
// //             className={`px-4 py-2 rounded-md text-sm font-semibold border ${showPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
// //           >
// //             {showPaid ? 'Showing Paid Orders' : 'Showing Unpaid Orders'}
// //           </button>

// //           <button
// //             onClick={() => setShowPreOrder(null)}
// //             className={`px-3 py-1 rounded-md border text-sm font-medium ${showPreOrder === null ? 'bg-blue-100 text-blue-700' : 'bg-white text-gray-700'}`}
// //           >
// //             All Orders
// //           </button>

// //           <button
// //             onClick={() => setShowPreOrder(true)}
// //             className={`px-3 py-1 rounded-md border text-sm font-medium ${showPreOrder === true ? 'bg-yellow-100 text-yellow-800' : 'bg-white text-gray-700'}`}
// //           >
// //             Pre-Orders
// //           </button>

// //           <button
// //             onClick={() => setShowPreOrder(false)}
// //             className={`px-3 py-1 rounded-md border text-sm font-medium ${showPreOrder === false ? 'bg-gray-100 text-gray-800' : 'bg-white text-gray-700'}`}
// //           >
// //             Normal Orders
// //           </button>
// //         </div>
// //       </div>

// //       {filteredOrders.length > 0 ? filteredOrders.map((order) => (
// //         <div
// //           key={order._id}
// //           className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-500 p-5 md:p-8 my-3 md:my-4 text-sm text-gray-700"
// //         >
// //           <img className="w-12" src={assets.parcel_icon} alt="parcel" />

// //           <div>
// //             <p><strong>Order Items:</strong></p>
// //             {renderItems(order.items)}
// //             <p className="mt-2"><strong>Customer Details:</strong></p>
// //             <div className="mt-1 mb-2">{renderAddress(order.address)}</div>
// //           </div>

// //           <div>
// //             <p>Items: {order.items.length}</p>
// //             <p>Total Qty: {order.items.reduce((sum, i) => sum + i.quantity, 0)}</p>
// //             <p className="mt-3">Method: {order.paymentMethod}</p>
// //             <p>Payment: {order.payment ? 'Done' : 'Pending'}</p>
// //             <p>Date: {new Date(order.date).toLocaleDateString()}</p>
// //           </div>

// //           <p className="text-5xl sm:text-[15px] font-bold">{currency}{order.amount}</p>
// //           <p>Order ID: {order._id}</p>


// //           <select
// //             value={order.status}
// //             onChange={(e) => handleStatusChange(e, order._id)}
// //             className="p-2 font-semibold"
// //           >
// //             {["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"].map(status => (
// //               <option key={status} value={status}>{status}</option>
// //             ))}
// //           </select>
// //         </div>
// //       )) : (
// //         <p className="text-gray-500 mt-4">No {showPaid ? 'paid' : 'unpaid'} orders match the selected filters.</p>
// //       )}
// //     </div>
// //   )
// // }

// // export default Orders

import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'
import jsPDF from 'jspdf'
import QRCode from 'qrcode'

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [showPaid, setShowPaid] = useState(true)
  const [showPreOrder, setShowPreOrder] = useState(null)
  // const {currency} = '₹'

  // ================= FETCH ORDERS =================
  useEffect(() => {
    const fetchAllOrders = async () => {
      if (!token) return
      try {
        const { data } = await axios.post(
          `${backendUrl}/api/order/list`,
          {},
          { headers: { token } }
        )
        if (data.success) setOrders(data.orders.reverse())
        else toast.error(data.message)
      } catch (error) {
        toast.error(error.message)
      }
    }
    fetchAllOrders()
  }, [token])

  // ================= FILTERED ORDERS =================
  const filteredOrders = useMemo(() => {
    return orders
      .filter(order => order.payment === showPaid)
      .filter(order => order._id.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter(order => {
        if (showPreOrder === null) return true
        return showPreOrder
          ? order.items.some(item => item.isPreOrder)
          : order.items.every(item => !item.isPreOrder)
      })
  }, [orders, showPaid, searchQuery, showPreOrder])

  // ================= DOWNLOAD PDF =================
  const downloadNewOrdersPDF = async () => {
  const downloaded = JSON.parse(localStorage.getItem('downloadedOrders')) || []

  const newOrders = filteredOrders.filter(
    order => !downloaded.includes(order._id)
  )

  if (newOrders.length === 0) {
    toast.info('No new orders to download')
    return
  }

  const pdf = new jsPDF('p', 'mm', 'a4')
  const PAGE_WIDTH = 210
  const MARGIN = 15

  for (let index = 0; index < newOrders.length; index++) {
    const order = newOrders[index]
    if (index > 0) pdf.addPage()

    let y = 20

    /* ================= HEADER ================= */
    pdf.setFont('helvetica', 'bold')
    pdf.setFontSize(20)
    pdf.text('INVOICE', MARGIN, y)

    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Invoice Date: ${new Date(order.date).toLocaleDateString()}`, PAGE_WIDTH - MARGIN, y, { align: 'right' })

    y += 10
    pdf.setDrawColor(180)
    pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)

    /* ================= ORDER & QR ================= */
    y += 8
    pdf.setFontSize(11)
    pdf.text(`Order ID: ${order._id}`, MARGIN, y)

    const qrData = await QRCode.toDataURL(order._id)
    pdf.addImage(qrData, 'PNG', PAGE_WIDTH - MARGIN - 32, y - 6, 28, 28)

    /* ================= BILL TO ================= */
    y += 10
    pdf.setFont('helvetica', 'bold')
    pdf.text('Bill To:', MARGIN, y)

    pdf.setFont('helvetica', 'normal')
    y += 6
    pdf.text(`${order.address?.firstName} ${order.address?.lastName}`, MARGIN, y)
    y += 5
    pdf.text(order.address?.street || '', MARGIN, y)
    y += 5
    pdf.text(
      `${order.address?.city} - ${order.address?.pincode}, ${order.address?.state}`,
      MARGIN,
      y
    )
    y += 5
    pdf.text(order.address?.country || '', MARGIN, y)
    y += 5
    pdf.text(`Phone: ${order.address?.phone}`, MARGIN, y)
    y += 5
    pdf.text(`Email: ${order.address?.email}`, MARGIN, y)

    /* ================= PAYMENT INFO ================= */
    y += 10
    pdf.setFont('helvetica', 'bold')
    pdf.text('Payment Details:', MARGIN, y)

    pdf.setFont('helvetica', 'normal')
    y += 6
    pdf.text(`Payment Method: ${order.paymentMethod}`, MARGIN, y)
    y += 5
    pdf.text(`Payment Status: ${order.payment ? 'Paid' : 'Pending'}`, MARGIN, y)

    /* ================= ITEMS TABLE ================= */
    y += 12
    pdf.setFont('helvetica', 'bold')
    pdf.text('Items', MARGIN, y)

    y += 5
    pdf.setDrawColor(150)
    pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 6

    pdf.setFontSize(10)
    pdf.text('Product', MARGIN, y)
    pdf.text('Qty', PAGE_WIDTH - 70, y)
    pdf.text('Size', PAGE_WIDTH - 50, y)
    pdf.text('Type', PAGE_WIDTH - 30, y)

    y += 4
    pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    y += 6

    pdf.setFont('helvetica', 'normal')

    order.items.forEach(item => {
      pdf.text(item.name, MARGIN, y)
      pdf.text(String(item.quantity), PAGE_WIDTH - 70, y)
      pdf.text(item.size, PAGE_WIDTH - 50, y)
      pdf.text(item.isPreOrder ? 'Pre-Order' : 'Normal', PAGE_WIDTH - 30, y)
      y += 6
    })

    /* ================= TOTAL ================= */
    // y += 8
    // pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
    // y += 8

    // pdf.setFont('helvetica', 'bold')
    // pdf.setFontSize(12)
    // pdf.text(`Total Amount: ${currency}${order.amount}`, PAGE_WIDTH - MARGIN, y, { align: 'left' })
    pdf.setDrawColor(0)
pdf.line(MARGIN, y, PAGE_WIDTH - MARGIN, y)
y += 10

pdf.setFont('helvetica', 'bold')
pdf.setFontSize(16)
pdf.setTextColor(0, 0, 0) // DARK BLACK

pdf.text(
  `TOTAL AMOUNT: ${currency}${order.amount}`,
  PAGE_WIDTH / 2,
  y,
  { align: 'center' }
)


    /* ================= FOOTER ================= */
    pdf.setFontSize(9)
    pdf.setFont('helvetica', 'normal')
    pdf.setTextColor(120)
    pdf.text(
      'Thank you for shopping with WILDBEARS',
      PAGE_WIDTH / 2,
      285,
      { align: 'center' }
    )
  }

  pdf.save(`wildbears_invoices_${new Date().toISOString().slice(0, 10)}.pdf`)

  const updatedDownloaded = [
    ...new Set([...downloaded, ...newOrders.map(o => o._id)])
  ]
  localStorage.setItem('downloadedOrders', JSON.stringify(updatedDownloaded))

  toast.success(`Downloaded ${newOrders.length} invoice(s)`)
}

  // ================= STATUS CHANGE =================
  const handleStatusChange = async (event, orderId) => {
    const status = event.target.value
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/order/status`,
        { orderId, status },
        { headers: { token } }
      )
      if (data.success) {
        setOrders(prev =>
          prev.map(order =>
            order._id === orderId ? { ...order, status } : order
          )
        )
      }
    } catch {
      toast.error("Failed to update status.")
    }
  }

  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Order Page</h3>

      {/* ================= TOP SECTION ================= */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Order ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 w-full sm:w-1/2 border border-gray-400 rounded-md"
        />

        <button
          onClick={downloadNewOrdersPDF}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-semibold"
        >
          Download New Orders PDF
        </button>
      </div>

      {/* ================= FILTER BUTTONS (UNCHANGED) ================= */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setShowPaid(prev => !prev)}
          className={`px-4 py-2 rounded-md text-sm font-semibold border ${
            showPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {showPaid ? 'Showing Paid Orders' : 'Showing Unpaid Orders'}
        </button>

        <button
          onClick={() => setShowPreOrder(null)}
          className={`px-3 py-1 rounded-md border text-sm ${
            showPreOrder === null ? 'bg-blue-100 text-blue-700' : ''
          }`}
        >
          All Orders
        </button>

        <button
          onClick={() => setShowPreOrder(true)}
          className={`px-3 py-1 rounded-md border text-sm ${
            showPreOrder === true ? 'bg-yellow-100 text-yellow-800' : ''
          }`}
        >
          Pre-Orders
        </button>

        <button
          onClick={() => setShowPreOrder(false)}
          className={`px-3 py-1 rounded-md border text-sm ${
            showPreOrder === false ? 'bg-gray-100 text-gray-800' : ''
          }`}
        >
          Normal Orders
        </button>
      </div>

      {/* ================= ORDERS LIST (UNCHANGED) ================= */}
      {filteredOrders.length > 0 ? filteredOrders.map(order => (
        <div
          key={order._id}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr]
          gap-3 border-2 border-gray-500 p-5 my-4 text-sm"
        >
          <img className="w-12" src={assets.parcel_icon} alt="parcel" />

          <div>
            <p className="font-bold">Order Items:</p>
            {order.items.map((item, i) => (
              <p key={i}>• {item.name} × {item.quantity}</p>
            ))}
          </div>

          <p className="font-bold">{currency}{order.amount}</p>

          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e, order._id)}
            className="p-2 font-semibold"
          >
            {["Order Placed", "Packing", "Shipped", "Out for delivery", "Delivered"].map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      )) : (
        <p className="text-gray-500 mt-4">No orders found.</p>
      )}
    </div>
  )
}

export default Orders
