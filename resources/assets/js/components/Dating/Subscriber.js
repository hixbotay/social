import React, { Component } from 'react';
import { SquareAvatar } from '../Avatar';
import {getAllCafe} from '../../actions/CafeActions';
import {getAllDistricts} from '../../actions/AddressActions';
import connect from 'react-redux/es/connect/connect';

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
        this.setState({
            isAccept: true
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
        }, () => {
            console.log(this.state)
        })
    }

    createDating(e) {
        e.preventDefault();
        var data = {
            event: {
                name: this.state.agency_name,
                schedule_id: 0,
                start_time:  this.state.start_time,
                limit_time_register: this.state.start_time,
                payment_m: 0,
                payment_f: 0,
                type: 'couple',
                agency_id: this.state.agency_id,
                is_secret: 0,
                image: this.state.agency_image
            },
            event_meta: {
                job_conditional: [this.props.subscriber.expect_job],
                min_male_number: 1,
                max_male_number: 1,
                min_female_number: 1,
                max_female_number: 1,
                marital_status: this.props.subscriber.expect_marital_status,
                payer: (this.props.subscriber.payer === 'self') ? this.props.subscriber.id : this.props.user.id
            },
            subscriber: this.props.subscriber.user_id
        }

        this.props.createDating(data).then(data => {
            window.location.href = `${baseUrl}/dating`;
        });
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
                    {
                        this.state.isAccept ? (
                            <div className="mt-2">
                                <form onSubmit={(e) => this.createDating(e)}>
                                    <div className="form-group">
                                        <label>Chọn ngày hẹn</label>
                                        <input 
                                            className="form-control" 
                                            type="datetime-local" 
                                            min={subscriber.expect_date_from} 
                                            max={subscriber.expect_date_to} 
                                            required
                                            name="start_time"
                                            onChange={(e) => this.onChangeDate(e)}
                                        />
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-12">Chọn quán (thay đổi quán mà người bạn kia đã chọn nếu bạn muốn)</label>
                                        <div className="col-4">
                                            <select 
                                                className="custom-select" 
                                                defaultValue={subscriber.province_id} 
                                                onChange={(e) => this.changeProvince(e)}
                                            >
                                                <option value="">-- Chọn tỉnh/TP --</option>
                                                {
                                                    provinces.map((province, index) => {
                                                        return (
                                                            <option 
                                                                value={province.matp} 
                                                                key={index} 
                                                            >
                                                                {province.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select 
                                                className="custom-select" 
                                                defaultValue={subscriber.district_id} 
                                                onChange={(e) => this.changeDistrict(e)}
                                            >
                                                <option value="">-- Chọn quận/huyện --</option>
                                                {
                                                    districts.map((item, index) => {
                                                        return (
                                                            <option 
                                                                value={item.maqh} 
                                                                key={index}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select 
                                                className="custom-select" 
                                                defaultValue={subscriber.agency_id}
                                                onChange={(e) => this.changeCafe(e)}
                                            >
                                                <option value="">-- Chọn quán --</option>
                                                {
                                                    cafes.map((item, index) => {
                                                        return (
                                                            <option 
                                                                value={item.id} 
                                                                key={index}
                                                            >
                                                                {item.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn-primary mr-4" type="submit">
                                            Xác nhận
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => this.cancel()}>
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <button className="btn btn-primary btn-sm" onClick={() => this.accept()}>Nhận lời cafe đôi</button>
                            </div>
                        )
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Subscriber);