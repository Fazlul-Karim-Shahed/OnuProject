import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Formik } from 'formik'
import { InputGroup, InputGroupText, Input, Toast, ToastHeader, ToastBody } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey, faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons'
import './BodyStyles/Signup.css'
import { spinner } from './Spinner'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { checkAuth, saveToken, tokenDecode } from '../Functions/AuthFunctions'
import { CHECK_AUTH, GET_CART } from '../../Redux/ActionTypes'
import { getCart, uploadCartItems } from '../Functions/CartFunction'
import { getCartApi } from '../API/CartApi'


const mapStateToProps = (state) => ({})

const Signup = (props) => {

    const [spin, setSpin] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    console.log(errorMessage);
    const toggle = () => setSpin(false)
    const navigate = useNavigate()

    const signInUrl = process.env.REACT_APP_BACKEND_URL + '/user/signin'
    const signUpUrl = process.env.REACT_APP_BACKEND_URL + '/user/signup'

    return (
        <div className=''>
            <Formik

                initialValues={props.mode === 'signup' ? {
                    name: '',
                    email: '',
                    password: ''
                } : {
                    email: '',
                    password: ''
                }
                }

                onSubmit={
                    (values) => {

                        setSpin(true)

                        axios.post(props.mode === 'signup' ? signUpUrl : signInUrl, props.mode === 'signup' ? {
                            name: values.name,
                            email: values.email,
                            password: values.password,
                        } : {
                            email: values.email,
                            password: values.password,
                        })
                            .then(data => {
                                if (data.data.error) throw data.data.message
                                else {

                                    setErrorMessage('')
                                    saveToken(data.data.value)
                                    tokenDecode().then(data => {
                                        uploadCartItems(data)
                                        // getCart(true, data).then(data => {
                                        //     props.dispatch({
                                        //         type: GET_CART,
                                        //         value: data.value
                                        //     })
                                        // })
                                    })
                                    checkAuth().then(data => {

                                        props.dispatch({
                                            type: CHECK_AUTH,
                                            value: data
                                        })

                                        navigate('/')
                                        window.location.reload(false)
                                    })

                                }
                            })
                            .catch(err => {
                                setErrorMessage(err)
                                setSpin(false)
                            })



                    }
                }

            >
                {({ values, handleChange, handleSubmit }) => (
                    <div onClick={toggle} className='signup_form_width'>

                        <Toast className='w-100 px-2'>
                            <ToastHeader className=''>{props.mode === 'login' ? 'Log in form' : 'Sign up form'}</ToastHeader>
                            <ToastBody>
                                <form onSubmit={handleSubmit} className='' action="">
                                    {props.mode === 'signup' ? <InputGroup className='my-3'>
                                        <InputGroupText><FontAwesomeIcon icon={faUser} /></InputGroupText>
                                        <Input
                                            onChange={handleChange}
                                            value={values.name}
                                            type='text'
                                            name='name'
                                            placeholder='User name'
                                        />
                                    </InputGroup> : ''}

                                    <InputGroup className='my-3'>
                                        <InputGroupText><FontAwesomeIcon icon={faEnvelope} /></InputGroupText>
                                        <Input
                                            onChange={handleChange}
                                            value={values.email}
                                            type='email'
                                            name='email'
                                            placeholder='Email'
                                        />
                                    </InputGroup>

                                    <InputGroup className='my-3'>
                                        <InputGroupText> <FontAwesomeIcon icon={faKey} /> </InputGroupText>
                                        <Input
                                            onChange={handleChange}
                                            value={values.password}
                                            type='text'
                                            name='password'
                                            placeholder='Password'
                                        />
                                    </InputGroup>
                                    <div className='text-center text-danger my-2 fw-bolder'>{errorMessage}</div>
                                    <div className='d-flex justify-content-between'>
                                        {props.mode === 'signup' ? <span className='mt-2'>Already have an account? <Link to='/login'>Login</Link></span> : <span className='mt-2'>First time here? <Link to='/signup'>Signup</Link></span>}
                                        <button className='btn btn-success' type="submit">Submit</button>
                                    </div>

                                </form>
                            </ToastBody>
                        </Toast>
                        {spin ? spinner(true) : spinner(false)}


                    </div>
                )}

            </Formik>
        </div>
    )
}




export default connect(mapStateToProps)(Signup)