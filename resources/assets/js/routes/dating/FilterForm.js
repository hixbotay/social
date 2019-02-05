import React, { Component } from 'react';
import { getAllJobs } from '../../actions/JobActions';
import { getAllProvinces, getAllDistricts } from '../../actions/AddressActions';
import { connect } from "react-redux";
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import qs from 'qs';
import {withRouter} from 'react-router-dom';

class FilterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            districts: [],
            filter: {}
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
        this.props.getAllProvinces();

        var filter = qs.parse(this.props.location.search.slice(1));
        if(filter) {
            this.props.getAllDistricts(filter.province_id);
            this.setState({filter});
        }
    }

    onChangeFilter(value, name) {
        if(name === 'province_id') {
            this.props.getAllDistricts(value);
        }

        this.setState({
            filter: {
                ...this.state.filter,
                [name]: value
            }
        });
    }

    onSubmit(event) {
        event.preventDefault();
        var filter = this.state.filter;

        if(!filter.province_id || !filter.district_id) {
            return alert("Bạn cần giới hạn tỉnh và huyện!");
        }

        var filter_string = '';
        Object.keys(filter).map(key => {
            if (filter[key]) {
                filter_string = filter_string.concat(`&${key}=${filter[key]}`);
            }
        });

        window.location.href = `${baseUrl}/dating/search?${filter_string}`;
    }

    render() {
        var {filter} = this.state;

        var provinceOptions = this.props.provinces.map((item) => {
            return { value: item.matp, label: item.name };
        });
        provinceOptions.unshift({value: null, label: "Chọn tỉnh"});

        var districtOptions = this.props.districts.map((item) => {
            return { value: item.maqh, label: item.name };
        });
        districtOptions.unshift({value: null, label: "Chọn huyện"});

        var maritalOptions = [
            { value: null, label: "Chọn một trạng thái" },
            { value: 0, label: "Độc thân" },
            { value: 1, label: "Đã kết hôn" },
            { value: 2, label: "Đã từng kết hôn trước đó" },
        ];

        var jobOptions = this.props.jobs.map((item) => {
            return { value: item.id, label: item.name };
        });
        jobOptions.unshift({value: null, label: "Chọn công việc"});

        var selectedProvince = null, selectedDistrict = null, selectedMarital = null, selectedJob = null;
        
        if(filter) {
            selectedProvince = provinceOptions.find(o => { return o.value == parseInt(filter.province_id) });
            selectedDistrict = districtOptions.find(o => { return o.value == parseInt(filter.district_id) });
            selectedMarital = maritalOptions.find(o => { return o.value == parseInt(filter.marital_status) });
            selectedJob = jobOptions.find(o => { return o.value == parseInt(filter.job_conditional) });
        }
        
        return (
            <div className="mt-4">
                <h5>LỌC THEO</h5>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {/* {{ csrf_field() }} */}
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="col-5">
                            <NumericInput
                                className="form-control"
                                min={1}
                                value={this.state.filter.min_number}
                                onChange={(value) => this.onChangeFilter(value, "min_number")}
                                placeholder="Nhỏ nhất"
                            />
                        </div>
                        <div className="col-5">
                            <NumericInput
                                className="form-control"
                                min={this.state.filter.min_number}
                                value={this.state.filter.limit_number}
                                onChange={(value) => this.onChangeFilter(value, "limit_number")}
                                placeholder="Lớn nhất"
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="far fa-heart"></i>
                        </div>
                        <div className="col-10">
                            <Select
                                placeholder="Chọn một trạng thái"
                                value={selectedMarital}
                                options={maritalOptions}
                                onChange={(option) => this.onChangeFilter(option.value, "marital_status")}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-suitcase"></i>
                        </div>
                        <div className="col-10" >
                            <Select
                                placeholder="Chọn một công việc"
                                value={selectedJob}
                                options={jobOptions}
                                onChange={(option) => this.onChangeFilter(option.value, "job_conditional")}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-map-marker"></i>
                        </div>
                        <div className="col-10">
                            <Select
                                placeholder="Tỉnh"
                                value={selectedProvince}
                                options={provinceOptions}
                                onChange={(option) => this.onChangeFilter(option.value, "province_id")}
                            />
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2"></div>
                        <div className="col-10">
                            <Select
                                placeholder="Huyện"
                                value={selectedDistrict}
                                options={
                                    this.props.districts.map((item) => {
                                        return { value: item.maqh, label: item.name };
                                    })
                                }
                                onChange={(option) => this.onChangeFilter(option.value, "district_id")}
                            />
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary" type="submit">Áp dụng</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.job.jobs,
        provinces: state.address.provinces,
        districts: state.address.districts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterForm));