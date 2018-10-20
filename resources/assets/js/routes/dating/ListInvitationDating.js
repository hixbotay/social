import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents} from "../../actions/EventActions";
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard } from '../../components/Card';
import DatingLayout from './DatingLayout';
import Modal from '../../components/Modal';
import CircleButton from '../../components/Button/CircleButton';

class ListInvitationDating extends Component {

    constructor(props) {
        super(props);
        this.state =  {};
    }

    componentDidMount() {
        this.props.getAllEvents('invited');
    }

    render() {
        const {events} = this.props;
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
                <DatingCard title="LỜI MỜI CAFE ĐÔI" events={coupleEvents}></DatingCard>
                <DatingCard title="LỜI MỜI CAFE NHÓM" events={groupEvents}></DatingCard>
            </DatingLayout>
        );
    }

}


function mapStateToProps(state) {
    return {
        events: state.event.invitedEvents,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: (status) => dispatch(getAllEvents(status)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListInvitationDating));