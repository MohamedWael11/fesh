import React, { useEffect, useState } from 'react'
import styles from './Footer.module.css'
import footer1 from '../../assets/images/footer1.jpg'
import footer2 from '../../assets/images/footer2.jpg'

export default function Footer() {

    const [count, setCount] = useState(0)

return (
    <footer className='bg-[rgb(242,242,242)] w-full p-6'>
        <div className="container w-full ">
            <h2 className='{styles.big} text-[#212529]'>Get the freshCart App</h2>
            <p className='text-[#6d767e] mb-4 font-light'>We will send you a link, open it on your phone to download the app.</p>
            <div className="flex mb-5">
            <input  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block grow me-3   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email..." required />
                <button className='bg-main p-2 text-white rounded-md'>Share App link</button>
            </div>

            <div className="partner flex justify-between py-6 border-y-2">
                <div className="payment flex">
                    <p>Payment partners</p>
                    <img src={footer2} className='w-[130px] ms-4' alt="" />
                </div>
                <div className="app">
                    <p>get with freshcart</p>
                </div>
            </div>
        </div>
    </footer>
)

}
