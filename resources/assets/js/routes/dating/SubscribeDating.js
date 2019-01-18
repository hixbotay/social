import React, { Component } from 'react';
import { CardWithTitle, Card } from '../../components/Card';
import DatingLayout from './DatingLayout';
import {getAllDistricts, getAllProvinces} from '../../actions/AddressActions';
import {getAllCafe} from '../../actions/CafeActions';
import {getAllJobs} from '../../actions/JobActions';
import {subscribeEvent, getMySubscribers, deleteSubscriber} from '../../actions/EventActions';
import connect from 'react-redux/es/connect/connect';
import ToggleDisplay from 'react-toggle-display';

class SubscribeDating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSubscriber: {
                expect_marital_status: 0,
                is_subscribe_couple_dating: 0,
                is_subscribe_group_dating: 0,
                province_id: '01',
            },
            show: false
        }  
    }

    componentDidMount() {
        this.props.getAllProvinces();
        this.props.getAllDistricts('01');
        this.props.getAllJobs();
        this.props.getMySubscribers().then(data => {
            if(!data) {
                this.setState({show: true});
            }
        });
    }

    changeProvince(e) {
        this.props.getAllDistricts(e.target.value);
        this.setState({
            newSubscriber: {
                ...this.state.newSubscriber,
                province_id: e.target.value
            }
        })
    }

    changeDistrict(e) {
        this.props.getAllCafe({
            province_id: this.state.newSubscriber.province_id,
            district_id: e.target.value
        });
        this.setState({
            newSubscriber: {
                ...this.state.newSubscriber,
                district_id: e.target.value
            }
        });
    }

    onChangeData(e) {
        this.setState({
            newSubscriber: {
                ...this.state.newSubscriber,
                [e.target.name]: e.target.value
            }
        });
    }

    onChangeCheckboxData(e) {
        if(e.target.checked) {
            this.setState({
                newSubscriber: {
                    ...this.state.newSubscriber,
                    [e.target.name]: 1
                }
            })
        } else {
            this.setState({
                newSubscriber: {
                    ...this.state.newSubscriber,
                    [e.target.name]: 0
                }
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        // check if error
        if(new Date(this.state.newSubscriber.expect_date_from) >= new Date(this.state.newSubscriber.expect_date_to)) {
            alert("Vui lòng chọn lại ngày");
            return;
        }
        if(this.state.newSubscriber.expect_age_min >= this.state.newSubscriber.expect_age_max) {
            alert("Vui lòng chọn lại tuổi");
            return;
        }

        if(this.state.newSubscriber.is_subscribe_couple_dating || this.state.newSubscriber.is_subscribe_group_dating) {
            const { payer, expect_gender } = this.form;
            this.setState({
                newSubscriber: {
                    ...this.state.newSubscriber,
                    payer: payer.value,
                    expect_gender: expect_gender.value
                }
            }, () => {
                this.props.subscribeEvent(this.state.newSubscriber);
            });
        } else {
            window.alert("Vui lòng chọn kiểu hẹn hò bạn mong muốn!");
        }
    }

    deleteSubscriber(id) {
        if(confirm("Bạn có chắc chắn muốn xóa đăng ký này?")) {
            this.props.deleteSubscriber(id).then(data => {
                console.log(this.props.mySubscribers.length)
                if(this.props.mySubscribers.length === 0) {
                    setTimeout(() => {
                        this.setState({
                            show: true
                        })
                    }, 500);
                }
            });
        }
    }

    render() {
        var {mySubscribers} = this.props;
        const age = [];
        for(let i=18; i<60; i++) {
            age.push(i);
        }
        
        return (
            <DatingLayout>
                {
                    mySubscribers.length ? (
                    <CardWithTitle hasLine={true} title="ĐĂNG KÝ TRƯỚC ĐÓ">
                        <div className="row">
                            {
                                mySubscribers.map((subscriber, index) => {
                                    return (
                                        <div className="col-md-12 col-sm-12 my-subscriber-item alert alert-success" key={index}>
                                            <small>
                                                <i>
                                                    Đăng ký hẹn từ ngày {subscriber.expect_date_from} tới ngày {subscriber.expect_date_to}
                                                </i>
                                            </small>
                                            <div className="row">
                                                <div className="col-4">Kiểu hẹn</div>
                                                <div className="col-8">
                                                    {subscriber.is_subscribe_couple_dating ? "Hẹn đôi" : null} {subscriber.is_subscribe_group_dating ? "- Hẹn nhóm" : null}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">Địa chỉ đăng ký</div>
                                                <div className="col-8">
                                                    {subscriber.agency_name}, {subscriber.district_name}, {subscriber.province_name}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">Đối tượng mong muốn</div>
                                                <div className="col-8">
                                                    {subscriber.expect_gender === 'M' ? "Nam" : "Nữ"}, {subscriber.expect_age_min} - {subscriber.expect_age_max} tuổi
                                                    <br/>
                                                    {subscriber.job_name} - {subscriber.expect_marital_status ? "Đã kết hôn" : "Độc thân"}
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-4">Người thanh toán</div>
                                                <div className="col-8">
                                                    {subscriber.payer === 'partner' ? "Người kia" : "Bạn thanh toán"}
                                                </div>
                                            </div>
                                            <button className="btn btn-sm btn-danger float-right" onClick={() => this.deleteSubscriber(subscriber.id)}>
                                                Xóa đăng ký
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" onClick={() => this.setState({show: !this.state.show})}>
                            {
                                this.state.show ? "ẨN FORM ĐĂNG KÝ" : "ĐĂNG KÝ MỚI"
                            }
                            </button>
                        </div>
                    </CardWithTitle>
                    ) : null
                }

                <ToggleDisplay show={this.state.show}>
                    <CardWithTitle hasLine={true} title="ĐĂNG KÝ HẸN">
                        <form onSubmit={(e) => this.onSubmit(e)} ref={form => this.form = form}>
                            <div className="form-group row">
                                <div className="col-4">
                                    Đăng ký
                                </div>
                                <div className="col-1">
                                    <input type="checkbox" className="custom-input" name="is_subscribe_couple_dating" onChange={(e) => this.onChangeCheckboxData(e)}/>
                                </div>
                                <div className="col-3">
                                    <label>Hẹn đôi</label>
                                </div>
                                <div className="col-1">
                                    <input type="checkbox" className="custom-input" name="is_subscribe_group_dating" onChange={(e) => this.onChangeCheckboxData(e)}/>
                                </div>
                                <div className="col-3">
                                    <label>Hẹn nhóm</label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Người thanh toán hẹn đôi
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="payer" value="self" required/>
                                </div>
                                <div className="col-3">
                                    <label>Bạn thanh toán</label>
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="payer" value="partner" required/>
                                </div>
                                <div className="col-3">
                                    <label>Người ấy thanh toán</label>
                                </div>
                            </div>
                            <div>
                                <h5><i className="far fa-calendar-check"></i> Thời gian có thể tham gia</h5>
                                <hr/>
                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    Từ
                                    <input className="form-control" type="date" name="expect_date_from" onChange={(e) => this.onChangeData(e)} required/>
                                </div>
                                <div className="col-6">
                                    Đến
                                    <input className="form-control" type="date" name="expect_date_to" onChange={(e) => this.onChangeData(e)} required/>
                                </div>
                            </div>
                            <div>
                                <h5><i className="fas fa-map-marker"></i> Chọn địa điểm</h5>
                                <hr/>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Chọn tỉnh
                                    <select className="custom-select" onChange={(e) => this.changeProvince(e)} required>
                                    {
                                        this.props.provinces.map((item, index) => {
                                            return (
                                                <option key={item.matp} value={item.matp}>{item.name}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="col-4">
                                    Chọn huyện
                                    <select className="custom-select" onChange={(e) => this.changeDistrict(e)} required>
                                    {
                                        this.props.districts.map((item, index) => {
                                            return (
                                                <option key={item.maqh} value={item.maqh}>{item.name}</option>
                                            )
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="col-4">
                                    Chọn quán
                                    <select className="custom-select" name="agency_id" onChange={(e) => this.onChangeData(e)} required>
                                        <option value="">--Chọn quán--</option>
                                        {
                                            this.props.cafes.map((item, index) => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row" name="expect_gender">
                                <div className="col-4">
                                    Đối tượng
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="expect_gender" value='M' required/>
                                </div>
                                <div className="col-3">
                                    <label>Nam</label>
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="expect_gender" value='F' required/>
                                </div>
                                <div className="col-3">
                                    <label>Nữ</label>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Độ tuổi
                                </div>
                                <div className="col-4">
                                    <select className="custom-select" name="expect_age_min" onChange={(e) => this.onChangeData(e)} required>
                                        <option value="">Nhỏ nhất</option>
                                        {
                                            age.map((item, index) => {
                                                return (
                                                    <option value={item} key={index}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-4">
                                    <select className="custom-select" name="expect_age_max" onChange={(e) => this.onChangeData(e)} required>
                                        <option value="">Lớn nhất</option>
                                        {
                                            age.map((item, index) => {
                                                return (
                                                    <option value={item} key={index}>{item}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Nghề nghiệp
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="expect_job" onChange={(e) => this.onChangeData(e)} required>
                                        <option value="">Chọn một công việc</option>
                                        {
                                            this.props.jobs.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Tình trạng hôn nhân
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="expect_marital_status" onChange={(e) => this.onChangeData(e)} required>
                                        <option value={0}>Độc thân</option>
                                        <option value={1}>Đã kết hôn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary" type="submit">ĐĂNG KÝ</button>
                            </div>
                        </form>
                    </CardWithTitle>
                </ToggleDisplay>
            </DatingLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        provinces: state.address.provinces,
        districts: state.address.districts, 
        cafes: state.cafe.cafes,
        jobs: state.job.jobs,
        mySubscribers: state.event.mySubscribers
    }
} 

function mapDispatchToProps(dispatch) {
    return {
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
        getAllCafe: (filter) => dispatch(getAllCafe(filter)),
        getAllJobs: () => dispatch(getAllJobs()),
        subscribeEvent: (data) => dispatch(subscribeEvent(data)),
        getMySubscribers: () => dispatch(getMySubscribers()),
        deleteSubscriber: (id) => dispatch(deleteSubscriber(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeDating);