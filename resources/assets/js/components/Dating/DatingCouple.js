import React, { Component } from 'react';
import { RoundAvatar, SquareAvatar } from '../Avatar';
import connect from 'react-redux/es/connect/connect';
import {joinDating} from '../../actions/EventActions';

class DatingCouple extends Component {
    render() {
        const { event, user } = this.props;
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
                            <div className="row btn-dating-group">
                                <div className="col-7">
                                    <button className="btn btn-primary btn-sm ">Tìm hiểu thêm</button>
                                </div>
                                <div className="col-5">
                                    <button className="btn btn-primary btn-sm " onClick={() => this.props.joinDating(event.id)}>
                                        Tham gia
                                    </button>
                                </div>
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