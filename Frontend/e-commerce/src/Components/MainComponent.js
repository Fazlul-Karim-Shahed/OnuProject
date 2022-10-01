import React, { useEffect } from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import { CHECK_AUTH, DECODE_TOKEN, GET_ALL_PRODUCTS, GET_ALL_PRODUCTS_PROPERTIES, GET_ALL_PROPERTIES, GET_CART, GET_CATALOG, GET_CATEGORY, GET_ORDER, GET_SUBCATEGORY } from '../Redux/ActionTypes'
import { getCatalogApi } from './API/CatalogApi'
import { getCategoryApi } from './API/CategoryApi'
import { getOrdersByIdApi } from './API/OrderApi'
import { getAllProductsApi } from './API/ProductApi'
import { getAllProductPropertiesApi } from './API/ProductPropertiesApi'
import { getAllPropertiesApi } from './API/PropertiesApi'
import { getSubCategoryApi } from './API/SubCategoryApi'
import Body from './Body/Body'
import { spinner } from './Body/Spinner'
import Footer from './Footer/Footer'
import { checkAuth, tokenDecode } from './Functions/AuthFunctions'
import { getCart } from './Functions/CartFunction'
import Header from './Header/Header'


const mapStateToProps = (state) => {

    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken

    }
}
const MainComponent = (props) => {

    const [spin, setSpin] = useState(false)

    useEffect(() => {

        setSpin(true)
        checkAuth().then(data => {
            props.dispatch({
                type: CHECK_AUTH,
                value: data
            })

            tokenDecode().then(val => {
                props.dispatch({
                    type: DECODE_TOKEN,
                    value: val
                })

                if (val != null) {
                    getCart(data, val).then(data => {
                        props.dispatch({
                            type: GET_CART,
                            value: data.value
                        })
                    })

                    getOrdersByIdApi(val._id).then(data => {
                        props.dispatch({
                            type: GET_ORDER,
                            value: data.value
                        })

                    })
                }

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
            setSpin(false)
            props.dispatch({
                type: GET_ALL_PRODUCTS,
                value: data.value
            })
        })

        getAllProductPropertiesApi().then(data => {
            props.dispatch({
                type: GET_ALL_PRODUCTS_PROPERTIES,
                value: data.value
            })
        })

        getAllPropertiesApi().then(data => {
            props.dispatch({
                type: GET_ALL_PROPERTIES,
                value: data.value
            })
        })



    }, [])



    return (
        <div>
            <Header />
            <Body />
            <Footer />
            {spin === true ? spinner(true) : spinner(false)}
        </div>
    )
}




export default connect(mapStateToProps)(MainComponent)