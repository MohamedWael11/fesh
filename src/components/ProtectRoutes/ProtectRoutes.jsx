import { Navigate } from "react-router-dom";



export default function ProtectRoutes(pops){

    if(localStorage.getItem("userToken")){
        return pops.children;
    }else{
        return <Navigate to={'/login'} />
    }
}