import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {SquareAvatar} from '../Avatar';
import CircleButton from '../Button/CircleButton';
import connect from 'react-redux/es/connect/connect';
import Fragment from 'react-dot-fragment';
import InformationNumber from '../Information/InformationNumber';
import {refuseRegister} from '../../actions/EventActions';
 
class RegisterItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoved: parseInt(props.user.is_loved) ? true : false,
            isLiked: parseInt(props.user.is_like) ? true : false, 
            loveNumber: parseInt(props.user.loveNumber),
            likeNumber: parseInt(props.user.likeNumber),
            isSecret: props.isSecretEvent && !(props.user.is_partner_loved && props.user.is_loved) // 2 person is couple if they love each other
        }
    }

    onUpdateRelationship(actionType) {
        var data = {};

        if(actionType == 'love') {
            if(this.state.isLoved) {
                data = {'is_loved': 0};
                this.setState({
                    isLoved: false,
                    loveNumber: this.state.loveNumber - 1,
                    isSecret: this.props.isSecretEvent && !(this.props.user.is_partner_loved && false)
                });
            } else {
                data = {'is_loved': 1};
                this.setState({
                    isLoved: true,
                    loveNumber: this.state.loveNumber + 1,
                    isSecret: this.props.isSecretEvent && !(this.props.user.is_partner_loved && true)
                });
            }
        } else if(actionType == 'like') {
            if(this.state.isLiked) {
                data = {'is_like': 0};
                this.setState({
                    isLiked: false,
                    likeNumber: this.state.likeNumber - 1,
                });
            } else {
                data = {'is_like': 1};
                this.setState({
                    isLiked: true,
                    likeNumber: this.state.likeNumber + 1,
                });
            }
        }

        this.props.action(data, this.props.user.id);
    }

    onRefuse() {
        if(confirm(`Bạn không muốn cho ${this.props.user.name} tham gia cuộc hẹn này?`)) {
            this.props.refuseRegister(this.props.event.id, {user_id: this.props.user.id})
        }
    }

    render() {
        const {user, current_user, event} = this.props; 

        return (
            <React.Fragment>
                <div className="row register-item">
                    <div className="col-1">
                        {
                            (user.id !== current_user.id && event.status === "finished") ? (
                                <span onClick={() => this.onUpdateRelationship('love')} className={`love-btn ${this.state.isLoved ? 'active' : ''}`}>
                                    <i className={`fas fa-heart`} ></i>
                                </span>
                            ) : null
                        }
                    </div>
                {
                    (!this.state.isSecret || (user.id === current_user.id)) ? (
                        <Fragment>
                            <div className="col-3">
                                <SquareAvatar img={user.avatar} size="medium"></SquareAvatar>
                            </div>
                            <div className="col-8">
                                <h5>{user.name}</h5>
                                {/* <InformationNumber heartNumber={this.state.loveNumber} likeNumber={this.state.likeNumber} viewNumber={user.viewNumber}/> */}
                                {/* {
                                    (user.id !== current_user.id) ? (
                                        <Fragment>
                                            <div>          
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
                                            </div>
                                        </Fragment>
                                    ) : null
                                } */}
                            </div>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <div className="col-3">
                                <SquareAvatar img={`${baseUrl}/public/images/default-avatar-heart.png`} size="medium"></SquareAvatar>
                            </div>
                            <div className="col-8">
                                <h5>{`ID-${user.id}`}</h5>
                                {/* <InformationNumber heartNumber={this.state.loveNumber} likeNumber={this.state.likeNumber} viewNumber={user.viewNumber}/> */}
                            </div>
                        </Fragment>
                    )
                }
                </div>
                {
                    (current_user.id === event.creator) ? (
                        <div className="text-center">
                            <button className="btn btn-danger btn-sm" onClick={() => this.onRefuse()}>
                                Từ chối
                            </button>
                        </div>
                    ) : null
                }
                
                <hr/>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        refuseRegister: (id, data) => dispatch(refuseRegister(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterItem);