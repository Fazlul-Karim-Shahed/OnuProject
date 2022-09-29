import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { getOneProductAllProperties, } from '../../../API/PropertiesApi'
import { Form, Formik } from 'formik'
import { createFormData } from '../../AdminFunctions/createFormData'
import { createProductPropertiesApi, deleteProductPropertiesApi, getOneProductProperties } from '../../../API/ProductPropertiesApi'
import { Badge, Card, CardImg } from 'reactstrap'

export default function Properties(props) {

    const [open, setOpen] = useState(false)
    const [finishing, setFinishing] = useState([])
    const [size, setSize] = useState([])
    const [finishingColor, setFinishingColor] = useState([])
    const [partsInfo, setPartsInfo] = useState([])
    const [photoArr, setPhotoArr] = useState([])
    const [properties, setProperties] = useState([])
    const [message, setMessage] = useState('')



    useEffect(() => {

        getOneProductAllProperties(props.id).then(data => {

            setFinishing(data.value.finishing)
            setSize(data.value.size)
            setFinishingColor(data.value.finishingColor)
            setPartsInfo(data.value.partsInfo)
        })

        getOneProductProperties(props.id).then(data => {
            console.log('getOneProductProperties: ', data);
            setProperties(data.value)
        })

    }, [])




    let finishingColorOptions = finishingColor.map(item => {
        return <option key={Math.random()} value={item._id}>{item.finishingColor}</option>
    })

    let sizeOptions = size.map(item => {
        return <option key={Math.random()} value={item._id}>{item.size}</option>
    })

    let finishingOptions = finishing.map(item => {
        return <option key={Math.random()} value={item._id}>{item.finishing}</option>
    })

    let partsInfoOptions = partsInfo.map(item => {
        return <option key={Math.random()} value={item._id}>{item.partsInfo}</option>
    })


    const toggle = () => setOpen(!open)

    const changePhoto = e => {
        setPhotoArr([...photoArr, ...e.target.files])
    }

    const addPhoto = () => {
        const photoDiv = document.getElementsByClassName('photoDiv')[0]
        const input = document.createElement('input')
        input.setAttribute('name', 'photo')
        input.setAttribute('type', 'file')
        input.onchange = e => changePhoto(e)

        photoDiv.appendChild(input)

    }

    const deleteProperty = item => {

        if (window.confirm('Are you sure?')) {
            deleteProductPropertiesApi(item).then(data => getOneProductProperties(props.id).then(data => {
                console.log('After delete: ', data);
                setProperties(data.value)
            }))
        }
    }
    console.log(properties);
    let productProperty = properties === undefined ? <p className='text-center'>No properties found</p> : properties.map(item => {

        let photos = item.photo.map((image, index) => <img className='img-fluid mx-2' src={`${process.env.REACT_APP_BACKEND_URL}/product-properties/${item._id}/${index}`} width='8%' />)
        

        return (
            <div className='my-3'>
                <Badge className='mx-1' color='primary'>Finishing: {item.finishingId.finishing}</Badge>
                <Badge className='mx-1' color='primary'>Finishing Color: {item.finishingColorId.finishingColor}</Badge>
                <Badge className='mx-1' color='primary'>Size: {item.sizeId.size}</Badge>
                <Badge className='mx-1' color='primary'>Parts info: {item.partsInfoId.partsInfo}</Badge> <br />

                <div className='my-2'>{photos}</div>
                <button onClick={() => deleteProperty(item)} className='mx-2 float-end btn btn-danger btn-sm'>Delete property</button> <br />
                <hr />

            </div>
        )
    })

    return (
        <div>

            <div className=''>
                {productProperty}
            </div>

            <button onClick={toggle}>Add New Properties</button>


            <Modal isOpen={open} toggle={toggle} size='xl'>
                <ModalHeader>Add New Properties</ModalHeader>
                <ModalBody>
                    <Formik

                        initialValues={{
                            productId: props.id,
                            finishingId: '',
                            finishingColorId: '',
                            sizeId: '',
                            partsInfoId: '',


                        }}

                        onSubmit={values => {
                            console.log(values)
                            values = {
                                ...values,
                                photo: photoArr
                            }

                            let formData = createFormData(values)
                            createProductPropertiesApi(formData).then(data => {
                                setMessage(data.message)

                                getOneProductProperties(props.id).then(data => {
                                    console.log('After create: ', data)
                                    setProperties(data.value)
                                })

                            })

                        }}

                    >
                        {({ values, handleChange, handleSubmit }) => (
                            <form onSubmit={handleSubmit} action="">
                                <select className='form-control' onChange={handleChange} value={values.finishingId} name="finishingId" id="">
                                    <option value=''>Select Finishing</option>
                                    {finishingOptions}
                                </select>
                                <select className='form-control my-2' onChange={handleChange} value={values.finishingColorId} name="finishingColorId" id="">
                                    <option value=''>Select Finishing color</option>
                                    {finishingColorOptions}
                                </select>
                                <select className='form-control my-2' onChange={handleChange} value={values.sizeId} name="sizeId" id="">
                                    <option value=''>Select size</option>
                                    {sizeOptions}
                                </select>
                                <select className='form-control my-2' onChange={handleChange} value={values.partsInfoId} name="partsInfoId" id="">
                                    <option value=''>Select Parts info</option>
                                    {partsInfoOptions}
                                </select>

                                <div className='photoDiv'></div>
                                <div onClick={addPhoto} className='btn btn-primary my-2'>Add photo</div> <br />

                                <button className='btn btn-success my-2' type="submit">Submit</button>
                            </form>
                        )}

                    </Formik>
                </ModalBody>
                <ModalFooter><p className='text-center w-100 text-danger'>{message}</p></ModalFooter>
            </Modal>
        </div>
    )
}
