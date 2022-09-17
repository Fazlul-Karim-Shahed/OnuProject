import React from 'react'
import { connect } from 'react-redux'
import HoneycombGrid from './HoneycombGrid'
import ImageSlider from './ImageSlider'
import ExpandImage from './ExpandImage'
import HomeCategory from './HomeCategory'
import ImageHoverEffect from './ImageHoverEffect'
import HomeInterior from './HomeInterior'


const mapStateToProps = (state) => ({})

const Home = (props) => {

        
    return (
        <div>
            <ImageSlider />
            <ImageHoverEffect />
            <HoneycombGrid />

            <div><br /><br /><br /><br /><br /><br /></div>

            <HomeCategory />
            <HomeInterior />
            <ExpandImage />
            
        </div>
    )
}




export default connect(mapStateToProps)(Home)