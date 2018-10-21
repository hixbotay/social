import React, { Component } from 'react';
import { joinDating, updateInvitation } from '../../actions/EventActions';
import { connect } from 'react-redux';
import { RoundAvatar } from '../Avatar';
import { withRouter, Link } from 'react-router-dom';

class DatingGroup extends Component {

    join(event_id) {
        if (this.props.user.is_id_verified) {
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
        const { event, type } = this.props;
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
                                    <button className="btn btn-primary btn-sm">
                                        Xem kết quả
                                    </button>
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
                            <button className="btn btn-primary btn-sm">Tìm hiểu</button>
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
                <Link to={`/dating/${event.id}`}>
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
                            <div>
                                <i className="far fa-heart"></i>
                                <span>
                                    {
                                        event.marital_status.map((item, index) => {
                                            return (item === '0' ? <span key={index}> Single</span> : <span key={index}> Married</span>)
                                        })
                                    }
                                </span>
                            </div>
                            <div>
                                <i className="fas fa-suitcase"></i>
                                <div>
                                    {
                                        event.job.map((item, index) => {
                                            return (<div key={index} className="tag">{item}</div>)
                                        })
                                    }
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
        updateInvitation: (id, type) => dispatch(updateInvitation(id, type))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingGroup));