import React, { Component } from 'react';
import Slider from "react-slick";

class SimpleSlider extends Component {
    render() {
        // See more at: https://react-slick.neostack.com/docs/api
        var settings = {
            accessibility: true,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            // adaptiveHeight: true
        };
        return (
            <Slider {...settings}>
                {
                    this.props.images.map((item, index) => {
                        return (
                            <div key={index} className="custom-slider-item">
                                <img src={item}/>
                            </div>
                        )
                    })
                }
            </Slider>
        );
    }
}

export default SimpleSlider;