import React, { Component } from 'react';
import { CardWithTitle, Card } from '../../components/Card';
import DatingLayout from './DatingLayout';
import { getAllDistricts, getAllProvinces } from '../../actions/AddressActions';
import { getAllCafe } from '../../actions/CafeActions';
import { getAllJobs } from '../../actions/JobActions';
import { subscribeEvent, getMySubscribers, deleteSubscriber } from '../../actions/EventActions';
import connect from 'react-redux/es/connect/connect';
import ToggleDisplay from 'react-toggle-display';
import { DatePickerInput } from 'rc-datepicker';
import NumericInput from 'react-numeric-input';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';
import moment from 'moment';
import Select from 'react-select';
import 'moment/locale/vi.js';

class SubscribeDating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newSubscriber: {
                expect_marital_status: null,
                expect_job: null,
                is_subscribe_couple_dating: 1,
                is_subscribe_group_dating: 0,
                payer: 'self',
                expect_age_min: 18,
                expect_age_max: 25,
                // province_id: '01',
                expect_date_from: moment(),
                expect_date_to: moment().days(4)
            },
            show: false
        }
    }

    componentDidMount() {
        this.props.getAllProvinces();
        this.props.getAllDistricts('01');
        this.props.getAllJobs();
        this.props.getMySubscribers().then(data => {
            if (!data) {
                this.setState({ show: true });
            }
        });
    }

    onChangeCafeFilter(selectedOption, filterType) {
        this.setState({
            [filterType]: selectedOption.value
        });

        switch (filterType) {
            case 'province': {
                this.props.getAllDistricts(selectedOption.value);
                // this.props.getAllCafe({ province_id: selectedOption.value });
                this.setState({
                    newSubscriber: {
                        ...this.state.newSubscriber,
                        province_id: selectedOption.value
                    }
                })
                break;
            }
            case 'district': {
                this.props.getAllCafe({ province_id: this.state.newSubscriber.province_id, district_id: selectedOption.value });
                this.setState({
                    newSubscriber: {
                        ...this.state.newSubscriber,
                        district_id: selectedOption.value
                    }
                });
                break;
            }
            case 'type': {
                this.props.getAllCafe({
                    province_id: this.state.newSubscriber.province_id,
                    district_id: this.state.newSubscriber.district_id,
                    type: selectedOption.value
                });
                break;
            }
        }
    }

    onChangeSelect(selectedOption, name) {
        if (name === 'expect_job') {
            let temp = "";
            var jobs = selectedOption.map(option => {
                temp += option.value + ",";
                return option.value;
            });

            if (jobs.indexOf(null) >= 0) {
                temp = null;
                this.setState({
                    newSubscriber: {
                        ...this.state.newSubscriber,
                        [name]: null
                    },
                    expect_job: [{ value: null, label: "Tất cả nghề nghiệp" }]
                });
            } else {
                this.setState({
                    newSubscriber: {
                        ...this.state.newSubscriber,
                        [name]: temp
                    },
                    expect_job: selectedOption
                })
            }
        } else {
            this.setState({
                newSubscriber: {
                    ...this.state.newSubscriber,
                    [name]: selectedOption.value
                }
            })
        }
    }

    onChangeData(e) {
        this.setState({
            newSubscriber: {
                ...this.state.newSubscriber,
                [e.target.name]: e.target.value
            }
        });
    }

    onChangeDate(value, name) {
        this.setState({
            newSubscriber: {
                ...this.state.newSubscriber,
                [name]: value
            }
        })
    }

    onChageNumberInput(value, name) {
        this.setState({
            newSubscriber: {
                ...this.state.newSubscriber,
                [name]: value
            }
        })
    }

    onChangeCheckboxData(e) {
        if (e.target.checked) {
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
        if (new Date(this.state.newSubscriber.expect_date_from) >= new Date(this.state.newSubscriber.expect_date_to)) {
            alert("Vui lòng chọn lại ngày");
            return;
        }
        if (this.state.newSubscriber.expect_age_min >= this.state.newSubscriber.expect_age_max || this.state.newSubscriber.expect_age_min < 18) {
            alert("Vui lòng chọn lại tuổi");
            return;
        }

        if (!this.state.newSubscriber.province_id) {
            alert("Vui lòng xem lại địa chỉ tỉnh và huyện");
            return;
        }

        if (this.state.newSubscriber.is_subscribe_couple_dating || this.state.newSubscriber.is_subscribe_group_dating) {
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
        if (confirm("Bạn có chắc chắn muốn xóa đăng ký này?")) {
            this.props.deleteSubscriber(id).then(data => {
                if (this.props.mySubscribers.length === 0) {
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
        var { mySubscribers, cafes, provinces, districts, jobs } = this.props;
        const age = [];
        for (let i = 18; i < 60; i++) {
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
                                        let maritalStatus = "Tất cả trạng thái hôn nhân";
                                        switch (subscriber.expect_marital_status) {
                                            case 0: {
                                                maritalStatus = "Độc thân";
                                                break;
                                            }
                                            case 1: {
                                                maritalStatus = "Đã kết hôn";
                                                break;
                                            }
                                            case 2: {
                                                maritalStatus = "Đã từng kết hôn trước đó";
                                                break;
                                            }
                                        }

                                        return (
                                            <div className="col-md-12 col-sm-12 my-subscriber-item alert alert-success" key={index}>
                                                <b>
                                                    <i>
                                                        Đăng ký hẹn từ ngày {moment(subscriber.expect_date_from).format("DD/MM/YYYY")} tới ngày {moment(subscriber.expect_date_to).format("DD/MM/YYYY")}
                                                    </i>
                                                </b>
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
                                                        {subscriber.expect_gender === 'M' ? "Nam" : "Nữ"}, {subscriber.expect_age_min} - {subscriber.expect_age_max} tuổi, {maritalStatus}
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-4">Nghề nghiệp</div>
                                                    <div className="col-8">
                                                        {
                                                            subscriber.jobs.length ? (
                                                                subscriber.jobs.map(job => {
                                                                    return <span key={job.id}>{job.name}, </span>
                                                                })
                                                            ) : (
                                                                    "Tất cả nghề nghiệp"
                                                                )
                                                        }
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
                                <button className="btn btn-primary" onClick={() => this.setState({ show: !this.state.show })}>
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
                                    <input type="checkbox" className="custom-input" name="is_subscribe_couple_dating" onChange={(e) => this.onChangeCheckboxData(e)} defaultChecked/>
                                </div>
                                <div className="col-3">
                                    <label>Hẹn đôi</label>
                                </div>
                                <div className="col-1">
                                    <input type="checkbox" className="custom-input" name="is_subscribe_group_dating" onChange={(e) => this.onChangeCheckboxData(e)} />
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
                                    <input className="custom-input" type="radio" name="payer" value="self" required defaultChecked/>
                                </div>
                                <div className="col-3">
                                    <label>Bạn thanh toán</label>
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="payer" value="partner" required />
                                </div>
                                <div className="col-3">
                                    <label>Người ấy thanh toán</label>
                                </div>
                            </div>
                            <div>
                                <h5><i className="far fa-calendar-check"></i> Thời gian có thể tham gia</h5>
                                <hr />
                            </div>
                            <div className="form-group row">
                                <div className="col-6">
                                    Từ
                                    <DatePickerInput
                                        minDate={moment()}
                                        className='react-datepicker-component my-react-component'
                                        value={this.state.newSubscriber.expect_date_from}
                                        onChange={(date) => this.onChangeDate(date, "expect_date_from")}
                                        locale='vi'
                                        showOnInputClick={true}
                                    />
                                </div>
                                <div className="col-6">
                                    Đến
                                    <DatePickerInput
                                        minDate={moment()}
                                        className='react-datepicker-component my-react-component'
                                        value={this.state.newSubscriber.expect_date_to}
                                        onChange={(date) => this.onChangeDate(date, "expect_date_to")}
                                        locale='vi'
                                        showOnInputClick={true}
                                    />
                                </div>
                            </div>
                            <div>
                                <h5><i className="fas fa-map-marker"></i> Chọn địa điểm hẹn</h5>
                                <hr />
                            </div>
                            <div>
                                Vui lòng chọn tỉnh/thành
                            </div>
                            <div className="row">
                                <div className="col-12 col-md-6 mb-2">
                                    <Select
                                        placeholder="Chọn tỉnh/thành"
                                        defaultValue={this.state.newSubscriber.province_id}
                                        options={
                                            provinces.map(province => {
                                                return { value: province.matp, label: province.name }
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "province")}
                                    />
                                </div>
                                <div className="col-12 col-md-6 mb-2">
                                    <Select
                                        placeholder="Chọn huyện (Không bắt buộc)"
                                        defaultValue={this.state.newSubscriber.district_id}
                                        options={
                                            districts.map(district => {
                                                return { value: district.maqh, label: district.name }
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "district")}
                                    />
                                </div>
                            </div>
                            <div>Chọn quán nếu bạn muốn</div>
                            <div className="row">
                                <div className="col-12 col-md-6 mb-2">
                                    <Select
                                        placeholder="Loại quán"
                                        // defaultValue={this.state.agency_type}
                                        options={
                                            [
                                                { value: 1, label: "Cafe" },
                                                { value: 2, label: "Quán ăn" }
                                            ]
                                        }
                                        onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "type")}
                                    />
                                </div>
                                <div className="col-12 col-md-6 mb-4">
                                    <Select
                                        placeholder={`Danh sách các quán (${cafes.length} quán)`}
                                        defaultValue={this.state.newSubscriber.agency_id}
                                        options={
                                            cafes.map(cafe => {
                                                return { value: cafe.id, label: cafe.name, images: cafe.images }
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "agency_id")}
                                    />
                                </div>
                            </div>
                            <div className="form-group row" name="expect_gender">
                                <div className="col-4">
                                    Đối tượng
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="expect_gender" value='M' required />
                                </div>
                                <div className="col-3">
                                    <label>Nam</label>
                                </div>
                                <div className="col-1">
                                    <input className="custom-input" type="radio" name="expect_gender" value='F' required />
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
                                    <NumericInput
                                        // required
                                        className="form-control"
                                        min={18}
                                        value={this.state.newSubscriber.expect_age_min}
                                        onChange={(value) => this.onChageNumberInput(value, "expect_age_min")}
                                        placeholder="Nhỏ nhất"
                                    />
                                </div>
                                <div className="col-4">
                                    <NumericInput
                                        // required
                                        className="form-control"
                                        min={this.state.newSubscriber.expect_age_min}
                                        value={this.state.newSubscriber.expect_age_max}
                                        onChange={(value) => this.onChageNumberInput(value, "expect_age_max")}
                                        placeholder="Lớn nhất"
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Nghề nghiệp
                                </div>
                                <div className="col-8">
                                    <Select
                                        isMulti={true}
                                        defaultValue={{ value: null, label: "Tất cả nghề nghiệp" }}
                                        placeholder="Chọn một hoặc nhiều"
                                        options={
                                            [
                                                { value: null, label: "Tất cả nghề nghiệp" },
                                                ...jobs.map(job => {
                                                    return { value: job.id, label: job.name }
                                                })
                                            ]

                                        }
                                        value={this.state.expect_job}
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "expect_job")}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Tình trạng hôn nhân
                                </div>
                                <div className="col-8">
                                    <Select
                                        defaultValue={{ value: null, label: "Tất cả trạng thái" }}
                                        options={
                                            [
                                                { value: null, label: "Tất cả trạng thái" },
                                                { value: 0, label: "Độc thân" },
                                                { value: 1, label: "Đã kết hôn" },
                                                { value: 2, label: "Đã từng kết hôn trước đó" },
                                            ]
                                        }

                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "expect_marital_status")}
                                    />
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