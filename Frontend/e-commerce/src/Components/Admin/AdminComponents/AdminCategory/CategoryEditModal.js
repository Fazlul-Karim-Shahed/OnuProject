import axios from 'axios'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { spinner } from '../../../Body/Spinner'


export default function CategoryEditModal(props) {

    const [spin, setSpin] = useState(false)

    console.log(props.selectedCategory);
    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader>
                    Edit category
                </ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            id: props.selectedCategory._id,
                            name: props.selectedCategory.name,
                            catalogId: props.selectedCategory.catalogId
                        }}

                        onSubmit={(values) => {
                            setSpin(true)
                            console.log(values)
                            // console.log(props.selectedCategory)

                            axios.put(process.env.REACT_APP_BACKEND_URL + '/category/update/', {
                                id: values.id,
                                name: values.name,
                                catalogId: values.catalogId
                            })
                                .then(data => {
                                    console.log(data.data)
                                    alert(data.data.message)
                                    window.location.reload(false);
                                    setSpin(false)

                                })
                                .catch(err => {
                                    console.log(err)
                                    setSpin(false)
                                })
                        }}

                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <div className=''>
                                <form className='' onSubmit={handleSubmit} action="">

                                    <label htmlFor="catalog" className='text-danger'>Change catalog: </label>
                                    <select
                                        onChange={handleChange}
                                        className='my-3  form-control'
                                        name="catalogId"
                                        id='catalog'
                                    >
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
            {spin ? spinner(true) : spinner(false)}
        </div>
    )
}
