import React, { useContext, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import axios from 'axios'
import BarLoader from './../../../node_modules/react-spinners/esm/BarLoader';
import { tokenContext } from './../../context/tokenContext';

export default function Login() {

    const [iscalling, setiscalling] = useState(false)
    const [apierror, setapierror] = useState(null)
    let { setToken } = useContext(tokenContext)

    let navegate = useNavigate()

    const initialValues = {
        email: '',
        password: '',
    }

    const validationSchema = Yup.object().shape({

        email: Yup.string().email("Invalid email").required("Required"),
        password: Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'), 'Invalid password').required("Required"),

    })


    async function calllogin(values) {
        try {
            setiscalling(true)
            setapierror(null)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
            console.log(data);
            localStorage.setItem("userToken", data.token)
            setToken(data.token)
            setiscalling(false)
            navegate("/")
        } catch (error) {
            setapierror(error.response.data.message)
            setiscalling(false)
        }
    }


    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: calllogin
    })


    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto my-6">
                <h1 className="mb-6 text-3xl uppercase">login now:</h1>
                {apierror ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apierror}
                </div> : ''}

                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email} onChange={formik.handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email:</label>

                    {formik.errors.email && formik.touched.email ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.email}
                    </div> : ''}
                </div>
                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input onBlur={formik.handleBlur} type="password" name="password" value={formik.values.password} onChange={formik.handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>

                    {formik.errors.password && formik.touched.password ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.password}
                    </div>
                    : ''}
                </div>
                
                {iscalling ? <div className='flex justify-end'>
                    <BarLoader color='#0aad0a' />
                </div> : 
                    <button type="submit" className="text-white ms-auto block hover:opacity-80 bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Login</button>
                }
                    <Link className=' inline-block  text-black  mb-4 mx-5 p-2  ms-auto' to={'/forgetPassword'}>forget Password ?</Link>
            </form>


        </div>
    )

}


// baby@gmail.com