import React, { Component } from 'react';
import { SquareAvatar } from '../Avatar';
import {getAllCafe} from '../../actions/CafeActions';
import {getAllDistricts} from '../../actions/AddressActions';
import connect from 'react-redux/es/connect/connect';
import moment from 'moment';
import {withRouter} from 'react-router-dom';

class Subscriber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAccept: false,
            start_time: null,
            agency_id: props.subscriber.agency_id,
            agency_name: props.subscriber.agency_name,
            agency_image: props.subscriber.agency_cover
        }        
    }

    componentDidMount() {
        this.props.getAllDistricts(this.props.subscriber.province_id);
        this.props.getAllCafe({province_id: this.props.subscriber.province_id, district_id: this.props.subscriber.district_id})
    }

    accept() {
        const {subscriber} = this.props;
        this.props.history.push({
            pathname: '/dating/couple/create',
            state: {
                invitee: {
                    id: subscriber.user_id,
                    name: subscriber.name,
                    avatar: subscriber.avatar,
                    address: subscriber.address,
                    job: subscriber.job
                },
                subscriber: {
                    province_id: subscriber.province_id,
                    district_id: subscriber.district_id,
                    agency_id: subscriber.agency_id,
                    agency_name: subscriber.agency_name,
                    agency_type: subscriber.agency_type,
                    payer: subscriber.payer,
                    expect_date_from: subscriber.expect_date_from,
                    expect_date_to: subscriber.expect_date_to
                }  
            }
        })
    }

    cancel() {
        this.setState({
            isAccept: false
        })
    }

    onChangeDate(e) {
        this.setState({
            start_time: e.target.value
        })
    }

    changeProvince(e) {
        this.setState({
            ...this.state,
            province_id: e.target.value
        });
        this.props.getAllDistricts(e.target.value);
    }

    changeDistrict(e) {
        this.setState({
            ...this.state,
            district_id: e.target.value
        }, () => {
            this.props.getAllCafe({province_id: this.state.province_id, district_id: this.state.district_id});
        })
    }

    changeCafe(e) {
        var selectedItems = this.props.cafes.filter((item) => {
            return item.id === parseInt(e.target.value)
        });

        this.setState({
            ...this.state,
            agency_id: parseInt(e.target.value),
            agency_name: selectedItems[0].name,
            agency_image: selectedItems[0].cover,
        })
    }

    render() {
        
        const {subscriber, provinces, districts, cafes} = this.props;

        return (
            <div className="row">
                <div className="col-3">
                    <SquareAvatar img={subscriber.avatar} size="large"/>
                </div>
                <div className="col-9">
                    <h5>{subscriber.name}</h5>
                    <div>{subscriber.address}</div>
                    <div>Địa điểm: <span>{subscriber.district}, {subscriber.province}</span></div>
                    <div>Quán: <span>{subscriber.agency_name}</span></div>
                    <div>Chi phí: <span>{(subscriber.payer === 'self') ? `${subscriber.name} trả` : 'Bạn trả'}</span></div>
                    <div>Đăng ký từ ngày <b>{moment(subscriber.expect_date_from).format("DD-MM-YYYY")}</b> tới ngày <b>{moment(subscriber.expect_date_to).format("DD-MM-YYYY")}</b></div>
                    
                    <div className="mt-2">
                        <button className="btn btn-primary btn-sm" onClick={() => this.accept()}>
                            Nhận lời cafe đôi
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        cafes: state.cafe.cafes,
        districts: state.address.districts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCafe: (filter) => dispatch(getAllCafe(filter)),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Subscriber));