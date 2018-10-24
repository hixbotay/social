import React, { Component } from 'react';
import {Card, CardWithIcon} from '../Card';
import InformationNumber from '../Information/InformationNumber';
import SimpleSlider from '../Slider/SimpleSlider';
import CircleButton from '../Button/CircleButton';
import {Link} from 'react-router-dom';

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
    }

    render() {
        const {item} = this.props;
        var defaultImages = [
            'http://www.lebenshilfe-sz.de/wp-content/uploads/2017/01/noimg.jpg'
        ];

        let images = item.photos.length ? item.photos : defaultImages;
        images = images.filter(Boolean);
        console.log(`=======${item.id}========`);
        console.log(images);
        return (
            <Card>
                <div className="container">
                    <div className="row">
                        <div className="col-8 couple-img-slider">
                            <div>
                                <SimpleSlider slidesToShow={1} images={images}></SimpleSlider>
                            </div>
                            
                            <div className="couple-button">
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
                                    icon="fas fa-comments"
                                    color='#34495e'
                                    // action
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
                                        <i className="fas fa-info-circle"></i>
                                        <div>{item.type}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className='col-12'>
                                        <i className="fas fa-question-circle"></i>
                                        <div>{item.philosophy}</div>
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

// function mapStateToProps(state) {
//     return {
//         user: state.user.current_user
//     }
// }

export default CoupleView;