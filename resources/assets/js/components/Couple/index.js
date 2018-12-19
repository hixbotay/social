import React, { Component } from 'react';
import {Card, CardWithIcon} from '../Card';
import InformationNumber from '../Information/InformationNumber';
import Slider from "react-slick";
import CircleButton from '../Button/CircleButton';
import {Link} from 'react-router-dom';
import Image from 'react-image-resizer';

class CoupleView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loveNumber: props.item.loveNumber ? parseInt(props.item.loveNumber) : 0,
            likeNumber: props.item.likeNumber ? parseInt(props.item.likeNumber) : 0,
            isLoved: props.item.is_loved ? true : false,
            isLiked: props.item.is_like ? true : false 
        }
    }

    onUpdateRelationship(actionType) {
        if(localStorage.getItem('percentage') < 70) {
            document.getElementById('open-relationship-modal').click();
        } else {
            var data = {};

            if(actionType == 'love') {
                if(this.state.isLoved) {
                    data = {'is_loved': 0};
                    this.setState({isLoved: false, loveNumber: this.state.loveNumber - 1});
                } else {
                    data = {'is_loved': 1};
                    this.setState({isLoved: true, loveNumber: this.state.loveNumber + 1});
                }
            } else if(actionType == 'like') {
                if(this.state.isLiked) {
                    data = {'is_like': 0};
                    this.setState({isLiked: false, likeNumber: this.state.likeNumber - 1});
                } else {
                    data = {'is_like': 1};
                    this.setState({isLiked: true, likeNumber: this.state.likeNumber + 1});
                }
            }

            this.props.action(data, this.props.item.id);
            document.getElementById(`next-couple-${this.props.item.id}`).click();
        }
    }

    render() {
        const {item} = this.props;

        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
        };

        var defaultImages = [
            'http://www.lebenshilfe-sz.de/wp-content/uploads/2017/01/noimg.jpg'
        ];

        let images = item.photos.length ? item.photos : defaultImages;
        images = images.filter(Boolean);

        return (
            <Card>
                <div className="container">
                    <div className="row">
                        <div className="col-8 couple-img-slider">
                            <div>
                                <Slider {...settings}>
                                {
                                    images.map((item, index) => {
                                        return (
                                            <div key={index} className="custom-slider-item">
                                                <Image src={item} width={580} height={400}/>
                                            </div>
                                        )
                                    })
                                }
                                </Slider>
                            </div>
                            
                            <div className="couple-button">
                                <CircleButton
                                    icon="fas fa-comments"
                                    color='#34495e'
                                    // action
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-heart"
                                    color={this.state.isLoved ? '#e74c3c' : '#34495e'}
                                    action={() => this.onUpdateRelationship('love')}
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-thumbs-up"
                                    color={this.state.isLiked ? '#2980b9' : '#34495e'}
                                    action={() => this.onUpdateRelationship('like')}
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-times"
                                    action={() => this.props.dismissAction(item.id)}
                                    class="next-couple"
                                    id={`next-couple-${item.id}`}
                                ></CircleButton>
                            </div>
                        </div>
                        <div className="col-4">
                            <CardWithIcon rightIcon="fas fa-user-circle">
                                <Link to={`/profile/${item.id}`}>
                                    <h4>{item.name}</h4>
                                </Link>
                                <small>{item.address}</small>
                                <InformationNumber
                                    heartNumber={this.state.loveNumber}
                                    likeNumber={this.state.likeNumber}
                                ></InformationNumber>
                                
                                <div className="row">
                                    <div className='col-12'>
                                        <i className="fas fa-question-circle"></i>
                                        <div>{item.description}</div>
                                    </div>
                                </div>
                            </CardWithIcon>
                        </div>
                    </div>
                </div>
            </Card>
        );
    }
}

export default CoupleView;