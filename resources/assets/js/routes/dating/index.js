import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents} from "../../actions/EventActions";
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard } from '../../components/Card';
import DatingLayout from './DatingLayout';
// import {joinDating} from '../../actions/EventActions';

class Dating extends Component {

    constructor(props) {
        super(props);
        this.state =  {};
    }



    componentDidMount() {
        this.props.getAllEvents('forthcoming');
        this.props.getAllEvents('finished');
        this.props.getAllEvents('cancelled');
    }

    render() {

        return (
            <DatingLayout>
                <DatingCard title="CUỘC HẸN SẮP TỚI" events={this.props.forthcomingEvents}></DatingCard>
                <DatingCard title="CUỘC HẸN ĐÃ KẾT THÚC" events={this.props.finishedEvents}></DatingCard>
                <DatingCard title="CUỘC HẸN ĐÃ HỦY" events={this.props.cancelledEvents}></DatingCard>
            </DatingLayout>
        );
    }

}


function mapStateToProps(state) {
    return {
        forthcomingEvents: state.event.forthcomingEvents,
        finishedEvents: state.event.finishedEvents,
        cancelledEvents: state.event.cancelledEvents
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: (status) => dispatch(getAllEvents(status)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dating));