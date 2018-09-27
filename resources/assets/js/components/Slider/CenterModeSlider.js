import React, { Component } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';

class CenterModeSlider extends Component {
    render() {
        // See more at: https://react-slick.neostack.com/docs/api
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: '50px',
            slidesToShow: 3,
            speed: 500
        };
        return (
            <div>
                <Slider {...settings}>
                    {
                        this.props.images.map((item, index) => {
                            return (
                                <div key={index}>
                                    <img src={item}/>
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        );
    }
}

CenterModeSlider.propTypes = {
    slidesToShow: PropTypes.number,
    images: PropTypes.array
}

CenterModeSlider.defaultProps = {
    slidesToShow: 5,
    images: [
        'https://picsum.photos/640/480/?image=13',
        'https://picsum.photos/640/480/?image=14',
        'https://picsum.photos/640/480/?image=15',
        'https://picsum.photos/640/480/?image=16',
        'https://picsum.photos/640/480/?image=17',
        'https://picsum.photos/640/480/?image=18',
    ]
}

export default CenterModeSlider;