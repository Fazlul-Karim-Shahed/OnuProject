import React from 'react'
import './HomeStyles/HoneycombGrid.css'

export default function HoneycombGrid() {


    let src = [
        {
            description: 'Sample Image',
            src: './assets/image-1.jpeg',
        },
        {
            description: 'Sample Image',
            src: './assets/image-2.jpeg',
        },
        {
            description: 'Sample Image',
            src: './assets/image-3.jpg',
        },
        {
            description: 'Sample Image',
            src: './assets/image-4.jpeg',
        },
        {
            description: 'Sample Image',
            src: './assets/image-5.jpg',
        },
        {
            description: 'Sample Image',
            src: './assets/image-6.jpg',
        },
        {
            description: 'Sample Image',
            src: './assets/image-7.png',
        },
    ]

    let imgShow = src.map(item => {

        return (
            <li class="honeycomb-cell">
                <img class="honeycomb-cell__image" src={item.src} />
                <div class="honeycomb-cell__title">{item.description}</div>
            </li>
        )

    })


    return (
        <div className='py-5'>
            <div>
                <h1 className='text-center'>Buy Furniture Based on Space</h1>
            </div>
            <ul class="honeycomb">
                
                {imgShow}
                <li class="honeycomb-cell honeycomb__placeholder"></li>

            </ul>

            <div className='shadow shadow-lg'></div>
        </div>
    )
}
