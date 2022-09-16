import React, { useState } from 'react'
import { connect } from 'react-redux'
import FirstLayer from './FirstLayer'
import SecondLayer from './SecondLayer'
import { Link } from 'react-router-dom'
import './HeaderStyles/Header.css'
import HoverCatalog from './HoverCatalog'

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  decodedToken: state.decodedToken,
  catalog: state.catalog
})

const Header = (props) => {

  const [catalogItem, setCatalogItem] = useState('');

  let hoverInCatalog = item => setCatalogItem(item)


  let catalogShow = props.catalog.map((i, index) => {
    return (
      <div onMouseOver={() => hoverInCatalog(i)} key={i._id} className='mx-3 li'>
        <Link className='text-decoration-none text-white ' to={`/catalog/${i._id}`}>{i.name}</Link>
      </div>
    )
  })


  return (
    <div >
      <FirstLayer />
      <SecondLayer />

      <div className='headerCatalog total' style={{ backgroundColor: '#32363E' }}>
        <div className=' container d-flex justify-content-center text-white border-top py-2'>

          {catalogShow}

        </div>
        <div className='box w-75 m-auto text-white mt-3'>
          <HoverCatalog item={catalogItem} />
        </div>


      </div>

    </div>
  )
}




export default connect(mapStateToProps)(Header)