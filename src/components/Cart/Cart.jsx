import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css'
import { cartContext } from '../../context/cartContext'
import { tokenContext } from '../../context/tokenContext'
import emptyImage  from '../../assets/images/empty.jpg'
import Loader from '../Shared/Loader/Loader'
import { Link } from 'react-router-dom';

export default function Cart() {

    const{cartDetails,removeProduct,updateCount}=useContext(cartContext)


    useEffect(() => {
        console.log(cartDetails);
        
    }, [cartDetails]);
    
    async function deletProdect(id){
        let data=await removeProduct(id);
        console.log(data);
        
    }

    async function updateItem(id,count){
        let data=await updateCount(id,count);
        console.log(data);
        
    }

return (
    <>
    {cartDetails ? cartDetails?.data?.products?.length == 0 ?
    <> <h3 className='text-center text-3xl py-4 text-main'>Empty Cart</h3><div className='flex items-center justify-center bg-transparent' > <img src={emptyImage}  /></div></>
    :<div className='py-6'>

<div className="flex px-5  my-7 justify-between" >
    <h2 className='text-3xl'>Total product number  : <span className='text-main'>{cartDetails?.numOfCartItems}</span></h2>
    <h2 className='text-3xl'>Total price  : <span className='text-main'>{cartDetails?.data?.totalCartPrice}</span></h2>
</div>

<div className="relative px-5 overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
<tr>
<th scope="col" className="px-16 py-3">
<span className="sr-only">Image</span>
</th>
<th scope="col" className="px-6 py-3">
Product
</th>
<th scope="col" className="px-6 py-3">
Qty
</th>
<th scope="col" className="px-6 py-3">
Price
</th>
<th scope="col" className="px-6 py-3">
Action
</th>
</tr>
</thead>
<tbody>
{cartDetails.data.products.map(product=> <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
<td className="p-4">
<img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
{product.product.title}
</td>
<td className="px-6 py-4">
<div className="flex items-center">
    <button onClick={()=> updateItem(product.product._id,product.count - 1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
    </svg>
    </button>
    <div>
        <span>
            {product.count}
        </span>
    </div>
    <button onClick={()=> updateItem(product.product._id,product.count + 1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
    <span className="sr-only">Quantity button</span>
    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
    </svg>
    </button>
</div>
</td>
<td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
{product.price}$
</td>
<td className="px-6 py-4">
<span onClick={()=> deletProdect(product.product._id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</span>
</td>
</tr>)}
</tbody>
</table>
</div>
<Link to={'/checkout'} className='bg-main rounded-md block text-center text-white my-4 mx-5 p-3  ms-auto'>Check out</Link>
</div> :<Loader/>}
    

    </>
)

}
