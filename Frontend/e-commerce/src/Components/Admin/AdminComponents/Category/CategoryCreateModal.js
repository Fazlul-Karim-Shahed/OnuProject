import React from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { Formik } from 'formik'
import axios from 'axios'

export default function CategoryCreateModal(props) {
    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader>
                    Create a category
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            name: '',
                            catalogId: ''
                        }}

                        onSubmit={(values) => {
                            props.setSpin(true)
                            console.log(values)
                            axios.post(process.env.REACT_APP_BACKEND_URL + '/category/create', {
                                name: values.name,
                                catalogId: values.catalogId
                            })
                                .then(data => {
                                    console.log(data.data)
                                    // props.setCategory(props.category.concat(data.data.value))
                                    //   window.location.reload(false); 
                                    props.setSpin(false)
                                })
                                .catch(err => {
                                    console.log(err)
                                    props.setSpin(false)
                                })
                        }}

                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <div className=''>
                                <form className='' onSubmit={handleSubmit} action="">

                                    <select
                                        onChange={handleChange}
                                        className='my-3  form-control'
                                        name="catalogId">
                                        <option>Select catalog</option>
                                        {props.options}
                                    </select>
                                    <input
                                        value={values.name}
                                        name='name'
                                        className='my-3 form-control'
                                        onChange={handleChange}
                                        placeholder='Enter category name'
                                        type="text" />
                                    
                                    <button onClick={props.toggle} className='btn btn-success' type="submit">Submit</button>
                                </form>
                            </div>
                        )}

                    </Formik>
                </ModalBody>
                <ModalFooter>

                </ModalFooter>
            </Modal>
        </div>
    )
}
