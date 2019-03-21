import React, {Component} from 'react';

import {withRouter, Link} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllEvents} from "../../actions/EventActions";
import {getCoupleResults} from '../../actions/CoupleActions';
import 'react-image-lightbox/style.css';
import 'react-animated-slider/build/horizontal.css';
import { DatingCard, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';
import Modal from '../../components/Modal';
import CircleButton from '../../components/Button/CircleButton';
import {RoundAvatar} from '../../components/Avatar';

class ListFeatureDating extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            results: []
        };
    }

    componentDidMount() {
        this.props.getAllEvents('upcoming');
    }

    onSearch(event) {
        if(event.target.value != '') {
            this.props.getCoupleResults({name: event.target.value}).then(data => {
                this.setState({results: data.slice(0, 5)});
                document.getElementById("invitation-search-result").classList.remove('d-none');
            }).catch(err => {
                console.log(err);
            }) 
        } else {
            this.setState({results: []});
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
                <div id="suggest-create-dating" className="row">
                    <div className="col-sm-12 col-md-9">
                        Hãy tạo cuộc hẹn nhóm để kết nối mọi người lại với nhau, đồng thời cũng tìm thấy 
                        một nửa của riêng mình nhé! 
                    </div>
                    <div className="col-sm-12 col-md-3">
                        <Link to="/dating/create">
                            <button className="btn btn-primary">TẠO CUỘC HẸN</button>
                        </Link>
                    </div>
                </div>
                {
                    this.props.upcomingEvents.length ? (
                        <DatingCard isDisplaySlide={false} title="CUỘC HẸN SẮP TỚI CÓ THỂ BẠN THÍCH" events={this.props.upcomingEvents} action={(event_id) => this.onChangeEvent(event_id)}></DatingCard>
                    ) : (
                        // <CardWithTitle title="CUỘC HẸN SẮP TỚI CÓ THỂ BẠN THÍCH" hasLine={true}>
                        //     <div className="text-center">
                        //         Chưa có cuộc hẹn nào
                        //     </div>
                        // </CardWithTitle>
                        null
                    )
                }

                <Modal id="verify-id-modal">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://img.freepik.com/free-vector/funny-couple-making-a-selfie_1045-571.jpg?size=338&ext=jpg" id="create-event-alert-img"/>
                        </div>
                        <div className="col-6">
                            <div className="text-center" id="create-event-alert-header">
                                VUI LÒNG XÁC MINH CMT
                            </div>
                            <div className="text-center create-event-alert-content">
                                Trước khi tham gia một cuộc hẹn, hãy chắc chấn đó là bạn.
                            </div>
                            <div className="text-center create-event-alert-content">
                                <button className="btn btn-primary" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal id="invite-modal">
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
        aroundEvents: state.event.aroundEvents,
        eventsHasYourCrush: state.event.eventsHasYourCrush,
        upcomingEvents: state.event.upcomingEvents
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getAllEvents: (status) => dispatch(getAllEvents(status)),
        getCoupleResults: (filter) => dispatch(getCoupleResults(filter)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListFeatureDating));