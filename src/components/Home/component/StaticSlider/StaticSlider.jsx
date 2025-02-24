import React, { useEffect, useState } from 'react'
import styles from './StaticSlider.module.css'
import Slider from 'react-slick';

import slider1 from '../../../../assets/images/slider-image-1.jpeg'
import slider2 from '../../../../assets/images/slider-image-2.jpeg'
import slider3 from '../../../../assets/images/slider-image-3.jpeg'
import static1 from '../../../../assets/images/grocery-banner.png'
import static2 from '../../../../assets/images/grocery-banner-2.jpeg'



export default function StaticSlider() {

    
    const settings = {
        dots: true,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

return (
    <div className='main-layout mb-7 lg:px-8'>


        <div className="w-9/12">
        <Slider {...settings}>
            <img src={slider3} className={styles.main}  alt="" />
            <img src={slider1} className={styles.main} alt="" />
            <img src={slider2} className={styles.main}  alt="" />
        </Slider>
        </div>


        <div className="w-3/12">
        <img src={static1} className='h-[300px]' alt="" />
        <img src={static2} className='h-[300px]' alt="" />
        </div>

        
    </div>
)

}
