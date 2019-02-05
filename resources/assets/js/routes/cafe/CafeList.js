import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import { Card, CafeCard } from '../../components/Card';
import {connect} from 'react-redux';
import {getAllCafe} from '../../actions/CafeActions';
import {Link, withRouter} from 'react-router-dom';

class CafeList extends Component {
    componentDidMount() {
        this.props.getAllCafe(1);
    }

    render() {
        const {agencies} = this.props;
        return (
            <CafeLayout>
                <div className="container cafe-header-banner">
                    <div className="row">
                        <div className="col-9">
                            <h4>BẠN ĐANG SỞ HỮU TIỆM CAFE?</h4>
                            <div>Hãy tham gia cùng chúng tôi để tạo nên những điều tốt đẹp trong cuộc sống</div>
                        </div>
                        <div className="col-3">
                            <Link to='/cafe/create'>
                                <button className="btn btn-primary">ĐĂNG KÝ</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Card>
                    <div className="row">
                    {
                        agencies.map((agency, index) => {
                            return (
                                <div className="col-4" key={index}>
                                    <CafeCard agency={agency}></CafeCard>
                                </div>
                            )
                        })
                    }
                    </div>
                </Card>
            </CafeLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        agencies: state.cafe.cafes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCafe: (page) => dispatch(getAllCafe(page)) 
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CafeList));