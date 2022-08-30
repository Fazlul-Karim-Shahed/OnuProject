import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function SubCategoryEditModal(props) {

    console.log(props.item);

    const [filter, setFilter] = useState({
        name: props.item.name,
        categoryId: props.item.categoryId._id,
        catalogId: props.item.catalogId._id
    })
    const [category, setCategory] = useState([])
    // const [catalog, setCatalog] = useState([])
    const [spin, setSpin] = useState(false)


    useEffect(() => {
        axios.get(process.env.REACT_APP_BACKEND_URL + '/category/id/' + filter.catalogId)
            .then(data => {
                setCategory(data.data.value)
                console.log(data.data);
                setSpin(false)

            })
    }, [])

    const change = (e) => {

        console.log(e.target.value);
        setSpin(true)
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
        if (e.target.name === 'catalogId') {

            axios.get(process.env.REACT_APP_BACKEND_URL + '/category/id/' + e.target.value)
                .then(data => {
                    setCategory(data.data.value)
                    console.log(data.data);
                    setSpin(false)

                })
        }

        // console.log(filter);
    }

    const submit = (e) => {
        console.log(filter);

        axios.put(process.env.REACT_APP_BACKEND_URL + '/subcategory/' + props.item._id, {
            name: filter.name,
            categoryId: filter.categoryId,
            catalogId: filter.catalogId
        })
            .then(data => {
                console.log(data.data);
            })
            .catch(err => {
                console.log(err);
            })

        e.preventDefault()

    }

    let catalogOptions = props.catalog.map(item => {
        console.log(item._id === props.item._id);

        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })

    let categoryOption
    if (!category || filter.catalogId === '') categoryOption = '';
    else {
        categoryOption = category.map(item => {
            return <option key={Math.random()} value={item._id}>{item.name}</option>
        })
    }


    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader>Edit Subcategory</ModalHeader>
                <ModalBody>

                    <form onSubmit={(e) => submit(e)} action="">

                        <label className='mt-3' htmlFor="catalogId">Change catalog</label>
                        <select defaultValue={props.item._id} name='catalogId' value={filter.catalogId} onChange={(e) => change(e)} className=' form-control my-2' id="catalogId">
                            <option value=''>Change catalog</option>
                            {catalogOptions}
                        </select>

                        <label className='mt-3' htmlFor="categoryId">Change category</label>
                        <select name='categoryId' value={filter.categoryId} onChange={(e) => change(e)} className=' form-control my-2' id="categoryId">
                            <option value=''>Change category</option>
                            {categoryOption}
                        </select>

                        <label className='mt-3' htmlFor="name">Edit subcategory</label>
                        <input
                            value={filter.name}
                            onChange={e => change(e)}
                            name='name'
                            className='my-2 form-control'
                            placeholder='Write subcategory name'
                            type="text" />

                        <button className='btn btn-primary' type="submit">Create</button>

                    </form>
                </ModalBody>
                <ModalFooter></ModalFooter>
            </Modal>
        </div>
    )
}
