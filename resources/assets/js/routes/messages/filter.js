import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {getJobs} from "../../actions/JobActions";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class FilterTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobs: []
        }

    }

    componentDidMount() {
        this.props.getJobs()
            .then(result => {
                this.setState({
                    jobs: result
                })
            })
    }

    render() {

        const {jobs} = this.state;

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
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilterTab));