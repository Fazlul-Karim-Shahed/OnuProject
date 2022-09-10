import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

export default function CatalogCreateModal(props) {

    const [message, setMessage] = useState('')

    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader>
                    Create new catalog
                </ModalHeader>
                <ModalBody>
                    <Formik

                        initialValues={{
                            name: ''
                        }}

                        onSubmit={(value) => {
                            console.log(value)
                            props.setSpin(true)
                            axios.post(process.env.REACT_APP_BACKEND_URL + '/catalog/create', {
                                name: value.name
                            })
                                .then(data => {
                                    console.log(data.data)
                                    if (data.data.error) throw data.data.message
                                    setMessage(data.data.message)
                                    props.setSpin(false)
                                    props.setMessage(data.data.message)
                                    props.setAlertOpen(true)
                                    window.location.reload(false); 
                                    props.toggle()

                                })
                                .catch(err => {
                                    setMessage(err)
                                    props.setAlertOpen(true)
                                    props.setSpin(false)

                                })
                        }}
                    >

                        {({ values, handleChange, handleSubmit }) => (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <input type="text"
                                        onChange={handleChange}
                                        name='name'
                                        className='form-control my-3'
                                        placeholder='Write new catalog name'
                                        value={values.name}
                                    />

                                    <button type='submit' className='btn btn-success'>Create</button>
                                </form>
                            </div>
                        )}

                    </Formik>
                </ModalBody>
                <ModalFooter>
                    <p className=' text-danger'>{message}</p>
                </ModalFooter>
            </Modal>
        </div>
    )
}
