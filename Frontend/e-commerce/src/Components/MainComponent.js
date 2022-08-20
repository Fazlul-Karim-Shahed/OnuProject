import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { CHECK_AUTH } from '../Redux/ActionTypes'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { checkAuth } from './Functions/AuthFunctions'
import Header from './Header/Header'


const mapStateToProps = (state) => {

    console.log(state);
    return {
        authenticated: state.authenticated
    }
}
const MainComponent = (props) => {

    useEffect(() => {
        checkAuth().then(data => {
            props.dispatch({
                type: CHECK_AUTH,
                value: data
            })
        })
    }, [])


    return (
        <div>
            <Header />
            <Body />
            <Footer />
        </div>
    )
}




export default connect(mapStateToProps)(MainComponent)