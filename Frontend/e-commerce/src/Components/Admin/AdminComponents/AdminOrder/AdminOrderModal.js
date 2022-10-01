import { Formik } from 'formik';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Toast, ToastHeader, ToastBody } from 'reactstrap'
import { cancelOrderApi, updateOrderStatusApi } from '../../../API/OrderApi';
import { spinner } from '../../../Body/Spinner'

export default function AdminOrdersModal(props) {

    let details = props.orderDetails
    const [message, setMessage] = useState('')
    const [spin, setSpin] = useState(false)

    if (details === null || details === undefined) return <div></div>


    console.log(details)

    let cartItemShow = details.cartItem.map((cartItem) => {

        return (

            <div>
                <div className="row">
                    <div className="col-md-2">
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/product/${cartItem.productId._id}/${0}`} alt="" width='100px' />
                    </div>
                    <div className="col-md-4">
                        <strong>{cartItem.productId.name}</strong> <br />
                        Finishing: {cartItem.finishingId.finishing} <br />
                        Finishing Color: {cartItem.finishingColorId.finishingColor} <br />
                        Size: {cartItem.sizeId.size} <br />
                        Parts Info: {cartItem.partsInfoId.partsInfo} <br />
                    </div>
                    <div className="col-md-2">Qty: {cartItem.quantity}</div>
                    <div className="col-md-2">Each: {cartItem.price}</div>
                    <div className="col-md-2">Total: {cartItem.total}</div>
                </div>
                <hr />
            </div>
        )
    })


    const cancel = () => {
        setSpin(true)
        cancelOrderApi(details._id).then(data => {
            setMessage(data.message)
            setSpin(false)
        })
    }

    return (
        <div>
            <Modal className='modal-xl' size='lg' isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    <div className=''>Order Details</div>
                </ModalHeader>
                <ModalBody>

                    <Toast className='w-100 mb-4'>
                        <ToastHeader className='bg-light'>Edit</ToastHeader>
                        <ToastBody>
                            <Formik

                                initialValues={{
                                    productStatus: details.productStatus
                                }}

                                onSubmit={val => {
                                    setSpin(true)
                                    updateOrderStatusApi(details._id, val).then(data => {
                                        setMessage(data.message)
                                        setSpin(false)
                                    })
                                }}

                            >

                                {({ values, handleChange, handleSubmit }) => (
                                    <form onSubmit={handleSubmit} action="">
                                        <label className='me-3' htmlFor="">Product Status: </label>
                                        <select value={values.productStatus} className='form-control w-50 d-inline mx-2' onChange={handleChange} name="productStatus" id="">
                                            <option selected={details.productStatus === 'processing'} value="processing">Processing</option>
                                            <option selected={details.productStatus === 'delivered'} value="delivered">Delivered</option>
                                            <option selected={details.productStatus === 'prepared'} value="prepared">Prepared</option>
                                            <option selected={details.productStatus === 'received'} value="received">Order Received</option>
                                        </select>
                                        <br />

                                        <div className='my-3'>
                                            <button type="submit" className="btn btn-danger">Update</button>
                                            <div onClick={cancel} className="btn btn-danger mx-2">Cancel order</div>
                                        </div>

                                        <div className='text-center mt-3 text-success fw-bold'>{message}</div>
                                    </form>

                                )}
                            </Formik>

                        </ToastBody>
                    </Toast>

                    <Toast className='w-100 mb-4'>
                        <ToastHeader className='bg-light'>Order</ToastHeader>
                        <ToastBody>
                            <div className='my-2'><strong>Order Id:</strong> {details._id}</div>
                            <div className='my-2'><strong>Order Date:</strong> {new Date().toUTCString(details.createdAt)}</div>
                        </ToastBody>
                    </Toast>


                    <Toast className='my-4 w-100'>
                        <ToastHeader className='bg-light'>Shipping Information</ToastHeader>
                        <ToastBody>
                            <div className='my-2'><strong>Customer Name:</strong> {details.profile.customerName}</div>

                            <div className='my-2'><strong>Customer Id:</strong> {details.userId._id}</div>
                            <div className='my-2'><strong>Email:</strong> {details.profile.email}</div>
                            <div className='my-2'><strong>Phone:</strong> {details.profile.phone}</div>
                            <div className='my-2'><strong>Post Code:</strong> {details.profile.postCode}</div>
                            <div className='my-2'><strong>Shipping Address:</strong> {details.profile.address}</div>
                            <div className='my-2'><strong>City:</strong> {details.profile.city}</div>
                        </ToastBody>
                    </Toast>


                    <Toast className='my-4 w-100'>
                        <ToastHeader className='bg-light'>Product</ToastHeader>
                        <ToastBody>
                            {cartItemShow}
                            <div className='row'>
                                <div className=" col-md-7"></div>
                                <div className=" col-md-4">
                                    <div className='d-flex justify-content-between py-1'>
                                        <strong>Order Subtotal: </strong>
                                        <div>৳ {details.totalAmount}</div>
                                    </div>
                                    <div className='d-flex justify-content-between py-1'>
                                        <strong>Discount Adjustment: </strong>
                                        <div>৳ 0</div>
                                    </div>
                                    <div className='d-flex justify-content-between py-1'>
                                        <strong>Shipping Fee: </strong>
                                        <div>৳ 0</div>
                                    </div>
                                    <div className='d-flex justify-content-between py-1 text-danger' >
                                        <strong>Order Total: </strong>
                                        <div>৳ {details.totalAmount}</div>
                                    </div>
                                </div>
                            </div>

                        </ToastBody>
                    </Toast>


                    <Toast className='my-4 w-100'>
                        <ToastHeader className='bg-light'>Billing Information</ToastHeader>
                        <ToastBody>
                            {details.paymentMethod === 'cashOn' ?

                                <div>
                                    <div className='my-2'><strong>Payment Method:</strong> {details.paymentMethod}</div>
                                    <div className='my-2'><strong>Payment Status:</strong> {details.paymentStatus}</div>
                                    <div className='my-2'><strong>Total Amount:</strong> {details.totalAmount}</div>
                                    <div className='my-2'><strong>Tracking Id:</strong> {details.transactionId}</div>
                                </div>

                                :

                                <div>
                                    <div className='my-2'><strong>Payment Method:</strong> {details.paymentMethod}</div>
                                    <div className='my-2'><strong>Payment Status:</strong> {details.paymentStatus}</div>
                                    <div className='my-2'><strong>Total Amount:</strong> {details.totalAmount}</div>
                                    <div className='my-2'><strong>Tracking Id:</strong> {details.transactionId}</div>
                                    <div className='my-2'><strong>Bank Transaction Id:</strong> {details.bankTransactionId}</div>
                                    <div className='my-2'><strong>Card Issuer:</strong> {details.cardIssuer}</div>
                                    <div className='my-2'><strong>Card Issuer Country Code:</strong> {details.cardIssuerCountryCode}</div>
                                    <div className='my-2'><strong>Card No:</strong> {details.cardNo}</div>
                                    <div className='my-2'><strong>Card Type:</strong> {details.cardType}</div>
                                    <div className='my-2'><strong>Transaction Date:</strong> {new Date().toUTCString(details.transactionId)}</div>
                                    <div className='my-2'><strong>Transaction Id:</strong> {details.transactionId}</div>
                                </div>

                            }
                        </ToastBody>

                    </Toast>

                </ModalBody>
            </Modal>

            {/* {spin ? spinner(true) : spinner(false)} */}
            {spinner(spin)}
        </div>
    )
}
