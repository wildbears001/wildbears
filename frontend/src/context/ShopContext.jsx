import React,{ createContext, useEffect, useState } from "react";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios'


export const ShopContext = createContext();

const ShopContextProvider = (props)=>{
    const currency = '₹ ';
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [delivery_fee, setDeliveryFee] = useState(69);
    const [free_delivery_threshold, setFreeDeliveryThreshold] = useState(500);
    const [search,setSearch] = useState('');
    const [showSearch,setShowSearch] = useState(false);
    const [cartItems,setCartItems] = useState({});
    const [products,setProducts] = useState([])
    const [uiElements, setUiElements] = useState([])
    const [token,setToken] = useState('')
    const navigate = useNavigate();

    const addTOCart = async (itemId,size)=>{

        if (!size) {
            toast.error('Select Product Size');
            return;
        }


        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if (cartData[itemId][size]) {
                cartData[itemId][size] +=1;

            }
            else{
                cartData[itemId][size] = 1;

            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }
        toast.success("Item Added To Cart");
                setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }

    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for( const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0){
                        totalCount+=cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }
      
      // useEffect(()=>{
    //      console.log(cartItems);
         
    // },[cartItems])

    const updateQuantity = async (itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)

        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }

    }
    
    const getCartAmount  =  ()=>{
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=> product._id === items);
            for(const item in cartItems[items]){
                try {
                    if(cartItems[items][item]>0 ){
                         totalAmount += itemInfo.price *( cartItems[items][item]);
                    }
                } catch (error) {
                    
                }
            }
        }        return totalAmount;
        
       try {
            if(totalAmount < delivery_fee){
                return totalAmount;

            }
        } catch (error) {
            
        }        
        }

    const getProductsData = async ()=>{
        try {
            const response = await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }else{
                toast.error(response.data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getUserCart = async(token)=>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}})
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const getUIElementsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/ui/list');
            if (response.data.success) {
                setUiElements(response.data.uiElements);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getSettingsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/settings/get');
            if (response.data.success) {
                setDeliveryFee(response.data.settings.deliveryFee || 0);
                setFreeDeliveryThreshold(response.data.settings.freeDeliveryThreshold || 0);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getProductsData()
        getUIElementsData()
        getSettingsData()
    },[])

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    },[])


    const value = {
        products,currency,delivery_fee,free_delivery_threshold,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addTOCart,setCartItems,
        getCartCount,updateQuantity,
        getCartAmount,navigate,backendUrl,
        setToken,token,
        uiElements
    }
    return (
        <ShopContext.Provider value={value}>
            {
               props.children 
            }
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;

