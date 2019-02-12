import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { CardWithTitle } from '../../components/Card';
import Slider from "react-slick";
import connect from 'react-redux/es/connect/connect';
import { getAllJobs } from '../../actions/JobActions';
import { getAllProvinces, getAllDistricts } from '../../actions/AddressActions';
import { getAllCafe, getCafeDetail } from '../../actions/CafeActions';
import { createGroupEvent } from '../../actions/EventActions';
import Modal from '../../components/Modal';
import moment from 'moment';
import Select from 'react-select';
import 'moment/locale/vi.js';
import { DatePickerInput } from 'rc-datepicker';
import NumericInput from 'react-numeric-input';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import {withRouter} from 'react-router-dom';

class CreateGroupDating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTheme: 0,
            selectedAddress: -1,
            newEvent: {
                type: 'group',
                district_scope: null,
                province_scope: null
            },
            metadata: {
                marital_status: 0
            },
            // datetime
            start_date: moment(),
            limit_date_register: moment(),
            start_time: "",
            limit_time_register: "",
            agency_price: 0,
            province: null,
            district: null,
            type: null,
            districts: [],
            scopeDistricts: []
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
        this.props.getAllProvinces();

        if(this.props.location.state) {
            var {cafe} = this.props.location.state;
            this.setState({
                newEvent: {
                    ...this.state.newEvent,
                    agency_id: cafe.id
                },
                themes: cafe.images,
                agency_price: cafe.max_price
            })
        }
    }

    selectTheme(item, index) {
        this.setState({
            selectedTheme: index,
            newEvent: {
                ...this.state.newEvent,
                image: item
            }
        });
    }

    selectAddress(item) {
        this.setState({
            selectedTheme: -1,
            newEvent: {
                ...this.state.newEvent,
                agency_id: item.value,
                name: item.label,
                image: ""
            },
            themes: item.images,
            agency_price: item.price,
        })
    }

    onChangeDate(value, name) {
        this.setState({
            [name]: value
        })
    }

    onChangeTime(value, name) {
        let datetime =  new Date(this.state.start_date).setHours(value.hour);
        datetime = new Date(datetime).setMinutes(value.minute);

        if(new Date() > datetime) {
            alert("Không thể chọn ngày giờ bé hơn thời điểm hiện tại!");
        } else {
            this.setState({
                [name]: value.hour + ":" + value.minute
            })
        }
    }

    onChangeData(event) {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                [event.target.name]: event.target.value
            }
        })
    }

    onChangeMetadata(value, name) {
        this.setState({
            metadata: {
                ...this.state.metadata,
                [name]: value
            }
        });
    }

    onChangeProfit(value) {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                "creator_profit": value
            }
        })
    }

    onChangeDescription(e) {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                [e.targte.name]: e.target.value
            }
        })
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

    onChangeCafeFilter(selectedOption, filterType) {
        this.setState({
            [filterType]: selectedOption.value
        });

        switch (filterType) {
            case 'province': {
                this.props.getAllDistricts(selectedOption.value).then(districts => {
                    this.setState({districts: districts});
                });
                this.props.getAllCafe({ province_id: selectedOption.value });
                break;
            }
            case 'district': {
                this.props.getAllCafe({ province_id: this.state.province, district_id: selectedOption.value });
                break;
            }
            case 'type': {
                this.props.getAllCafe({
                    province_id: this.state.province,
                    district_id: this.state.district,
                    type: selectedOption.value
                });
                break;
            }
        }
    }

    onChangeJob(selectedOptions) {
        var jobs = selectedOptions.map(option => {
            return option.value;
        });

        this.setState({
            metadata: {
                ...this.state.metadata,
                job_conditional: jobs
            }
        })
    }

    onChangeMaritalStatus(option) {
        this.setState({
            metadata: {
                ...this.state.metadata,
                marital_status: option.value
            }
        })
    }

    onChangeScope(scope, option) {
        let value = option.value;
        switch(scope) {
            case "province": {
                this.props.getAllDistricts(value).then(districts => {
                    this.setState({
                        newEvent: {
                            ...this.state.newEvent,
                            province_scope: value
                        },
                        scopeDistricts: districts
                    })
                });
                break;
            }
            case "district": {
                this.setState({
                    newEvent: {
                        ...this.state.newEvent,
                        district_scope: value
                    }
                });
                break;
            }
        }
    }

    createNewEvent(e) {
        e.preventDefault();
        const { is_secret } = this.form;

        var {start_time, limit_time_register, start_date, limit_date_register} = this.state;

        if(!moment(start_date).isValid() || !moment(limit_date_register).isValid()) {
            return alert("Ngày hẹn hoặc ngày chốt hẹn không hợp lệ!");
        }

        let startTime = moment(start_date).set({
            hour: start_time.split(":")[0] || new Date().getHours(),
            minute: start_time.split(":")[1] || new Date().getMinutes(),
        }).format("YYYY-MM-DD HH:mm:ss");

        let limitTimeRegister = moment(limit_date_register).set({
            hour: limit_time_register.split(":")[0] || new Date().getHours(),
            minute: limit_time_register.split(":")[1] || new Date().getMinutes(),
        }).format("YYYY-MM-DD HH:mm:ss");

        this.setState({
            newEvent: {
                ...this.state.newEvent,
                is_secret: parseInt(is_secret.value),
                start_time: startTime,
                limit_time_register: limitTimeRegister,
                payment_m: this.props.price.group_dating.group_dating_m_price + this.state.agency_price,
                payment_f: this.props.price.group_dating.group_dating_f_price + this.state.agency_price,
                is_approved: 1
            }
        }, () => {
            let requiredFields = ['agency_id', 'image', 'start_time', 'limit_time_register'];
            let requireMetaFields = ['job_conditional', 'min_male_number', 'max_male_number', 'min_female_number', 'max_female_number',
                'min_male_age', 'max_male_age', 'min_female_age', 'max_female_age'];
            let isAlert = false;

            requiredFields.some(key => {
                if(!this.state.newEvent[key]) {
                    isAlert = true;
                    return;
                }
            });

            requireMetaFields.some(key => {
                if(!this.state.metadata[key]) {
                    isAlert = true;
                    return;
                }
            });

            if (this.state.newEvent.is_secret === undefined || this.state.metadata.marital_status === undefined) isAlert = true;

            if(this.state.metadata.min_male_age < 18 || this.state.metadata.min_female_age < 18
                || this.state.metadata.max_male_age < 18 || this.state.metadata.max_female_age < 18) {
                    alert("Tuổi của thành viên tham gia hẹn phải đủ 18 tuổi!");
                    return;
            }
            
            if(isAlert) {
                window.alert("Vui lòng chọn đủ các trường có dấu *");
            } else {
                this.props.createGroupEvent({ event: this.state.newEvent, event_meta: this.state.metadata }).then(data => {
                    document.getElementById('open-modal').click();
                });
            }
        })
    }

    render() {
        const { cafes, price, provinces } = this.props;
        const current_cafe = this.props.location.state ? this.props.location.state.cafe : null;
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

        var provinceOptions = provinces.map(province => {
            return { value: province.matp, label: province.name }
        });

        
        var districtOptions = this.state.scopeDistricts.map(district => {
            return { value: district.maqh, label: district.name }
        });
        
        
        return (
            <DatingLayout>
                <CardWithTitle hasLine={true} title="TẠO CUỘC HẸN TỐC ĐỘ">
                    <form onSubmit={(e) => this.createNewEvent(e)} ref={form => this.form = form}>
                        <div className="row">
                            <h5><i className="far fa-calendar-check"></i> Cuộc hẹn</h5>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Kiểu cuộc hẹn *</div>
                            <div className="col-1">
                                <input className="custom-input" type="radio" name="is_secret" value={0} />
                            </div>
                            <div className="col-3">
                                <label>Công khai</label>
                            </div>
                            <div className="col-1">
                                <input className="custom-input" type="radio" name="is_secret" value={1} />
                            </div>
                            <div className="col-3">
                                <label>Bí mật</label>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Cuộc hẹn bắt đầu lúc *</div>
                            <div className="col-4">
                                <DatePickerInput
                                    minDate={moment()}
                                    className='react-datepicker-component my-react-component'
                                    value={this.state.start_date}
                                    onChange={(date) => this.onChangeDate(date, "start_date")}
                                    locale='vi'
                                    showOnInputClick={true}
                                />
                            </div>
                            <div className="col-4">
                                <TimePicker
                                    // time={this.state.start_time || ""}
                                    time={moment().hour() > 21 ? "21:00" : ""}
                                    theme="classic"
                                    timeConfig={{
                                        from: moment().hour(),
                                        to: '09:00 PM',
                                        step: 15,
                                        unit: 'minute'
                                    }}
                                    onTimeChange={(value) => this.onChangeTime(value, "start_time")}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Thời gian chốt đăng ký *</div>
                            <div className="col-4">
                                <DatePickerInput
                                    minDate={moment()}
                                    className='react-datepicker-component my-react-component'
                                    value={this.state.limit_date_register}
                                    onChange={(date) => this.onChangeDate(date, "limit_date_register")}
                                    locale='vi'
                                    showOnInputClick={true}
                                />
                            </div>
                            <div className="col-4">
                                <TimePicker
                                    // time={this.state.limit_time_register || ""}
                                    time={moment().hour() > 21 ? "21:00" : ""}
                                    theme="classic"
                                    timeConfig={{
                                        from: '07:00 AM',
                                        to: '09:00 PM',
                                        step: 15,
                                        unit: 'minute'
                                    }}
                                    onTimeChange={(value) => this.onChangeTime(value, "limit_time_register")}
                                />
                            </div>
                        </div>

                        <div className="row">
                            <h5><i className="fas fa-map-marker-alt"></i> Chọn địa chỉ quán bạn muốn hẹn hò *</h5>
                        </div>
                        {
                            current_cafe ? (
                                <div className="form-group">
                                    {
                                        current_cafe ? (
                                            <React.Fragment>
                                                <div>Bạn đang chọn hẹn hò tại <b>{current_cafe.name}</b></div>
                                                <div>Địa chỉ tại: {current_cafe.address}, {current_cafe.district_name}, {current_cafe.province_name}</div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                </div>
                            ) : (
                                    <div className="row">
                                        <div className="col-12 col-md-4 mb-2">
                                            <Select
                                                placeholder="Chọn tỉnh/thành"

                                                options={provinceOptions}
                                                onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "province")}
                                            />
                                        </div>
                                        <div className="col-12 col-md-4 mb-2">
                                            <Select
                                                placeholder="Chọn huyện"
                                                options={districtOptions}
                                                onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "district")}
                                            />
                                        </div>
                                        <div className="col-12 col-md-4 mb-2">
                                            <Select
                                                placeholder="Loại quán"
                                                options={
                                                    [
                                                        { value: 1, label: "Cafe" },
                                                        { value: 2, label: "Quán ăn" }
                                                    ]
                                                }
                                                onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "type")}
                                            />
                                        </div>
                                        <div className="col-12 col-md-12 mb-4">
                                            <Select
                                                placeholder={`Danh sách các quán (${cafes.length} quán)`}
                                                options={
                                                    cafes.map(cafe => {
                                                        return { value: cafe.id, label: cafe.name, images: cafe.images, price: cafe.max_price }
                                                    })
                                                }
                                                onChange={(selectedOption) => this.selectAddress(selectedOption)}
                                                required
                                            />
                                        </div>
                                    </div>
                                )
                        }

                        {
                            (this.state.themes) ? (
                                <React.Fragment>
                                    <h5>Chọn chủ đề cuộc hẹn *</h5>
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

                        <div className="row form-group">
                            <div className="col-4">Số lượng nam tham gia *</div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={1} 
                                    value={this.state.metadata.min_male_number}
                                    onChange={(value) => this.onChangeMetadata(value, "min_male_number")}
                                    placeholder="Nhỏ nhất"
                                />
                            </div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={this.state.metadata.min_male_number} 
                                    value={this.state.metadata.max_male_number}
                                    onChange={(value) => this.onChangeMetadata(value, "max_male_number")}
                                    placeholder="Lớn nhất"
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Số lượng nữ tham gia *</div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={1} 
                                    value={this.state.metadata.min_female_number}
                                    onChange={(value) => this.onChangeMetadata(value, "min_female_number")}
                                    placeholder="Nhỏ nhất"
                                />
                            </div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={this.state.metadata.min_female_number} 
                                    value={this.state.metadata.max_female_number}
                                    onChange={(value) => this.onChangeMetadata(value, "max_female_number")}
                                    placeholder="Lớn nhất"
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Độ tuổi của nam từ *</div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={18} 
                                    value={this.state.metadata.min_male_age}
                                    onChange={(value) => this.onChangeMetadata(value, "min_male_age")}
                                    placeholder="Nhỏ nhất"
                                />
                            </div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={this.state.metadata.min_male_age} 
                                    value={this.state.metadata.max_male_age}
                                    onChange={(value) => this.onChangeMetadata(value, "max_male_age")}
                                    placeholder="Lớn nhất"
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Độ tuổi của nữ từ *</div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={18} 
                                    value={this.state.metadata.min_female_age}
                                    onChange={(value) => this.onChangeMetadata(value, "min_female_age")}
                                    placeholder="Nhỏ nhất"
                                />
                            </div>
                            <div className="col-4">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={this.state.metadata.min_female_age} 
                                    value={this.state.metadata.max_female_age}
                                    onChange={(value) => this.onChangeMetadata(value, "max_female_age")}
                                    placeholder="Lớn nhất"
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Chọn nghề nghiệp *</div>
                            <div className="col-8">
                                <Select
                                    placeholder="Chọn một hoặc nhiều nghề nghiệp"
                                    options={
                                        this.props.jobs.map(job => {
                                            return { value: job.id, label: job.name }
                                        })
                                    }
                                    isMulti={true}
                                    onChange={(selectedOptions) => this.onChangeJob(selectedOptions)}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Tình trạng hôn nhân *</div>
                            <div className="col-8">
                                <Select
                                    placeholder="Chọn một"
                                    options={
                                        [
                                            {value: 0, label: "Độc thân"},
                                            {value: 1, label: "Đã kết hôn"},
                                            {value: 2, label: "Đã từng kết hôn trước đó"},
                                        ]
                                    }
                                    onChange={(selectedOption) => this.onChangeMaritalStatus(selectedOption)}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Mô tả cuộc hẹn</div>
                            <div className="col-8">
                                <textarea className="form-control" name="description" onChange={(e) => {this.onChangeDescription(e)}}></textarea>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">
                                Khu vực đăng ký
                            </div>
                            <div className="col-4">
                                <Select
                                    // defaultInputValue
                                    // placeholder="Không giới hạn tỉnh/thành"
                                    options={
                                        [
                                            {value: null, label: "Tất cả các tỉnh"},
                                            ...provinceOptions
                                        ]
                                    }
                                    defaultValue={{value: null, label: "Tất cả các tỉnh"}}
                                    onChange={(selectedOption) => this.onChangeScope("province", selectedOption)}
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    placeholder="Không giới hạn quận/huyện"
                                    options={
                                        [
                                            {value: null, label: "Tất cả các huyện"},
                                            ...districtOptions
                                        ]
                                    }
                                    defaultValue={{value: null, label: "Tất cả các huyện"}}
                                    onChange={(selectedOption) => this.onChangeScope("district", selectedOption)}
                                />
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">
                                Phí tổ chức (Bạn được nhận về)
                            </div>
                            <div className="col-8">
                                <NumericInput 
                                    // required
                                    className="form-control" 
                                    min={1000} 
                                    step={1000}
                                    // value={this.state.metadata.max_female_age}
                                    onChange={(value) => this.onChangeProfit(value)}
                                    placeholder="Đơn vị VND"
                                />
                            </div>
                        </div>
                        <div className="alert alert-warning">
                            <b>Lưu ý:</b><br/>
                            <ul>
                                <li>
                                    - Phí tham gia cuộc hẹn này đối với nam sẽ là {price.group_dating.group_dating_m_price + this.state.agency_price} VND
                                </li>
                                <li>
                                    - Phí tham gia cuộc hẹn này đối với nữ sẽ là {price.group_dating.group_dating_f_price + this.state.agency_price} VND
                                </li>
                                <li>
                                    - Phí khởi tạo cuộc hẹn sẽ là {price.group_dating.group_dating_f_price} VND<br/>
                                    Phí khởi tạo sẽ được trả lại sau khi cuộc hẹn diễn ra thành công.
                                </li>
                            </ul>
                        </div>
                        <div className="row text-center mb-4">
                            <div>Khi bạn tạo hẹn nhóm tức là bạn đã đồng ý với <a href="#">Quy định về cuộc hẹn nhóm</a> của chúng tôi.</div>
                        </div>

                        <div className="text-center">
                            <button type="submit" className="btn btn-primary">TẠO CUỘC HẸN</button>
                        </div>
                    </form>
                    <button type="button" id="open-modal" className="d-none" data-toggle="modal" data-target="#create-event-alert"></button>
                </CardWithTitle>
                <Modal id="create-event-alert">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://i.pinimg.com/originals/69/89/db/6989db04751259bbd958ebd57e8c7814.jpg" id="create-event-alert-img" />
                        </div>
                        <div className="col-6">
                            <div className="text-center" id="create-event-alert-header">
                                CHÚC MỪNG
                            </div>
                            <div className="text-center create-event-alert-content">
                                Bạn đã khởi tạo cuộc hẹn thành công!
                            </div>
                            <div className="text-center create-event-alert-content">
                                <a href={`${baseUrl}/dating`}>
                                    <button className="btn btn-primary">OK</button>
                                </a>
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
        price: state.payment.price
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
        getAllCafe: (filter, page) => dispatch(getAllCafe(filter, page)),
        getCafeDetail: (id) => dispatch(getCafeDetail(id)),
        createGroupEvent: (data) => dispatch(createGroupEvent(data)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateGroupDating));