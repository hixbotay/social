import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';
import { RoundAvatar, SquareAvatar } from '../../components/Avatar';
import { withRouter, Link, Redirect } from 'react-router-dom';
import CircleButton from '../../components/Button/CircleButton';
import RegisterItem from '../../components/Dating/RegisterItem';
import { getEventDetail } from '../../actions/EventActions';
import { updateRelationship } from '../../actions/UserActions';
import Fragment from 'react-dot-fragment';
import { updateEventStatus, joinDating } from '../../actions/EventActions';
import InformationNumber from '../../components/Information/InformationNumber';
import Modal from '../../components/Modal';
import _ from "lodash";
import moment from 'moment';

class DatingDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLikedCreator: false,
            isLovedCreator: false
        }
    }

    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.id).then(creator => {
            this.setState({
                isLikedCreator: creator.is_like,
                isLovedCreator: creator.is_loved,
                loveNumber: parseInt(creator.loveNumber),
                likeNumber: parseInt(creator.likeNumber)
            })
        });
    }

    cancelDating(event_id) {
        if(confirm("Bạn có chắc muốn hủy cuộc hẹn này?")) {
            this.props.updateEventStatus(event_id, { status: "cancelled" });
        }
    }

    join(event_id) {
        if (this.props.current_user.is_id_card_verified === 'pending' || this.props.current_user.is_id_card_verified === 'verified') {
            this.props.joinDating(event_id).then(data => {
                window.location.href = `${baseUrl}/dating/${event_id}`;
            });
        }
        else document.getElementById('open-verify-modal').click();
    }

    onUpdateRelationship(actionType) {
        var data = {};

        if(actionType == 'love') {
            if(this.state.isLovedCreator) {
                data = {'is_loved': 0};
                this.setState({
                    isLovedCreator: false,
                    loveNumber: this.state.loveNumber - 1,
                });
            } else {
                data = {'is_loved': 1};
                this.setState({
                    isLovedCreator: true,
                    loveNumber: this.state.loveNumber + 1,
                });
            }
        } else if(actionType == 'like') {
            if(this.state.isLikedCreator) {
                data = {'is_like': 0};
                this.setState({
                    isLikedCreator: false,
                    likeNumber: this.state.likeNumber - 1,
                });
            } else {
                data = {'is_like': 1};
                this.setState({
                    isLikedCreator: true,
                    likeNumber: this.state.likeNumber + 1,
                });
            }
        }

        this.props.updateRelationship(data, this.props.event.creator_user.id);
    }

    render() {
        const { event, current_user } = this.props;

        var isSecretEvent = event.is_secret;
        if(event.creator === current_user.id) {
            isSecretEvent = 0;
        }

        var registers = _.partition(event.registers, (register) => {return register.gender === "M"});
        var maleRegisters = registers[0];
        var femaleRegisters = registers[1];

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
            (event.id != undefined) ? (
                (event.status != 'finished') ? (
                    <DatingLayout>
                        <Card>
                            <div className={"row next-dating-header-row1"}>
                                <div className={"col-md-2 align-middle dating-header"}>
                                    <RoundAvatar size={"medium"} img={baseUrl + '/' + event.image}></RoundAvatar>
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
                                    <div>{moment(event.start_time).format("DD/MM/YYYY")}</div>
                                    <div>{moment(event.start_time).format("HH:mm")}</div>
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
                                            Tình trạng cuộc hẹn
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
                                            {event.is_secret ? "Bí mật" : "Công khai"}
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            Hình thức cuộc hẹn
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
                                            <span className="tag">{maritalStatus}</span>
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
                                                event.job.indexOf(null) >= 0 ? (
                                                    <span  className="tag"> Tất cả nghề nghiệp</span>
                                                ) : (
                                                    event.job.map((item, index) => {
                                                        return (
                                                            <span className="tag" key={index}>{item}</span>
                                                        )
                                                    })
                                                )
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
                                        ) : (
                                            <div className="row">
                                                <div className="col-4">
                                                    Người tổ chức
                                                </div>
                                                <div className="col-8">
                                                    Thành viên tự tổ chức
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </Card>
                        {
                            event.type === 'group' ? (
                                <div className='row'>
                                    <div className="col-6">
                                        <CardWithIcon leftIcon={'fa fa-mars fa-2x'} hasLine={true} title="Nam">
                                            <div className="row">
                                                <div className="col-4">
                                                    Số lượng
                                                </div>
                                                <div className="col-8">
                                                    Min {event.min_male_number} - Max {event.max_male_number}
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
                                            <div className="row">
                                                <div className="col-4">
                                                    Đã tham gia
                                                </div>
                                                <div className="col-8">
                                                    {event.male_joined_number} người
                                                </div>
                                            </div>
                                        </CardWithIcon>
                                    </div>
                                    <div className="col-6">
                                        <CardWithIcon leftIcon={'fa fa-venus fa-2x'} hasLine={true} title="Nữ">
                                            <div className="row">
                                                <div className="col-4">
                                                    Số lượng
                                                </div>
                                                <div className="col-8">
                                                    Min {event.min_female_number} - Max {event.max_female_number}
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
                                            <div className="row">
                                                <div className="col-4">
                                                    Đã tham gia
                                                </div>
                                                <div className="col-8">
                                                    {event.female_joined_number} người
                                                </div>
                                            </div>
                                        </CardWithIcon>
                                    </div>
                                </div>
                            ) : null
                        }

                        <CardWithTitle hasLine={true} title="NGƯỜI TỔ CHỨC CUỘC HẸN">
                            {
                                (event.creator_user != {}) ? (
                                    <div className="row">
                                        <div className="col-3">
                                            <Link to={`/profile/${event.creator_user.id}`}>
                                                <SquareAvatar img={event.creator_user.avatar} size="large"></SquareAvatar>
                                            </Link>
                                        </div>
                                        <div className="col-9">
                                            <Link to={`/profile/${event.creator_user.id}`}>
                                                <h5>{event.creator_user.name}</h5>
                                            </Link>
                                            <InformationNumber 
                                                heartNumber={this.state.loveNumber} 
                                                likeNumber={this.state.likeNumber} 
                                                viewNumber={event.creator_user.viewNumber}
                                            />

                                            {
                                                (event.status == 'forthcoming' && current_user.id == event.creator_user.id) ? (
                                                    <React.Fragment>
                                                        <div className="mb-4">
                                                            Bạn có thể hủy hẹn nếu không thể tổ chức cuộc hẹn này. Bạn sẽ bị phạt 100k
                                                            nếu hủy trước thời điểm chốt đăng ký. Sau thời điểm chốt, bạn sẽ bị phạt 200k.
                                                            Và nếu bạn không hủy hẹn mà không tổ chức thì chúng tôi sẽ không cho phép bạn
                                                            tạo cuộc hẹn nữa!
                                                        </div>
                                                        <div className="text-center">
                                                            <button className="btn btn-primary mr-2">Nhắn tin chung</button>
                                                            <button className="btn btn-primary mr-2" onClick={() => this.cancelDating(event.id)}>
                                                                Hủy cuộc hẹn
                                                            </button>
                                                        </div>
                                                    </React.Fragment>
                                                ) : (
                                                    <div>
                                                        <CircleButton
                                                            icon="fas fa-heart"
                                                            color={this.state.isLovedCreator ? '#e74c3c' : '#34495e'}
                                                            action={() => this.onUpdateRelationship('love')}
                                                        ></CircleButton>
                                                        <CircleButton
                                                            icon="fas fa-thumbs-up"
                                                            color={this.state.isLikedCreator ? '#2980b9' : '#34495e'}
                                                            action={() => this.onUpdateRelationship('like')}
                                                        ></CircleButton>
                                                        <CircleButton
                                                            icon="fas fa-comments"
                                                            color='#34495e'
                                                            // action
                                                        ></CircleButton>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                ) : (
                                        <div>Loading....</div>
                                    )
                            }
                            {

                            }
                            <div className="dating-description mt-2">
                                <b>Mô tả về cuộc hẹn này:</b>
                                <div>{event.description ? event.description : "Không có mô tả nào về cuộc hẹn này"}</div>
                            </div>
                        </CardWithTitle>

                        <CardWithTitle hasLine={true} title="DANH SÁCH NGƯỜI ĐÃ ĐĂNG KÝ">
                            <div className="row">
                                <div className="col-6">
                                    <div className="text-center mb-4"><b>Danh sách nam tham gia</b></div>
                                    {
                                        maleRegisters.map((user, index) => {
                                            return (
                                                <RegisterItem
                                                    event={event}
                                                    user={user}
                                                    isSecretEvent={isSecretEvent}
                                                    key={index}
                                                    action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                                ></RegisterItem>
                                            )
                                        })
                                    }
                                </div>
                                <div className="col-6">
                                    <div className="text-center mb-4"><b>Danh sách nữ tham gia</b></div>
                                    {
                                        femaleRegisters.map((user, index) => {
                                            return (
                                                <RegisterItem
                                                    event={event}
                                                    user={user}
                                                    isSecretEvent={isSecretEvent}
                                                    key={index}
                                                    action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                                ></RegisterItem>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            {
                                (!event.is_joined && (event.type == "group") && (event.creator.id !== current_user.id)) ? (
                                    <div className="mt-4 text-center">
                                        <button className="btn btn-primary" onClick={() => this.join(event.id)}>
                                            THAM GIA NGAY!
                                        </button>
                                    </div>
                                ) : null
                            }
                        </CardWithTitle>
                        <button type="button" id="open-verify-modal" className="d-none"
                                data-toggle="modal" data-target="#verify-id-modal">
                        </button>
                        <Modal id="verify-id-modal">
                            <div className="row">
                                <div className="col-6">
                                    <img src="https://img.freepik.com/free-vector/funny-couple-making-a-selfie_1045-571.jpg?size=338&ext=jpg" id="create-event-alert-img"/>
                                </div>
                                <div className="col-6">
                                    <div className="text-center" id="create-event-alert-header">
                                        VUI LÒNG XÁC MINH CMT
                                    </div>
                                    <div className="text-center create-event-alert-content">
                                        Trước khi tham gia một cuộc hẹn, hãy chắc chấn đó là bạn.
                                    </div>
                                    <div className="text-center create-event-alert-content">
                                        {/* <Link to={`/profile/${current_user.id}`}> */}
                                            <button className="btn btn-primary" data-dismiss="modal">OK</button>
                                        {/* </Link> */}
                                    </div>
                                </div>
                            </div>
                        </Modal>
                    </DatingLayout>
                ) : (
                        <Redirect to={`/dating/${this.props.match.params.id}/result`} />
                    )
            ) : null
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
        updateEventStatus: (event_id, status) => dispatch(updateEventStatus(event_id, status)),
        joinDating: (event_id) => dispatch(joinDating(event_id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingDetail));