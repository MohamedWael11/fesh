import React, { useEffect, useState } from 'react'
import styles from './PopularCatogry.module.css'
import axios from 'axios'
import Slider from 'react-slick';


export default function PopularCatogry() {

    const [categorys, setCategorys] = useState([])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows:false,
        responsive: [
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
            },
            {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
            },
            {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ],
        slidesToShow: 7,
        slidesToScroll: 1,
    };

async  function getCategorys(){
    try {
        const{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
console.log(data.data);
        setCategorys(data.data)

    } catch (error) {
        console.log(error);
    }
    }

    useEffect(() => {
        getCategorys()
    }, []);

return (
    <div className='px-8 mb-5'>
        <h2 className='mb-5 text-3xl'>Shop popular categorys</h2>
        <Slider {...settings}>
            {categorys.map(category =><div> <img src={category.image} className={styles.categoryImage} alt='' />
            <h4>{category.name}</h4>
            </div>)}
        </Slider>
    </div>
)

}
