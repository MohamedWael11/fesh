import { useContext, useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import Categoties from './components/Categoties/Categoties';
import Brands from './components/Brands/Brands';
import Prodect from './components/Prodect/Prodect';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Cart from './components/Cart/Cart';
import Notfound from './components/Notfound/Notfound';
import { tokenContext } from './context/tokenContext';
import ProtectRoutes from './components/ProtectRoutes/ProtectRoutes';
import { AuthView } from './components/AuthView/AuthView';
import ProdectDetails from './components/ProdectDetails/ProdectDetails';
import Home from './components/Home/Home';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import CodeConfirmation from './components/CodeConfirmation/CodeConfirmation';
import UpdatePassword from './components/UpdatePassWord/UpdatePassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WishList from './components/WishList/WishList';
import AllOrders from './components/AllOrders/AllOrders';
import FavoritContextProvider from './context/favoritContext';

function App() {
  const newQueryClient = new QueryClient();


  let {setToken}=useContext(tokenContext)
  useEffect(()=>{
    if(localStorage.getItem("userToken"))
      setToken(localStorage.getItem("userToken"))

  },[])

  const routes= createBrowserRouter([
    {path:"",element:<Layout/>, children:[
      {index:true,element:<ProtectRoutes><Home/></ProtectRoutes>},
      {path:"categories",element:<ProtectRoutes><Categoties/></ProtectRoutes>},
      {path:"brands",element:<ProtectRoutes><Brands/></ProtectRoutes>},
      {path:"products",element:<ProtectRoutes><Prodect/></ProtectRoutes>},
      {path:"productDetails/:id/:categaryId",element:<ProtectRoutes><ProdectDetails/></ProtectRoutes>},
      {path:"login",element:<AuthView><Login/></AuthView>},
      {path:"register",element:<AuthView><Register/></AuthView>},
      {path:"cart",element:<ProtectRoutes><Cart/></ProtectRoutes>},
      {path:"checkout",element:<ProtectRoutes><Checkout/></ProtectRoutes>},
      {path:"forgetPassword",element:<ForgetPassword/>},
      {path:"codeConfirmation",element:<CodeConfirmation/>},
      {path:"updatePassword",element:<UpdatePassword/>},
      {path:"wishlist", element:<ProtectRoutes> <WishList/> </ProtectRoutes>},
      {path:"allOrders", element:<ProtectRoutes> <AllOrders/> </ProtectRoutes>},


      {path:"*",element:<Notfound/>},
    ]}
  ])




  return (
    <>
    <QueryClientProvider client={newQueryClient}>
      <FavoritContextProvider>
      <RouterProvider router={routes}/>
      <ToastContainer/>
      </FavoritContextProvider>

    </QueryClientProvider>
  
    
    </>
  )
}

export default App