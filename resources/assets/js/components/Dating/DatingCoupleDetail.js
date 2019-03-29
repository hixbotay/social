import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import DatingLayout from '../../routes/dating/DatingLayout';
import { RoundAvatar, SquareAvatar } from '../../components/Avatar';
import { withRouter, Link, Redirect } from 'react-router-dom';
import CircleButton from '../../components/Button/CircleButton';
import { getEventDetail } from '../../actions/EventActions';
import { updateRelationship } from '../../actions/UserActions';
import Select from 'react-select';
import { updateEventStatus, joinDating, updateInvitation, getCoupleEventMember, cancelEventByMember } from '../../actions/EventActions';
import InformationNumber from '../../components/Information/InformationNumber';
// import Modal from '../../components/Modal';
import Modal from 'react-modal';
import _ from "lodash";
import moment from 'moment';
import { getAllProvinces, getAllDistricts } from '../../actions/AddressActions';
import { getAllCafe } from '../../actions/CafeActions';
import Slider from "react-slick";
import DatingCoupleDetailForm from './DatingCoupleDetailForm';

class DatingCoupleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLikedCreator: false,
            isLovedCreator: false,
            isAlert: false,
            isReject: false,
            isShowForm: false,
            reason: '',
            coupleMembers: [],
            themes: [],
            event_data: {},
        }
    }

    componentDidMount() {
        this.props.getAllProvinces();
        this.props.getCoupleEventMember(this.props.match.params.id).then(users => {
            this.setState({
                coupleMembers: users
            })
        })
    }

    cancelDating(event_id) {
        if (confirm("Bạn có chắc muốn hủy cuộc hẹn này?")) {
            this.props.updateEventStatus(event_id, { status: "cancelled" });
        }
    }

    join(event_id) {
        if (this.props.event.address) {
            if (this.props.current_user.is_id_card_verified === 'pending' || this.props.current_user.is_id_card_verified === 'verified') {
                if (this.props.event.is_invited) {
                    this.props.updateInvitation(event_id, { type: 'accept' });
                } else {
                    this.props.joinDating(event_id).then(data => {
                        window.location.href = `${baseUrl}/dating/${event_id}`;
                    });
                }
            }
            else {
                this.setState({
                    isAlert: true
                })
            }
        } else {
            this.setState({
                isShowForm: true
            })
        }
    }

    onChangeReason(e) {
        this.setState({
            reason: e.target.value
        })
    }

    onRejectInvitation() {
        this.setState({
            isReject: true
        })
    }

    reject(e) {
        e.preventDefault();
        if (confirm("Bạn có chắc muốn từ chối cuộc hẹn này?")) {
            this.props.updateInvitation(this.props.event.id, { type: 'reject', reason: this.state.reason });
        }
        this.setState({
            isReject: false
        })
    }

    onUpdateRelationship(actionType) {
        var data = {};

        if (actionType == 'love') {
            if (this.state.isLovedCreator) {
                data = { 'is_loved': 0 };
                this.setState({
                    isLovedCreator: false,
                    loveNumber: this.state.loveNumber - 1,
                });
            } else {
                data = { 'is_loved': 1 };
                this.setState({
                    isLovedCreator: true,
                    loveNumber: this.state.loveNumber + 1,
                });
            }
        } else if (actionType == 'like') {
            if (this.state.isLikedCreator) {
                data = { 'is_like': 0 };
                this.setState({
                    isLikedCreator: false,
                    likeNumber: this.state.likeNumber - 1,
                });
            } else {
                data = { 'is_like': 1 };
                this.setState({
                    isLikedCreator: true,
                    likeNumber: this.state.likeNumber + 1,
                });
            }
        }

        this.props.updateRelationship(data, this.props.event.creator_user.id);
    }

    cancel(event_id) {
        if (confirm("Bạn chắc chắn muốn rời khỏi cuộc hẹn này?")) {
            this.props.cancelEventByMember(event_id);
        }
    }

    render() {
        const { event, current_user, price, provinces } = this.props;

        var canceledPerson = this.state.coupleMembers.find(member => member.id == event.canceled_person);

        if (event) {

            var priceFee = 0;
            if (event.type) {
                priceFee = (event.type == 'couple') ? price.dating.couple_dating_price : price.dating.group_dating_price;
            }

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
        }

        if (event === null) {
            return (
                <div className="alert alert-warning">
                    Bạn không thể xem chi tiết cuộc hẹn này. Vui lòng quay lại.
                </div>
            )
        }

        return (

            (event.id != undefined) ? (
                (event.status != 'finished') ? (
                    <DatingLayout>
                        <Card>
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
                            <br />
                            <div className="row">
                                <div className="col-6">
                                    <div className="row">
                                        <div className="col-6">
                                            Hạn đăng ký
                                        </div>
                                        <div className="col-6">
                                            {moment(event.limit_time_register).format('HH:mm DD/MM/YYYY')}
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
                                            Hình thức cuộc hẹn
                                        </div>
                                        <div className="col-6">
                                            {event.type === 'group' ? 'Hẹn nhóm' : 'Hẹn đôi'}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6">
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
                                </div>
                            </div>
                        </Card>

                        <CardWithTitle hasLine={true} title="NGƯỜI TỔ CHỨC CUỘC HẸN">
                            {
                                (event.creator_user != {}) ? (
                                    <div className="row">
                                        <div className="col-3">
                                            <Link to={`/profile/${event.creator}`}>
                                                <SquareAvatar img={event.creator_user.avatar} size="large"></SquareAvatar>
                                            </Link>
                                        </div>
                                        <div className="col-9">
                                            <Link to={`/profile/${event.creator}`}>
                                                <h5>{event.creator_user.name}</h5>
                                            </Link>

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
                                                            <button className="btn btn-danger mr-2" onClick={() => this.cancelDating(event.id)}>
                                                                Hủy cuộc hẹn
                                                            </button>
                                                        </div>
                                                    </React.Fragment>
                                                ) : null
                                            }
                                            {
                                                current_user.id != event.creator_user.id ? (
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
                                                ) : null
                                            }
                                        </div>
                                    </div>
                                ) : (
                                        <div>Loading....</div>
                                    )
                            }
                            {
                                event.status === 'cancelled' && canceledPerson ? (
                                    <div className="alert alert-danger">
                                        <b>Lý do hủy cuộc hẹn: </b>
                                        <span>{`${canceledPerson.name} hủy cuộc hẹn này với lý do ${event.canceled_reason}`}</span>
                                    </div>
                                ) : null
                            }
                        </CardWithTitle>

                        {
                            (!event.address && event.status === 'forthcoming' && event.creator != current_user.id) ? (
                                <Card>
                                    <h5>Người kia đã nhường bạn chọn địa điểm, nếu đồng ý với lời mời hãy chọn quán và ấn xác nhận.</h5>
                                    <DatingCoupleDetailForm event={this.props.event} onReject={() => this.onRejectInvitation()}></DatingCoupleDetailForm>
                                </Card>
                            ) : (
                                    <React.Fragment>
                                        <CardWithTitle hasLine={true} title="DANH SÁCH HẸN ĐÔI">
                                            <div className="row">
                                                {
                                                    this.state.coupleMembers.map(member => {
                                                        let status = null;
                                                        switch (member.type) {
                                                            case 'register': {
                                                                switch (member.status) {
                                                                    case 0: {
                                                                        status = 'Đã hủy';
                                                                        break;
                                                                    }
                                                                    case 1: {
                                                                        status = 'Đang tham gia';
                                                                        break;
                                                                    }
                                                                    case 2: {
                                                                        status = 'Đã bị từ chối';
                                                                        break;
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                            case 'invited': {
                                                                switch (member.status) {
                                                                    case 0: {
                                                                        status = 'Chưa trả lời lời mời';
                                                                        break;
                                                                    }
                                                                    case 1: {
                                                                        status = 'Đang tham gia';
                                                                        break;
                                                                    }
                                                                    case 2: {
                                                                        status = 'Đã từ chối lời mời';
                                                                        break;
                                                                    }
                                                                }
                                                                break;
                                                            }
                                                        }

                                                        return (
                                                            <div className="col-6" key={member.id}>
                                                                <Link to={`/profile/${member.id}`}>
                                                                    <div className="row">
                                                                        <div className="col-6">
                                                                            <SquareAvatar img={member.avatar} size="large" />
                                                                        </div>
                                                                        <div className="col-6">
                                                                            <h4>{member.name}</h4>
                                                                            <div>{status}</div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </CardWithTitle>

                                        {
                                            event.status == "forthcoming" ? (
                                                (!event.is_joined) ? (
                                                    <div>
                                                        {
                                                            event.is_invited && event.type === 'couple' ? (
                                                                <div className="mt-4 row">
                                                                    <div className="col-2"></div>
                                                                    <div className="col-4 text-center">
                                                                        <button className="btn btn-primary" onClick={() => this.join(event.id)}>
                                                                            CHẤP NHẬN
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-4 text-center">
                                                                        <button className="btn btn-warning" onClick={() => { this.setState({ isReject: true }) }}>
                                                                            TỪ CHỐI
                                                                        </button>
                                                                    </div>
                                                                    <div className="col-2"></div>
                                                                </div>
                                                            ) : (
                                                                <div className="mt-4 text-center">
                                                                    <button className="btn btn-primary" onClick={() => this.join(event.id)}>
                                                                        THAM GIA NGAY!
                                                                    </button>
                                                                </div>
                                                            )
                                                        }
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <button className="btn btn-danger" onClick={() => this.cancel(event.id)}>
                                                            RỜI KHỎI CUỘC HẸN
                                                        </button>
                                                    </div>
                                                )
                                            ) : null
                                        }
                                    </React.Fragment>
                                )
                        }

                        <Modal isOpen={this.state.isAlert} >
                            <div className="row">
                                <div className="col-6">
                                    <img src="https://img.freepik.com/free-vector/funny-couple-making-a-selfie_1045-571.jpg?size=338&ext=jpg" id="create-event-alert-img" />
                                </div>
                                <div className="col-6">
                                    <div className="text-center" id="create-event-alert-header">
                                        VUI LÒNG XÁC MINH CMT
                                    </div>
                                    <div className="text-center create-event-alert-content">
                                        Trước khi tham gia một cuộc hẹn, hãy chắc chấn đó là bạn.
                                    </div>
                                    <div className="text-center create-event-alert-content">
                                        <button className="btn btn-primary" onClick={() => { this.setState({ isAlert: false }) }}>
                                            OK
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Modal>
                        <Modal isOpen={this.state.isReject}>
                            <form onSubmit={(e) => this.reject(e)}>
                                <div className="form-group">
                                    <label>Lý do từ chối</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="reason"
                                        placeholder="Bạn có thể bỏ qua nếu không thích..."
                                        onChange={(e) => this.onChangeReason(e)}
                                    />
                                </div>
                                <button className="btn btn-sm btn-primary" type="submit">Xác nhận</button>
                                <button className="btn btn-sm btn-danger" onClick={() => { this.setState({ isReject: false }) }}>
                                    Hủy
                                </button>
                            </form>
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
        current_user: state.user.current_user,
        price: state.payment.price,
        provinces: state.address.provinces,
        districts: state.address.districts,
        cafes: state.cafe.cafes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEventDetail: (id) => dispatch(getEventDetail(id)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id)),
        updateEventStatus: (event_id, status) => dispatch(updateEventStatus(event_id, status)),
        joinDating: (event_id) => dispatch(joinDating(event_id)),
        updateInvitation: (id, data) => dispatch(updateInvitation(id, data)),
        getCoupleEventMember: (id) => dispatch(getCoupleEventMember(id)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
        getAllCafe: (filter) => dispatch(getAllCafe(filter)),
        cancelEventByMember: (id) => dispatch(cancelEventByMember(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingCoupleDetail));