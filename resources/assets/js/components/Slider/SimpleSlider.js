import React, { Component } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';

class SimpleSlider extends Component {
    render() {
        // See more at: https://react-slick.neostack.com/docs/api
        var settings = {
            accessibility: true,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: this.props.slidesToShow,
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

SimpleSlider.propTypes = {
    slidesToShow: PropTypes.number,
    images: PropTypes.array
}

SimpleSlider.defaultProps = {
    slidesToShow: 1,
    images: ['http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png']
}

export default SimpleSlider;