import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOneProductApi, updateOneProductApi } from '../../../API/ProductApi';
import { useField, Form, FormikProps, Formik } from 'formik';
import { getCatalogApi } from '../../../API/CatalogApi';
import { getCategoryByCatalogApi } from '../../../API/CategoryApi';

export default function ProductDetails() {

    const [catalog, setCatalog] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubcategory] = useState([])
    const [product, setProduct] = useState(null)
    const [photoArr, setPhotoArr] = useState([])

    let { id } = useParams()

    useEffect(() => {
        getOneProductApi(id).then(data => {
            setProduct(data.value)

            getCategoryByCatalogApi(data.value.catalogId._id)
                .then(data => setCategory(data.value))
        })
            .catch(err => {
                console.log(err);
            })

        getCatalogApi().then(data => {
            // console.log(data.value);
            setCatalog(data.value)
        })


    }, [])

    if (product == null) return <div></div>

    const getCatalog = (e) => {
        console.log(e.target.value);
        getCategoryByCatalogApi(e.target.value)
            .then(data => {
                console.log(data);
                setCategory(data.value)
            })
    }

    let catalogOptions = catalog.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })

    let categoryOption = category.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })

    let subCategoryOption = subCategory.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })


    const imgIndex = (index) => {

    }

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

    const removeImg = index => {
        product.photo.splice(index, 1)
        setProduct({ ...product })
    }

    let photos = product.photo.map((item, index) => {
        let type = item.contentType
        let buff = item.data.data
        const base64String = btoa(String.fromCharCode(...new Uint8Array(buff)));
        let src = `data:${type};base64,${base64String}`
        return (
            <div onMouseOver={() => hoverImg(index)} onMouseOut={() => mouseOutImg(index)} className='position-relative d-inline' key={Math.random()}>
                <img className='px-1 opacity-100 imageOpc' src={src} width='15%' alt="" />
                <span onClick={() => removeImg(index)} style={{ cursor: 'pointer', left: '30%', top: '0%' }} className='imgHover position-absolute bg-danger text-white p-2 small d-none'>remove</span>
            </div>
        )


    })

    const addPhoto = e => {
        console.log(e.target.value);
        setPhotoArr([...photoArr.push(e.target.value)])
    }

    const addPhotoDiv = document.getElementsByClassName('addPhotoDiv')[0]
    const add = () => {

        let inp = document.createElement('input')
        inp.classList.add('photoInp', 'form-control', 'w-50', 'd-inline', 'my-2')
        inp.onchange = (e) => addPhoto(e)
        inp.setAttribute('type', 'file')
        inp.setAttribute('name', 'photo')


        let x = document.createElement('div')
        x.classList.add('xBtn', 'btn')
        x.appendChild(document.createTextNode('X'))

        addPhotoDiv.appendChild(inp)
        addPhotoDiv.appendChild(x)

    }

    return (
        <div className='mt-4'>
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
                    photo: [...product.photo, photoArr]

                }}

                onSubmit={values => {
                    
                    updateOneProductApi(id, values).then(data => {
                        console.log(data)
                    })
                    .catch(err => console.log(err))

                }}

            >

                {({ values, handleChange, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <input placeholder='Product name' name='name' value={values.name} onChange={handleChange} className='form-control' type="text" /> <br />

                        <input required placeholder='Quantity' name='quantity' value={values.quantity} onChange={handleChange} className='form-control' type="number" /> <br />

                        <input required placeholder='Price' name='price' value={values.price} onChange={handleChange} className='form-control' type='number' /> <br />

                        <input placeholder='Discount (optional)' name='discount' value={values.discount} onChange={handleChange} className='form-control' type="number" /> <br />

                        <input required placeholder='Description' name='description' value={values.description} onChange={handleChange} className='form-control' type="textarea" /> <br />


                        <div className="photo">
                            {photos} <br />
                            <div className="addPhotoDiv"></div>
                            <div className='my-3 btn btn-success btn-sm text-center' onClick={add}>Add photo</div> 
                            
                        </div>



                        <select onClick={e => getCatalog(e)} value={values.catalogId} onChange={handleChange} name="catalog" id="">
                            {catalogOptions}
                        </select>
                        <select value={values.catalogId} onChange={handleChange} name="catalog" id="">
                            {categoryOption}
                        </select> <br />

                        <button type="submit">Submit</button>
                        <br />
                    </form>
                )}

            </Formik>
        </div>
    )
}
