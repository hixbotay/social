import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents} from "../../actions/EventActions";
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard } from '../../components/Card';
import DatingLayout from './DatingLayout';
// import {joinDating} from '../../actions/EventActions';
import Modal from '../../components/Modal';
import CircleButton from '../../components/Button/CircleButton';

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

                <Modal id="invite-modal">
                    <div className="row">
                        <div className="col-md-10">
                            <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={(event) => this.changeKeyword(event)}/>
                        </div>
                        <div className="col-md-2">
                            <button className='btn' onClick={() => this.onSearch()}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <input className="form-control" placeholder="Nhập lời mời tham gia..."/>
                        </div>
                        <div className="col-md-2">
                            <CircleButton icon="fab fa-telegram-plane"></CircleButton>
                        </div>
                    </div>
                    <img id="invite-cover" src="https://www.shona.ie/app/uploads/2018/02/love-photos-wallpaper-5.jpg" />
                    <div className="row social-share">
                        <div className="col-2">
                            <img className="social-icon" src="https://i.pinimg.com/originals/91/ec/db/91ecdb118ec2b1722cd7e7f70ed437dd.png"/>
                        </div>
                        <div className="col-2">
                            <img className="social-icon" src="https://st.depositphotos.com/1144386/4344/v/950/depositphotos_43444317-stock-illustration-original-twitter-bird-icon.jpg"/>
                        </div>
                        <div className="col-2">
                            <img className="social-icon" src="https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png"/>
                        </div>
                        <div className="col-6">
                            <CircleButton icon="fas fa-share-square"></CircleButton>
                        </div>
                    </div>
                </Modal>
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