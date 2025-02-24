import React, { useContext, useEffect, useState } from 'react'
import styles from './ProdectItem.module.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { cartContext } from '../../../context/cartContext';
import { favoritContext } from '../../../context/favoritContext';


export default function ProdectItem(props) {
    

    let{imageCover,title,category,price,ratingsAverage,id}=props.prodect
    let { addToCart, getCart } = useContext(cartContext);
    let {addToFavorit,removeProduct,getFavorit}=useContext(favoritContext)
    const [isExist,setIsExsist]=useState([])


    async function addProductToCart(id) {
        let data = await addToCart(id);
        if (data.status === "success") {
        toast("Product added successfully!", { type: "success", theme: "dark", position: "bottom-right" });
        }
        getCart();
    }

    async function addToWashList(id) {
        let {data} =await addToFavorit(id)
        if (data.status === "success") {
            toast(data.message, { type: "success", theme: "dark", position: "bottom-right" });
        }
        setIsExsist(data)
        console.log(isExist);
        
        console.log(data);
        
    }

    async function toggleWishList(id) {
        try {
            if (isExist.includes(id)) {
                
                setIsExsist(prevList => prevList.filter(item => item !== id));
    
                let { data } = await removeProduct(id);
                toast("Removed from wishlist", { type: "error", theme: "dark", position: "bottom-right" });
    
            } else {
                
                setIsExsist(prevList => [...prevList, id]);
    
                let { data } = await addToFavorit(id);
                toast("Added to wishlist", { type: "success", theme: "dark", position: "bottom-right" });
            }
        } catch (error) {
            console.error("Error toggling wishlist:", error);
        }
    }
    
    

    useEffect(() => {
        async function fetchWishlist() {
            let data = await getFavorit();
            if (data && data.data) {
                setIsExsist(data.data.map(item => item.id) || []);  
            } else {
                setIsExsist([]); 
            }
        }
        fetchWishlist();
    }, []);
    

    
return (
    
<div className="mt-8 md:w-1/2 lg:w-1/6 px-2 mb-3 border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">   
        <div className="product ">
        <Link to={`/productDetails/${id}/${category._id}`}>
            <img src={imageCover} className='mb-2' alt="" />
            <span className='text-main mb-3'>{category.name}</span>
            <h2 className='mb-2 font-bold'>{title.split(" ").splice(0,2).join(" ")}</h2>
            <div className="flex justify-between mb-4">
                <p>{price}$</p>
                <div className='flex justify-between items-center gap-x-2'>
                <i 
  onClick={(e) => { e.preventDefault(); if (isExist) toggleWishList(id); }} 
  className={`fa w-[25%] fa-heart fa-xl ps-5 ${isExist?.includes(id) ? 'text-red-500' : 'text-black'}`}>
</i>
                <p>
                    <i className='fa fa-star rating-color'></i>
                    {ratingsAverage}</p>
                </div>
                
            </div>
            </Link>
            <button onClick={()=>addProductToCart(id)} className='btn w-[75%] bg-main p-2 text-center text-white rounded-md '>Add to cart</button>
        </div>
    </div>

)

}
