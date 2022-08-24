import React from 'react'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CHECK_AUTH } from '../../Redux/ActionTypes'
import { checkAuth } from '../Functions/AuthFunctions'


const mapStateToProps = (state) => ({})

const Logout = (props) => {

    localStorage.removeItem('token')
    const navigate = useNavigate()
    checkAuth().then(data => {
        props.dispatch({
            type: CHECK_AUTH,
            value: data
        })
        navigate('/login')
    })

    return (
        <div></div>
    )
}





export default connect(mapStateToProps)(Logout)