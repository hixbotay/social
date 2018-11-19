import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';
import { RoundAvatar, SquareAvatar } from '../../components/Avatar';
import { withRouter, Link } from 'react-router-dom';
import CircleButton from '../../components/Button/CircleButton';
import RegisterItem from '../../components/Dating/RegisterItem';
import { getEventDetail } from '../../actions/EventActions';
import { updateRelationship } from '../../actions/UserActions';
import Fragment from 'react-dot-fragment';
import {updateEventStatus} from '../../actions/EventActions';

class DatingDetail extends Component {
    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.id);
    }

    cancelDating(event_id) {
        this.props.updateEventStatus(event_id, {status: "cancelled"});
    }

    render() {
        const { event, current_user } = this.props;

        var status = "Sắp diễn ra";
        switch (event.status) {
            case "forthcoming": {
                status = "Sắp diễn ra";
                break;
            }
            case "happening": {
                status = "Đang diễn ra";
                break;
            }
            case "finished": {
                status = "Kết thúc";
                break;
            }
            case "cancelled": {
                status = "Bị hủy";
                break;
            }
        }

        return (
            <DatingLayout>
                <Card>
                    <div className={"row next-dating-header-row1"}>
                        <div className={"col-md-2 align-middle dating-header"}>
                            <RoundAvatar size={"medium"} img={baseUrl + '/' + event.address_avatar}></RoundAvatar>
                        </div>
                        <div className={"col-md-7 dating-header"}>
                            <h5>
                                {event.name}
                                <span>
                                {
                                    event.is_approved ?
                                        <i className="fas fa-check-circle event-status-icon" style={{ color: '#27ae60' }}></i>
                                        : <i className="fas fa-ellipsis-h event-status-icon" style={{ color: '#f1c40f' }}></i>
                                }
                                </span>
                            </h5>
                            <div>{event.address}</div>
                        </div>
                        <div className={"col-md-3 align-right dating-time"}>
                            <p>{event.start_time}</p>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-6">
                            <div className="row">
                                <div className="col-6">
                                    Hạn đăng ký
                                </div>
                                <div className="col-6">
                                    {event.limit_time_register}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Trạng thái
                                </div>
                                <div className="col-6">
                                    {status}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Kiểu cuộc hẹn
                                </div>
                                <div className="col-6">
                                    {event.type === 'group' ? 'Hẹn nhóm' : 'Hẹn đôi'}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Tình trạng hôn nhân
                                </div>
                                <div className="col-6">
                                    {
                                        event.marital_status.map((item, index) => {
                                            return (
                                                <span className="tag" key={index}>{item === 0 ? 'Độc thân' : "Đã kết hôn"}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                                <div className="col-4">
                                    Nghề nghiệp
                                </div>
                                <div className="col-8">
                                    {
                                        event.job.map((item, index) => {
                                            return (
                                                <span className="tag" key={index}>{item}</span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                event.type === 'couple' ? (
                                    <div className="row">
                                        <div className="col-4">
                                            Người thanh toán
                                        </div>
                                        <div className="col-8">
                                            {
                                                (parseInt(event.payer) === parseInt(current_user.id)) ? "Bạn" : "Người kia"
                                            }
                                        </div>
                                    </div>
                                ) : null
                             }
                        </div>
                    </div>
                </Card>
                {
                    event.type === 'group' ? (
                        <div className='row'>
                            <div className="col-6">
                                <CardWithIcon leftIcon={'fa fa-mars fa-2x'} hasLine={true}>
                                    <div className="row">
                                        <div className="col-4">
                                            Số lượng
                                        </div>
                                        <div className="col-8">
                                            {event.min_male_number} - {event.max_male_number}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            Độ tuổi
                                        </div>
                                        <div className="col-8">
                                            {event.min_male_age} - {event.max_male_age}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            Phí tham gia
                                        </div>
                                        <div className="col-8">
                                            {event.payment_m} VND
                                        </div>
                                    </div>
                                </CardWithIcon>
                            </div>
                            <div className="col-6">
                                <CardWithIcon leftIcon={'fa fa-venus fa-2x'} hasLine={true}>
                                    <div className="row">
                                        <div className="col-4">
                                            Số lượng
                                        </div>
                                        <div className="col-8">
                                            {event.min_female_number} - {event.max_female_number}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            Độ tuổi
                                        </div>
                                        <div className="col-8">
                                            {event.min_female_age} - {event.max_female_age}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-4">
                                            Phí tham gia
                                        </div>
                                        <div className="col-8">
                                            {event.payment_f} VND
                                        </div>
                                    </div>
                                </CardWithIcon>
                            </div>
                        </div>
                    ) : null
                }

                <CardWithTitle hasLine={true} title="NGƯỜI TỔ CHỨC CUỘC HẸN">
                    {
                        (event.creator != {}) ? (
                            <Fragment>
                                <RegisterItem
                                    type="creator"
                                    user={event.creator}
                                    isSecretEvent={false}
                                    action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                ></RegisterItem>
                                {
                                    (event.status == 'forthcoming' && current_user.id == event.creator.id) ? (
                                        <div className="row">
                                            <div className="col-3"></div>
                                            <div className="col-9">
                                                <div className="text-center">
                                                    <button className="btn btn-primary mr-2">Nhắn tin chung</button>
                                                    <button className="btn btn-primary mr-2" onClick={() => this.cancelDating(event.id)}>
                                                        Hủy cuộc hẹn
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : null
                                }
                            </Fragment>
                        ) : (
                            <div>Loading....</div>
                        )
                    }
                    {
                        
                    }
                    <div className="dating-description">
                        <b>Mô tả về cuộc hẹn này:</b>
                        <div>{event.description ? event.description : "Không có mô tả nào về cuộc hẹn này"}</div>
                    </div>
                </CardWithTitle>

                <CardWithTitle hasLine={true} title="DANH SÁCH NGƯỜI ĐÃ ĐĂNG KÝ">
                    <div className="row">
                        <div className="container">
                            {
                                event.registers.map((user, index) => {
                                    return (
                                        <RegisterItem
                                            type="register"
                                            user={user}
                                            isSecretEvent={event.is_secret}
                                            key={index}
                                            action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                        ></RegisterItem>
                                    )
                                })
                            }
                        </div>
                    </div>
                </CardWithTitle>
            </DatingLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.event.currentEvent,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEventDetail: (id) => dispatch(getEventDetail(id)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id)),
        updateEventStatus: (event_id, status) => dispatch(updateEventStatus(event_id, status))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingDetail));