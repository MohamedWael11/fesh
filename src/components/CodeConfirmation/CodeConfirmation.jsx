import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import BarLoader from './../../../node_modules/react-spinners/esm/BarLoader';
import { useNavigate } from 'react-router-dom'

function CodeConfirmation() {
    const [iscalling, setiscalling] = useState(false)
    const [apierror, setapierror] = useState(null)

    let navegate = useNavigate()

    const initialValues = {
        resetCode: '',
    }

    const validationSchema = Yup.object().shape({
        resetCode: Yup.number()
    })

    async function callverifyCode(values) {
        try {
            setiscalling(true)
            setapierror(null)
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
            setiscalling(false)
            navegate("/updatePassword")
        } catch (error) {
            setapierror(error.message)
            setiscalling(false)
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: callverifyCode
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit} className="w-1/2 mx-auto my-6">
                <h1 className="mb-6 text-3xl uppercase">Reset Code:</h1>
                {apierror ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                    {apierror}
                </div> : ''}

                <div className="relative z-0 w-full mt-2 mb-5 group">
                    <input onBlur={formik.handleBlur} type="text" name="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer" placeholder=" " required />
                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">reset Code:</label>

                    {formik.errors.resetCode && formik.touched.resetCode ? <div className="p-2 mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {formik.errors.resetCode}
                    </div> : ''}
                </div>
                
                {iscalling ? <div className='flex justify-end'>
                    <BarLoader color='#0aad0a' />
                </div> : <button type="submit" className="text-white ms-auto block hover:opacity-80 bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Continue</button>}
            </form>
        </div>
    )
}

export default CodeConfirmation
