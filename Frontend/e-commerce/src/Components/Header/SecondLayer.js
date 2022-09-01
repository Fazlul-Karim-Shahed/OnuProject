import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import './HeaderStyles/SecondLayer.css'




const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  decodedToken: state.decodedToken
})

const SecondLayer = (props) => {

  const [open, setOpen] = useState(false)

  const toggle = () => {
    setOpen(!open)
  }

  // const Logo = 'assets/logo.png'
  const Logo = 'https://png.pngtree.com/template/20190928/ourmid/pngtree-gold-furniture-lamp-chair-interior-logo-design-template-inspirat-image_312127.jpg'


  let admin
  if (props.authenticated && props.decodedToken && props.decodedToken.hasOwnProperty('role')) {
    if (props.decodedToken.role === 'admin') {

      admin = <NavItem className='my-2'>
        <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/admin-panel' > Admin panel </Link>
      </NavItem>
    }
  }

  return (
    <div className="" style={{ backgroundColor: '#AB5337' }} >
      <div className='container'>
        <Navbar className='py-2' expand='md'>
          <NavbarBrand className='m-0 p-0' href='/'> <img className='img-fluid rounded' src={Logo} width='60px' height='auto' alt="" /> </NavbarBrand>
          <NavbarToggler onClick={toggle} className='me-2' />
          
          <Collapse isOpen={open} navbar> 
          <hr className='text-white fw-bolder border'/>
            <Nav className='ms-auto my-3' navbar>
              <NavItem className='my-2'>
                <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/blog' > Blog </Link>
              </NavItem>
              <NavItem className='my-2'>
                <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/show-locator' > Showroom </Link>
              </NavItem>
              <NavItem className='my-2'>
                <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/help' > Help </Link>
              </NavItem>
              {!props.authenticated ? <NavItem className='my-2'>
                <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/login' > Login </Link>
              </NavItem> : ''}
              {!props.authenticated ?
                <NavItem className='my-2'>
                  <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/signup' > Signup </Link>
                </NavItem> : ''}
              {props.authenticated ? <NavItem className='my-2'>
                <Link className='SecondLayerLinkHover mx-2 text-decoration-none' to='/logout' > Logout </Link>
              </NavItem> : ''}
              {admin}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  )
}



export default connect(mapStateToProps)(SecondLayer)