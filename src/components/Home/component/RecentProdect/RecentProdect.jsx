import React, { useContext, useEffect, useState } from 'react'
import styles from './RecentProdect.module.css'
import axios from 'axios'
import ProdectItem from '../../../Shared/ProdectItem/ProdectItem'
import Loader from '../../../Shared/Loader/Loader'
import { cartContext } from '../../../../context/cartContext'
import { toast } from 'react-toastify'



export default function RecentProdect() {

    
    let [prodects,setProdects]=useState([])
    let {addToCart}=useContext(cartContext)

    function getProdect(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data})=>{
            setProdects(data.data)
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

async  function addProdectToCart(id){
        let data=await addToCart(id)
        console.log(data);
        if(data.status=="success"){
            toast(data.message,{type:'success',theme:'dark',position:'bottom-right'})
        }
        
    }

    useEffect(() => {
        getProdect()
    }, []);

return (
    <>
    {prodects.length!=0 &&<div className='container main-layout mb-8 lg:px-10 shadow'>
        
        {prodects.map(prodect => <ProdectItem key={prodect.id} addProdectToCart = {addProdectToCart} prodect={prodect} />)}
        
    </div>}
    
    {prodects.length==0 && <Loader/>}
    </>
    
)

}
