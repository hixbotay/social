import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents, listSubscribers, createCoupleEvent} from "../../actions/EventActions";
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';
import Modal from '../../components/Modal';
import CircleButton from '../../components/Button/CircleButton';
import Subscriber from '../../components/Dating/Subscriber';

class ListInvitationDating extends Component {

    constructor(props) {
        super(props);
        this.state =  {};
    }

    componentDidMount() {
        this.props.getAllEvents('invited');
        this.props.listSubscribers();
    }

    render() {
        const {events, subscribers, user} = this.props;
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
                <DatingCard title="LỜI MỜI CAFE ĐÔI" events={coupleEvents} type="invitation"></DatingCard>
                <CardWithTitle hasLine={true} title="CÁC THÀNH VIÊN ĐANG MUỐN HẸN HÒ">
                    {
                        subscribers.map((subscriber, item) => {
                            return (
                                <Subscriber 
                                    subscriber={subscriber} 
                                    user={user} 
                                    key={subscriber.id}
                                    createDating={(data) => this.props.createCoupleEvent(data)}
                                />
                            )
                        }) 
                    }
                </CardWithTitle>
                <DatingCard title="LỜI MỜI CAFE NHÓM" events={groupEvents} type="invitation"></DatingCard>
            </DatingLayout>
        );
    }

}


function mapStateToProps(state) {
    return {
        user:  state.user.current_user,
        events: state.event.invitedEvents,
        subscribers: state.event.subscribers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: (status) => dispatch(getAllEvents(status)),
        listSubscribers: () => dispatch(listSubscribers()),
        createCoupleEvent: (data) => dispatch(createCoupleEvent(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListInvitationDating));