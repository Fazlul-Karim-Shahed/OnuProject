import React from 'react'
import { connect } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import AuthForm from './AuthForm'
import AdminPanel from '../Admin/AdminPanel'
import Logout from './Logout'
import Catalog from '../Admin/Catalog'
import Category from '../Admin/Category'
import Subcategory from '../Admin/Subcategory'


const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
})

const Body = (props) => {


    return (
        <div>
            <Routes>
                <Route path='/' element={<div>Home</div>} />
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
                <Route path='/logout' element={<Logout />} />
                <Route path='*' element={<h1>Sorry page not found</h1>} />
                {props.authenticated && props.decodedToken.role === 'admin' ?

                    <Route path='/admin-panel' element={<AdminPanel />} >
                        <Route path='catalog' element={<Catalog />} />
                        <Route path='category' element={<Category />} />
                        <Route path='subcategory' element={<Subcategory />} />
                        <Route path='products' element={'Product'} />
                    </Route>

                    : ''}
            </Routes>
        </div>

    )
}





export default connect(mapStateToProps)(Body)