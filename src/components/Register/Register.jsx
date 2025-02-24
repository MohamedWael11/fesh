import React, { useEffect, useState } from 'react'
import styles from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import BarLoader from './../../../node_modules/react-spinners/esm/BarLoader';
import { useNavigate } from 'react-router-dom'


export default function Register() {

    const [count, setCount] = useState(0)
    const [iscalling, setiscalling] = useState(false)
    const [apierror, setapierror] = useState(null)

    let navegate=useNavigate()

    const initialValues={
      name:'',
      email:'',
      phone:'',
      password:'',
      rePassword:'',
    }

    const validationSchema=Yup.object().shape({
      name:Yup.string().min(3,"min length is 3").max(15,"max length is 15").required("Required"),
      email:Yup.string().email("Invalid email").required("Required"),
      password:Yup.string().matches(new RegExp('^[A-Z][a-z0-9]{3,8}$'),'Invalid password').required("Required"),
      rePassword:Yup.string().oneOf([Yup.ref('password')],'repassword should match password').required("Required"),
      phone:Yup.string().matches(new RegExp('^01[0125][0-9]{8}$'),'Invalid phone').required("Required"),
    })


    async function callRegister(values){
      try {
        setiscalling(true)
        setapierror(null)
      let {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`,values)
      console.log(data);
      setiscalling(false)
      navegate("/login")
      } catch (error) {
        setapierror(error.response.data.message)
        setiscalling(false)
      }
      }


    const formik =useFormik({
      initialValues,

      validationSchema,
      
      onSubmit:callRegister
    })

    

return (
    <div>
        

<form onSubmit={formik.handleSubmit} className="w-1/2 my-6 mx-auto">
  <h1 className="text-3xl mb-6">Registe Now:</h1>

  {apierror? <div className="p-2 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {apierror}
</div>:''}

  <div className="relative z-0 w-full mb-5 group mt-4">
    <input onBlur={formik.handleBlur} type="text" name="name" value={formik.values.name} onChange={formik.handleChange} id="floating_name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name:</label>
  
  {formik.errors.name && formik.touched.name ? <div className="p-2 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.name}
</div>:''}
  </div>
  <div className="relative z-0 w-full mb-5 group mt-2">
    <input onBlur={formik.handleBlur} type="email" name="email" value={formik.values.email}onChange={formik.handleChange}  id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">email:</label>
  
    {formik.errors.email && formik.touched.email ?  <div className="p-2 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.email}
</div>:''}
  </div>
  <div className="relative z-0 w-full mb-5 group mt-2">
    <input onBlur={formik.handleBlur} type="password" name="password" value={formik.values.password}onChange={formik.handleChange} id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password:</label>
  
    {formik.errors.password && formik.touched.password   ? <div className="p-2 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.password}
</div>:''}
  </div>
  <div className="relative z-0 w-full mb-5 group mt-2">
    <input onBlur={formik.handleBlur} type="password" name="rePassword"value={formik.values.rePassword} onChange={formik.handleChange} id="floating_repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Re-Password:</label>
  
    {formik.errors.rePassword && formik.touched.rePassword   ? <div className="p-2 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.rePassword}
</div>:''}
  </div>
  <div className="relative z-0 w-full mb-5 group mt-2">
    <input onBlur={formik.handleBlur} type="tell" name="phone"value={formik.values.phone}  id="floating_phone"onChange={formik.handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone:</label>
  
    {formik.errors.phone && formik.touched.phone  ? <div className="p-2 mb-4 mt-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  {formik.errors.phone}
</div>:''}
  </div>

  {iscalling ? <div className='flex justify-end'>
  <BarLoader color='#0aad0a' />
  </div>: <button type="submit" className="text-white ms-auto block hover:opacity-80 bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button> }


  
</form>




    </div>
)

}
