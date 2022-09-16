import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { CHECK_AUTH, DECODE_TOKEN, GET_ALL_PRODUCTS, GET_CATALOG, GET_CATEGORY, GET_SUBCATEGORY } from '../Redux/ActionTypes'
import { getCatalogApi } from './API/CatalogApi'
import { getCategoryApi, getCategoryByCatalogApi } from './API/CategoryApi'
import { getAllProductsApi } from './API/ProductApi'
import { getSubCategoryApi } from './API/SubCategoryApi'
import Body from './Body/Body'
import Footer from './Footer/Footer'
import { checkAuth, tokenDecode } from './Functions/AuthFunctions'
import Header from './Header/Header'


const mapStateToProps = (state) => {

    // console.log(state.catalog);
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

        getCatalogApi().then(data => {
            props.dispatch({
                type: GET_CATALOG,
                value: data.value
            })
        })

        getCategoryApi().then(data => {
            props.dispatch({
                type: GET_CATEGORY,
                value: data.value
            })
        })

        getSubCategoryApi().then(data => {
            props.dispatch({
                type: GET_SUBCATEGORY,
                value: data.value
            })
        })

        getAllProductsApi().then(data => {
            props.dispatch({
                type: GET_ALL_PRODUCTS,
                value: data.value
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