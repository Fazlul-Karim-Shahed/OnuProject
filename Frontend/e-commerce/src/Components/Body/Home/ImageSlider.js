import './HomeStyles/ImageSlider.css'

function ImageSlider() {



    return (
        <div>

            <section>
                <div class="rt-container">
                    <div class="col-rt-12">
                        <div id="slider">
                            <div class="slides">

                                <div class="slider">
                                    <div class="legend"></div>
                                    <div class="ImageSliderContent">
                                        <div class="content-txt">
                                            <h2>Lorem ipsum dolor</h2>
                                            <p>Nam ultrices pellentesque facilisis. In semper tellus mollis nisl pulvinar vitae vulputate lorem consequat. Fusce odio tortor, pretium sit amet auctor ut, ultrices vel nibh.</p>
                                        </div>
                                    </div>
                                    <div class="image"> <img src="./assets/ImageSliderImage/1.jpg" /> </div>
                                </div>

                                <div class="slider">
                                    <div class="legend"></div>
                                    <div class="ImageSliderContent">
                                        <div class="content-txt">
                                            <h2>Lorem ipsum dolor</h2>
                                            <p>Nam ultrices pellentesque facilisis. In semper tellus mollis nisl pulvinar vitae vulputate lorem consequat. Fusce odio tortor, pretium sit amet auctor ut, ultrices vel nibh.</p>
                                        </div>
                                    </div>
                                    <div class="image"> <img src="./assets/ImageSliderImage/2.jpg"/> </div>
                                </div>

                                <div class="slider">
                                    <div class="legend"></div>
                                    <div class="ImageSliderContent">
                                        <div class="content-txt">
                                            <h2>Lorem ipsum dolor</h2>
                                            <p>Nam ultrices pellentesque facilisis. In semper tellus mollis nisl pulvinar vitae vulputate lorem consequat. Fusce odio tortor, pretium sit amet auctor ut, ultrices vel nibh.</p>
                                        </div>
                                    </div>
                                    <div class="image"> <img src="./assets/ImageSliderImage/2.jpg" /> </div>
                                </div>

                                <div class="slider">
                                    <div class="legend"></div>
                                    <div class="ImageSliderContent">
                                        <div class="content-txt">
                                            <h2>Lorem ipsum dolor</h2>
                                            <p>Nam ultrices pellentesque facilisis. In semper tellus mollis nisl pulvinar vitae vulputate lorem consequat. Fusce odio tortor, pretium sit amet auctor ut, ultrices vel nibh.</p>
                                        </div>
                                    </div>
                                    <div class="image"> <img src="./assets/ImageSliderImage/4.jpg"/> </div>
                                </div>

                            </div>


                            <div class="switch w-100">
                                <ul className='float-end me-5'>
                                    <li>
                                        <div class="on"></div>
                                    </li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ImageSlider;