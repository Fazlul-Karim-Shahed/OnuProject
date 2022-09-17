import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './HeaderStyles/FirstLayer.css'

const mapStateToProps = (state) => ({
    authenticated: state.authenticated,
    decodedToken: state.decodedToken
})

const FirstLayer = (props) => {


    let layer = <div className='bg-white text-info FirstLayerContainer'>
        <div className="container text-center p-1 d-flex justify-content-between FirstLayerContainer">
            <div>
                <a className='px-2 text-decoration-none' href="tel: 01312379588"><FontAwesomeIcon className='mt-1' icon={faPhone} /> +88 01312379588</a>
                <a className='px-2 text-decoration-none mail' href="mailto: fazlul.shahed2000@gmail.com"><FontAwesomeIcon className='mt-1' icon={faEnvelope} /> fazlul.shahed2000@gmail.com</a>
            </div>
            <FontAwesomeIcon className='mt-1' icon={faCartShopping} />
        </div>
    </div>

    if (props.decodedToken === null) return layer;
    else if (props.decodedToken.role === 'user') return layer;
    else if (!props.authenticated && props.decodedToken.role === 'admin') return layer;
    else if (props.authenticated && props.decodedToken.role === 'admin') return <div></div>;





}



export default connect(mapStateToProps)(FirstLayer)