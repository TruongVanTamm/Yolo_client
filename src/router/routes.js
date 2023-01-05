import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'
import Catalog from '../pages/Catalog'
import Cart from '../pages/Cart'
import Products from '../pages/Products'
import SignUpPage from '../pages/AuthPage/SignUpPage'
import SignInPage from '../pages/AuthPage/SignInPage'
import { GlobalState } from '../GlobalState'
import NotFound from '../components/utils/NotFound'
import OrderHistory from '../components/History/OrderHistory'
import OrderDetail from '../components/History/OrderDetail'
import Categories from '../components/Navbar/Categories'
import CreateProduct from '../components/CreateProduct/CreateProduct'
import Profile from '../components/Profile/Profile'
import EditUser from '../components/Profile/EditUser'
import ForgotPassword from '../components/Auth/ForgotPassword'
import ResetPassword from '../components/Auth/ResetPassword'
import Favorites from '../components/Favorite/Favorites'
// import Accessories from '../pages/Accessories'
const RoutesWrap = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  return ( 
        <Routes>
          <Route path='/' exact element={<Home></Home>}></Route>
          <Route path='/:id' element={<Products></Products>}></Route>
          {/* <Route path='/accessories' exact element={<Accessories></Accessories>}></Route> */}
          <Route path='/cart/:id' element={<Products></Products>}></Route>
          <Route path='/catalog' exact element={<Catalog></Catalog> }></Route>
          <Route path='/cart' exact element={<Cart></Cart>}></Route>
          <Route path='/category' exact element={isAdmin? <Categories></Categories>:<NotFound></NotFound>}></Route>
          <Route path='/create_product' exact element={isAdmin? <CreateProduct></CreateProduct>:<NotFound></NotFound>}></Route>
          <Route path='/edit-product/:id' exact element={isAdmin? <CreateProduct></CreateProduct>:<NotFound></NotFound>}></Route>
          <Route path='/history' exact element={isLogged ? <OrderHistory></OrderHistory>:<NotFound></NotFound>}></Route>
          <Route path='/history/:id' exact element={<OrderDetail></OrderDetail>}></Route>
          <Route path='/favorite' exact element={isLogged ? <Favorites></Favorites>:<NotFound></NotFound>}></Route>
          <Route path='/signup' exact element={isLogged ? <NotFound></NotFound>:<SignUpPage></SignUpPage>}></Route>
          <Route path='/signin' exact element={isLogged ? <NotFound></NotFound>:<SignInPage></SignInPage>}></Route>
          <Route path="/user/activate/:activation_token" exact element={<SignInPage></SignInPage>} ></Route>
          <Route path="/profile" exact element={<Profile></Profile>} ></Route>
          <Route path="/edit_user/:id" exact element={<EditUser></EditUser>} ></Route>
          <Route path="/forgot_password" exact element={<ForgotPassword></ForgotPassword>} ></Route>
          <Route path="/user/reset/:token" exact element={<ResetPassword></ResetPassword>} ></Route>
        </Routes>
  )
}

export default RoutesWrap
