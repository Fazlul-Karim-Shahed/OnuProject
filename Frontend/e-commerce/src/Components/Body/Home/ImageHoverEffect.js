import React from 'react'
import './HomeStyles/ImageHoverEffect.css'
import { Link } from 'react-router-dom'

export default function ImageHoverEffect() {
    return (

        <div className='py-5'>
            <h1 className='text-center py-3'>Find Our Best Products</h1>
            <div class="ImageHoverEffectContainer">
                <Link to='' class="ImageHoverEffectBox text-decoration-none text-dark">
                    <img src="./assets/image-1.jpeg" />
                    <span>Dining</span>
                </Link>
                <Link to='' class="ImageHoverEffectBox text-decoration-none text-dark">
                    <img src="./assets/image-2.jpeg" />
                    <span>Kitchen</span>
                </Link>
                <Link to='' class="ImageHoverEffectBox text-decoration-none text-dark">
                    <img src="./assets/image-3.jpg" />
                    <span>Door</span>
                </Link>
                <Link to='' class="ImageHoverEffectBox text-decoration-none text-dark">
                    <img src="./assets/image-4.jpeg" />
                    <span>Living</span>
                </Link>

                <Link to='' class="ImageHoverEffectBox text-decoration-none text-dark">
                    <img src="./assets/image-7.png" />
                    <span>Bedroom</span>
                </Link>
{/* 
                <Link to='' class="ImageHoverEffectBox text-decoration-none text-dark">
                    <img src="./assets/image-6.jpg" />
                    <span>Door</span>
                </Link> */}

            </div>
        </div>

    )
}
