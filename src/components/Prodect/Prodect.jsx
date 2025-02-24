import React, { useContext, useEffect, useState } from 'react'
import styles from './Prodect.module.css'
import { counterContext } from './../../context/counterContext';
import RecentProdect from './../Home/component/RecentProdect/RecentProdect';


export default function Prodect() {

    
    let {setCount}=useContext(counterContext)

    function changCount(){
        setCount(Math.random()*100)
    }

return (
    <div className='main-layout py-16 px-6 '>
        <RecentProdect/>
    </div>
)

}
