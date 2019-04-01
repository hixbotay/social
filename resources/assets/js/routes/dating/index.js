import React, { Component } from 'react';

import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { getAllEvents, invite } from "../../actions/EventActions";
import { getCoupleResults } from '../../actions/CoupleActions';
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';

import Modal from 'react-modal';
import CircleButton from '../../components/Button/CircleButton';
import { RoundAvatar } from '../../components/Avatar';

class Dating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            results: [],
            isShowInviteModal: false,
        };
    }

    componentDidMount() {
        this.props.getAllEvents('forthcoming');
        this.props.getAllEvents('finished');
        this.props.getAllEvents('cancelled');
    }

    openInviteModal() {
        this.setState({ isShowInviteModal: true });
    }

    onSearch(event) {
        if (event.target.value != '') {
            this.props.getCoupleResults({ name: event.target.value }).then(data => {
                this.setState({ results: data.slice(0, 5) });
                document.getElementById("invitation-search-result").classList.remove('d-none');
            }).catch(err => {
                console.log(err);
            })
        } else {
            this.setState({ results: [] });
            document.getElementById("invitation-search-result").classList.add('d-none');
        }
    }

    changeKeyword(item) {
        document.getElementById('keyword').value = item.name;
        document.getElementById("invitation-search-result").classList.add('d-none');
        this.setState({
            data: {
                ...this.state.data,
                user_id: item.id
            }
        })
    }

    onChangeContent(e) {
        this.setState({
            data: {
                ...this.state.data,
                content: e.target.value
            }
        })
    }

    onChangeEvent(event_id) {
        this.setState({ event_id: event_id });
    }

    submit() {
        this.props.invite(this.state.event_id, this.state.data);
    }

    render() {

        return (
            <DatingLayout>
                {
                    this.props.forthcomingEvents.length ? (
                        <DatingCard
                            status="forthcoming"
                            title="CUỘC HẸN SẮP TỚI"
                            events={this.props.forthcomingEvents}
                            action={(event_id) => this.onChangeEvent(event_id)}
                            invite={() => this.openInviteModal()}
                        />
                    ) : (
                            <CardWithTitle title="CUỘC HẸN SẮP TỚI" hasLine={true}>
                                <div className="text-center">
                                    Không có cuộc hẹn nào
                            </div>
                            </CardWithTitle>
                        )
                }
                {
                    this.props.finishedEvents.length ? (
                        <DatingCard 
                            status="finished" 
                            title="CUỘC HẸN ĐÃ KẾT THÚC" 
                            events={this.props.finishedEvents}
                            isShow={false}
                        />
                    ) : (
                            null
                        )
                }
                {
                    this.props.cancelledEvents.length ? (
                        <DatingCard 
                            status="cancelled" 
                            title="CUỘC HẸN ĐÃ HỦY" 
                            events={this.props.cancelledEvents}
                            isShow={false}
                        />
                    ) : (
                            null
                        )
                }

                <Modal isOpen={this.state.isShowInviteModal}>
                    <div className="float-right" onClick={() => this.setState({ isShowInviteModal: false })}>
                        <i className="fas fa-times fa-2x"></i>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <input type="text" className="form-control" id="keyword"
                                placeholder="Tìm kiếm"
                                onChange={(event) => this.onSearch(event)}
                            />
                            <div id="invitation-search-result" className="">
                                <ul className="list-group">
                                    {
                                        this.state.results.map((item, index) => {
                                            return (
                                                <li key={index} className="list-group-item invitation-search-result-item" onClick={() => this.changeKeyword(item)}>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <RoundAvatar img={item.avatar} size="small"></RoundAvatar>
                                                        </div>
                                                        <div className="col-10"><b>{item.name}</b></div>
                                                    </div>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-10">
                            <input className="form-control" placeholder="Nhập lời mời tham gia..." onChange={(e) => this.onChangeContent(e)} />
                        </div>
                        <div className="col-md-2">
                            <CircleButton icon="fab fa-telegram-plane" action={() => this.submit()}></CircleButton>
                        </div>
                    </div>
                    <img id="invite-cover" src="https://www.shona.ie/app/uploads/2018/02/love-photos-wallpaper-5.jpg" />
                    <div className="row social-share">
                        <div className="col-2">
                            <img className="social-icon" src="https://i.pinimg.com/originals/91/ec/db/91ecdb118ec2b1722cd7e7f70ed437dd.png" />
                        </div>
                        <div className="col-2">
                            <img className="social-icon" src="https://st.depositphotos.com/1144386/4344/v/950/depositphotos_43444317-stock-illustration-original-twitter-bird-icon.jpg" />
                        </div>
                        <div className="col-2">
                            <img className="social-icon" src="https://instagram-brand.com/wp-content/uploads/2016/11/app-icon2.png" />
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
        cancelledEvents: state.event.cancelledEvents,
        // results: state.couple.search_results,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: (status) => dispatch(getAllEvents(status)),
        getCoupleResults: (filter) => dispatch(getCoupleResults(filter)),
        invite: (event_id, data) => dispatch(invite(event_id, data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dating));