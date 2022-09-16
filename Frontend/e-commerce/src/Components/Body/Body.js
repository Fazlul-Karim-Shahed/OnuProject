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
import AdminProductDetails from '../Admin/AdminComponents/Products/ProductDetails'
import AdminProductCreate from '../Admin/AdminComponents/Products/ProductCreate'
import Home from './Home/Home'
import Category from './CategoryShow/Category'

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

                {adminRoutes}

                <Route path='*' element={<h1>Sorry page not found</h1>} />
            </Routes>
        </div>

    )
}





export default connect(mapStateToProps)(Body)