import React, { Component } from 'react';
import { RoundAvatar, SquareAvatar } from '../Avatar';
import connect from 'react-redux/es/connect/connect';
import { joinDating, updateInvitation } from '../../actions/EventActions';
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
        document.getElementById('open-invite-modal').click();
    }

    render() {
        const { event, user } = this.props;

        var button = null;

        if (event.is_joined) {
            switch (event.status) {
                case 'forthcoming': {
                    button = (
                        <div className="text-center">
                            <button className="btn btn-primary btn-sm">Tìm hiểu thêm</button>
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
                            <Link to={`/dating/${event.id}/result`}>
                                <button className="btn btn-primary btn-sm">Xem kết quả</button>
                            </Link>
                        </div>
                    );
                    break;
                }
            }
        } else {
            button = (
                <div className="row">
                    <div className="col-6">
                        <button className="btn btn-primary btn-sm" onClick={() => this.props.updateInvitation(event.id, { type: 'accept' })}>
                            Chấp nhận
                        </button>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary btn-sm" onClick={() => this.props.updateInvitation(event.id, { type: 'reject' })}>
                            Từ chối
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Link to={`/dating/${event.id}`} >
                    <div className={"row next-dating-header-row1"}>
                        <div className={"col-md-2 align-middle dating-header"}>
                            <RoundAvatar size={"medium"} img={event.creator_avatar}></RoundAvatar>
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
                </Link>

                <div className={"row"}>
                    <div className={"col-md-7 dating-img"}>
                        <img
                            src={event.image}
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
                                (user.id == event.creator) ? (
                                    <div className="row text-center couple-dating-info">
                                        Cuộc hẹn này do bạn tạo ra, hãy mời bạn bè vào cuộc hẹn này!
                                    </div>

                                ) : (
                                    <React.Fragment>
                                        {
                                            event.is_joined ? (
                                                <div >
                                                    <b>
                                                    Bạn đã đồng ý tham gia cuộc hẹn này, hãy đến đúng hẹn và 
                                                    tặng cho người ấy những điều bất ngờ nhé! 
                                                    </b>
                                                </div>
                                            ) : null
                                        }
                                        <div className="row text-center couple-dating-info mt-4">
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
                                    </React.Fragment>
                                )
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
        updateInvitation: (id, type) => dispatch(updateInvitation(id, type))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingCouple));