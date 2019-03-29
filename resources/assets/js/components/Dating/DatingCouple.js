import React, { Component } from 'react';
import { RoundAvatar, SquareAvatar } from '../Avatar';
import connect from 'react-redux/es/connect/connect';
import { joinDating, updateInvitation, cancelEventByMember, updateEventStatus, resetEvent, getCoupleEventMember } from '../../actions/EventActions';
import { withRouter, Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import moment from 'moment';

const renderCountdown = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return null;
    } else {
        // Render a countdown
        return (
            <div className="countdown-timer">
                <p>{hours}:{minutes}:{seconds}</p>
            </div>
        );
    }
}

class DatingCouple extends Component {
    constructor() {
        super();
        this.state = {
            members: []
        }
    }

    componentDidMount() {
        this.props.getCoupleEventMember(this.props.event.id).then(users => {
            this.setState({members: users});
        })
    }

    join(event_id) {
        if (this.props.user.is_id_verified) {
            this.props.joinDating(event_id).then(data => {
                window.location.href = `${baseUrl}/dating/${event_id}`;
            });
        }
        else document.getElementById('open-verify-modal').click();
    }

    invite(event_id) {
        this.props.action(event_id);
        this.props.invite();
    }

    reject(event_id) {
        this.props.action(event_id);
        this.props.reject();
    }

    cancelEvent() {
        if (this.props.user.id !== this.props.event.creator) {
            if (confirm("Bạn có chắc muốn rời cuộc hẹn này?")) {
                this.props.cancelEventByMember(this.props.event.id);
            }
        } else {
            if (confirm("Bạn là người tạo ra cuộc hẹn này, bạn thực hiện hành động này đồng nghĩa là bạn muốn hủy cuộc hẹn hoàn toàn?")) {
                this.props.updateEventStatus(this.props.event.id, { status: 'cancelled' });
            }
        }
    }

    resetEvent() {
        if (confirm("Bạn chắc chắn muốn hẹn lại cuộc hẹn này?")) {
            this.props.resetEvent(this.props.event.id);
        }
    }

    render() {
        const { event, user, status } = this.props;
        var {members} = this.state;

        var button = null;

        if (event.is_joined) {
            switch (status) {
                case 'forthcoming': {
                    button = (
                        <div className="row">
                            <div className="col-6">
                                <button className="btn btn-danger btn-sm mr-2" onClick={() => this.cancelEvent()}>
                                    Hủy cuộc hẹn
                                </button>
                            </div>
                            <div className="col-6">
                                <Link to={`/dating/${event.id}`}>
                                    <button className="btn btn-primary btn-sm ml-2">
                                        Quy định
                                    </button>
                                </Link>
                            </div>
                        </div>
                    );
                    break;
                }
                case 'cancelled': {
                    if (new Date(event.limit_time_register) > new Date()) {
                        button = (
                            <div className="text-center">
                                <button className="btn btn-primary btn-sm" onClick={() => this.resetEvent()}>
                                    Hẹn lại
                                </button>
                            </div>
                        );
                    }
                    break;
                }
                case 'finished': {
                    button = (
                        <div className="text-center">
                            <Link to={`/dating/${event.id}/result`}>
                                <button className="btn btn-primary btn-sm">Xem kết quả</button>
                            </Link>
                        </div>
                    );
                    break;
                }
            }
        } else {
            if(event.is_invited) {
                button = (
                    <div className="row">
                        {/* <div className="col-6">
                            <button className="btn btn-primary btn-sm" onClick={() => this.props.updateInvitation(event.id, { type: 'accept' })}>
                                Chấp nhận
                            </button>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary btn-sm" onClick={() => this.reject(event.id)}>
                                Từ chối
                            </button>
                        </div> */}
                        <Link to={`/dating/${event.id}`}>
                            <button className="btn btn-primary">
                                Xem lời mời
                            </button>
                        </Link>
                    </div>
                );
            } else {
                button = (
                    <div className="row">
                        <div className="col-6">
                            <button className="btn btn-primary btn-sm" onClick={() => this.props.updateInvitation(event.id, { type: 'accept' })}>
                                Tham gia
                            </button>
                        </div>
                    </div>
                );
            }
        }

        return (
            <div>
                <Link to={`/dating/${event.id}`} >
                    {
                        (event.address) ? (
                            <div className={"row next-dating-header-row1"}>
                                <div className={"col-md-2 align-middle dating-header"}>
                                    <RoundAvatar size={"medium"} img={event.agency_avatar}></RoundAvatar>
                                </div>
                                <div className={"col-md-7 dating-header"}>
                                    <h5>{event.name}</h5>
                                    <div>{event.address}</div>
                                </div>
                                <div className={"col-md-3 align-right dating-time"}>
                                    <div>{moment(event.start_time).format("DD/MM/YYYY")}</div>
                                    <div>{moment(event.start_time).format("HH:mm")}</div>
                                </div>
                            </div>
                        ) : (
                            <div className={"row next-dating-header-row1"}>
                                <div className={"col-md-2 align-middle dating-header"}>
                                    <RoundAvatar size={"medium"} img={`${baseUrl}/public/images/agency.png`}></RoundAvatar>
                                </div>
                                <div className={"col-md-7 dating-header"}>
                                    <h5>Chưa có địa điểm</h5>
                                </div>
                                <div className={"col-md-3 align-right dating-time"}>
                                    <div>{moment(event.start_time).format("DD/MM/YYYY")}</div>
                                    <div>{moment(event.start_time).format("HH:mm")}</div>
                                </div>
                            </div>
                        )
                    }
                    
                </Link>

                <div className={"row"}>
                    <div className={"col-md-7 dating-img"}>
                        <img
                            src={event.image ? event.image : `${baseUrl}/public/images/couple_dating.jpg`}
                        />
                        {
                            (event.status == 'forthcoming' && ((new Date(event.start_time) - new Date()) <= 48 * 60 * 60 * 1000)) ? (
                                <Countdown
                                    date={new Date(event.start_time)}
                                    renderer={renderCountdown}
                                    daysInHours={true}
                                ></Countdown>
                            ) : null
                        }
                    </div>
                    <div className={"col-md-5 dating-info"}>
                        <div>

                            {
                                event.status == 'forthcoming' && event.is_joined && event.creator != user.id ? (
                                    <div >
                                        <b>
                                            Bạn đã đồng ý tham gia cuộc hẹn này, hãy đến đúng hẹn và
                                            tặng cho người ấy những điều bất ngờ nhé!
                                        </b>
                                    </div>
                                ) : null
                            }
                            {
                                members.length ? (
                                    <div className="row text-center couple-dating-info mt-4">
                                        <div className="col-5 couple-avatar">
                                            <SquareAvatar img={members[0].avatar} size="medium"></SquareAvatar>
                                            <h6>{members[0].name}</h6>
                                        </div>
                                        <div className="col-2">
                                            <i className="far fa-heart" id="couple-icon"></i>
                                        </div>
                                        <div className="col-5 couple-avatar">
                                            <SquareAvatar img={members[1].avatar} size="medium"></SquareAvatar>
                                            <h6>{members[1].name}</h6>
                                        </div>
                                    </div>
                                ) : null
                            }

                            <div className="btn-dating-group text-center">
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
        updateInvitation: (id, type) => dispatch(updateInvitation(id, type)),
        cancelEventByMember: (id) => dispatch(cancelEventByMember(id)),
        updateEventStatus: (id, status) => dispatch(updateEventStatus(id, status)),
        resetEvent: (id) => dispatch(resetEvent(id)),
        getCoupleEventMember: (id) => dispatch(getCoupleEventMember(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingCouple));