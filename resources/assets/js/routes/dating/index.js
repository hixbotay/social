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
        this.props.getAllEvents()
    }

    render() {

        return (
            <DatingLayout>
                <DatingCard title="Cuộc hẹn trong hôm nay" events={this.props.events}></DatingCard>
            </DatingLayout>
        );
    }

}


function mapStateToProps(state) {
    return {
        events: state.event.events
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: () => dispatch(getAllEvents()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dating));