import React from 'react'
import './HomeCategory.css'

export default function HomeCategory() {
    return (
        <div className='bg-secondary py-5 text-white'>
            <h1 className='text-center mb-5'>Buy Furniture Based on Space</h1>
            <main class="page-content">
                <div class="card">
                    <div class="content">
                        <h2 class="title">Dinning</h2>
                        <p class="copy" style={{ visibility: 'hidden' }}>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p><button class="btn bg-white text-dark">View All</button>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <h2 class="title">Kitchen</h2>
                        <p class="copy" style={{ visibility: 'hidden' }}>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p><button class="btn bg-white text-dark">View All</button>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <h2 class="title">Door</h2>
                        <p class="copy" style={{ visibility: 'hidden' }}>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p><button class="btn bg-white text-dark">View All</button>
                    </div>
                </div>
                <div class="card">
                    <div class="content">
                        <h2 class="title">Living</h2>
                        <p class="copy" style={{ visibility: 'hidden' }}>Check out all of these gorgeous mountain trips with beautiful views of, you guessed it, the mountains</p><button class="btn bg-white text-dark">View All</button>
                    </div>
                </div>
            </main>
        </div>
    )
}
