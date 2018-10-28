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

            this.props.action(data, this.props.user.id);
        }
    }

    render() {
        const {user} = this.props;

        return (
            <div className="image-card">
                <div>
                    <Link to={`profile/${user.id}`}>
                        <img src={this.props.user.avatar}/>
                    </Link>
                    <div className="image-card-btn">
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
                <div className="row image-card-content">
                    <div className="container">
                        <Link to={`couple/${user.id}`}>
                            <h5>
                                {user.name}, {user.age}
                            </h5>
                        </Link>
                        <small>
                            {this.props.user.address}
                        </small>
                        <InformationNumber
                            heartNumber={this.state.loveNumber}
                            likeNumber={this.state.likeNumber}
                        ></InformationNumber>
                    </div>
                </div>
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