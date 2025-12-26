// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App  from './App'
import ShopContextProvider from './context/ShopContext.jsx'
ReactDom.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
        <ShopContextProvider>
               <App />


       </ShopContextProvider>
   
  </BrowserRouter>,
)
