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
                <div className="cafe-header-banner">
                    <div className="row">
                        <div className=" col-xl-9 col-lg-9 col-md-9 col-sm-6 col-xs-12">
                            <h4>BẠN ĐANG SỞ HỮU TIỆM CAFE?</h4>
                            <p>Hãy tham gia cùng chúng tôi để tạo nên những điều tốt đẹp trong cuộc sống</p>
                        </div>
                        <div className=" col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <Link to='/cafe/create'>
                                <button className="btn btn-primary">ĐĂNG KÝ</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <Card className='block-cafe-stores mt-4'>
                    <div className="row">
                    {
                        agencies.map((agency, index) => {
                            return (
                                <div className="store-item col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12" key={index}>
                                    <CafeCard className='image-card cafe-card box-shadow-default' agency={agency}></CafeCard>
                                </div>
                            )
                        })
                    }
                    </div>

                    <div className='load-more text-center'>
                        <a className='btn btn-link color-blue'>Xem thêm</a>
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