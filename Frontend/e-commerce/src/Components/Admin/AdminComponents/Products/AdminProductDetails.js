import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProductApi, updateOneProductApi } from '../../../API/ProductApi';
import { Formik } from 'formik';
import { updateProductFormData } from '../../AdminFunctions/createFormData';
import CreateFinishingModal from './CreateFinishingModal';
import CreateSizeModal from './CreateSizeModal';
import CreatePartsInfoModal from './CreatePartsInfoModal';
import CreateCustomModal from './CreateCustomModal';
import CreateFinishingColorModal from './CreateFinishingColorModal';
import Properties from './Properties';

export default function ProductDetails() {


    const [product, setProduct] = useState(null)
    const [photoArr, setPhotoArr] = useState([])
    const [deletedPhotoArr, setDeletedPhotoArr] = useState([])
    const [mode, setMode] = useState('')
    const [open, setOpen] = useState(false)

    let { id } = useParams()

    useEffect(() => {
        getOneProductApi(id).then(data => {
            setProduct(data.value)
        })
            .catch(err => {
                console.log(err);
            })

    }, [])

    if (product == null) return <div>Not found</div>


    const hoverImg = index => {

        document.getElementsByClassName('imgHover')[index].classList.remove('d-none')
        document.getElementsByClassName('imgHover')[index].classList.add('d-block')
        document.getElementsByClassName('imageOpc')[index].classList.remove('opacity-100')
        document.getElementsByClassName('imageOpc')[index].classList.add('opacity-50')
    }

    const mouseOutImg = index => {
        document.getElementsByClassName('imgHover')[index].classList.remove('d-block')
        document.getElementsByClassName('imgHover')[index].classList.add('d-none')
        document.getElementsByClassName('imageOpc')[index].classList.add('opacity-100')
        document.getElementsByClassName('imageOpc')[index].classList.remove('opacity-50')
    }

    const removeImg = (id, index) => {
        product.photo.splice(index, 1)
        setProduct({ ...product })
        deletedPhotoArr.push(id)
        setDeletedPhotoArr([...deletedPhotoArr])

    }

    let photos = product.photo.map((item, index) => {

        return (
            <div onMouseOver={() => hoverImg(index)} onMouseOut={() => mouseOutImg(index)} className='position-relative d-inline' key={Math.random()}>
                
                <img className='px-1 opacity-100 imageOpc' src={`${process.env.REACT_APP_BACKEND_URL}/product/${product._id}/${index}`} width='15%' alt="" />
                
                <span onClick={() => removeImg(item._id, index)} style={{ cursor: 'pointer', left: '30%', top: '0%' }} className='imgHover position-absolute bg-danger text-white p-2 small d-none'>remove</span>
            </div>
        )

    })

    const addPhoto = e => {
        photoArr.push(e.target.files[0])

    }



    const add = () => {

        let addPhotoDiv = document.getElementsByClassName('addPhotoDiv')[0]

        let inp = document.createElement('input')
        inp.classList.add('photoInp', 'form-control', 'w-50', 'd-inline', 'my-2')
        inp.onchange = (e) => addPhoto(e)
        inp.setAttribute('type', 'file')
        inp.setAttribute('name', 'addedPhoto')
        let br = document.createElement('br')

        addPhotoDiv.appendChild(inp)
        addPhotoDiv.appendChild(br)



    }


    const deleteProduct = () => {
        alert('Are you sure? ')
    }

    const toggle = () => setOpen(!open)

    const propertyModal = str => {
        setMode(str)
        setOpen(!open)
    }

    return (
        <div className='mt-4'>

            <div className='my-3 text-end'>
                <button onClick={() => propertyModal('finishing')} className='mx-2'>Create Finishing</button>
                <button onClick={() => propertyModal('finishingColor')} className='mx-2'>Create Finishing Color</button>
                <button onClick={() => propertyModal('size')} className='mx-2'>Create Size</button>
                <button onClick={() => propertyModal('partsInfo')} className='mx-2'>Create Parts Info</button>
                <button onClick={() => propertyModal('custom')} className='mx-2'>Create custom</button>
            </div>
            <br />
            <Formik

                initialValues={{
                    catalogId: product.catalogId._id,
                    categoryId: product.categoryId._id,
                    subCategoryId: product.subCategoryId._id,
                    name: product.name,
                    quantity: product.quantity,
                    price: product.price,
                    discount: product.discount,
                    description: product.description,
                    addedPhoto: photoArr,

                }}

                onSubmit={values => {

                    console.log(deletedPhotoArr)
                    const formData = updateProductFormData(values)
                    updateOneProductApi(id, formData, deletedPhotoArr).then(data => {
                        console.log(data)
                        getOneProductApi(id).then(data => {
                            setProduct(data.value)
                        })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                        .catch(err => console.log(err))

                }}

            >

                {({ values, handleChange, handleSubmit }) => (
                    <form id='productUpdateForm' onSubmit={handleSubmit}>

                        <h5 className='mb-4'>Product Id: {product._id}</h5>
                        <label className='fw-bold' htmlFor="name">Name</label>
                        <input placeholder='Product name' id='name' name='name' value={values.name} onChange={handleChange} className='form-control' type="text" /> <br />

                        <label className='fw-bold' htmlFor="">Quantity</label>
                        <input required placeholder='Quantity' name='quantity' value={values.quantity} onChange={handleChange} className='form-control' type="number" /> <br />

                        <label className='fw-bold' htmlFor="">Price</label>
                        <input required name='price' value={values.price} onChange={handleChange} className='form-control' type='number' /> <br />

                        <label className='fw-bold' htmlFor="">Discount %</label>
                        <input required placeholder='ie. 10' name='discount' value={values.discount} onChange={handleChange} className='form-control' type="number" /> <br />

                        <label className='fw-bold' htmlFor="">Description</label>
                        <textarea required placeholder='Description' name='description' value={values.description} onChange={handleChange} className='form-control' /> <br />


                        <label className='fw-bold' htmlFor="">Photos</label>
                        <div className="photo">
                            {photos} <br />
                            <div className="addPhotoDiv"></div>
                            <div className='my-3 btn btn-info btn-sm text-center' onClick={add}>Add photo</div>

                        </div>

                        <button className='btn btn-success my-2' type="submit">Update</button>
                        <br />
                    </form>
                )}

            </Formik>

            <hr />

            <div className='properties-section'>

                {mode === 'finishing' ? <CreateFinishingModal id={product._id} open={open} toggle={toggle} /> : ''}
                {mode === 'size' ? <CreateSizeModal id={product._id} open={open} toggle={toggle} /> : ''}
                {mode === 'partsInfo' ? <CreatePartsInfoModal id={product._id} open={open} toggle={toggle} /> : ''}
                {mode === 'custom' ? <CreateCustomModal id={product._id} open={open} toggle={toggle} /> : ''}
                {mode === 'finishingColor' ? <CreateFinishingColorModal id={product._id} open={open} toggle={toggle} /> : ''}

                <h2>Add Properties</h2>
                <Properties id={product._id} />
            </div>



            <div onClick={deleteProduct} className='btn btn-danger my-2 w-100'>Delete Product</div>
        </div>
    )
}
