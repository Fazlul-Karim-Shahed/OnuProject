import axios from 'axios'
import { Formik } from 'formik'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { createCustomApi } from '../../../API/PropertiesApi'
import { useState } from 'react'

export default function CreateCustomModal(props) {

    const [message, setMessage] = useState('')

    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle} >
                <ModalHeader>Create Custom</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            customProperty: '',
                            productId: props.id,
                            additionalPrice: 0,
                            description: ''
                        }}

                        onSubmit={values => {
                            createCustomApi(values)
                                .then(data => {
                                    if (data.error) throw data.message
                                    setMessage(data.message)
                                })
                                .catch(err => {
                                    setMessage(err)
                                })
                        }}
                    >

                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} action="">

                                <label className='fw-bold' htmlFor="productId">Product Id</label>
                                <input
                                    name='productId'
                                    value={values.productId}
                                    id='productId'
                                    className='form-control'
                                    type="text" />


                                <label className='mt-3 fw-bold' htmlFor="partsInfo">Parts Info</label>
                                <input
                                    name='partsInfo'
                                    onChange={handleChange}
                                    value={values.partsInfo}
                                    id='partsInfo'
                                    className='form-control'
                                    type="text" />


                                <label className='mt-3 fw-bold' htmlFor="additionalPrice">Additional Price</label>
                                <input
                                    name='additionalPrice'
                                    onChange={handleChange}
                                    value={values.additionalPrice}
                                    id='additionalPrice'
                                    className='form-control'
                                    type="number" />

                                <label className='mt-3 fw-bold' htmlFor="description">description</label>
                                <textarea
                                    name='description'
                                    onChange={handleChange}
                                    value={values.description}
                                    id='description'
                                    className='form-control'
                                    type="number" />

                                <button className='btn btn-success my-2' type="submit">Create</button>
                            </form>
                        )}

                    </Formik>
                </ModalBody>

                <ModalFooter className={message === '' ? 'd-none' : 'd-block'}>
                    <div className='text-center w-75 m-auto fw-bold text-danger'>{message}</div>
                </ModalFooter>

            </Modal>
        </div>
    )
}