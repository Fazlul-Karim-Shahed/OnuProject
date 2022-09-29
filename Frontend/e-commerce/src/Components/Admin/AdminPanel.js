import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'


const mapStateToProps = (state) => ({})

const AdminPanel = (props) => {



  return (
    <div className='m-0 p-0'>
      <div className=' bg-warning text-center text-black fw-bold p-2'>----- Admin Panel -----</div>

      <div className="row m-0 px-2 mt-0">
        <div className="col-md-2 bg-warning border-end d-flex flex-column text-center">
          <div className='my-3 border-bottom'><Link className=' text-decoration-none text-black' to='/admin-panel/catalog'>Catalog</Link></div>
          <div className='my-3 border-bottom'><Link className=' text-decoration-none text-black' to='/admin-panel/category'>Category</Link></div>
          <div className='my-3 border-bottom'><Link className=' text-decoration-none text-black' to='/admin-panel/subcategory'>Sub category</Link></div>
          <div className='my-3 border-bottom'><Link className=' text-decoration-none text-black' to='/admin-panel/products'>Products</Link></div>
          <div className='my-3 border-bottom'><Link className=' text-decoration-none text-black' to='/admin-panel/properties'>Properties</Link></div>
        </div>
        <div className="col-md-10" >
          <Outlet />
        </div>
      </div>
    </div>

  )
}




export default connect(mapStateToProps)(AdminPanel)