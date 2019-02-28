import React, { Component } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';

class SimpleSlider extends Component {
    render() {
        const {images} = this.props;

        // See more at: https://react-slick.neostack.com/docs/api
        var settings = {
            accessibility: true,
            dots: false,
            infinite: images.length > this.props.slidesToShow,
            speed: 500,
            slidesToShow: this.props.slidesToShow,
            slidesToScroll: 1,
            arrows: true,
            // adaptiveHeight: false
        };
        return (
            <Slider {...settings}>
                {
                    images.map((item, index) => {
                        return (
                            <div key={index} className="custom-slider-item">
                                <img src={item} className={this.props.itemClassName}/>
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
    images: ['http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png'],
    itemClassName: "image"
}

export default SimpleSlider;