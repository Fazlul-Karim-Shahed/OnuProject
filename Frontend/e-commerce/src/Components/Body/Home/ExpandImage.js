import React from 'react'
import './HomeStyles/ExpandImage.css'

export default function ExpandImage() {
    return (
        <div className=''>
        
            <section className='bg-light pb-md-5' style={{ backgroundColor: '#D5D6D1' }}>
                <h1 className='text-center pt-4 py-md-5'>Your Happiness Our Motivation</h1>

                <div className="rt-container">
                    <div className="col-rt-12">

                        <div className="ScriptContent">
                            <div className="expandImageContainer">
                                <div className="wgh-slider">
                                    <input className="wgh-slider-target" type="radio" id="slide-1" name="slider" />
                                    <input className="wgh-slider-target" type="radio" id="slide-2" name="slider" />
                                    <input className="wgh-slider-target" type="radio" id="slide-3" name="slider" checked="checked" />
                                    <input className="wgh-slider-target" type="radio" id="slide-4" name="slider" />
                                    <input className="wgh-slider-target" type="radio" id="slide-5" name="slider" />

                                    <div className="wgh-slider__viewport">
                                        <div className="wgh-slider__viewbox">
                                            <div className="wgh-slider__container">


                                                <div className="wgh-slider-item">
                                                    <div className="wgh-slider-item__inner">
                                                        <figure className="wgh-slider-item-figure"><img className="wgh-slider-item-figure__image" src="./assets/image-1.jpg" alt="The 5th Exotic" />
                                                            <figcaption className="wgh-slider-item-figure__caption"><a href="www.facebook.com">The 5th Exotic</a><span>Quantic</span></figcaption>
                                                        </figure>
                                                        <label className="wgh-slider-item__trigger" for="slide-1" title="Show product 1"></label>
                                                    </div>
                                                </div>

                                                <div className="wgh-slider-item">
                                                    <div className="wgh-slider-item__inner">
                                                        <figure className="wgh-slider-item-figure"><img className="wgh-slider-item-figure__image" src="./assets/image-2.jpg" alt="The 5th Exotic" />
                                                            <figcaption className="wgh-slider-item-figure__caption"><a href="www.facebook.com">The 5th Exotic</a><span>Quantic</span></figcaption>
                                                        </figure>
                                                        <label className="wgh-slider-item__trigger" for="slide-2" title="Show product 2"></label>
                                                    </div>
                                                </div>


                                                <div className="wgh-slider-item">
                                                    <div className="wgh-slider-item__inner">
                                                        <figure className="wgh-slider-item-figure"><img className="wgh-slider-item-figure__image" src="./assets/image-3.png" alt="The 5th Exotic" />
                                                            <figcaption className="wgh-slider-item-figure__caption"><a href="www.facebook.com">The 5th Exotic</a><span>Quantic</span></figcaption>
                                                        </figure>
                                                        <label className="wgh-slider-item__trigger" for="slide-3" title="Show product 3"></label>
                                                    </div>
                                                </div>


                                                <div className="wgh-slider-item">
                                                    <div className="wgh-slider-item__inner">
                                                        <figure className="wgh-slider-item-figure"><img className="wgh-slider-item-figure__image" src="./assets/image-4.jpg" alt="The 5th Exotic" />
                                                            <figcaption className="wgh-slider-item-figure__caption"><a href="www.facebook.com">The 5th Exotic</a><span>Quantic</span></figcaption>
                                                        </figure>
                                                        <label className="wgh-slider-item__trigger" for="slide-4" title="Show product 4"></label>
                                                    </div>
                                                </div>


                                                <div className="wgh-slider-item">
                                                    <div className="wgh-slider-item__inner">
                                                        <figure className="wgh-slider-item-figure"><img className="wgh-slider-item-figure__image" src="./assets/image-5.jpg" alt="RYSY - Traveler LP" />
                                                            <figcaption className="wgh-slider-item-figure__caption"><a href="www.facebook.com">RYSY - Traveler LP</a><span>RYSY</span></figcaption>
                                                        </figure>
                                                        <label className="wgh-slider-item__trigger" for="slide-5" title="Show product 5"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
