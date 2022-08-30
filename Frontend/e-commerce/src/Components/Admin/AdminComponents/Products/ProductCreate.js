import React, { createElement, useEffect, useState } from 'react'
import { getCatalogApi } from '../../../API/CatalogApi'
import { getCategoryApi, getCategoryByCatalogApi, getSubCategoryFilterApi } from '../../../API/CategoryApi'
import { getSubCategoryApi } from '../../../API/SubCategoryApi'
import { Form, Formik } from 'formik'
import { spinner } from '../../../Body/Spinner'

export default function ProductCreate(props) {

    const [spin, setSpin] = useState(false)
    const [category, setCategory] = useState([])
    const [catalog, setCatalog] = useState([])
    const [subCategory, setSubcategory] = useState([])
    const [state, setState] = useState({

        name: '',
        catalogId: '',
        categoryId: '',
        subCategoryId: '',
        price: '',
        discount: '',
        description: '',
        quantity: '',
        photo: []
    })

    useEffect(() => {

        setSpin(true)

        getCatalogApi().then(data => {
            console.log(data);
            setSpin(false)
            setCatalog([...data.value])

        })
            .catch(err => {
                setSpin(false)
                console.log(err);
            })

    }, [])



    let catalogOptions = catalog.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })

    let subCategoryOptions = subCategory.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })

    let categoryOption = category.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })



    const change = (e) => {
        console.log(e.target.value);
        if (e.target.name === 'photo') {

            setState({
                ...state,
                photo: [...state.photo.push(e.target.value)]
            })
        }
        else {
            setState({
                ...state,
                [e.target.name]: e.target.value
            })
        }

        if (e.target.name === 'catalogId') {

            setSpin(true)
            getCategoryByCatalogApi(e.target.value)
                .then(data => {
                    console.log(data);
                    if (data.error) throw data.message
                    setCategory(data.value)
                    setSpin(false)

                })
                .catch(err => {
                    console.log(err)
                    setCategory([])
                })
        }
        if (e.target.name === 'categoryId') {
            setSpin(true)
            getSubCategoryFilterApi(state.catalogId, e.target.value)
                .then(data => {
                    if (data.error) throw data.message
                    setSubcategory(data.value)
                    console.log(data);
                    setSpin(false)
                })
        }
    }

    const submit = (e) => {

        console.log(state);

        e.preventDefault()



    }


    let photoDiv = document.getElementsByClassName('photo')[0]
    const add = () => {

        let inp = document.createElement('input')
        inp.classList.add('photoInp', 'form-control', 'w-50', 'd-inline', 'my-2')
        inp.onchange = (e) => change(e)
        inp.setAttribute('type', 'file')
        inp.setAttribute('name', 'photo')

        let x = document.createElement('div')
        x.classList.add('xBtn', 'btn')
        x.appendChild(document.createTextNode('X'))

        photoDiv.appendChild(inp)
        photoDiv.appendChild(x)

    }

    return (
        <div>

            <form onSubmit={(e) => submit(e)}>
                <div className='d-flex my-3' >
                    <select required onChange={e => change(e)} name='catalogId' value={state.catalogId} className="form-control w-25 d-inline mx-1">
                        <option>Select Catalog</option>
                        {catalogOptions}
                    </select>
                    <select required onChange={e => change(e)} name='categoryId' value={state.categoryId} className="form-control w-25 d-inline mx-1">
                        <option>Select Category</option>
                        {categoryOption}
                    </select>
                    <select required onChange={e => change(e)} name='subCategoryId' value={state.subCategoryId} className="form-control w-25 d-inline mx-1">
                        <option>Select Subcategory</option>
                        {subCategoryOptions}
                    </select>

                </div>
                <input required placeholder='Product name' name='name' value={state.name} onChange={e => change(e)} className='form-control' type="text" /> <br />

                <input required placeholder='Quantity' name='quantity' value={state.quantity} onChange={e => change(e)} className='form-control' type="number" /> <br />

                <input required placeholder='Price' name='price' value={state.price} onChange={e => change(e)} className='form-control' type='number' /> <br />

                <input placeholder='Discount (optional)' name='discount' value={state.discount} onChange={e => change(e)} className='form-control' type="number" /> <br />

                <input required placeholder='Description' name='description' value={state.description} onChange={e => change(e)} className='form-control' type="text" /> <br />


                <div className="photo"></div>
                <button className='my-3' onClick={add}>Add photo</button> <br />

                <button type="submit">Upload</button>
            </form>

            {spin ? spinner(true) : ''}
        </div>
    )
}
