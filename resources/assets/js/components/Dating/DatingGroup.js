import React, { Component } from 'react';
import { joinDating, updateInvitation, cancelEventByMember, updateEventStatus, resetEvent } from '../../actions/EventActions';
import { connect } from 'react-redux';
import { RoundAvatar } from '../Avatar';
import { withRouter, Link } from 'react-router-dom';
import Countdown from 'react-countdown-now';
import {
    FacebookShareCount,
    GooglePlusShareCount,

    FacebookShareButton,
    GooglePlusShareButton,
    TwitterShareButton,

    FacebookIcon,
    TwitterIcon,
    GooglePlusIcon,
  } from 'react-share';
import moment from 'moment';

const renderCountdown = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return null;
    } else {
        // Render a countdown
        return (
            <div className="countdown-timer">
                {hours}:{minutes}:{seconds}
            </div>
        );
    }
}

class DatingGroup extends Component {

    join(event_id) {
        if (this.props.user.is_id_card_verified != 'not_yet') {
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

    cancelEvent() {
        if(this.props.user.id !== this.props.event.creator) {
            if(confirm("Bạn có chắc muốn rời cuộc hẹn này?")) {
                this.props.cancelEventByMember(this.props.event.id);
            }
        } else {
            if(confirm("Bạn là người tạo ra cuộc hẹn này, bạn thực hiện hành động này đồng nghĩa là bạn muốn hủy cuộc hẹn hoàn toàn?")) {
                this.props.updateEventStatus(this.props.event.id, {status: 'cancelled'});
            }
        }  
    }

    resetEvent() {
        if(confirm("Bạn chắc chắn muốn hẹn lại cuộc hẹn này?")) {
            this.props.resetEvent(this.props.event.id);
        }
    }

    render() {
        const { event, status } = this.props;
        var button = null;
        var shareUrl = `${baseUrl}/dating/${event.id}`;

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
                                <button className="btn btn-primary btn-sm ml-2" onClick={() => this.invite(event.id)}>
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
                    if(new Date(event.limit_time_register) > new Date()) {
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
                                <button className="btn btn-primary btn-sm ml-2">
                                    Xem kết quả
                                </button>
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
                        <Link to={`/dating/${event.id}`}>
                            <button className="btn btn-primary btn-sm">Tìm hiểu</button>
                        </Link>
                    </div>
                    <div className="col-6">
                        <button className="btn btn-primary btn-sm ml-2" onClick={() => this.join(event.id)}>
                            Tham gia
                            </button>
                        <button type="button" id="open-verify-modal" className="d-none"
                            data-toggle="modal" data-target="#verify-id-modal">
                        </button>
                    </div>
                </div>
            )
        }

        var maritalStatus = "Tất cả trạng thái"
        switch(event.marital_status[0]) {
            case null: {
                break;
            }
            case "0": {
                maritalStatus = "Độc thân";
                break;
            }
            case "1": {
                maritalStatus = "Đã kết hôn";
                break;
            }
            case "2": {
                maritalStatus = "Đã từng kết hôn trước đó";
                break;
            }
        }

        return (
            <div>
                <Link to={`/dating/${event.id}`}>
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
                            <div className="text-center">
                                <h5>ĐIỀU KIỆN</h5>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Min {event.min_male_number} - Max {event.max_male_number}
                                </div>
                                <div className="col-1">
                                    <i className="fas fa-male"></i>
                                </div>
                                <div className="col-5">
                                    Tuổi {event.min_male_age} - {event.max_male_age}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Min {event.min_female_number} - Max {event.max_female_number}
                                </div>
                                <div className="col-1">
                                    <i className="fas fa-female"></i>
                                </div>
                                <div className="col-5">
                                    Tuổi {event.min_female_age} - {event.max_female_age}
                                </div>
                            </div>
                            <div className="mt-2">
                                <i className="far fa-heart"></i>
                                <span> {maritalStatus}</span>
                            </div>
                            <div className="mt-2">
                                <i className="fas fa-suitcase"></i>
                                <div>
                                    {
                                        event.job.indexOf(null) >= 0 ? (
                                            <span className="mr-2"> Tất cả nghề nghiệp</span>
                                        ) : (
                                            event.job.map((item, index) => {
                                                return (<span key={index} className="mr-2">{item}, </span>)
                                            })
                                        )
                                        
                                    }
                                </div>
                            </div>
                            <div className="mt-2 mb-4 row">
                                <div className="col">
                                    <FacebookShareButton
                                        url={shareUrl}
                                        quote="Cuộc hẹn nhóm vui vẻ với noiduyen.vn"
                                        className="Demo__some-network__share-button">
                                        <FacebookIcon size={24} round />
                                    </FacebookShareButton>
                                </div>
                                <div className="col">
                                    <GooglePlusShareButton
                                        url={shareUrl}
                                        quote="Cuộc hẹn nhóm vui vẻ với noiduyen.vn"
                                        className="Demo__some-network__share-button"
                                    >
                                        <GooglePlusIcon size={24} round/>
                                    </GooglePlusShareButton>
                                </div>
                                <div className="col">
                                    <TwitterShareButton
                                        url={shareUrl}
                                        quote="Cuộc hẹn nhóm vui vẻ với noiduyen.vn"
                                        className="Demo__some-network__share-button"
                                    >
                                        <TwitterIcon size={24} round/>
                                    </TwitterShareButton>
                                </div>
                            </div>
                            <div className="row btn-dating-group">
                                {button}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
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
        resetEvent: (id) => dispatch(resetEvent(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingGroup));