import axios from 'axios'
import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default function SubCategoryCreateModal(props) {


    const [state, setState] = useState({
        name: '',
        categoryId: '',
        catalogId: ''
    })

    const [category, setCategory] = useState([])


    const change = (e) => {

        if (e.target.name === 'catalogId') {
            axios.get(process.env.REACT_APP_BACKEND_URL + '/category/id/' + e.target.value)
                .then(data => {
                    setCategory(data.data.value)
                    console.log(data.data);

                })
        }

        setState({
            ...state,
            [e.target.name]: e.target.value
        })

    }

    const submit = (e) => {

        console.log(state);
        axios.post(process.env.REACT_APP_BACKEND_URL + '/subcategory', {
            name: state.name,
            catalogId: state.catalogId,
            categoryId: state.categoryId
        })
            .then(data => {
                console.log(data.data);
                window.location.reload(false)
                props.toggle()

            })
            .catch(err => {
                console.log(err);
                props.toggle()
            })


        e.preventDefault()
    }

    let catalogOptions = props.catalog.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })

    let categoryOption = category.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })


    return (
        <div>
            <Modal isOpen={props.open} toggle={props.toggle}>
                <ModalHeader>Create new Subcategory</ModalHeader>
                <ModalBody>

                    <form onSubmit={(e) => submit(e)} action="">

                        <select name='catalogId' value={state.catalogId} onChange={(e) => change(e)} className=' form-control my-2' id="">
                            <option value=''>Select catalog</option>
                            {catalogOptions}
                        </select>

                        <select name='categoryId' value={state.categoryId} onChange={(e) => change(e)} className=' form-control my-2' id="">
                            <option value=''>Select category</option>
                            {categoryOption}
                        </select>

                        <input
                            value={state.name}
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
