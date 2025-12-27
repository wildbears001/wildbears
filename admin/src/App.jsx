// import React, { useEffect } from 'react'
// import Navbar from './components/Navbar'
// import Sidebar from './components/Sidebar'

// import { Routes, Route } from 'react-router-dom'
// import Add from './pages/Add'
// import List from './pages/List'
// import Orders from './pages/Orders'
// import { useState } from 'react'
// import Login from './components/Login'
// import { ToastContainer } from 'react-toastify';
// import UserManagement from "./pages/UserManagement"; // ✅ Import
// import AdminCoupons from './pages/AdminCoupon'






// // export const backendUrl = import.meta.env.VITE_BACKEND_URL
// export const backendUrl =
//   import.meta.env.VITE_BACKEND_URL?.trim()
//     ? import.meta.env.VITE_BACKEND_URL
//     : "http://localhost:4000";

// export const currency = "₹ "


// const App = () => {

//   const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

//   useEffect(()=>{
//       localStorage.setItem('token',token)
//   },[token])



//   return (
//     <div className='bg-gray-50 min-h-screen'>
        
//         <ToastContainer/>
      

//       {
//         token === "" ? <Login setToken={setToken} />
//          :

//           <>

//             <Navbar setToken={setToken} />
//             <hr />
//             <div className='flex w-full'>

//               <Sidebar />

//               <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base '>

//                 <Routes>
//                   <Route path='/add' element={<Add token={token} />} />
//                   <Route path='/list' element={<List token={token} />} />
//                   <Route path='/orders' element={<Orders token={token}/>} />
//                   <Route path="/users" element={<UserManagement token={token} />} /> {/* ✅ New Route */}
//                   <Route path="/coupons" element={<AdminCoupons token={token} />} /> 


//                 </Routes>

//               </div>

//             </div>

//           </>
//       }



//     </div>
//   )
// }

// export default App



import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './components/Login'

import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import UserManagement from './pages/UserManagement'
import AdminCoupons from './pages/AdminCoupon'

// ✅ NEW PAGES
import Dashboard from './pages/Dashboard'
import Analytics from './pages/Analytics'

// ================= BACKEND URL =================
export const backendUrl =
  import.meta.env.VITE_BACKEND_URL?.trim()
    ? import.meta.env.VITE_BACKEND_URL
    : "http://localhost:4000"

export const currency = "₹ "

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem('token') ? localStorage.getItem('token') : ''
  )

  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />

      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />

          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-800 text-base">
              <Routes>
                {/* ================= DASHBOARD ================= */}
                <Route path="/" element={<Dashboard token={token} />} />
                <Route path="/dashboard" element={<Dashboard token={token} />} />
                <Route path="/analytics" element={<Analytics token={token} />} />

                {/* ================= EXISTING ROUTES ================= */}
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
                <Route path="/users" element={<UserManagement token={token} />} />
                <Route path="/coupons" element={<AdminCoupons token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default App
