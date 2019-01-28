import React, { Component } from 'react';
import { Card, CardWithTitle } from '../../components/Card';
import { getAllProvinces, getAllDistricts } from '../../actions/AddressActions';
import { getAllCafe } from '../../actions/CafeActions';
import {createCoupleEvent} from "../../actions/EventActions";
import connect from 'react-redux/es/connect/connect';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Slider from "react-slick";
import { RoundAvatar } from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import {withRouter, Link} from 'react-router-dom';
import NotFound from '../404';
import Modal from 'react-modal';
import moment from 'moment';

class CreateCoupleDating extends Component {
    constructor(props) {
        super(props);
        var invitee = props.location.state ? props.location.state.invitee : null ;
        var subscriber = props.location.state.subscriber || null ;
        this.state = {
            isOpenSuccess: false,
            event: {
                type: "couple",
                agency_id: subscriber ? subscriber.agency_id : null,
                name: subscriber ? subscriber.agency_name : null,
            },
            start_time: new Date(),
            hour: 10,
            minutes: 0,
            selectedTheme: 0,
            selectedAddress: -1,
            invitee: invitee,
            subscriber: subscriber
        }
    }

    componentDidMount() {
        this.props.getAllProvinces();
        if(this.state.subscriber) {
            this.props.getAllDistricts(this.state.subscriber.province_id);
            this.props.getAllCafe({
                province_id: this.state.subscriber.province_id, 
                district_id: this.state.subscriber.district_id
            }).then((cafes => {
                cafes.forEach((cafe, index) => {
                    if(cafe.id === this.state.subscriber.agency_id) {
                        this.setState({
                            selectedAddress: index, 
                            themes: cafe.images,
                            selectedTheme: -1,
                        });
                        return;
                    }
                });

                
            }));
        }
    }

    onChangeCafeFilter(e) {
        this.setState({
            [e.target.name]: e.target.value
        });

        switch (e.target.name) {
            case 'province': {
                this.props.getAllDistricts(e.target.value);
                this.props.getAllCafe({ province_id: e.target.value });
                break;
            }
            case 'district': {
                this.props.getAllCafe({ province_id: this.state.province, district_id: e.target.value });
                break;
            }
            case 'type': {
                this.props.getAllCafe({
                    province_id: this.state.province,
                    district_id: this.state.district,
                    type: e.target.value
                });
                break;
            }
        }
    }

    selectAddress(item, index) {
        this.setState({
            selectedAddress: index,
            selectedTheme: -1,
            event: {
                ...this.state.event,
                agency_id: item.id, 
                name: item.name,
                image: ""
            },
            themes: item.images
        })
    }

    selectTheme(item, index) {
        this.setState({
            selectedTheme: index,
            event: {
                ...this.state.event,
                image: item
            }
        });
    }

