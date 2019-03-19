import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, ImageCard, CardWithIcon } from '../../components/Card';
import { getCoupleResults, dismiss } from '../../actions/CoupleActions';
import { withRouter } from 'react-router-dom';
import { updateRelationship } from '../../actions/UserActions';
import Slider from "react-slick";
import CoupleView from '../../components/Couple';
import Modal from '../../components/Modal';
import {getAllJobs} from '../../actions/JobActions';
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import {Link} from 'react-router-dom';
import {cleanObject} from '../../helper/function';
import Select from 'react-select';
import qs from 'qs';
import ToggleDisplay from 'react-toggle-display';
import { FaUserAlt, FaUsers, FaFilter } from "react-icons/fa";

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filter: { name: ''},
            results: [],
            view: "single",
            isShowFilter: false
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
        this.props.getAllProvinces();

        var filter = qs.parse(this.props.location.search.slice(1));
        this.setState({view: filter.view}, () => {
            delete filter.view
            
            this.props.getCoupleResults(filter).then(data => {
                this.setState({ results: data, filter: filter });
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.location.search != nextProps.location.search) {
            var filter = qs.parse(nextProps.location.search.slice(1));
            this.setState({view: filter.view}, () => {
                delete filter.view
                
                this.props.getCoupleResults(filter).then(data => {
                    this.setState({ results: data, filter: filter });
                });
            });
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
        })
    }

    onSearch() {
        var temp = this.state.filter;
        cleanObject(temp);

        var query_string = "";
        Object.keys(temp).map(key => {
            query_string += `&${key}=${temp[key]}`;
        })
        this.props.history.push(`${this.props.match.url}?${query_string}`);
        // window.location.href = `${baseUrl}${this.props.match.url}?${query_string}`;
    }

    toggleFilter() {
        this.setState({isShowFilter: !this.state.isShowFilter});
    }

    getNextUser(user_id) {
        this.props.dismiss(user_id);
        this.refs.coupleSlider.slickNext();
    }

    render() {
        var {filter, results, isShowFilter, view} = this.state; 
        var currentYear = new Date().getFullYear();

        var query_string = "";
        Object.keys(filter).map(key => {
            query_string += `&${key}=${filter[key]}`;
        })

        var settings = {
            accessibility: true,
            draggable: false,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            // adaptiveHeight: true
        };

        // option select box
        var genderOptions = [
            {value: null, label: "Giới tính"},
            {value: "M", label: "Nam"},
            {value: "F", label: "Nữ"}
        ];

        var maritalOptions = [
            {value: null, label: "Tình trạng hôn nhân"},
            {value: 0, label: "Độc thân"},
            {value: 1, label: "Đã kết hôn"},
            {value: 2, label: "Đã từng kết hôn trước đó"}
        ];

        var jobOptions = this.props.jobs.map(job => {
            return {value: job.id, label: job.name};
        });
        jobOptions.unshift({value: null, label: "Nghề nghiệp"});

        var provinceOptions = this.props.provinces.map(province => {
            return {value: province.matp, label: province.name};
        });
        provinceOptions.unshift({value: null, label: "Chọn tỉnh"});

        var districtOptions = this.props.districts.map(district => {
            return {value: district.maqh, label: district.name};
        });
        districtOptions.unshift({value: null, label: "Chọn huyện"});

        // selected value
        var selectedGender = genderOptions.find(o => o.value === filter.gender);
        var selectedMarital = maritalOptions.find(o => o.value === parseInt(filter.marital_status));
        var selectedJob = jobOptions.find(o => o.value === filter.job);
        var selectedProvince = provinceOptions.find(o => o.value === filter.province_id);
        var selectedDistrict = districtOptions.find(o => o.value === filter.district_id);

        return (
            <div>


                
                {
                    results.length ? (
                        (view === 'many') ? (
                        <Card>
                            <div className="row">
                                {
                                    results.map((item, index) => {
                                        var birth = new Date(item.birthday).getFullYear();
                                        item.age = currentYear - birth;
                                        return (
                                            <div className='col-xl-3 col-lg-3 col-md-3 col-xs-6' key={index}>
                                                <div className='image-card-results show-many'>
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
                            <Slider {...settings} ref="coupleSlider">
                                {
                                    results.map((item, index) => {

                                        return (
                                            <CoupleView
                                                item={item} key={index}
                                                action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                                dismissAction = {(user_id) => this.getNextUser(user_id)}
                                            ></CoupleView>
                                        )
                                    })
                                }
                            </Slider>
                        )
                    ) : (
                        <Card>
                            <div className="text-center">
                                Không tìm thấy người dùng nào.
                            </div>
                        </Card>
                    )
                }
                <a className='btn-skip-user'>Các thành viên đã bỏ qua <i className='fas fa-angle-double-right'></i></a>
                <button type="button" id="open-relationship-modal" className="d-none" data-toggle="modal" data-target="#relationship-alert"></button>
                <Modal id="relationship-alert">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://us.123rf.com/450wm/anwarsikumbang/anwarsikumbang1408/anwarsikumbang140800671/31358550-love-couple-romance-cartoon.jpg" id="create-event-alert-img" />
                        </div>
                        <div className="col-6">
                            <div className="text-center">
                                CHƯA XONG!
                            </div>
                            <div className="text-center create-event-alert-content">
                                Bạn cần hoàn thiện hồ sơ đến 70% để có thể thả tim một ai đó!
                            </div>
                            <div className="text-center create-event-alert-content">
                                <button className="btn btn-primary" onClick={() => {document.getElementById('open-relationship-modal').click()}}>OK</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.couple.search_results,
        jobs: state.job.jobs,
        provinces: state.address.provinces,
        districts: state.address.districts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCoupleResults: (keyword) => dispatch(getCoupleResults(keyword)),
        dismiss: (user_id) => dispatch(dismiss(user_id)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id)),
        getAllJobs: () => dispatch(getAllJobs()),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));