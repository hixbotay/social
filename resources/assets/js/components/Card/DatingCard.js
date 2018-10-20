import React, { Component } from 'react';
import { CardWithTitle } from './CardWithTitle';
import Slider from "react-slick";
import DatingGroup from '../Dating/DatingGroup';
import DatingCouple from '../Dating/DatingCouple';


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
                                    {
                                        event.type === 'group' ? <DatingGroup event={event} action={(event_id) => this.props.action(event_id)}></DatingGroup>
                                            : <DatingCouple event={event} action={(event_id) => this.props.action(event_id)}></DatingCouple>
                                    }
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