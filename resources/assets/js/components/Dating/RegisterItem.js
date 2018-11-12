import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {SquareAvatar} from '../Avatar';
import CircleButton from '../Button/CircleButton';
import connect from 'react-redux/es/connect/connect';
import Fragment from 'react-dot-fragment';
import InformationNumber from '../Information/InformationNumber';
 
class RegisterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoved: props.user.is_loved,
            isLiked: props.user.is_like,
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
        const {user, current_user, type, isSecret, isForthcoming} = this.props; 
        var isShowUser = !isSecret && (this.state.isLoved || this.state.isLiked);
        if(type === 'creator' || (user.id === current_user.id)) {
            isShowUser = true;
        }

        return (
            <div className="row register-item">
            {
                isShowUser ? (
                    <Fragment>
                        <div className="col-3">
                            <Link to={`/profile/${user.id}`}>
                                <SquareAvatar img={user.avatar} size="large"></SquareAvatar>
                            </Link>
                        </div>
                        <div className="col-9">
                            <Link to={`/profile/${user.id}`}>
                                <h5>{user.name}</h5>
                            </Link>
                            
                            {
                                (user.id === current_user.id) ? (
                                    <Fragment>
                                        {
                                            (type == 'creator') ? (
                                                <div>
                                                    Bạn có thể hủy hẹn nếu không thể tổ chức cuộc hẹn này. Bạn sẽ bị phạt 100k
                                                    nếu hủy trước thời điểm chốt đăng ký. Sau thời điểm chốt, bạn sẽ bị phạt 200k.
                                                    Và nếu bạn không hủy hẹn mà không tổ chức thì chúng tôi sẽ không cho phép bạn tạo cuộc hẹn nữa!
                                                </div>
                                            ) : (
                                                <div>{user.address}</div>
                                            )
                                        }
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {
                                            this.state.isLoved ? (
                                                <p>Bạn thích <b>{user.name}</b>. Hãy nhắn tin và hẹn đôi với anh ấy!</p>
                                            ) : null
                                        }
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
                                    </Fragment>
                                )
                            }
                        </div>
                    </Fragment>
                ) : (
                    <Fragment>
                        <div className="col-3">
                            <SquareAvatar img={`${baseUrl}/public/images/default-avatar-heart.png`} size="large"></SquareAvatar>
                        </div>
                        <div className="col-9">
                            <h5>{`ID-${user.id}`}</h5>
                            <div>{user.address}</div>
                            <InformationNumber heartNumber={parseInt(user.loveNumber)} likeNumber={parseInt(user.likeNumber)} viewNumber={user.viewNumber}/>
                        </div>
                    </Fragment>
                )
            }
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