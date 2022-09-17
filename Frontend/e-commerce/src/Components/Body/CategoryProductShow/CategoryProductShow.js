import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card, CardImg } from 'reactstrap'


const mapStateToProps = (state) => {
    console.log(state.allProducts)
    return {
        selectedProducts: state.selectedProducts,
        allProducts: state.allProducts
    }
}

const CategoryProductShow = (props) => {

    const { categoryId } = useParams()
    const [products, setProducts] = useState([])

    useEffect(() => {

        let arr = props.allProducts.filter(item => item.categoryId._id === categoryId)
        setProducts(arr)

    }, [categoryId, props.allProducts])




    let productShow = products.map(item => {

        if (item.categoryId._id === categoryId) {

            let src
            if (item.photo != undefined) {

                let image = item.photo[0]
                let type = image.contentType
                let buff = image.data.data
                const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
                src = `data:${type};base64,${base64String}`

            }




            return (
                <div className='col-md-4 py-2 p-md-4'>
                    <Card>
                        <CardImg src={src} width='' />
                    </Card>
                </div>
            )
        }
    })


    return (
        <div className="container py-5">
            <h2 className='text-center'>{products.length === 0 ? '' : products[0].categoryId.name}</h2>
            <div className='row'>
                {productShow}
            </div>
        </div>
    )
}





export default connect(mapStateToProps)(CategoryProductShow)