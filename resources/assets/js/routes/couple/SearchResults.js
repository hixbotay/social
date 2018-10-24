import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ImageCard, CardWithIcon } from '../../components/Card';
import { getCoupleResults } from '../../actions/CoupleActions';
import { withRouter } from 'react-router-dom';
import { updateRelationship } from '../../actions/UserActions';
import Slider from "react-slick";
import * as qs from 'query-string';
import CoupleView from '../../components/Couple';
import {getAllJobs} from '../../actions/JobActions';
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import {Link} from 'react-router-dom';
import {cleanObject} from '../../helper/function';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: { name: ''},
            results: []
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
        this.props.getAllProvinces();
        this.props.getCoupleResults({ name: '' }).then(data => {
            this.setState({ results: data });
        });
    }

    onChangeProvince(event) {
        var province_id = event.target.value;
        if(province_id) {
            this.props.getAllDistricts(event.target.value);
            this.setState({
                filter: {
                    ...this.state.filter,
                    [event.target.name]: event.target.value
                }
            })
        } else {
            this.setState({
                filter: {
                    ...this.state.filter,
                    province_id: "",
                    district_id: ""
                }
            })
        }
    }

    onChangeFilter(event) {
        this.setState({
            filter: {
                ...this.state.filter,
                [event.target.name]: event.target.value
            }
        })
    }

    onSearch() {
        var temp = this.state.filter;
        cleanObject(temp);
        if(temp.name == undefined) {
            temp.name = "";
        }
        this.props.getCoupleResults(this.state.filter).then(data => {
            this.setState({ results: data });
        });
    }

    toggleFilter() {
        document.getElementById('couple-filter').classList.toggle('d-none');
    }

    render() {
        var view = qs.parse(this.props.location.search).view;
        var currentYear = new Date().getFullYear();

        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
            // adaptiveHeight: true
        };

        return (
            <div>
                <div className="row">
                    <div className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        <div className="group-navigator">
                            <div className="row">
                                <div className="col-4 col-md-4  navigator-link">
                                    <Link to='/couple'>
                                        Tìm kiếm một
                                    </Link>
                                </div>
                                <div className="col-4 col-md-4  navigator-link">
                                    <Link to='/couple?view=many'>
                                        Tìm kiếm nhiều
                                    </Link>
                                </div>
                                <div className="col-4 col-md-4 navigator-link" onClick={() => this.toggleFilter()}>
                                    <i id="filter-couple" className="fas fa-sliders-h"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-xl-2 order-xl-2">
                    </div>
                    <div className="col col-xl-3 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12 form-row">
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Tìm kiếm" name="name" onChange={(event) => this.onChangeFilter(event)} />
                        </div>
                        <div className="col-md-3">
                            <button className='btn' onClick={() => this.onSearch()}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <Card id="couple-filter" className="d-none">
                    <div className="row">
                        <div className="col-2">
                            <select className="custom-select" name="gender" onChange={(event) => this.onChangeFilter(event)}>
                                <option value="">Giới tính</option>
                                <option value='M'>Nam</option>
                                <option value='F'>Nữ</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select" name="marital_status" onChange={(event) => this.onChangeFilter(event)}>
                                <option value="">Tình trạng hôn nhân</option>
                                <option value={1}>Đã kết hôn</option>
                                <option value={0}>Độc thân</option>
                            </select>
                        </div>
                        <div className="col-3">
                            <select className="custom-select" name="job" onChange={(event) => this.onChangeFilter(event)}>
                                <option value="">Nghề nghiệp</option>
                                {
                                    this.props.jobs.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select" name="province_id" onChange={(event) => this.onChangeProvince(event)}>
                                <option value="">Chọn tỉnh</option>
                                {
                                    this.props.provinces.map((item, index) => {
                                        return (
                                            <option value={item.matp} key={index}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-3">
                            <select className="custom-select" name="district_id" onChange={(event) => this.onChangeFilter(event)}>
                                <option value="">Chọn huyện</option>
                                {
                                    this.props.districts.map((item, index) => {
                                        return (
                                            <option value={item.maqh} key={index}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <br/>
                    <div className="text-center">
                        <button className="btn btn-secondary" onClick={() => this.onSearch()}>
                            ÁP DỤNG
                        </button>
                    </div>
                </Card>
                
                {
                    (view === 'many') ? (
                        <Card>
                            <div className="row">
                                {
                                    this.state.results.map((item, index) => {
                                        var birth = new Date(item.birthday).getFullYear();
                                        item.age = currentYear - birth;
                                        return (
                                            <div className='col col-md-3 col-lg-3' key={index}>
                                                <div className='container image-card-results'>
                                                    <ImageCard
                                                        user={item}
                                                        action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                                    ></ImageCard>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    ) : (
                            <Slider {...settings}>
                                {
                                    this.state.results.map((item, index) => {
                                        
                                        return (
                                            <CoupleView 
                                                item={item} key={index}
                                                action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                            ></CoupleView>
                                        )
                                    })
                                }
                            </Slider>
                        )
                }



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.couple.search_results,
        jobs: state.job.jobs,
        provinces: state.address.provinces,
        districts: state.address.districts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCoupleResults: (keyword) => dispatch(getCoupleResults(keyword)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id)),
        getAllJobs: () => dispatch(getAllJobs()),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));