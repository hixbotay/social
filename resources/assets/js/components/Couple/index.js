import React, { Component } from 'react';
import {Card, CardWithIcon} from '../Card';
import InformationNumber from '../Information/InformationNumber';
import Slider from "react-slick";
import CircleButton from '../Button/CircleButton';
import {Link} from 'react-router-dom';
import Image from 'react-image-resizer';

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
        >
            <i class="fa fa-chevron-left slick-prev couple-slider-nav"/>
        </div>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
        ><i className="fa fa-chevron-right slick-next couple-slider-nav"/></div>
    );
}
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
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
        };

        var defaultImages = [
            'http://www.lebenshilfe-sz.de/wp-content/uploads/2017/01/noimg.jpg'
        ];

        let images = item.photos.length ? item.photos : defaultImages;
        images = images.filter(Boolean);
        let count = images.length;
        return (
            <Card>
                {/*<div className="container">*/}
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12 couple-img-slider">
                            <div>
                                <Slider {...settings}>
                                {
                                    images.map((item, index) => {
                                        return (
                                            <div key={index} className="custom-slider-item">
                                                <Image src={item} width='100%' height={400}/>
                                                <div className='image-count'><i className="fas fa-camera"></i><span>{index + 1}/{count}</span></div>
                                            </div>
                                        )
                                    })
                                }
                                </Slider>
                            </div>
                            
                            <div className="couple-button">
                                <CircleButton
                                    icon="fas fa-thumbs-up fa-2x"
                                    color="#ffffff"
                                    // action
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-heart fa-2x"
                                    color={this.state.isLoved ? '#e74c3c' : '#ffffff'}
                                    action={() => this.onUpdateRelationship('love')}
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-times fa-2x"
                                    action={() => this.props.dismissAction(item.id)}
                                    class="next-couple"
                                    id={`next-couple-${item.id}`}
                                    color="#ffffff"
                                ></CircleButton>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
                            <CardWithIcon rightIcon="fas fa-user-circle">
                                <Link to={`/profile/${item.id}`}>
                                    <h4 className='user-name'>{item.name}, 24</h4>
                                </Link>
                                <small className='user-address'>{item.address}</small>
                                <InformationNumber
                                    heartNumber={this.state.loveNumber}
                                    viewNumber={this.state.viewNumber}
                                    likeNumber={this.state.likeNumber}
                                ></InformationNumber>
                                <div className='gender'><i className="fas fa-venus color-pink"></i> <span>Độc thân</span></div>
                                <div className="ui-block">
                                    <div className="quotes color-black">
                                        <div className="title"><i className="fas fa-comment-alt"></i></div>
                                        <div className="quote-item">
                                            <div className="content">Sprite đập tan cơn khát <br />
                                                Còn anh thì làm tan nát con tim em</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='wave'>
                                    <span className='title'>Hãy gửi lời chào tới {item.name}</span>
                                    <form className='wave-form' action='' method='get'>
                                        <div className="form-group">
                                            <input className="box-shadow-default form-control" value='' placeholder='anabell thi dang so em thi dang yeu' />
                                        </div>
                                        <div className="form-check">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                                <label className="form-check-label" htmlFor="exampleCheck1">Nổi bật tin nhắn của bạn lên phía trên với người ấy chỉ với 10 xu</label>
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-xs">Gửi</button>
                                    </form>
                                </div>
                            </CardWithIcon>
                        </div>
                    </div>
                {/*</div>*/}
            </Card>
        );
    }
}

export default CoupleView;