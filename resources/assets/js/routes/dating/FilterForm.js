import React, { Component } from 'react';
import {getAllJobs} from '../../actions/JobActions';
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import { connect } from "react-redux";

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
    }

    onChangeFilter(event) {
        this.setState({
            filter: {
                ...this.state.filter,
                [event.target.name]: event.target.value
            }
        })
    }

    onChangeProvince(event) {
        if(event.target.value) {
            this.setState({
                filter: {
                    ...this.state.filter,
                    province_id: event.target.value
                }
            });
            this.props.getAllDistricts(event.target.value);
        }
    }

    onSubmit(event) {
        event.preventDefault();
        var filter = this.state.filter;

        var filter_string = '';
        Object.keys(filter).map(key => {
            if(Array.isArray(filter[key])) {
                filter[key].map(item => {
                    filter_string = filter_string.concat(`&${key}=${item}`);
                })
            } else {
                filter_string = filter_string.concat(`&${key}=${filter[key]}`);
            }
        });

        window.location.href = `${baseUrl}/dating/search?${filter_string}`;
    }

    render() {
        return (
            <div>
                <h5>LỌC THEO</h5>
                <form onSubmit={(e) => this.onSubmit(e)}>
                    {/* {{ csrf_field() }} */}
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="col-5">
                            <select className="custom-select" name="min_number" onChange={(e) => this.onChangeFilter(e)}>
                                <option value="">Nhỏ nhất</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </div>
                        <div className="col-5">
                            <select className="custom-select" name="limit_number" onChange={(e) => this.onChangeFilter(e)}>
                                <option value="">Lớn nhất</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                                <option>11</option>
                                <option>12</option>
                                <option>13</option>
                                <option>14</option>
                                <option>15</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="far fa-heart"></i>
                        </div>
                        <div className="col-10">
                            <select className="custom-select" name="marital_status" onChange={(e) => this.onChangeFilter(e)}>
                                <option value="">Tình trạng hôn nhân</option>
                                <option value={0}>Độc thân</option>
                                <option value={1}>Đã kết hôn</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-suitcase"></i>
                        </div>
                        <div className="col-10" >
                            <select className="custom-select" name="job_conditional" onChange={(e) => this.onChangeFilter(e)}>
                                <option>Chọn nghề nghiệp</option>
                                {
                                    this.props.jobs.map((item, index) => {
                                        return (
                                            <option key={index} value={item.id}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-map-marker"></i>
                        </div>
                        <div className="col-5">
                            <select className="custom-select" name="province_id" required onChange={(e) => this.onChangeProvince(e)}>
                                <option value="">Tỉnh</option>
                                {
                                    this.props.provinces.map((item, index) => {
                                        return (
                                            <option key={index} value={item.matp}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-5">
                            <select className="custom-select" name="district_id" required onChange={(e) => this.onChangeFilter(e)}>
                                <option value="">Huyện</option>
                                {
                                    this.props.districts.map((item, index) => {
                                        return (
                                            <option key={index} value={item.maqh}>
                                                {item.name}
                                            </option>
                                        )
                                    })
                                }
                            </select>
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
        getAllJobs:() => dispatch(getAllJobs()),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(FilterForm);