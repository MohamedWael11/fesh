import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { tokenContext } from "./tokenContext";
import axios from "axios";
import { toast } from "react-toastify";




export let favoritContext=createContext();


export default function FavoritContextProvider({children}){
    const [numOfFavoritItems,setNumOfFavoritItems]=useState(0);
    const [FavoritDetails,setFavoritDetails]=useState(0);
    const {token}=useContext(tokenContext)
    const API_URl=`https://ecommerce.routemisr.com/api/v1/wishlist`
    const headers={
        token
    };
    
    async function addToFavorit(productId) {
            
            const {data} = await axios.post(API_URl,{productId},{
                headers
            });
            if(data.status=="success"){
                setNumOfFavoritItems(data.numOfFavoritItems)
            }
            getFavorit()
            return data;   
    }

    async function getFavorit() {
            const {data} = await axios.get(API_URl,{
                headers
            });
            
            if(data.status=="success"){
                setNumOfFavoritItems(data.numOfFavoritItems)
            }
            setFavoritDetails(data)
            return data;
        
    }

    async function removeProduct(id) {
        const {data} = await axios.delete(`${API_URl}/${id}`,{
            headers
        });
        console.log(data);
        
        if(data.status=="success"){
            setNumOfFavoritItems(data.numOfFavoritItems)
            toast("Product is deleted",{type:'success',theme:'dark',position:'bottom-right'})
        }
        setFavoritDetails(data)
        return data;
    }

    useEffect(() => {
        token && getFavorit()
    
        }, [token]);


    return(
        <favoritContext.Provider value={{numOfFavoritItems,setNumOfFavoritItems,addToFavorit,getFavorit,FavoritDetails,setFavoritDetails,removeProduct}}>
            {children}
        </favoritContext.Provider>
    )

}


