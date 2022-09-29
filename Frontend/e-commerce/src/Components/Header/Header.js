import React, { useState } from 'react'
import { connect } from 'react-redux'
import FirstLayer from './FirstLayer'
import SecondLayer from './SecondLayer'
import { Link } from 'react-router-dom'
import './HeaderStyles/Header.css'
import HoverCatalog from './HoverCatalog'
import { useParams, useNavigate } from 'react-router-dom'

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
        <Link className='text-decoration-none text-dark ' to={`/catalog/${i._id}`}>{i.name}</Link>
      </div>
    )
  })

  // if (window.location.href.includes('checkout')){
  //   document.getElementsByClassName('catalogBox')[0].classList.add('d-none')
  // }


  window.onscroll = () => {

    if (document.documentElement.scrollTop > 80) {

      document.getElementsByClassName('catalogBox')[0].classList.add('position-fixed', 'top-0', 'bg-light', 'w-100', 'shadow')
      document.getElementsByClassName('catalogBox')[0].style.zIndex = '5'

    }
    else {

      document.getElementsByClassName('catalogBox')[0].classList.remove('position-fixed', 'top-0', 'bg-light')


    }
  }




  return (
    <div className='shadow'>

      {/* <FirstLayer /> */}
      <SecondLayer />

      <div className='headerCatalog total catalogBox'>

        <div className='container d-flex justify-content-center border-top py-2' >
          {catalogShow}
        </div>

        <div className='box w-75 m-auto mt-3' >
          <HoverCatalog item={catalogItem} />
        </div>

      </div>

    </div>
  )
}


export default connect(mapStateToProps)(Header)