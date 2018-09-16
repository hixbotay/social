import React, { Component } from 'react';
import CafeSearch from './Cafe/search';
import Slider from "react-slick";
import {getUserDetail} from "../../actions/UserActions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";


class Cafe extends Component {
    render() {

        var data = [
            {'url': 'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg'},
            {'url': 'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg'},
            {'url': 'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg'},
            {'url': 'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg'},
            {'url': 'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg'},
        ]

        const settings = {
            className: "center",
            arrows: false,
            centerMode: true,
            infinite: true,
            centerPadding: "10px",
            slidesToShow: 2,
            swipeToSlide: true,
            speed: 500
        };

        return (
            <div className="row">

                <CafeSearch province={this.props.province} district={this.props.district} />

                <div className="col-md-12">

                    <div className="ui-block">

                        <div className="ui-block-title">
                            <h6 className="title" onClick={() => {
                                console.log(this.props.province)
                            }}>Săn deal giảm giá</h6>
                        </div>

                        <Slider {...settings}>

                            {data.map((xxx, index) => {
                                return (
                                    <div key={index}>
                                        <img
                                            src={"https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg"}
                                            style={{width: 300, heigh:400, marginLeft:5}}
                                        />
                                    </div>
                                );
                            })}

                        </Slider>

                    </div>

                </div>

            </div>
        );
    }
}

export default Cafe;