import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents} from "../../actions/EventActions";
import 'react-image-lightbox/style.css';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import DatingCard from '../../components/Card/DatingCard';

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
            <div className="row">

                <div className={'col-md-8'}>
                    <DatingCard title="Cuộc hẹn trong hôm nay" events={this.props.events}></DatingCard>
                </div>
                <div className={'col-md-4'}>
                    <h1>NGUYEN VAN TU</h1>
                </div>

            </div>
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
        getAllEvents: () => dispatch(getAllEvents())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dating));