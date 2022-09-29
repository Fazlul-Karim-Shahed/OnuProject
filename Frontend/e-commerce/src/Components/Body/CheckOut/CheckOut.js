import { Formik } from 'formik'
import React from 'react'
import { connect } from 'react-redux'
import { Alert, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { createPaymentApi } from '../../API/PaymentApi'
import { useNavigate, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { spinner } from '../../Body/Spinner'
import { createCartItemArray } from '../../Functions/CartFunction'
import { useEffect } from 'react'


const mapStateToProps = (state) => {

    return {
        authenticated: state.authenticated,
        decodedToken: state.decodedToken,
        cart: state.cart,
        allProducts: state.allProducts
    }
}

const CheckOut = (props) => {

    const [spin, setSpin] = useState(false)
    let navigate = useNavigate()


    useEffect(() => {

        if (!props.authenticated || props.decodedToken === null) {

            navigate('/login')
        }
        else {
            navigate('/checkout')
        }
    }, [props.decodedToken])




    let total = 0
    if (props.cart != undefined) {
        props.cart.forEach(item => {
            total = total + item.total
        })
    }

    let productName = []

    let orderedItemShow = props.cart.map(item => {

        let name
        let src
        name = item.productId.name
        productName.push(name)
        let image = item.productId.photo[0]
        let type = image.contentType
        let buff = image.data.data
        const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
        src = `data:${type};base64,${base64String}`

        return (
            <div key={Math.random()} className='d-flex justify-content-between'>
                <div className='px-2'>
                    <img className='me-3' src={src} width='50' alt="" />
                    {name} x {item.quantity}
                </div>
                <div className='pt-2 '>{item.total}</div>

            </div>
        )
    })

    console.log(props.decodedToken);

    return (
        <div className='container py-5'>
            <Alert className=''>Have a coupon? <a href="#">Click here to enter your code</a></Alert>

            <Formik

                initialValues={{

                    firstName: '',
                    lastName: '',
                    email: '',
                    address: '',
                    city: 'dhaka',
                    postCode: '',
                    phone: '',
                    company: '',
                    payment: '',

                }}

                onSubmit={values => {
                    setSpin(true)
                    let newObj = {
                        ...values,
                        total: total,
                        productName: productName.join(','),
                        cartItem: createCartItemArray(props.cart),
                        userId: props.decodedToken._id
                    }
                    console.log(newObj)

                    createPaymentApi(newObj).then(data => {
                        setSpin(false)

                        if (data.status === 'SUCCESS') window.location.replace(data.GatewayPageURL);

                        if (data.status === 'FAILED') window.alert(data.failedreason)
                    })

                }}

            >

                {({ values, handleChange, handleSubmit }) => (

                    <form onSubmit={handleSubmit} action="">

                        <div className="row py-5">
                            <div className="col-md-7 border-end px-4">
                                <h4 className='border-bottom pb-2 pt-3'>Billing Details</h4>
                                <div>
                                    <div className="row pt-3">
                                        <div className="col-6">
                                            <label className='pb-2 pt-3' htmlFor="">First name *</label>
                                            <input
                                                required
                                                type="text"
                                                className='form-control'
                                                onChange={handleChange}
                                                value={values.firstName}
                                                name='firstName'
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className='pb-2 pt-3' htmlFor="">Last name *</label>
                                            <input

                                                type="text"
                                                className='form-control'
                                                onChange={handleChange}
                                                value={values.lastName}
                                                name='lastName'
                                            />
                                        </div>
                                    </div>

                                    <label className='pb-2 pt-3' htmlFor="">Email *</label>
                                    <input
                                        required
                                        type="email"
                                        className='form-control'
                                        onChange={handleChange}
                                        value={values.email}
                                        name='email'
                                    />

                                    <label className='pb-2 pt-3' htmlFor="">Company name *</label>
                                    <input
                                        type="text"
                                        className='form-control'
                                        onChange={handleChange}
                                        value={values.company}
                                        name='company'
                                    />

                                    <label className='pb-2 pt-3' htmlFor="">City / Region</label>
                                    <select required className='form-control' onChange={handleChange} name="city" value={values.city} id="">
                                        <option defaultChecked value="dhaka">Dhaka</option>
                                        <option value="chittagong">Chittagong</option>
                                    </select>

                                    <div className="row pt-4">
                                        <div className="col-6">
                                            <label className='pb-2 pt-3' htmlFor="">Post code *</label>
                                            <input
                                                required
                                                type="number"
                                                className='form-control'
                                                onChange={handleChange}
                                                value={values.postCode}
                                                name='postCode'
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label className='pb-2 pt-3' htmlFor="">Phone *</label>
                                            <input
                                                required
                                                type="text"
                                                className='form-control'
                                                onChange={handleChange}
                                                value={values.phone}
                                                name='phone'
                                            />
                                        </div>
                                    </div>

                                    <label className='pb-2 pt-3' htmlFor="">Street *</label>
                                    <input
                                        required
                                        type="text"
                                        className='form-control'
                                        onChange={handleChange}
                                        value={values.address}
                                        name='address'
                                    />
                                </div>
                            </div>


                            <div className="col-md-5">
                                <h4 className='border-bottom pb-2 pt-3'>Order Review</h4>
                                <div className='px-3 px-md-0 '>
                                    <div className='border-bottom'>{orderedItemShow}</div>
                                    <div className='border-bottom d-flex justify-content-between py-3'>
                                        <strong>Subtotal: </strong>
                                        <div>{total}</div>
                                    </div>

                                    <div className='border-bottom d-flex justify-content-between py-3'>
                                        <strong>Coupon: </strong>
                                        <div>- 0</div>
                                    </div>

                                    <div className='d-flex justify-content-between py-3'>
                                        <strong>Order Total: </strong>
                                        <div>{total}</div>
                                    </div>
                                </div>

                                <div className='py-3'>
                                    <h5 className='fw-bold pb-2'>Payment Method</h5>

                                    <div className='py-2'>

                                        <label htmlFor="cashOn">
                                            <input onChange={handleChange} required value='cashOn' className='form-check-input me-2' type="radio" name="payment" id="cashOn" />
                                            Cash on Delivery
                                        </label> <br />
                                    </div>

                                    <div className='py-2'>

                                        <label htmlFor="ssl">
                                            <input onChange={handleChange} required value='ssl' className='form-check-input me-2' type="radio" name="payment" id="ssl" />
                                            SSL Commerz
                                        </label> <br />

                                    </div>
                                </div>

                                <button className='btn btn-success w-100' type="submit">Continue</button>
                            </div>


                        </div>


                    </form>
                )}

            </Formik>
            {spin === true ? spinner(true) : spinner(false)}
        </div>
    )
}




export default connect(mapStateToProps)(CheckOut)