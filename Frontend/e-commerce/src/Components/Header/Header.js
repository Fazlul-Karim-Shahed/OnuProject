import React from 'react'
import { connect } from 'react-redux'
import FirstLayer from './FirstLayer'
import SecondLayer from './SecondLayer'

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  decodedToken: state.decodedToken
})

const Header = (props) => {

  return (
    <div>
      <FirstLayer />
      <SecondLayer />
    </div>
  )
}




export default connect(mapStateToProps)(Header)