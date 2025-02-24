import React, { useEffect, useState } from 'react'
import styles from './Loader.module.css'
import loaderImage from '../../../assets/images/looder.gif'

export default function Loader() {

    const [count, setCount] = useState(0)

return (
    <div className='flex justify-center '>
        <img src={loaderImage} className='w-[800px] ' alt="" />
    </div>
)

}
