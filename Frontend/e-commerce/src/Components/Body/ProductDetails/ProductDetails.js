import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { idealObject } from '../../Functions/Functions'
import Photos from './Photos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { cartSave, getCart } from '../../Functions/CartFunction'
import { GET_CART } from '../../../Redux/ActionTypes'
import ProductInfo from './ProductInfo'
import { spinner } from '../Spinner'
import { Alert } from 'reactstrap'



const mapStateToProps = (state) => {
    // console.log(state);
    return {
        allProducts: state.allProducts,
        productProperties: state.productProperties,
        finishing: state.finishing,
        finishingColor: state.finishingColor,
        partsInfo: state.partsInfo,
        size: state.size,
        authenticated: state.authenticated,
        decodedToken: state.decodedToken

    }
}

const ProductDetails = (props) => {

    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [photos, setPhotos] = useState([])
    const [finishing, setFinishing] = useState([])
    const [finishingColor, setFinishingColor] = useState([])
    const [size, setSize] = useState([])
    const [partsInfo, setPartsInfo] = useState([])
    const [productPropertiesArr, setProductPropertiesArr] = useState([])
    const [productPropertiesPhotoArr, setProductPropertiesPhotoArr] = useState([])
    const [additionalSizePrice, setAdditionalSizePrice] = useState(0)
    const [additionalFinishingPrice, setAdditionalFinishingPrice] = useState(0)
    const [additionalFinishingColorPrice, setAdditionalFinishingColorPrice] = useState(0)
    const [additionalPartsInfoPrice, setAdditionalPartsInfoPrice] = useState(0)
    const [message, setMessage] = useState('')
    const [spin, setSpin] = useState(false)
    const [state, setState] = useState({
        productId: id,
        finishingId: '',
        finishingColorId: '',
        sizeId: '',
        partsInfoId: '',
        quantity: 1,
    })



    useEffect(() => {

        let product = props.allProducts.filter(item => item._id === id)[0]
        setProduct(product)

        if (product != undefined) {
            let arr = [...product.photo]
            setPhotos(arr)
        }

        let s = props.size.filter(item => item.productId === id)
        setSize(s)
        let f = props.finishing.filter(item => item.productId === id)
        setFinishing(f)
        let fc = props.finishingColor.filter(item => item.productId === id)
        setFinishingColor(fc)
        let pi = props.partsInfo.filter(item => item.productId === id)
        setPartsInfo(pi)


        let newObj = idealObject(state)

        let arr = props.productProperties.map(item => {

            let count = 0
            for (let i in newObj) {
                for (let j in item) {

                    if (j != 'photo') {

                        if (newObj[i] === item[j]._id) count++
                    }
                }
            }

            if (id === item.productId && (count == Object.keys(newObj).length - 2)) {
                return item
            }
            else return ''


        })

        setProductPropertiesArr(arr)

        let a = []
        arr.forEach(item => {

            if (item != '') {
                a = [...item.photo]
            }

        })

        setProductPropertiesPhotoArr(a)



    }, [id, props.allProducts, props.finishing, props.finishingColor, props.size, props.partsInfo, state, props.productProperties])



    if (product === null || product == undefined) return <div>Not found</div>


    let finishingOption = finishing.map(item => {

        return <option key={Math.random()} value={item._id}>{item.finishing}</option>
    })

    let finishingColorOption = finishingColor.map(item => {
        return <option key={Math.random()} value={item._id}>{item.finishingColor}</option>
    })

    let sizeOptions = size.map(item => {
        return <option key={Math.random()} value={item._id}>{item.size}</option>
    })

    let partsInfoOptions = partsInfo.map(item => {
        return <option key={Math.random()} value={item._id}>{item.partsInfo}</option>
    })

    const findPartsInfoPrice = id => {
        let additionalPrice
        props.partsInfo.forEach(item => {
            if (id === item._id) {
                additionalPrice = item.additionalPrice
            }
        })
        return additionalPrice
    }

    const findFinishingPrice = id => {
        let additionalPrice
        props.finishing.forEach(item => {
            if (id === item._id) {
                additionalPrice = item.additionalPrice
            }
        })
        return additionalPrice
    }

    const findFinishingColorPrice = id => {
        let additionalPrice
        props.finishingColor.forEach(item => {
            if (id === item._id) {
                additionalPrice = item.additionalPrice
            }
        })
        return additionalPrice
    }

    const findSizePrice = id => {
        let additionalPrice
        props.size.forEach(item => {
            if (id === item._id) {
                additionalPrice = item.additionalPrice
            }
        })
        return additionalPrice
    }


    const change = e => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })

        if (e.target.name === 'sizeId') {
            setAdditionalSizePrice(findSizePrice(e.target.value))
        }
        if (e.target.name === 'partsInfoId') {
            setAdditionalPartsInfoPrice(findPartsInfoPrice(e.target.value))
        }
        if (e.target.name === 'finishingColorId') {
            setAdditionalFinishingColorPrice(findFinishingColorPrice(e.target.value))
        }
        if (e.target.name === 'finishingId') {
            setAdditionalFinishingPrice(findFinishingPrice(e.target.value))
        }


    }

    const submit = (e) => {
        setSpin(true)
        let newObj = {
            ...state,
            price: (product.price + additionalFinishingColorPrice + additionalFinishingPrice + additionalSizePrice + additionalPartsInfoPrice),
            total: (product.price + additionalFinishingColorPrice + additionalFinishingPrice + additionalSizePrice + additionalPartsInfoPrice) * state.quantity
        }

        cartSave(newObj, props.authenticated, props.decodedToken).then(data => {
            let m = <Alert className='text-success'>{data.message}. See your <Link to="/cart">Cart</Link></Alert>
            console.log(m);
            setMessage(m)
            getCart(props.authenticated, props.decodedToken).then(data => {
                setSpin(false)
                props.dispatch({
                    type: GET_CART,
                    value: data.value
                })

            })
        })

        e.preventDefault()
    }


    return (
        <div>
            <div className="container py-5">
                <h2 className=''>{product.name}</h2>
                <div className="row m-0">
                    <div className="col-md-7">
                        <Photos productPropertiesArr={productPropertiesArr} productPropertiesPhotoArr={productPropertiesPhotoArr} product={product} photos={photos} />
                    </div>
                    <div className="col-md-5 my-5 my-md-0">
                        <form className='border p-4' onSubmit={e => submit(e)} action="">
                            <label className='fw-bold' htmlFor="">Finishing Name</label> <br />
                            <select required value={state.finishingId} onChange={e => change(e)} className='form-control' name="finishingId" id="">
                                <option value="">Select</option>
                                {finishingOption}
                            </select>
                            <br />

                            <label className='fw-bold' htmlFor="">Finishing Color</label> <br />
                            <select required value={state.finishingColorId} onChange={e => change(e)} className='form-control' name="finishingColorId" id="">
                                <option value="">Select</option>
                                {finishingColorOption}
                            </select>
                            <br />

                            <label className='fw-bold' htmlFor="">Size</label> <br />
                            <select required value={state.sizeId} onChange={e => change(e)} className='form-control' name="sizeId" id="">
                                <option value="">Select</option>
                                {sizeOptions}
                            </select>
                            <br />

                            <label className='fw-bold' htmlFor="">Parts Info</label> <br />
                            <select required value={state.partsInfoId} onChange={e => change(e)} className='form-control' name="partsInfoId" id="">
                                <option value="">Select</option>
                                {partsInfoOptions}
                            </select>
                            <br />

                            <label className='fw-bold' htmlFor="">Quantity</label> <br />
                            <select value={state.quantity} name="quantity" onChange={e => change(e)} className='form-control' id="">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                            <br />

                            <h4>{product.price + additionalFinishingColorPrice + additionalFinishingPrice + additionalSizePrice + additionalPartsInfoPrice} x {state.quantity} = {(product.price + additionalFinishingColorPrice + additionalFinishingPrice + additionalSizePrice + additionalPartsInfoPrice) * state.quantity}  BDT</h4>

                            <button onSubmit={e => submit(e)} type="submit" className='btn w-100 my-3 btn-danger'><FontAwesomeIcon className='mx-2' icon={faCartShopping} /> Add to Cart</button>
                            <p>{message}</p>
                        </form>

                    </div>
                </div>


            </div>
            <div className='pt-0 bg-light'>
                <div className='container'>
                    <h3 className='text-center py-5'>Products and Service Information</h3>
                    <ProductInfo product={product} />
                </div>
            </div>

            <div className='container py-5'>
                <div className='text-center'>
                    <h4 className=' pb-2'>{product.name}</h4>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}/product/${product._id}/${0}`} width='200' alt="" />
                </div>

                <div className='pt-3 small'>
                    <p className='fw-bold pb-3'>Why you should buy this product?</p>
                    <p className='fw-bold'>Contemporary Design</p>
                    <p>Lorem ipsum dopedit voluptas nobis rem adipisci illo assumenda, hic maiores unde, in quam, laboriosam veritatis. netur sapiente tempora eum possimus libero dolor delectus.</p>

                    <p className='fw-bold pt-3'>Contemporary Design</p>
                    <p>Lorem ipsum dopedit voluptas nobis rem adipisci illo assumenda, hic muam omnis alias explicabo at. Laudantium esse tenetur sapiente tempora eum possimus libero dolor delectus.</p>
                </div>
            </div>
            {spin === true ? spinner(true) : spinner(false)}
        </div>
    )
}



export default connect(mapStateToProps)(ProductDetails)