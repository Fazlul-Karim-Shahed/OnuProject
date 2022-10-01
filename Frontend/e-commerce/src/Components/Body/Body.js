import React from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import AuthForm from './AuthForm'
import AdminPanel from '../Admin/AdminPanel'
import Logout from './Logout'
import AdminCatalog from '../Admin/AdminCatalog'
import AdminCategory from '../Admin/AdminCategory'
import AdminSubcategory from '../Admin/AdminSubcategory'
import AdminProducts from '../Admin/AdminProducts'
import AdminProductDetails from '../Admin/AdminComponents/AdminProducts/ProductDetails'
import AdminProductCreate from '../Admin/AdminComponents/AdminProducts/ProductCreate'
import Home from './Home/Home'
import Category from './CategoryShow/Category'
import CategoryProductShow from './CategoryProductShow/CategoryProductShow'
import ProductDetails from './ProductDetails/ProductDetails'
import AdminProperties from '../Admin/AdminProperties'
import Cart from './Cart/Cart'
import CheckOut from './CheckOut/CheckOut'
import Success from './Payment/Success'
import Cancel from './Payment/Cancel'
import Fail from './Payment/Fail'
import Orders from './Orders/Orders'
import AdminOrders from '../Admin/AdminOrder'
import SubCategoryProductShow from './SubCategoryProductShow/SubCategoryProductShow'


const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
})

const Body = (props) => {


    let adminRoutes = ''
    if (props.authenticated && props.decodedToken && props.decodedToken.hasOwnProperty('role')) {
        if (props.decodedToken.role === 'admin') {

            adminRoutes =

                <Route path='/admin-panel' element={<AdminPanel />} >
                    <Route path='catalog' element={<AdminCatalog />} />
                    <Route path='category' element={<AdminCategory />} />
                    <Route path='subcategory' element={<AdminSubcategory />} />
                    <Route path='products' element={<AdminProducts />} />
                    <Route path='products/detail/:id' element={<AdminProductDetails />} />
                    <Route path='products/create-product' element={<AdminProductCreate />} />
                    <Route path='properties' element={<AdminProperties />} />
                    <Route path='order' element={<AdminOrders />} />
                </Route>

        }
    }


    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/catalog/:id' element={<Category />} />
                <Route path='/category-products/:categoryId' element={<CategoryProductShow />} />
                <Route path='/products-details/:id' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/success' element={<Success />} />
                <Route path='/cancel' element={<Cancel />} />
                <Route path='/fail' element={<Fail />} />
                <Route path='/order' element={<Orders />} />
                <Route path='/subcategory/:subcategoryId' element={<SubCategoryProductShow />} />

                {adminRoutes}

                <Route path='*' element={<h1>Sorry page not found</h1>} />
            </Routes>
        </div>

    )
}





export default connect(mapStateToProps)(Body)