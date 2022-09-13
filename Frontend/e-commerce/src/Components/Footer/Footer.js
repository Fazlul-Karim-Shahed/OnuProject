import React from 'react'
import { connect } from 'react-redux'
import './FooterStyles/FooterStyle.css'

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
              <input placeholder='Enter email' className='form-control w-75 d-inline-block' type="email" />
              <button className='btn btn-success ms-1'>Subscribe</button>
            </div>
          </div>

          <hr class="border-white mt-4" />

          <div className='row pt-4'>
            <div className="col-md-6 mb-3">
              <p>Agrabad, bandar, Chittagong, Bangladesh</p>
            </div>
            <div className="col-md-6">
              <select className='form-control w-75' name="" id=""></select>
            </div>
          </div>

          <div className="social mt-3"></div>

          <div className="row mt-3">
            <div class="col-md-4 d-flex flex-column p-3">
              <a className=' myA' href="#">Company</a>
              <a className='myA' href="#">Jobs</a>
              <a className='myA' href="#">Press</a>
              <a className='myA' href="#">Investor Relations</a>
            </div>
            <div class="col-md-4 d-flex flex-column p-3">
              <a className='myA' href="#">Mobile apps - searching on the go</a>
              <a className='myA' href="#">Website name business Studio</a>
            </div>
            <div class="col-md-4 d-flex flex-column p-3">
              <a className='myA' href="#">Help</a>
              <a className='myA' href="#">Learn how to work Hotel Bazar</a>
              <a className='myA' href="#">Terms and Conditions</a>
              <a className='myA' href="#">Privacy</a>
              <a className='myA' href="#">Site</a>
            </div>
          </div>

          <hr class="border-white mt-4" />

          <div class="text-center pt-3 pb-4">
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