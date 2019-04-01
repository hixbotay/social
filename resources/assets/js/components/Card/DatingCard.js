import React, { Component } from 'react';
import { CardWithTitle } from './CardWithTitle';
import Slider from "react-slick";
import DatingGroup from '../Dating/DatingGroup';
import DatingCouple from '../Dating/DatingCouple';
import ShowMore from '@tedconf/react-show-more';

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

        const { title, type, events, isDisplaySlide, isShow } = this.props;

        var eventArr = events.map((event, index) => {
            return (
                <div key={index}>
                {
                    event.type === 'group' ? 
                        <DatingGroup 
                            status={this.props.status} event={event} 
                            action={(event_id) => this.props.action(event_id)} 
                            type={type} 
                            invite={() => this.props.invite()}
                            reject={() => this.props.reject()}
                        />
                        : 
                        <DatingCouple 
                            status={this.props.status} event={event} 
                            action={(event_id) => this.props.action(event_id)} 
                            type={type} 
                            invite={() => this.props.invite()}
                            reject={() => this.props.reject()}
                        />
                }
                </div>
            )
        });

        return (
            <CardWithTitle hasLine={true} title={title} isShowToggleIcon={true} isShow={this.props.isShow}>
                {
                    isDisplaySlide ? (
                        <div className="dating-slide">
                            <Slider {...settings}>
                                {eventArr}
                            </Slider>
                        </div>
                    ) : (
                        <ShowMore items={eventArr} by={2}>
                            {
                                ({current, onMore}) => (
                                <React.Fragment>
                                    {current}
                                    <div className="text-center">
                                        {
                                            onMore ? (
                                            <a href="javascript:void(0);" onClick={() => {onMore();}}>
                                                <u>Xem thêm...</u>
                                            </a>
                                            ) : null
                                        }
                                        
                                    </div>
                                </React.Fragment>
                                )
                            }
                        </ShowMore>
                    )
                }
            </CardWithTitle>
        );
    }
}

DatingCard.defaultProps = {
    isDisplaySlide: false,
    status: 'forthcoming'
}

export {DatingCard};