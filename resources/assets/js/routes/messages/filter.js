import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getJobs} from "../../actions/JobActions";
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
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
            open: false
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

    render() {

        const {jobs, provinces, districts, open} = this.state;

        return(
            <div className={"filter-box"}>

                <div className="form-group">
                    <label htmlFor="merried"><i className="fa fa-heart"></i> Tình trạng hôn nhân</label>
                    <select name="" id="merried" className={""}>
                        <option value="all">Tất cả</option>
                        <option value="0">Độc thân</option>
                        <option value="1">Đã kết hôn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="job"><i className="fa fa-briefcase"></i> Nghề nghiệp</label>
                    <select name="job_id" id="job" className={""}>
                        <option value="all">Tất cả</option>
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
                            }}>
                                <option value="all">Tỉnh/TP</option>
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
                            <select name="province_id" id="province_id" className={""}>
                                <option value="all">Quận/Huyện</option>
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
                                this.setState({open: true})
                            }}
                            type="button"
                            className="btn btn-primary btn-block"
                        >Tìm kiếm</button>
                    </div>
                </div>


                <Modal open={open} onClose={() => {this.setState({open: false})}} center>
                    <h2>Danh sách</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                        pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
                        hendrerit risus, sed porttitor quam.
                    </p>
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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterTab));