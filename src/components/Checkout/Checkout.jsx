import React, { useContext, useEffect, useState } from 'react'
import styles from './Checkout.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { BarLoader } from 'react-spinners'
import { cartContext } from '../../context/cartContext'


export default function Checkout() {

    const [iscalling, setiscalling] = useState(false)
    const [apierror, setapierror] = useState(null)
    const [isOnline, setIsonline] = useState(null)
    let {cashOnDelivery,onlinePayment}=useContext(cartContext)



    const initialValues = {
        details: '',
        phone: '',
        city:'',
    }

    const validationSchema = Yup.object().shape({

        details: Yup.string().required("Required"),
        phone: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
    })


    async function callPay(values) {
        try {
            setiscalling(true)
            if(isOnline){
                let x=await onlinePayment(values)
                console.log(x);
                window.location.href=x.session.url;
            }else{
                let x= await cashOnDelivery(values)
                console.log(x);
            }
            
        
        } catch (error) {
            setiscalling(false)
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: callPay
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto my-6">
                <h1 className="mb-6 text-3xl uppercase">Shipping Info:</h1>
                {apierror ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apierror}
                </div> : ''}

                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input onBlur={formik.handleBlur} type="text" name="details" value={formik.values.details} onChange={formik.handleChange} id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">details:</label>

                    {formik.errors.details && formik.touched.details ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.details}
                    </div> : ''}
                </div>
                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input onBlur={formik.handleBlur} type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} id="floating_phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">phone:</label>

                    {formik.errors.phone && formik.touched.phone ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.phone}
                    </div>
                    : ''}
                </div>

                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input onBlur={formik.handleBlur} type="text" name="city" value={formik.values.city} onChange={formik.handleChange} id="floating_city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label htmlFor="floating_city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">city:</label>

                    {formik.errors.city && formik.touched.city ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.city}
                    </div>
                    : ''}
                </div>

                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input type="checkbox" value={'online'} onChange={()=> setIsonline(true)} />
                    <label htmlFor="" className='mx-3'>Online</label>
                </div>
                
                {iscalling ? <div className='flex justify-end'>
                    <BarLoader color='#0aad0a' />
                </div> : 
                    <button type="submit" className="text-white ms-auto block hover:opacity-80 bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Pay now</button>
                }
            </form>


        </div>
    )

}
