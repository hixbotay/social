import React, { Component } from 'react';
import { CardWithTitle } from './CardWithTitle';
import { RoundAvatar } from '../Avatar';
import Slider from "react-slick";

class DatingCard extends Component {
    render() {
        var settings = {
            accessibility: false,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            // adaptiveHeight: true
        };

        const { title, text } = this.props;

        var datings = [
            {
                name: "Hello World",
                address: "Thieu Trung, Thieu Hoa, Thanh Hoa",
                start_time: "15h Thứ 5 Ngày 08/10",
            },
            {
                name: "Hello World",
                address: "Thieu Trung, Thieu Hoa, Thanh Hoa",
                start_time: "15h Thứ 5 Ngày 08/10",
            }
        ]

        return (
            <CardWithTitle hasLine={true} title={title}>
                <div className="dating-slide">
                    <Slider {...settings}>
                        {
                            datings.map((dating, index) => {
                                return (
                                    <div key={index}>
                                        <div className={"row next-dating-header-row1"}>
                                            <div className={"col-md-2 align-middle dating-header"}>
                                                <RoundAvatar size={"medium"} img="https://lorempixel.com/200/300/?48789"></RoundAvatar>
                                            </div>
                                            <div className={"col-md-7 dating-header"}>
                                                <h5>{dating.name}</h5>
                                                <div>{dating.address}</div>
                                            </div>
                                            <div className={"col-md-3 align-right dating-time"}>
                                                <p>{dating.start_time}</p>
                                            </div>
                                        </div>

                                        <div className={"row"}>
                                            <div className={"col-md-7 dating-img"}>
                                                <img
                                                    src={"https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg"}
                                                />
                                            </div>
                                            <div className={"col-md-5 dating-info"}>
                                                {this.props.children}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {text}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
            </CardWithTitle>
        );
    }
}

export default DatingCard;