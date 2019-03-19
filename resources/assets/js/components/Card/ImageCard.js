import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CircleButton from '../Button/CircleButton';
import InformationNumber from '../Information/InformationNumber';
import {Link} from 'react-router-dom';

class ImageCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoved: props.user.is_loved,
            isLiked: props.user.is_like,
            loveNumber: props.user.loveNumber ? parseInt(props.user.loveNumber) : 0,
            likeNumber: props.user.likeNumber ? parseInt(props.user.likeNumber) : 0
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
                    data = {'is_loved': 1, 'is_like': 0};
                    this.setState({isLoved: true, loveNumber: this.state.loveNumber + 1});
                    if(this.state.isLiked) {
                        this.setState({isLiked: false, likeNumber: this.state.likeNumber - 1});
                    }
                }
            } else if(actionType == 'like') {
                if(this.state.isLiked) {
                    data = {'is_like': 0};
                    this.setState({isLiked: false, likeNumber: this.state.likeNumber - 1});
                } else {
                    data = {'is_loved': 0, 'is_like': 1};
                    this.setState({isLiked: true, likeNumber: this.state.likeNumber + 1});
                    if(this.state.isLoved) {
                        this.setState({isLoved: false, loveNumber: this.state.loveNumber - 1});
                    }
                }
            }

            this.props.action(data, this.props.user.id);
        }
    }

    render() {
        const {user} = this.props;

        return (
            <div className="image-card box-shadow-default">
                {
                    user.is_incognito ? (
                        <React.Fragment>
                            <div>
                                <img src="public/images/default-avatar-heart.png"/>
                            </div>
                            <div className="row image-card-content">
                                <div className="container">
                                    <h5>Thành viên ẩn danh</h5>
                                </div>
                            </div>
                        </React.Fragment>
                    ) : (
                    <React.Fragment>
                        <div>
                            <Link to={`/profile/${user.id}`}>
                                <img src={this.props.user.avatar}/>
                            </Link>
                            <div className="image-card-btn">
                                <CircleButton
                                    icon="fas fa-thumbs-up"
                                    color={this.state.isLiked ? '#3464D4' : '#34495e'}
                                    action={() => this.onUpdateRelationship('like')}
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-heart"
                                    color={this.state.isLoved ? '#e74c3c' : '#34495e'}
                                    action={() => this.onUpdateRelationship('love')}
                                ></CircleButton>
                                <CircleButton
                                    icon="fas fa-comment-dots"
                                    color='#3464D4'
                                    // action
                                ></CircleButton>
                            </div>
                        </div>
                    
                        <div className="image-card-content">
                            <Link to={`/profile/${user.id}`} >
                                <h5 className='user-name'>
                                    {user.name}, {user.age}
                                </h5>
                            </Link>
                            <small className='user-address'>
                                {user.hometown_province_name}
                            </small>
                            <InformationNumber
                                heartNumber={this.state.loveNumber}
                                likeNumber={this.state.likeNumber}
                            ></InformationNumber>
                        </div>
                    </React.Fragment>
                )
            }
            </div>
        );
    }
}

ImageCard.propTypes = {
    img: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}

ImageCard.defaultProps = {
    img: 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png',
}

export {ImageCard};