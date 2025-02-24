import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";




export let cartContext=createContext();


export default function CartContextProvider({children}){
    const [numOfCartItems,setNumOfCartItems]=useState(0);
    const [cartId,setCartId]=useState('');
    const [cartDetails,setCartDetails]=useState(0);
    const {token}=useContext(tokenContext)
    const API_URl=`https://ecommerce.routemisr.com/api/v1/cart`
    const Order_API=`https://ecommerce.routemisr.com/api/v1/orders`
    const headers={
        token
    };
    
    async function addToCart(productId) {
            
            const {data} = await axios.post(API_URl,{productId},{
                headers
            });
            if(data.status=="success"){
                setNumOfCartItems(data.numOfCartItems)
            }
            getCart()
            return data;   
    }

    async function getCart() {
            const {data} = await axios.get(API_URl,{
                headers
            });
            
            if(data.status=="success"){
                setNumOfCartItems(data.numOfCartItems)
            }
            setCartDetails(data)
            setCartId(data.cartId)
            return data;
        
    }

    async function removeProduct(id) {
        const {data} = await axios.delete(`${API_URl}/${id}`,{
            headers
        });        
        if(data.status=="success"){
            setNumOfCartItems(data.numOfCartItems)
            toast("Product is deleted",{type:'success',theme:'dark',position:'bottom-right'})
        }
        setCartDetails(data)
        return data;
    }


    async function updateCount(id,count) {
        const {data} = await axios.put(`${API_URl}/${id}`,{count},{
            headers
        });
        
        if(data.status=="success"){
            setNumOfCartItems(data.numOfCartItems)
            toast("Product is updated",{type:'success',theme:'dark',position:'bottom-right'})
        }
        setCartDetails(data)
        return data;
    }

    async function cashOnDelivery(shippingAddress) {
        const {data} = await axios.post(`${Order_API}/${cartId}`,{shippingAddress},{
            headers
        });
        if(data.status=="success"){
            getCart()
        }
        
        return data;
    }

    async function onlinePayment(shippingAddress) {
        const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,{shippingAddress},{
            headers
        });
        return data;
    }

    async function getUserOrder(userId) {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
        return data;
    }


    useEffect(() => {
        token && getCart()
    
        }, [token]);


    return(
        <cartContext.Provider value={{numOfCartItems,setNumOfCartItems,addToCart,getCart,cartDetails,setCartDetails,removeProduct,updateCount,cashOnDelivery,onlinePayment,getUserOrder}}>
            {children}
        </cartContext.Provider>
    )

}


