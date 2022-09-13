import axios from 'axios'
import { Formik } from 'formik'
import { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { createFinishingColorApi } from '../../../API/PropertiesApi'

export default function CreateFinishingColorModal(props) {

    const [message, setMessage] = useState('')
    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle} >
                <ModalHeader>Create New Finishing Color</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            finishingColor: '',
                            productId: props.id,
                            additionalPrice: 0
                        }}

                        onSubmit={values => {
                            createFinishingColorApi(values)
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


                                <label className='mt-3 fw-bold' htmlFor="size">Finishing Color</label>
                                <input
                                    name='finishingColor'
                                    onChange={handleChange}
                                    value={values.finishingColor}
                                    id='finishingColor'
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