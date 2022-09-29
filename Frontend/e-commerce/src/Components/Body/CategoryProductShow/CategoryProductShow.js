import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { base64StringFun } from '../../Functions/Functions'
import '../BodyStyles/ProductShow.css'


const mapStateToProps = (state) => {
    return {
        selectedProducts: state.selectedProducts,
        allProducts: state.allProducts
    }
}

const CategoryProductShow = (props) => {

    const { categoryId } = useParams()
    const [products, setProducts] = useState([])
    // const [src, setScr] = useState([])

    useEffect(() => {

        let arr = props.allProducts.filter(item => item.categoryId._id === categoryId)
        setProducts(arr)

    }, [categoryId, props.allProducts])




    let arr = []
    let productShow = products.map((item, index) => {

        if (item.categoryId._id === categoryId) {

            return (
                <div class="project bg-danger">
                    <img class="project__image" height='100%' src={`${process.env.REACT_APP_BACKEND_URL}/product/${item._id}/${0}`} />
                    <h3 class="grid__title fw-bold"> {item.name}</h3>
                    <div class="grid__overlay">
                        <button class="viewbutton"><Link to={`/products-details/${item._id}`} className='text-decoration-none text-dark'>Details</Link></button>
                    </div>
                </div>
            )
        }
    })


    return (
        <div className="container pt-5">

            <h2 className='text-center pb-3'>{products.length === 0 ? '' : products[0].categoryId.name}</h2>

            <section id="portfolio" className='portfolio'>

                {productShow}

                <div class="overlay">
                    <div class="overlay__inner">
                        <button class="close">close X</button>
                        <img />
                    </div>
                </div>
            </section>
        </div>
    )
}





export default connect(mapStateToProps)(CategoryProductShow)