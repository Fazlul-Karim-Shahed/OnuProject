import React from 'react'
import { connect } from 'react-redux'
import {Routes, Route} from 'react-router-dom'
import AuthForm from './AuthForm'


const mapStateToProps = (state) => ({
    authenticated: state.authenticated
})

const Body = (props) => {


    return (
        <div>
            <Routes>
                <Route path='/' element={<div>Home</div>} />
                <Route path='/login' element={<AuthForm mode='login' />} />
                <Route path='/signup' element={<AuthForm mode='signup' />} />
                {props.authenticated? <Route path='/admin' element='' /> : ''}
            </Routes>
        </div>

    )
}





export default connect(mapStateToProps)(Body)