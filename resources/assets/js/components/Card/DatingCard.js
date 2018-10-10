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

        const { title, text, events } = this.props;

        return (
            <CardWithTitle hasLine={true} title={title}>
                <div className="dating-slide">
                    <Slider {...settings}>
                        {
                            events.map((event, index) => {
                                return (
                                    <div key={index}>
                                        <div className={"row next-dating-header-row1"}>
                                            <div className={"col-md-2 align-middle dating-header"}>
                                                <RoundAvatar size={"medium"} img="https://lorempixel.com/200/300/?48789"></RoundAvatar>
                                            </div>
                                            <div className={"col-md-7 dating-header"}>
                                                <h5>{event.name}</h5>
                                                <div>{event.address}</div>
                                            </div>
                                            <div className={"col-md-3 align-right dating-time"}>
                                                <p>{event.start_time}</p>
                                            </div>
                                        </div>

                                        <div className={"row"}>
                                            <div className={"col-md-7 dating-img"}>
                                                <img
                                                    src={event.image}
                                                />
                                            </div>
                                            <div className={"col-md-5 dating-info"}>
                                                {
                                                    event.type === 'group' ? (
                                                        <div>
                                                            <div className="text-center">
                                                                <h5>ĐIỀU KIỆN</h5>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    Min {event.min_male_number} - Max {event.max_male_number}
                                                                </div>
                                                                <div className="col-1">
                                                                    <i className="fas fa-male"></i>
                                                                </div>
                                                                <div className="col-5">
                                                                    Tuổi {event.min_male_age} - {event.max_male_age}
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-6">
                                                                    Min {event.min_female_number} - Max {event.max_female_number}
                                                                </div>
                                                                <div className="col-1">
                                                                    <i className="fas fa-female"></i>
                                                                </div>
                                                                <div className="col-5">
                                                                    Tuổi {event.min_female_age} - {event.max_female_age}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <i className="far fa-heart"></i> 
                                                                <span>
                                                                    {
                                                                        event.marital_status.map((item, index) => {
                                                                            return (item === '0' ? <span> Single</span> : <span> Married</span>)
                                                                        })
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <i className="fas fa-suitcase"></i>
                                                                <div>
                                                                    {
                                                                        event.job.map((item, index) => {
                                                                            return (<div className="tag">{item}</div>)
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-7">
                                                                    <button className="btn btn-primary btn-sm btn-dating">Tìm hiểu thêm</button>
                                                                </div>
                                                                <div className="col-5">
                                                                    <button className="btn btn-primary btn-sm btn-dating">Tham gia</button>
                                                                </div>
                                                            </div>
                                                        </div>        
                                                    ) : (
                                                        <div>

                                                        </div>
                                                    )
                                                }
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

export {DatingCard};