    onChangeDate(name, value) {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    onChangeData(e) {
        this.setState({
            event_meta: {
                [e.target.name]: e.target.value
            }
        })
    }

    onChangeTime(e) {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    closeAlert() {
        this.setState({isOpenSuccess: false}, () => {
            this.props.history.push('/dating');
        });
    }

    submit(e) {
        e.preventDefault();
        var start_time = new Date(this.state.start_time).setHours(this.state.hour, this.state.minutes, 0, 0);
        start_time = moment(start_time).local().format('YYYY-MM-DD HH:mm:ss');

        if (this.state.selectedTheme >=0 && (this.state.selectedAddress >= 0)) {
            this.props.createCoupleEvent({
                event: {
                    ...this.state.event,
                    limit_time_register: start_time,
                    start_time: start_time,
                    schedule_id: 0,
                    payment_m: this.props.price.couple_dating.couple_dating_price,
                    payment_f: this.props.price.couple_dating.couple_dating_price,
                    is_secret: 0,
                },
                event_meta: {
                    ...this.state.event_meta,
                    job_conditional: [this.props.location.state.invitee.job],
                    min_male_number: 1,
                    max_male_number: 1,
                    min_female_number: 1,
                    max_female_number: 1
                },
                subscriber: this.props.location.state.invitee.id
            }).then(res => {
                this.setState({isOpenSuccess: true});
            });
        } else {
            window.alert("Bạn chọn thiếu chủ đề hoặc địa chỉ");
        }
    }

    render() {
        var { cafes, price } = this.props;
        var {invitee, subscriber} = this.state;

        //setting for slider
        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true
        };

        if(!invitee) {
            return (
                <NotFound></NotFound>
            )
        }

        return (
            <div className="row">
                <main className="col col-xl-7 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <CardWithTitle title="TẠO CUỘC HẸN ĐÔI" hasLine={true}>
                        <form onSubmit={(e) => this.submit(e)}>
                            <div className="form-group">
                                <label>
                                    <b><i className="fas fa-map-marker-alt"></i> Địa điểm dành cho cuộc hẹn</b>
                                </label>
                                <div className="row">
                                    <div className="col-4">
                                        <select name="province" className="custom-select" value={subscriber ? subscriber.province_id : ""} onChange={(e) => this.onChangeCafeFilter(e)}>
                                            <option>Chọn tỉnh</option>
                                            {
                                                this.props.provinces.map(province => {
                                                    return (
                                                        <option value={province.matp} key={province.matp}>{province.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select name="district" className="custom-select" value={subscriber ? subscriber.district_id : ""} onChange={(e) => this.onChangeCafeFilter(e)}>
                                            <option>Chọn huyện</option>
                                            {
                                                this.props.districts.map(district => {
                                                    return (
                                                        <option value={district.maqh} key={district.maqh}>{district.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select name="type" className="custom-select" value={subscriber ? subscriber.agency_type : ""} onChange={(e) => this.onChangeCafeFilter(e)}>
                                            <option>Loại quán</option>
                                            <option value={1}>Cafe</option>
                                            <option value={2}>Quán ăn</option>
                                        </select>
                                    </div>
                                </div>
                                <React.Fragment>
                                    {
                                        cafes.length ? (
                                            <Slider {...settings}>
                                                {
                                                    cafes.map((item, index) => {
                                                        return (
                                                            <div key={index}>
                                                                <img src={item.cover}
                                                                    onClick={() => this.selectAddress(item, index)}
                                                                    className={this.state.selectedAddress == index ? `address-image selected-image` : `address-image`}
                                                                />
                                                                <div className="address-avatar">
                                                                    <RoundAvatar size="small" img={item.avatar}></RoundAvatar>
                                                                </div>
                                                                <div className="address-type address-tag">
                                                                    {item.type == 1 ? 'CAFE' : 'QUÁN ĂN'}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </Slider>
                                        ) : (
                                                <div className="text-center mb-4">Không tìm thấy quán nào</div>
                                            )
                                    }

                                    {
                                        (this.state.themes) ? (
                                            <React.Fragment>
                                                <h5>Chọn chủ đề cuộc hẹn</h5>
                                                <Slider {...settings}>
                                                    {
                                                        this.state.themes.map((item, index) => {
                                                            return (
                                                                <div className="event-theme" key={index}>
                                                                    <img
                                                                        src={item}
                                                                        className={this.state.selectedTheme == index ? `selected-image` : ``}
                                                                        onClick={() => this.selectTheme(item, index)}
                                                                    />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </Slider>
                                            </React.Fragment>
                                        ) : null
                                    }
                                </React.Fragment>
                                <div className="form-group">
                                    <label>
                                        <b>
                                            <i className="fas fa-stopwatch"></i> Chọn thời gian hẹn
                                        </b>
                                    </label>
                                    <div className="row">
                                        <div className="col-12 col-md-4">
                                            <DatePicker className="form-control"
                                                // locale="vi-VN"
                                                name="start_time"
                                                selected={this.state.start_time}
                                                onChange={(date) => this.onChangeDate("start_time", date)}
                                                minDate={subscriber ? new Date(subscriber.expect_date_from) : new Date()}
                                                maxDate={subscriber ? new Date(subscriber.expect_date_to) : new Date().setDate(new Date().getDate() + 30)}
                                            />
                                        </div>
                                        <div className="col-12 col-md-8">
                                            <div className="row d-flex align-items-center">
                                                <div className="col-md-1">lúc</div>
                                                <div className="col-md-3">
                                                    <input className="form-control" type="number" name="hour" defaultValue={this.state.hour} min={0} max={23} onChange={(e) => this.onChangeTime(e)}/>
                                                </div>
                                                <div className="col-md-1">giờ</div>
                                                <div className="col-md-3">
                                                    <input className="form-control" type="number" name="minutes" defaultValue={this.state.minutes} min={0} max={60} onChange={(e) => this.onChangeTime(e)}/>
                                                </div>
                                                <div className="col-md-1">phút</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <b><i className="fas fa-dollar-sign"></i> Người thanh toán cuộc hẹn</b>
                                    </label>
                                    {/* Ngược với giá trị bản ghi, nếu payer=self tức là người kia nhận trả */}
                                    <div className="row d-flex align-items-center">
                                        <div className="col-3">
                                            <input className="custom-input" name="payer" type="radio" value="self" checked={subscriber ? subscriber.payer !== 'self' : true} required/>
                                        </div>
                                        <div className="col-3">
                                            <label>Bạn</label>
                                        </div>
                                        <div className="col-3">
                                            <input className="custom-input" name="payer" type="radio" value="partner" checked={subscriber ? subscriber.payer === 'self' : false} required/>
                                        </div>
                                        <div className="col-3">
                                            <label>Người kia</label>
                                        </div>
                                    </div>
                                </div>
                                {
                                    price.couple_dating ? (
                                        <div>
                                            <div className="alert alert-warning">
                                                Lưu ý chi phí hẹn đôi là <b>{price.couple_dating.couple_dating_price}đ</b><br/>
                                                <i>(Chi phí này bao gồm chi phí đồ uống và địa điểm)</i>
                                            </div>
                                        </div>
                                    ) :  null
                                }
                                <div className="form-group text-center">
                                    <button className="btn btn-primary">Hoàn tất</button>
                                </div>
                            </div>
                        </form>
                    </CardWithTitle>
                </main>
                <aside className="col col-xl-5 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <CardWithTitle title="BẠN MUỐN HẸN ĐÔI CÙNG">
                        <Link to={`/profile/${invitee.id}`}>
                            <div className="author vcard inline-items profile-heading-info">
                                <RoundAvatar img={invitee.avatar} size='medium'></RoundAvatar>

                                <div className="author-date">
                                    <Heading heading={invitee.name} subHeading={invitee.address} size='medium'></Heading>
                                </div>
                            </div>
                        </Link>
                    </CardWithTitle>
                </aside>
                <Modal  isOpen={this.state.isOpenSuccess}>
                    <h5>Bạn đã gửi lời mời hẹn đôi thành công</h5>
                    <hr/>
                    <button className="float-right btn btn-primary" onClick={() => this.closeAlert()}>
                        Xong
                    </button>
                </Modal>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        provinces: state.address.provinces,
        districts: state.address.districts,
        cafes: state.cafe.cafes,
        price: state.payment.price
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
        getAllCafe: (filter) => dispatch(getAllCafe(filter)),
        createCoupleEvent: (data) => dispatch(createCoupleEvent(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateCoupleDating));