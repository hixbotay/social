import React, { Component } from 'react';
import { RoundAvatar, SquareAvatar } from '../Avatar';
import connect from 'react-redux/es/connect/connect';
import {joinDating, updateInvitation} from '../../actions/EventActions';
import {withRouter,  Link} from 'react-router-dom';

class DatingCouple extends Component {
    join(event_id) {
        if(this.props.user.is_id_verified) {
            this.props.joinDating(event_id);
            window.location.href = `/dating/${event_id}`;
        }
        else document.getElementById('open-verify-modal').click();
    }

    invite(event_id) {
        this.props.action(event_id);
        document.getElementById('open-invite-modal').click();
    }

    render() {
        const { event, user, type } = this.props;
        var button = null;

        if (type == 'invitation') {
            button = (
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary btn-sm" onClick={() => this.props.updateInvitation(event.id, {type: 'accept'})}>
                            Chấp nhận
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary btn-sm" onClick={() => this.props.updateInvitation(event.id, {type: 'reject'})}>
                            Từ chối
                        </button>
                    </div>
                </div>
            )
        } else {
            if (event.is_joined) {
                switch (event.status) {
                    case 'forthcoming': {
                        button = (
                            <div className="row">
                                <div className="col-6">
                                    <a href={`/dating/${event.id}`}>
                                        <button className="btn btn-primary btn-sm">
                                            Quy định
                                        </button>
                                    </a>
                                </div>
                                <div className="col-6">
                                    <button className="btn btn-primary btn-sm" onClick={() => this.invite(event.id)}>
                                        Mời
                                    </button>
                                    <button type="button" id="open-invite-modal" className="d-none"
                                        data-toggle="modal" data-target="#invite-modal">
                                    </button>
                                </div>
                            </div>
                        );
                        break;
                    }
                    case 'cancelled': {
                        button = (
                            <div className="text-center">
                                <button className="btn btn-primary btn-sm">Hẹn lại</button>
                            </div>
                        );
                        break;
                    }
                    case 'finished': {
                        button = (
                            <div className="text-center">
                                <a href={`/dating/${event.id}/result`}>
                                    <button className="btn btn-primary btn-sm">Xem kết quả</button>
                                </a>
                            </div>
                        );
                        break;
                    }
                }
            } else {
                button = (
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-primary btn-sm">
                                Tìm hiểu
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary btn-sm" onClick={() => this.join(event.id)}>
                                Tham gia
                            </button>
                            <button type="button" id="open-verify-modal" className="d-none"
                                data-toggle="modal" data-target="#verify-id-modal">
                            </button>
                        </div>
                    </div>
                )
            }

        }

        return (
            <div>
                <Link to={`/dating/${event.id}`} > 
                    <div className={"row next-dating-header-row1"}>
                        <div className={"col-md-2 align-middle dating-header"}>
                            <RoundAvatar size={"medium"} img={event.address_avatar}></RoundAvatar>
                        </div>
                        <div className={"col-md-7 dating-header"}>
                            <h5>{event.name}</h5>
                            <div>{event.address}</div>
                        </div>
                        <div className={"col-md-3 align-right dating-time"}>
                            <p>{event.start_time}</p>
                        </div>
                    </div>
                </Link>

                <div className={"row"}>
                    <div className={"col-md-7 dating-img"}>
                        <img
                            src={event.image}
                        />
                    </div>
                    <div className={"col-md-5 dating-info"}>
                        <div>
                            {
                                (user.id.toString() == event.creator.toString()) ? (
                                    <div className="row text-center couple-dating-info">
                                        Cuộc hẹn này do bạn tạo ra, hãy mời bạn bè vào cuộc hẹn này!
                                    </div>
                                    
                                ) : (
                                    <div className="row text-center couple-dating-info">
                                        <div className="col-5 couple-avatar">
                                            <SquareAvatar img={event.creator_avatar} size="medium"></SquareAvatar>
                                            <h6>{event.creator_name}</h6>
                                        </div>
                                        <div className="col-2">
                                            <i className="far fa-heart" id="couple-icon"></i>
                                        </div>
                                        <div className="col-5 couple-avatar">
                                            <SquareAvatar img={user.avatar} size="medium"></SquareAvatar>
                                            <h6>{user.name}</h6>
                                        </div>
                                    </div>
                                )
                            }
                            
                            <div className="btn-dating-group">
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinDating: (event_id) => dispatch(joinDating(event_id)),
        updateInvitation: (id, type) => dispatch(updateInvitation(id, type))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingCouple));