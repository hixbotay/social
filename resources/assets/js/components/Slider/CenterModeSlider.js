import React, { Component } from 'react';
import Slider from "react-slick";
import PropTypes from 'prop-types';

class CenterModeSlider extends Component {
    render() {
        const {images} = this.props;
        // See more at: https://react-slick.neostack.com/docs/api
        const settings = {
            centerPadding: '50px',
            speed: 500,
            centerMode: true,
            slidesToShow: 3,
            focusOnSelect: true,
            dots: false,
            infinite: true,
        };
        // remove item undefined
        var imageArr = images.filter(item => {
            return item;
        });

        // add default image if arr length < 5
        var temp = 5 - imageArr.length;
        for(let i=0; i <= temp; i++) {
            imageArr.push("public/images/default-avatar-heart.png");
        }
    
        return (
            <div>
                <Slider {...settings}>
                    {
                        imageArr.map((item, index) => {
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
        // 'https://picsum.photos/640/480/?image=18',
    ]
}

export default CenterModeSlider;