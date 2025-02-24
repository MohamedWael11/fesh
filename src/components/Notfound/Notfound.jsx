import React, { useEffect, useState } from 'react'
import styles from './Notfound.module.css'
import error from '../../assets/images/error.svg'

export default function Notfound() {

    const [count, setCount] = useState(0)

return (
    <div className='container'>
        <img src={error} alt="" className='w-full' />
    </div>
)

}
