import React from 'react'
import { connect } from 'react-redux'
import HomeBestProduct from './HomeBestProduct/HoneycombGrid'
import ImageSlider from './HomeTopSlider/ImageSlider'
import HomeMoto from './HomeMoto/ExpandImage'
import HomeCategory from './HomeCategory/HomeCategory'


const mapStateToProps = (state) => ({})

const Home = (props) => {

        
    return (
        <div>
            <ImageSlider />
            <HomeBestProduct />
            <div><br /><br /><br /><br /><br /></div>

            <HomeCategory />

            <HomeMoto />
            
        </div>
    )
}




export default connect(mapStateToProps)(Home)