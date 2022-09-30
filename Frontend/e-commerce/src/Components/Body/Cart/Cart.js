import React from 'react'
import { connect } from 'react-redux'
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { InputGroup, Input } from 'reactstrap'
import { deleteCart, updateQuantity } from '../../Functions/CartFunction'
import { GET_CART } from '../../../Redux/ActionTypes'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { spinner } from '../Spinner'


const mapStateToProps = (state) => {
    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken,
        cart: state.cart,
        allProducts: state.allProducts,
        finishing: state.finishing,
        finishingColor: state.finishingColor,
        partsInfo: state.partsInfo,
        size: state.size,
    }
}

const Cart = (props) => {

    const [spin, setSpin] = useState(false)

    console.log('cart all: ', props.allProducts);

    if (props.cart === undefined || props.cart.length === 0) return <div className='container py-5 text-center'>No item found</div>

    const update = (type, item, index) => {
        setSpin(true)
        updateQuantity(type, props.authenticated, props.decodedToken, item, index).then(data => {
            setSpin(false)
            props.dispatch({
                type: GET_CART,
                value: data
            })
        })
    }

    const remove = (item, index) => {
        setSpin(true)
        deleteCart(props.authenticated, props.decodedToken, item, index).then(data => {
            setSpin(false)
            props.dispatch({
                type: GET_CART,
                value: data
            })
        })
    }

    let total = 0
    props.cart.forEach(item => {
        
        total = total + item.total
    })



    let cartShow = props.authenticated == false ? props.cart.map((item, index) => {

        if (props.allProducts.length === 0) return ''

        let product = props.allProducts.length === 0 ? '' : props.allProducts.find(i => item.productId === i._id)
        let finishing = props.finishing.length === 0 ? '' : props.finishing.find(i => item.finishingId === i._id)
        let finishingColor = props.finishingColor.length === 0 ? '' : props.finishingColor.find(i => item.finishingColorId === i._id)
        let size = props.size.length === 0 ? '' : props.size.find(i => item.sizeId === i._id)
        let partsInfo = props.partsInfo.length === 0 ? '' : props.partsInfo.find(i => item.partsInfoId === i._id)


        let src
        if (product != undefined) {
            let image = product.photo[0]
            let type = image.contentType
            let buff = image.data.data
            const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
            src = `data:${type};base64,${base64String}`
        }

        console.log('cart: ', product);

        if (product === undefined) {
            return <p></p>
        }

        return (

            <div>
                <div className="row border-bottom bg">
                    <div className="col-md-1 py-1 py-md-3 d-inline-block"><img className='img-fluid me-4 cartImg' width='100' src={src} alt="" /></div>
                    <div className="col-md-5 py-1 py-md-3">
                        {product.name} <br />
                        <span className='fw-bold'>Properties:</span> {finishing.finishing}-
                        {finishingColor.finishingColor}-
                        {size.size}-
                        {partsInfo.partsInfo}
                    </div>
                    <div className="col-md-2 py-1 py-md-3"><span className='sm'>Price</span> {item.price} </div>
                    <div className="col-md-2 py-1 py-md-3">
                        <InputGroup>
                            <div onClick={e => update('subtract', item, index)} className="btn btn-outline-info">-</div>
                            <input style={{ width: '50px' }} className='text-center border-0' type='' value={item.quantity} />
                            <div onClick={e => update('add', item, index)} className="btn btn-outline-info">+</div>
                        </InputGroup>
                    </div>
                    <div className="col-md-1 py-1 py-md-3"> {item.total}</div>
                    <div className="col-md-1 py-1 py-md-3"><FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={e => remove(item, index)} className='fa-xl text-danger' icon={faXmark} /> </div>
                </div>

                <div className="sm px-2">
                    <div className="row border-bottom py-3">
                        <div className="col-3">
                            <img className='img-fluid me-4 cartImg' width='100%' src={src} alt="" />
                        </div>
                        <div className="col-8">
                            <div className='my-1'>{product.name} <br /></div>
                            <div className='my-1'>
                                <span className='fw-bold'>Properties:</span>
                                <span className='fst-italic'>
                                    {finishing.finishing}-
                                    {finishingColor.finishingColor}-
                                    {size.size}-
                                    {partsInfo.partsInfo}
                                </span>
                            </div>
                            <div className='my-1'><span className='fw-bold'>Price:</span> {item.price}</div>
                            <div className='my-1'>
                                <span className='fw-bold'>Quantity:</span>
                                <InputGroup className='d-inline ms-3'>
                                    <div onClick={e => update('subtract', item, index)} className="btn btn-outline-info">-</div>
                                    <input style={{ width: '50px' }} className='text-center border-0' type='' value={item.quantity} />
                                    <div onClick={e => update('add', item, index)} className="btn btn-outline-info">+</div>
                                </InputGroup>
                            </div>
                            <div className='my-1'><span className='fw-bold'>Total:</span> {item.total}</div>
                        </div>
                        <div className="col-1">
                            <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={e => remove(item, index)} className='fa-xl text-danger py-5' icon={faXmark} />
                        </div>
                    </div>
                </div>

            </div>
        )
    }) : props.cart.map((item, index) => {

        if (item.productId === undefined) return ''
        let src
        let image = item.productId.photo[0]
        let type = image.contentType
        let buff = image.data.data
        const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
        src = `data:${type};base64,${base64String}`

        return (

            <div>
                <div className="row border-bottom bg">
                    <div className="col-md-1 py-1 py-md-3 d-inline-block"><img className='img-fluid me-4 cartImg' width='100' src={src} alt="" /></div>
                    <div className="col-md-5 py-1 py-md-3">
                        {item.productId.name} <br />
                        <span className='fw-bold'>Properties:</span> {item.finishingId.finishing}-
                        {item.finishingColorId.finishingColor}-
                        {item.sizeId.size}-
                        {item.partsInfoId.partsInfo}
                    </div>
                    <div className="col-md-2 py-1 py-md-3"><span className='sm'>Price</span> {item.price} </div>
                    <div className="col-md-2 py-1 py-md-3">
                        <InputGroup>
                            <div onClick={e => update('subtract', item, index)} className="btn btn-outline-info">-</div>
                            <input style={{ width: '50px' }} className='text-center border-0' type='' value={item.quantity} />
                            <div onClick={e => update('add', item, index)} className="btn btn-outline-info">+</div>
                        </InputGroup>
                    </div>
                    <div className="col-md-1 py-1 py-md-3">{item.total}</div>
                    <div className="col-md-1 py-1 py-md-3"><FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={e => remove(item, index)} className='fa-xl text-danger' icon={faXmark} /> </div>
                </div>

                <div className="sm">
                    <div className="row border-bottom py-3">
                        <div className="col-3">
                            <img className='img-fluid me-4 cartImg' width='100%' src={src} alt="" />
                        </div>
                        <div className="col-8">
                            <div className='my-1'>{item.productId.name} <br /></div>
                            <div className='my-1'>
                                <span className='fw-bold'>Properties:</span>
                                <span className='fst-italic'>{item.finishingId.finishing}-
                                    {item.finishingColorId.finishingColor}-
                                    {item.sizeId.size}-
                                    {item.partsInfoId.partsInfo}
                                </span>
                            </div>
                            <div className='my-1'><span className='fw-bold'>Price:</span> {item.price}</div>
                            <div className='my-1'>
                                <span className='fw-bold'>Quantity:</span>
                                <InputGroup className='d-inline ms-3'>
                                    <div onClick={e => update('subtract', item, index)} className="btn btn-outline-info">-</div>
                                    <input style={{ width: '50px' }} className='text-center border-0' type='' value={item.quantity} />
                                    <div onClick={e => update('add', item, index)} className="btn btn-outline-info">+</div>
                                </InputGroup>
                            </div>
                            <div className='my-1'><span className='fw-bold'>Total:</span> {item.total}</div>

                        </div>
                        <div className='col-1 my-5'><FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={e => remove(item, index)} className='fa-xl text-danger' icon={faXmark} /> </div>
                    </div>
                </div>

            </div>
        )
    })

    return (
        <div className='container py-5'>

            <h3 className='text-center pb-3'>Cart ({props.cart.length} items)</h3>
            <div className="row border-bottom py-3 bg">
                <div className="col-2"></div>
                <div className="col-4">Item</div>
                <div className="col-2">Price</div>
                <div className="col-2">Quantity</div>
                <div className="col-2">Total</div>
            </div>
            <div className=''>{cartShow}</div>


            <div className="row my-4 px-3 px-md-0">
                <div className="col-md-2"></div>
                <div className="col-md-4"></div>
                <div className="col-md-5 pe-md-5">
                    <div className='d-flex justify-content-between py-3 border-bottom'>
                        <strong>Subtotal: </strong>
                        <div>৳ {total}</div>
                    </div>
                    <div className='d-flex justify-content-between py-3 border-bottom'>
                        <strong>Sales Tax: </strong>
                        <div>৳ 0</div>
                    </div>
                    <div className='d-flex justify-content-between py-3 border-bottom'>
                        <strong>Coupon Code: </strong>
                        <div><a href="#">Add Coupon</a></div>
                    </div>
                    <div className='d-flex justify-content-between py-3'>
                        <strong>Grand total: </strong>
                        <div>৳ {total}</div>
                    </div>

                    <div className="row my-4">
                        <div className="col-md-4"></div>
                        <div className="col-md-8">
                            <span className='small'>Congrats, you're eligible for <strong>Free Shipping</strong></span>
                            <Link className='text-decoration-none text-white btn btn-dark w-100' to={props.authenticated ? '/checkout' : '/login'}>Check out</Link>
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>

            </div>
            {spin === true ? spinner(true) : spinner(false)}
            
        </div>
    )
}




export default connect(mapStateToProps)(Cart)