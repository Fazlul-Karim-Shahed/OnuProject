import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { spinner } from '../Body/Spinner'
import CategoryCreateModal from './AdminComponents/Category/CategoryCreateModal'
import CategoryEditModal from './AdminComponents/Category/CategoryEditModal'
import { getCatalogApi } from '../API/CatalogApi'
import { getCategoryApi } from '../API/CategoryApi'

export default function Category() {

    const [catalog, setCatalog] = useState([])
    const [category, setCategory] = useState([])
    const [mode, setMode] = useState('create')
    const [spin, setSpin] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('')

    useEffect(() => {

        setSpin(true)
        const token = localStorage.getItem('token')
        if (token != null) {

            getCatalogApi()
                .then(data => {
                    setCatalog([...data.value])
                    // setSpin(false)


                    getCategoryApi()
                        .then(data => {
                            // console.log(data);
                            setCategory([...data.value])
                            setSpin(false)
                        })
                        .catch(err => {
                            console.log(err);
                            setSpin(false)
                        })
                })
                .catch(err => {
                    console.log(err);
                    setSpin(false)
                })


        }

    }, [])

    let options = catalog.map(item => {
        return <option key={Math.random()} value={item._id}>{item.name}</option>
    })


    const edit = () => {

    }

    const remove = (item) => {
        if (window.confirm('Are you sure?')) {
            setSpin(true)
            axios.delete(process.env.REACT_APP_BACKEND_URL + '/category/delete/' + item._id)
                .then(data => {
                    console.log(data.data);
                    window.location.reload(false);
                    setSpin(false)
                })
                .catch(err => {
                    console.log(err);
                    // window.location.reload(false);
                    setSpin(false)
                })
        }
    }

    const update = () => {

    }

    const toggle = (item, mode) => {
        setOpen(!open)
        setSelectedCategory(item)
        setMode(mode)
        // console.log(item);
    }


    let showCategory = <div></div>;
    if (category.length != 0) {
        showCategory = category.map((item, index) => {
            // console.log(item);
            // document.querySelectorAll('.inp')[index].classList.add('d-none')
            return (
                <tr key={Math.random()}>
                    <td><p >{item.name}</p></td>
                    <td>{item.catalogId.name}</td>
                    <td className='text-center'><button onClick={() => toggle(item, 'edit')} className='btn btn-success mx-3'>Edit</button></td>
                    <td className='text-center'><button onClick={() => remove(item)} className='btn btn-danger'>Remove</button></td>
                </tr>
            )
        })
    }

    console.log(mode);

    return (
        <div>
            <div className='text-end  my-2'> <button onClick={() => toggle('', 'create')} className='btn btn-success'>Create category</button> </div>
            <div>
                <table className="table table-striped table-hover my-4">
                    <thead className=' bg-dark text-white'>
                        <tr>
                            <th scope='col'>Category</th>
                            <th scope='col'>Catalog</th>
                            <th scope='col' colSpan={2}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {showCategory}
                    </tbody>
                </table>
            </div>
            <div>
                {mode === 'create' ? <CategoryCreateModal open={open} toggle={() => toggle('', 'create')} category={category} spin={spin} setSpin={setSpin} setCatalog={setCatalog} options={options} /> : ''}

                {mode === 'edit' ? <CategoryEditModal selectedCategory={selectedCategory} open={open} toggle={() => toggle('', 'edit')} category={category} spin={spin} setSpin={setSpin} setCatalog={setCatalog} options={options} /> : ''}

            </div>
            {spin ? spinner(true) : spinner(false)}

        </div>
    )
}
