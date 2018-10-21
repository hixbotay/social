import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { Card } from '../../components/Card';
import Slider from "react-slick";
import connect from 'react-redux/es/connect/connect';
import { getAllJobs } from '../../actions/JobActions';
import { getAllCafe, getCafeDetail } from '../../actions/CafeActions';
import { createNewEvent } from '../../actions/EventActions';
import { getAllDistricts, getAllProvinces } from "../../actions/AddressActions";
import Modal from '../../components/Modal';
import { getCookie, removeCookie } from '../../helper/cookie';

class CreateCoupleDating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTheme: 0,
            newEvent: {
                type: 'couple',
            },
            metadata: {
                marital_status: 0
            }
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
        this.props.getAllProvinces();

        var cafe_id = getCookie('cafe_id');
        if (cafe_id) {
            this.props.getCafeDetail(cafe_id);
            this.setState({
                newEvent: {
                    ...this.state.newEvent,
                    agency_id: cafe_id
                }
            })
        }
    }

    selectTheme(item) {
        this.setState({
            selectedTheme: item,
            newEvent: {
                ...this.state.newEvent,
                image: `storage/app/public/event-theme/theme_${item}.jpg`
            }
        });
    }

    changeProvince() {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                agency_id: ''
            }
        }, () => {
            this.props.getAllDistricts(this.province_id.value);
        });
    }

    changeDistrict() {
        this.props.getAllCafe({ district_id: this.district_id.value }, 1);
    }

    changeAddress() {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                agency_id: this.cafe.value,
            }
        });
    }

    onChangeData(event) {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                [event.target.name]: event.target.value
            }
        })
    }

    onChangeMetadata(event) {
        var options = Array.apply(null, event.target.options);

        if (event.target.name !== 'job_conditional') {
            options.map((option) => {
                if (option.selected) {
                    this.setState({
                        metadata: {
                            ...this.state.metadata,
                            [event.target.name]: option.value
                        }
                    }, () => {
                        console.log(this.state.metadata);
                    })
                }
            })
        } else {
            var temp = [];
            options.map((option) => {
                if (option.selected) {
                    temp.push(option.value);
                }
            });
            this.setState({
                metadata: {
                    ...this.state.metadata,
                    job_conditional: temp
                }
            })
        }
    }

    onChangeSelectData(event) {
        var options = Array.apply(null, event.target.options);
        options.map((option) => {
            if (option.selected) {
                this.setState({
                    newEvent: {
                        ...this.state.newEvent,
                        [event.target.name]: option.value
                    }
                }, () => {
                    console.log(this.state.newEvent);
                })
            }
        })
    }

    onChangeRadioInput(e) {
        this.setState({
            metadata: {
                ...this.state.metadata,
                [e.target.name]: e.target.value
            }
        }, () => {
            console.log(this.state.metadata);
        })
    }

    createNewEvent(e) {
        e.preventDefault();
        if (this.state.selectedTheme && this.state.newEvent.agency_id) {
            this.props.createNewEvent({ event: this.state.newEvent, event_meta: this.state.metadata });
            removeCookie('cafe_id');
            document.getElementById('open-modal').click();
        } else {
            window.alert("Vui lòng xem lại chủ đề hoặc địa chỉ");
        }
    }

    render() {
        const {current_cafe} = this.props;

        var age = [];
        for (let $i = 18; $i <= 60; $i++) {
            age.push($i);
        }

        return (
            <DatingLayout>
                <Card>
                    <div className="row">
                        <div className="col-6">
                            TẠO CUỘC HẸN NHÓM
                        </div>
                        <div className="col-6">
                            TẠO CUỘC HẸN ĐÔI
                        </div>
                    </div>
                    <form onSubmit={(e) => this.createNewEvent(e)}>
                        <div>
                            <div className="float-left"><i className="fas fa-folder"></i> Chọn chủ đề</div>
                            <div className="float-right"><i className="fas fa-camera"></i> Tải ảnh/video</div>
                        </div>
                        <div className="row image-chooser">
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    return (
                                        <div className="col-4 event-theme" key={item}>
                                            <img
                                                src={`/storage/app/public/event-theme/theme_${item}.jpg`}
                                                className={this.state.selectedTheme == item ? `selected-image` : ``}
                                                onClick={() => this.selectTheme(item)}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className="row">
                            <h5><i className="far fa-calendar-check"></i> Cuộc hẹn</h5>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Tên cuộc hẹn</div>
                            <div className="col-8">
                                <input className="form-control" type="text" name="name" required onChange={(e) => this.onChangeData(e)} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Lịch hẹn</div>
                            <div className="col-8">
                                <input className="form-control" type="datetime-local" name="start_time" required onChange={(e) => this.onChangeData(e)} />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Thời gian chốt đăng ký</div>
                            <div className="col-8">
                                <input className="form-control" type="datetime-local" name="limit_time_register" required onChange={(e) => this.onChangeData(e)} />
                            </div>
                        </div>

                        {
                            getCookie('cafe_id') ?
                                (
                                    <div className="row">
                                        <div className="col-4">Địa điểm đã chọn sẵn:</div>
                                        {
                                            current_cafe ? (
                                                <div>{current_cafe.address}, {current_cafe.district_name}, {current_cafe.province_name}</div>
                                            ) : null
                                        }
                                        
                                    </div>
                                ) : (
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="province">Chọn địa chỉ</label>
                                        <div className="col-md-3">
                                            <select className="custom-select" name="province_id" ref={select => this.province_id = select} onChange={() => this.changeProvince()} required>
                                                <option>Tỉnh/TP</option>
                                                {
                                                    this.props.provinces.map((data, index) => {
                                                        return (<option value={data.matp} key={index}>{data.name}</option>);
                                                    })
                                                }

                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="custom-select" name="district_id" ref={select => this.district_id = select} onChange={() => this.changeDistrict()} required>
                                                <option>Quận/Huyện</option>
                                                {
                                                    this.props.districts.map((data, index) => {
                                                        return (<option value={data.maqh} key={index}>{data.name}</option>);
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-3">
                                            <select className="custom-select" name="cafe" ref={select => this.cafe = select} onChange={() => this.changeAddress()} required>
                                                <option>Quán</option>
                                                {
                                                    this.props.cafes.map((data, index) => {
                                                        return (<option value={data.id} key={index}>{data.name}</option>);
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                )
                        }


                        <div className="row form-group">
                            <div className="col-4">Giới tính:</div>
                            <div className="col-4">
                                <div className="custom-radio">
                                    <input type="radio" name="gender" className="custom-control-input" value="M" onChange={(e) => this.onChangeRadioInput(e)} />
                                    <label className="custom-control-label">Nam</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="custom-radio">
                                    <input type="radio" name="gender" className="custom-control-input" value="F" onChange={(e) => this.onChangeRadioInput(e)} />
                                    <label className="custom-control-label">Nữ</label>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Độ tuổi của người ấy từ:</div>
                            <div className="col-4">
                                <select className="custom-select" name="min_age" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Nhỏ nhất</option>
                                    {
                                        age.map(item => {
                                            return (<option key={item} value={item}>{item}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="custom-select" name="max_age" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Lớn nhất</option>
                                    {
                                        age.map(item => {
                                            return (<option key={item} value={item}>{item}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="row form-group">
                            <div className="col-4">Chọn nghề nghiệp</div>
                            <div className="col-8">
                                <select className="custom-select" multiple name="job_conditional" onChange={(e) => this.onChangeMetadata(e)}>
                                    {
                                        this.props.jobs.map((item, index) => {
                                            return (<option key={index} value={item.id}>{item.name}</option>)
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Tình trạng hôn nhân</div>
                            <div className="col-4">
                                <div className="custom-radio">
                                    <input type="radio" name="marital_status" className="custom-control-input" value={1} onChange={(e) => this.onChangeRadioInput(e)} />
                                    <label className="custom-control-label">Đã kết hôn</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="custom-radio">
                                    <input type="radio" name="marital_status" className="custom-control-input" value={0} onChange={(e) => this.onChangeRadioInput(e)} />
                                    <label className="custom-control-label">Độc thân</label>
                                </div>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Người thanh toán hẹn đôi</div>
                            <div className="col-4">
                                <div className="custom-radio">
                                    <input type="radio" name="payer" className="custom-control-input" value={1} onChange={(e) => this.onChangeRadioInput(e)} />
                                    <label className="custom-control-label">Bạn</label>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className="custom-radio">
                                    <input type="radio" name="payer" className="custom-control-input" value={0} onChange={(e) => this.onChangeRadioInput(e)} />
                                    <label className="custom-control-label">Người ấy</label>
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">ĐĂNG KÝ</button>
                        </div>
                    </form>
                    <button type="button" id="open-modal" className="d-none" data-toggle="modal" data-target="#create-event-alert"></button>
                </Card>
                <Modal id="create-event-alert">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://i.pinimg.com/originals/69/89/db/6989db04751259bbd958ebd57e8c7814.jpg" id="create-event-alert-img" />
                        </div>
                        <div className="col-6">
                            <div className="text-center" id="create-event-alert-header">
                                CHƯA XONG!
                            </div>
                            <div className="text-center create-event-alert-content">
                                Khởi tạo cuộc hẹn của bạn đang chờ admin duyệt!
                            </div>
                            <div className="text-center create-event-alert-content">
                                <button className="btn btn-primary" onClick={() => { window.location.reload() }}>OK</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </DatingLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.job.jobs,
        cafes: state.cafe.cafes,
        current_cafe: state.cafe.currentCafe,
        provinces: state.address.provinces,
        districts: state.address.districts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
        getAllCafe: (filter, page) => dispatch(getAllCafe(filter, page)),
        getCafeDetail: (id) => dispatch(getCafeDetail(id)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (id) => dispatch(getAllDistricts(id)),
        createNewEvent: (data) => dispatch(createNewEvent(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateCoupleDating);
