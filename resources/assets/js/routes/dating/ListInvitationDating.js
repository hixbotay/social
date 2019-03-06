import React, {Component} from 'react';

import {withRouter, Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents, listSubscribers, createCoupleEvent} from "../../actions/EventActions";
import {getAllProvinces} from '../../actions/AddressActions';
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';
import Modal from 'react-responsive-modal';
import CircleButton from '../../components/Button/CircleButton';
import Subscriber from '../../components/Dating/Subscriber';

class ListInvitationDating extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            isOpenModal: !parseInt(props.user.province_id)
        };
    }

    componentDidMount() {
        this.props.getAllEvents('invited');
        this.props.listSubscribers();
        this.props.getAllProvinces();
    }

    closeModal() {
        this.setState({isOpenModal: false});
    }

    render() {
        const {events, subscribers, user, provinces} = this.props;

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
                        <DatingCard title="LỜI MỜI CAFE ĐÔI" events={coupleEvents} type="invitation"></DatingCard>
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
                    coupleEvents.length ? (
                        <DatingCard title="LỜI MỜI CAFE NHÓM" events={groupEvents} type="invitation"></DatingCard>
                    ) : (
                        <CardWithTitle hasLine={true} title="LỜI MỜI CAFE NHÓM">
                            <div className="text-center">
                                Bạn chưa có lời mời nào
                            </div>
                        </CardWithTitle>
                    )
                }
                
                <Modal open={this.state.isOpenModal} onClose={() => this.closeModal()}>
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListInvitationDating));