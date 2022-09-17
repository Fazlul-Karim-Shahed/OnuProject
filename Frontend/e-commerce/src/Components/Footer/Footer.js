import React from 'react'
import { connect } from 'react-redux'
import './FooterStyles/FooterStyle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faYoutube, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'


const Footer = (props) => {
  return (
    <div className='mt-2' style={{ backgroundColor: '#0A1121' }}>

      <div className="container text-white px-md-5">
        <div className='px-md-5'>
          <div className="row pt-5">
            <div className="col-md-6">
              <p>Want to receive exclusive furniture offers? Subscribe to our newsletter!</p>
            </div>
            <div className="col-md-6">
              <input placeholder='Enter email' className='form-control w-75 d-inline-block ' type="email" />
              <button className='btn btn-success ms-1 m-0'>Subscribe</button>
            </div>
          </div>

          <hr className="border-white mt-4" />

          <div className='row pt-4'>
            <div className="col-md-6 mb-3">
              <p>Purbachal, Dhaka, Bangladesh</p>
            </div>
            <div className="col-md-6">
              <select className='form-control w-75' name="" id="">
                <option value="">Bangladesh</option>
              </select>
            </div>
          </div>

          <div className="social mt-3">
            <a href="#"><FontAwesomeIcon icon={faFacebook} className='h3 me-3 facebook' /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} className='h3 me-3 insta' /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} className='h3 me-3 twitter' /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} className='h3 me-3 youtube' /></a>
          </div>

          <div className="row mt-3">
            <div className="col-md-4 d-flex flex-column p-3">
              <a className=' myA' href="#">Company</a>
              <a className='myA' href="#">Jobs</a>
              <a className='myA' href="#">Press</a>
              <a className='myA' href="#">Investor Relations</a>
            </div>
            <div className="col-md-4 d-flex flex-column p-3">
              <a className='myA' href="#">Mobile apps - searching on the go</a>
              <a className='myA' href="#">Website name business Studio</a>
            </div>
            <div className="col-md-4 d-flex flex-column p-3">
              <a className='myA' href="#">Help</a>
              <a className='myA' href="#">Learn how to work Hotel Bazar</a>
              <a className='myA' href="#">Terms and Conditions</a>
              <a className='myA' href="#">Privacy</a>
              <a className='myA' href="#">Site</a>
            </div>
          </div>

          <hr className="border-white mt-4" />

          <div className="text-center pt-3 pb-4">
            <h2 className='fst-italic'>Website name</h2>
            <span>Copyright 2022 <strong>Website name</strong>  | All rights reserved.</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({})



export default connect(mapStateToProps)(Footer)