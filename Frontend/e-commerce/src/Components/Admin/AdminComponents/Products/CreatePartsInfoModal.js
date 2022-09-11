import axios from 'axios'
import { Formik } from 'formik'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

export default function createPartsInfoModal(props) {
    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle} >
                <ModalHeader>Create New Parts Info</ModalHeader>
                <ModalBody>
                    <Formik
                        initialValues={{
                            partsInfo: '',
                            productId: props.id,
                            additionalPrice: 0
                        }}

                        onSubmit={values => {
                            console.log(values)
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

                                <button className='btn btn-success my-2' type="submit">Create</button>
                            </form>
                        )}

                    </Formik>
                </ModalBody>
            </Modal>
        </div>
    )
}