import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getJobs} from "../../actions/JobActions";
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import {findUsers} from '../../actions/MessageActions';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Modal from "react-responsive-modal";

class FilterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobs: [],
            provinces: [],
            districts: [],
            allDistricts: [],
            open: false,
            filter : {
                marital_status: '',
                job: '',
                province_id: '',
                district_id: '',
            },
            users: []
        }
    }

    componentDidMount() {
        this.props.getJobs()
            .then(result => {
                this.setState({
                    jobs: result
                })
            })
        this.props.getAllProvinces()
            .then(data => {
                this.setState({
                    provinces: data
                })
            })
    }

    loadDistrict(provinceID){
        this.props.getAllDistricts(provinceID)
            .then(data => {
                this.setState({
                    districts: data
                })
            })
    }

    getListUser(){
        var data = this.state.filter;
        this.props.findUsers(data)
            .then((response) => {
                this.setState({users: response})
                console.log(response)
            })
    }

    setFilterState(state){
        this.setState({
            filter: {
                ...this.state.filter,
                [state.key]: state.value
            }
        }, () => {
        })
    }

    createConversation(item){
        const {chatList} = this.props;
        this.props.chatTo(item);
    }

    render() {

        const {jobs, provinces, districts, open, users} = this.state;

        return(
            <div className={"filter-box"}>

                <div className="form-group">
                    <label htmlFor="marital_status"><i className="fa fa-heart"></i> Tình trạng hôn nhân</label>
                    <select name="" id="marital_status" className={""} onChange={(e) => {
                        this.setFilterState({key: 'marital_status', value: e.target.value})
                    }}>
                        <option value="">Tất cả</option>
                        <option value="0">Độc thân</option>
                        <option value="1">Đã kết hôn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="job"><i className="fa fa-briefcase"></i> Nghề nghiệp</label>
                    <select name="job_id" id="job" onChange={(e) => {
                        this.setFilterState({key: 'job', value: e.target.value})
                    }}>
                        <option value="">Tất cả</option>
                        {
                        jobs.map((item, i) => {
                            return(<option key={i} value={item.id}>{item.name}</option>);
                        })
                        }
                    </select>
                </div>

                <div className={"row"}>
                    <div className={'col-md-6'}>
                        <div className="form-group">
                            <select name="province_id" id="province_id" onChange={(e) => {
                                this.loadDistrict(e.target.value);
                                this.setFilterState({key: 'province_id', value: e.target.value});
                            }}>
                                <option value="">Tỉnh/TP</option>
                                {
                                    provinces.map((item, i) => {
                                        return(
                                            <option value={item.matp} key={i}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className={'col-md-6'}>
                        <div className="form-group">
                            <select name="district_id" id="district_id" className={""} onChange={(e) => {
                                this.setFilterState({key: 'district_id', value: e.target.value})
                            }}>
                                <option value="">Quận/Huyện</option>
                                {
                                    districts.map((item, i) => {
                                        return(
                                            <option value={item.maqh} key={i}>{item.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>

                <div className={'row'}>
                    <div className={"col-md-4 offset-md-4"}>
                        <button
                            onClick={() => {
                                this.setState({open: true});
                                this.getListUser();
                            }}
                            type="button"
                            className="btn btn-primary btn-block"
                        >Tìm kiếm</button>
                    </div>
                </div>


                <Modal open={open} onClose={() => {this.setState({open: false})}} center>
                    <h2>Danh sách</h2>
                    <ul className="list-group">
                        {users.map((item, index)=>{
                            return (
                                <div onClick={() => {
                                    this.createConversation(item);
                                }}
                                    key={index} className="btn list-group-item list-group-item-action flex-column align-items-start">
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{item.name}</h5>
                                    </div>
                                </div>
                            )
                        })}

                    </ul>
                </Modal>

            </div>
        );
    }
}

FilterTab.propTypes = {
    title: PropTypes.string,
};

// export default FilterTab;


function mapStateToProps(state) {
    return {
        jobs: state.job.jobs,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getJobs: () => dispatch(getJobs()),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (provinceID) => dispatch(getAllDistricts(provinceID)),
        findUsers: (data) => dispatch(findUsers(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterTab));