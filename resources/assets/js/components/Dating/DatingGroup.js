import React, { Component } from 'react';
import {joinDating} from '../../actions/EventActions';
import {connect} from 'react-redux';
import { RoundAvatar } from '../Avatar';

class DatingGroup extends Component {
    render() {
        const { event } = this.props;
        return (
            <div>
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
                                        <div>
                                            <div className="col-7">
                                                <button className="btn btn-primary btn-sm">Tìm hiểu thêm</button>
                                            </div>
                                            <div className="col-5">
                                                <button className="btn btn-primary btn-sm" onClick={() => this.props.joinDating(event.id)}>
                                                    Tham gia
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
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        joinDating: (event_id) => dispatch(joinDating(event_id))
    }
}

export default connect(null, mapDispatchToProps)(DatingGroup);