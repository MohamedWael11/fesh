import React, { useContext, useEffect, useState } from 'react'
import styles from './NavBar.module.css'
import logo from '../../assets/images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { counterContext } from '../../context/counterContext'
import { tokenContext } from '../../context/tokenContext'
import { cartContext } from '../../context/cartContext'


export default function NavBar() {

    let navigate=useNavigate()

    let{numOfCartItems}=useContext(cartContext)
    let {token,setToken}=useContext(tokenContext)


function logOut(){
  
  localStorage.removeItem("userToken")
  
  setToken(null)
  
  navigate("/login")
}

    useEffect(()=>{

    },[])

return (
    

<nav className="bg-white border-gray-200 dark:bg-gray-900">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <div className="flex items-center gap-4">
    <Link to={'/'} className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src={logo} className='200px' alt="" />
    </Link>
    <div className="hidden  w-full md:block md:w-auto absolute md:relative md:top-0 top-[90px] left-0 bg-white  z-50" id="navbar-default">
      {token?<ul className="font-medium flex flex-col  items-centerp-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li>
          
          <NavLink to={''} className="block py-2 px-3   rounded-sm   md:p-0 dark:text-white md:dark:text-blue-500" aria-current="page">Home</NavLink>
        </li>
        <li>
          <NavLink to={'cart'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Cart</NavLink>
        </li>
        <li>
          <NavLink to={'products'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Prodects</NavLink>
        </li>
        <li>
          <NavLink to={'categories'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Categories</NavLink>
        </li>
        <li>
          <NavLink to={'brands'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Brands</NavLink>
        </li>
        <li>
          <NavLink to={'wishlist'} className="block py-2 px-3 text-gray-900 rounded-sm   md:border-0  md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Wishlist</NavLink>
        </li>
      </ul>:'' }
      
    </div>
    </div>

    <div className="flex gap-3">
        <ul className='flex gap-8'>
          {token ?
          <>
            <li>
                <Link to={'cart'} >
                <i  className="fa-solid fa-cart-shopping fs-5 text-xl"></i>
                <span className='px-2 py-[3px] mx-1 rounded-md border-spacing-1 bg-blue-200'>
                {numOfCartItems}
                </span>
                </Link>
            </li>
          <li>
                <span  onClick={logOut}>Log out</span>
            </li>
            </>
            :<><li>
                <NavLink to={'register'}>Register</NavLink>
            </li>
            <li>
                <NavLink to={'login'}>Login</NavLink>
            </li></>}
        </ul>
    </div>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>
    
</div>
</nav>


)

}
