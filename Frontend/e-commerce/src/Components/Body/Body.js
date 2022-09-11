import React from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import AuthForm from './AuthForm'
import AdminPanel from '../Admin/AdminPanel'
import Logout from './Logout'
import Catalog from '../Admin/Catalog'
import Category from '../Admin/Category'
import Subcategory from '../Admin/Subcategory'
import Products from '../Admin/Products'
import ProductDetails from '../Admin/AdminComponents/Products/ProductDetails'
import ProductCreate from '../Admin/AdminComponents/Products/ProductCreate'

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
                    <Route path='catalog' element={<Catalog />} />
                    <Route path='category' element={<Category />} />
                    <Route path='subcategory' element={<Subcategory />} />
                    <Route path='products' element={<Products />} />
                    <Route path='products/detail/:id' element={<ProductDetails />} />
                    <Route path='products/create-product' element={<ProductCreate />} />
                </Route>
                
        }
    }


    return (
        <div>
            <Routes>
                <Route path='/' element={<div>Home</div>} />
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
                <Route path='/logout' element={<Logout />} />

                {adminRoutes}

                <Route path='*' element={<h1>Sorry page not found</h1>} />
            </Routes>
        </div>

    )
}





export default connect(mapStateToProps)(Body)