import React, {Component} from 'react';

import {withRouter, Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents, listSubscribers, createCoupleEvent, updateInvitation} from "../../actions/EventActions";
import {getAllProvinces} from '../../actions/AddressActions';
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';
import Modal from 'react-modal';
import CircleButton from '../../components/Button/CircleButton';
import Subscriber from '../../components/Dating/Subscriber';

class ListInvitationDating extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            isAlert: !parseInt(props.user.province_id),
            isReject: false,
            reason: ''
        };
    }

    componentDidMount() {
        this.props.getAllEvents('invited');
        this.props.listSubscribers();
        this.props.getAllProvinces();
    }

    onChangeEvent(event_id) {
        this.setState({ event_id: event_id });
    }

    openRejectModal() {
        this.setState({ isReject: true });
    }

    onChangeReason(e) {
        this.setState({
            reason: e.target.value
        })
    }

    reject(e) {
        e.preventDefault();
        if(confirm("Bạn có chắc muốn từ chối cuộc hẹn này?")) {
            this.props.updateInvitation(this.state.event_id, {type: 'reject', reason: this.state.reason});
        }
        this.setState({
            isReject: false
        })
    }

    render() {
        var {events, subscribers, user, provinces} = this.props;

        var coupleEvents = [];
        var groupEvents = [];
        
        if(events.length) {    
            events.map((event) => {
                if(event.type === 'couple') {
                    coupleEvents.push(event);
                } else {
                    groupEvents.push(event);
                }
            })
        }
        
        return (
            <DatingLayout>
                {
                    coupleEvents.length ? (
                        <DatingCard 
                            title="LỜI MỜI CAFE ĐÔI" 
                            events={coupleEvents} 
                            type="invitation" 
                            action={(event_id) => this.onChangeEvent(event_id)}
                            reject={() => this.openRejectModal()}
                        />
                    ) : (
                        <CardWithTitle hasLine={true} title="LỜI MỜI CAFE ĐÔI">
                            <div className="text-center">
                                Bạn chưa có lời mời nào
                            </div>
                        </CardWithTitle>
                    )
                }

                {
                    subscribers.length ? (
                        <CardWithTitle hasLine={true} title="CÁC THÀNH VIÊN ĐANG MUỐN HẸN HÒ">
                            {
                                subscribers.map((subscriber, item) => {
                                    return (
                                        <Subscriber 
                                            subscriber={subscriber} 
                                            user={user}
                                            provinces={provinces} 
                                            key={subscriber.id}
                                            // createDating={(data) => this.props.createCoupleEvent(data)}
                                        />
                                    )
                                }) 
                            }
                        </CardWithTitle>
                    ) : null
                }

                {
                    groupEvents.length ? (
                        <DatingCard 
                            title="LỜI MỜI CAFE NHÓM" 
                            events={groupEvents} 
                            type="invitation"
                            action={(event_id) => this.onChangeEvent(event_id)}
                            reject={() => this.openRejectModal()}
                        />
                    ) : (
                        <CardWithTitle hasLine={true} title="LỜI MỜI CAFE NHÓM">
                            <div className="text-center">
                                Bạn chưa có lời mời nào
                            </div>
                        </CardWithTitle>
                    )
                }
                
                <Modal isOpen={this.state.isOpenModal}>
                    <div className="float-right" onClick={() => {this.setState({isAlert: false})}}>
                        <i className="fas fa-times fa-2x"></i>
                    </div>
                    <div className="page-header">
                        <h5>Thông báo</h5>
                    </div>
                    <div className="alert alert-warning">
                        Bạn nên cập nhật địa chỉ tỉnh, huyện để có thể nhìn thấy các thành viên đang đăng ký hẹn
                    </div>
                    <Link to={`/profile/edit`}>
                        <button className="btn btn-primary">Cập nhật ngay</button>
                    </Link>
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
                    </form>
                </Modal>
            </DatingLayout>
        );
    }

}


function mapStateToProps(state) {
    return {
        user:  state.user.current_user,
        events: state.event.invitedEvents,
        subscribers: state.event.subscribers,
        provinces: state.address.provinces
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: (status) => dispatch(getAllEvents(status)),
        listSubscribers: () => dispatch(listSubscribers()),
        createCoupleEvent: (data) => dispatch(createCoupleEvent(data)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        updateInvitation: (id, data) => dispatch(updateInvitation(id, data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListInvitationDating));