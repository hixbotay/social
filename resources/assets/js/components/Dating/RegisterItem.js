import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {SquareAvatar} from '../Avatar';
import CircleButton from '../Button/CircleButton';
import connect from 'react-redux/es/connect/connect';

class RegisterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoved: props.user.is_loved,
            isLiked: props.user.is_like
        }
    }

    onUpdateRelationship(actionType) {
        var data = {};

        if(actionType == 'love') {
            if(this.state.isLoved) {
                data = {'is_loved': 0};
                this.setState({isLoved: false});
            } else {
                data = {'is_loved': 1};
                this.setState({isLoved: true });
            }
        } else if(actionType == 'like') {
            if(this.state.isLiked) {
                data = {'is_like': 0};
                this.setState({isLiked: false});
            } else {
                data = {'is_like': 1};
                this.setState({isLiked: true});
            }
        }

        this.props.action(data, this.props.user.id);
    }

    render() {
        const {user, current_user} = this.props; 
        return (
            <div className="row register-item">
                <div className="col-3">
                    <Link to={`/profile/${user.id}`}>
                        <SquareAvatar img={user.avatar} size="large"></SquareAvatar>
                    </Link>
                </div>
                <div className="col-9">
                    <Link to={`/profile/${user.id}`}>
                        <h5>{user.name}</h5>
                    </Link>
                    <div>{user.address}</div>
                    {
                        this.state.isLoved ? (
                            <p>Bạn thích <b>{user.name}</b>. Hãy nhắn tin và hẹn đôi với anh ấy!</p>
                        ) : null
                    }
                    {
                        (user.id.toString() === current_user.id.toString()) ? null : (
                            <div>
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
                        )
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user
    }
}

export default connect(mapStateToProps, null)(RegisterItem);