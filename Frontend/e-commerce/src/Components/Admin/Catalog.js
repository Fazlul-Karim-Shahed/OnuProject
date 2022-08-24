import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, Outlet } from 'react-router-dom'
import { spinner } from '../Body/Spinner';
import CatalogCreateModal from './AdminComponents/Catalog/CatalogCreateModal';
import { Alert } from 'reactstrap'

export default function Catalog() {

    const [catalog, setCatalog] = useState([])
    const [spin, setSpin] = useState(false)
    const [mode, setMode] = useState('create')
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [alertOpen, setAlertOpen] = useState(false)
    const [updatedName, setUpdatedName] = useState('')

    useEffect(() => {

        setSpin(true)
        const token = localStorage.getItem('token')
        if (token != null) {
            axios.get(process.env.REACT_APP_BACKEND_URL + '/catalog/')
                .then(data => {
                    setCatalog([...data.data.value])
                    setSpin(false)
                })
                .catch(err => {
                    console.log(err);
                    setSpin(false)
                })
        }

    }, [])

    console.log(catalog);

    const create = () => {
        setMode('create')
        setOpen(true)

    }

    const toggle = () => {
        setOpen(!open)
    }

    const toggleAlert = () => {
        setAlertOpen(!alertOpen)
    }

    const edit = (item, index) => {
        console.log(item);
        document.getElementsByClassName('inp')[index].classList.remove('d-none')
        // axios.post(process.env.REACT_APP_BACKEND_URL + '/catalog/')
        //     .then(data => setCatalog([...data.data.value]))
    }

    const change = (e) => {
        // document.getElementsByClassName('inp')[index].classList.remove('d-none')
        setUpdatedName(e.target.value)
    }

    const remove = (item) => {
        setSpin(true)
        axios.delete(process.env.REACT_APP_BACKEND_URL + '/catalog/delete/' + item._id)
            .then(data => {
                console.log(data.data);
                if (data.data.error) throw data.data.message
                setMessage(data.data.message)
                setAlertOpen(true)
                setSpin(false)
            })
            .catch(err => {
                console.log(err);
                setMessage(err)
                setAlertOpen(true)
                setSpin(false)
            })
    }

    const update = (item, index) => {
        console.log(item);
        // console.log(document.getElementById('input').value);
        let val = document.getElementsByClassName('input')[index].value
        // console.log(updatedName);
        setSpin(true)
        axios.put(process.env.REACT_APP_BACKEND_URL + '/catalog/update/' + item._id, {
            name: val === '' ? item.name : val
        })
            .then(data => {
                console.log(data.data);
                if (data.data.error) throw data.data.message
                setMessage(data.data.message)
                setAlertOpen(true)
                setSpin(false)
                document.getElementsByClassName('inp')[index].classList.add('d-none')
            })
            .catch(err => {
                console.log(err);
                setMessage(err)
                setAlertOpen(true)
                setSpin(false)
            })

    }


    let showCatalog = <div></div>;
    if (catalog.length != 0) {
        showCatalog = catalog.map((item, index) => {
            // document.querySelectorAll('.inp')[index].classList.add('d-none')
            return (
                <div key={Math.random()} className='border rounded my-2 p-3 d-flex justify-content-between'>
                    <div>
                        <div className='mt-2'>{item.name}</div>
                        <div className='mt-2 inp d-none d-flex'>
                            <div>
                                <input className='input' type="text" name="" id="input" />
                            </div>
                            <button onClick={() => update(item, index)} className='btn btn-sm btn-outline-success mx-2'>update</button>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => edit(item, index)} className='btn btn-success mx-3'>Edit</button>
                        <button onClick={() => remove(item)} className='btn btn-danger'>Remove</button>
                    </div>
                </div>
            )
        })
    }


    return (
        <div>
            <div>
                <Alert isOpen={alertOpen} toggle={toggleAlert}>{message}</Alert>
            </div>
            <div className='text-end my-2'>
                <button onClick={create} className='btn btn-primary'>Create Catalog</button>
            </div>
            <div>{showCatalog}</div>
            <CatalogCreateModal setAlertOpen={setAlertOpen} setMessage={setMessage} setSpin={setSpin} open={open} toggle={toggle} />
            {spin ? spinner(true) : spinner(false)}
        </div>
    )
}
