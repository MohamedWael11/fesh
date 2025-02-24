import React, { useContext, useEffect, useState } from 'react';
import styles from './ProdectDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RelatedProdect from './component/RelatedProdect/RelatedProdect';
import Slider from 'react-slick';
import Loader from '../Shared/Loader/Loader';
import { cartContext } from '../../context/cartContext';
import { toast } from 'react-toastify';
import { favoritContext } from '../../context/favoritContext';

export default function ProdectDetails() {
    const { id, categaryId } = useParams();
    const [details, setDetails] = useState(null);
    let { addToCart } = useContext(cartContext);
    let { addToFavorit, removeProduct, getFavorit } = useContext(favoritContext);
    const [togell, setTogell] = useState([]);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    async function addProdectToCart(id) {
        let data = await addToCart(id);
        if (data.status === "success") {
            toast(data.message, { type: 'success', theme: 'dark', position: 'bottom-right' });
        }
    }

    async function getWishList() {
        let data = await getFavorit();
        if (data && data.data) {
            setTogell(data.data.map(item => item.id));  
        }
    }

    async function toggleWishList(id) {
        if (togell.includes(id)) {
            let { data } = await removeProduct(id);
            setTogell(prev => prev.filter(item => item !== id));
            toast("Removed from wishlist", { type: "error", theme: "dark", position: "bottom-right" });
        } else {
            let { data } = await addToFavorit(id);
            setTogell(prev => [...prev, id]);  
            toast("Added to wishlist", { type: "success", theme: "dark", position: "bottom-right" });
        }
    }

    async function getProdectDetails() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
            setDetails(data.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProdectDetails();
        getWishList();  
    }, [id]);

    return (
        <>
            {details && <div className='main-layout py-16 lg:px-9 items-center'>
                <div className="w-4/12">
                    <Slider {...settings}>
                        {details?.images.map(src => <img key={src} src={src} />)}
                    </Slider>
                </div>
                <div className="w-8/12">
                    <h1 className='text-4xl mb-2'>{details?.title}</h1>
                    <p className='mb-3'>{details?.description}</p>
                    <span className='text-main'>{details?.category?.name}</span>
                    <div className="flex justify-between mb-4 mt-3">
                        <p>{details?.price}  $</p>
                        <div className='flex justify-between items-center gap-x-6'>
                            <i onClick={(e) => { e.preventDefault(); toggleWishList(details.id) }} className={`fa w-[30%] fa-heart  fa-xl ps-[3.75rem] ${togell.includes(details.id) ? "text-red-500" : "text-black"} `} ></i>
                            <p>
                                <i className='fa fa-star rating-color '></i>
                                {details?.ratingsAverage}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => addProdectToCart(details?.id)} className='w-[85%] bg-main p-2 text-center text-white rounded-md'>Add to cart</button>
                </div>
            </div>}

            {!details && <Loader />}

            <h2 className='text-4xl mb-4 lg:px-8 font-bold'>Related Products:</h2>
            <RelatedProdect categaryId={categaryId} />
        </>
    )
}
