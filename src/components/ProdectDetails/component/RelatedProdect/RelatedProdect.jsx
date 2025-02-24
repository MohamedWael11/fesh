import React, { useEffect, useState } from 'react'
import styles from './RelatedProdect.module.css'
import axios from 'axios';
import ProdectItem from '../../../Shared/ProdectItem/ProdectItem';


export default function RelatedProdect(props) {

    let {categaryId}= props
    
    
    let [relatedProdect,setrelatedProdect]=useState([])

    function getProdect(){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data})=>{
            
        let res =data.data.filter(prodect => prodect.category._id == categaryId)
            setrelatedProdect(res);
        })
        .catch(err=>{
            console.log(err);
            
        })
    }

    useEffect(() => {
        getProdect()
    }, []);

return (
    <div className='container main-layout mb-8 px-5'>
        {relatedProdect.map(prodect => <ProdectItem key={prodect.id} prodect={prodect} />)}
        
    </div>
)

}
