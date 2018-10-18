import React, { Component } from 'react';
import { RoundAvatar, SquareAvatar } from '../Avatar';
import connect from 'react-redux/es/connect/connect';
import {joinDating} from '../../actions/EventActions';

class DatingCouple extends Component {
    render() {
        const { event, user } = this.props;
        return (
            <div>
                <a href={`${APP_URL}/dating/${event.id}`}>
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
                </a>

                <div className={"row"}>
                    <div className={"col-md-7 dating-img"}>
                        <img
                            src={event.image}
                        />
                    </div>
                    <div className={"col-md-5 dating-info"}>
                        <div>
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
                            <div className="btn-dating-group">
                                {
                                    event.is_joined ? (
                                        <div>>
                                        {
                                            (event.status !== 'forthcoming') ? 
                                            (
                                                event.status !== 'finished' ? 
                                                (
                                                    <div className="text-center">
                                                        <button className="btn btn-primary btn-sm">Hẹn lại</button>
                                                    </div>
                                                )
                                                :
                                                (
                                                    <div className="text-center">
                                                        <button className="btn btn-primary btn-sm">Xem kết quả</button>
                                                    </div>
                                                )
                                            ) : (
                                                <div className="row">
                                                    <div className="col-6">
                                                        <button className="btn btn-primary btn-sm">Quy định</button>
                                                    </div>
                                                    <div className="col-6">
                                                        <button className="btn btn-primary btn-sm" onClick={() => {document.getElementById('open-invite-modal').click()}}>
                                                            Mời
                                                        </button>
                                                        <button type="button" id="open-invite-modal" className="d-none" 
                                                            data-toggle="modal" data-target="#invite-modal">
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        }
                                        </div>
                                    ) : (
                                        <div className="row">
                                            <div className="col-6">
                                                <button className="btn btn-primary btn-sm">Tìm hiểu</button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-primary btn-sm" onClick={() => {document.getElementById('open-verify-modal').click()}}>
                                                    Tham gia
                                                </button>
                                                <button type="button" id="open-verify-modal" className="d-none" 
                                                    data-toggle="modal" data-target="#verify-id-modal">
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
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
        joinDating: (event_id) => dispatch(joinDating(event_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatingCouple);