import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { CHECK_AUTH, DECODE_TOKEN } from '../Redux/ActionTypes'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { checkAuth, tokenDecode } from './Functions/AuthFunctions'
import Header from './Header/Header'


const mapStateToProps = (state) => {

    // console.log(state);
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken

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

        tokenDecode().then(val => {
            props.dispatch({
                type: DECODE_TOKEN,
                value: val
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