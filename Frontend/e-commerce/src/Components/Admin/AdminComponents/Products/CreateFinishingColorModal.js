import axios from 'axios'
import { Formik } from 'formik'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'

export default function createFinishingColorModal(props) {
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
            </Modal>
        </div>
    )
}