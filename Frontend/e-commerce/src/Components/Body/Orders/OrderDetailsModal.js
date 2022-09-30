import React, { useEffect } from 'react'
import { useState } from 'react';
import { Modal, ModalBody, ModalHeader, Toast, ToastHeader, ToastBody } from 'reactstrap'

export default function OrderDetailsModal(props) {

    let details = props.orderDetails
    if (details === null || details === undefined) return <div></div>


    console.log(details);

    let cartItemShow = details.cartItem.map((cartItem, index) => {

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



    return (
        <div>
            <Modal className='modal-xl' size='lg' isOpen={props.open} toggle={props.toggle}>
                <ModalHeader toggle={props.toggle}>
                    <div className=''>Order Details</div>
                </ModalHeader>
                <ModalBody>
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
                            <div className='my-2'><strong>Customer Id:</strong> {details.userId}</div>
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
                                <div className="col-md-7"></div>
                                <div className="col-md-3">
                                    <div>Order Subtotal:</div>
                                    <div>Discount Adjustment:</div>
                                    <div>Shipping Cost:</div>
                                    <div className='text-danger'>Order Total:</div>
                                </div>
                                <div className="col-md-2">
                                    <div>৳ {details.totalAmount}</div>
                                    <div>৳ 0</div> 
                                    <div>৳ 0</div>
                                    <div className='text-danger'>৳ {details.totalAmount}</div>
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
        </div>
    )
}
