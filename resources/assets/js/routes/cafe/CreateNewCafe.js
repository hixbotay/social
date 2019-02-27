import React, { Component } from 'react';

import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { getAllDistricts, getAllProvinces, getAllCommunes } from "../../actions/AddressActions";
import 'react-image-lightbox/style.css';
import { createCafe } from "../../actions/CafeActions";
import Modal from '../../components/Modal';
import Map from './Map';
import CafeLayout from './CafeLayout';
import Select from 'react-select';
import NumericInput from 'react-numeric-input';
import TimePicker from 'react-times';

class CreateNewCafe extends Component {

    constructor(props) {
        super(props);
        this.address = {};
        this.state = {
            open: "08:00",
            close: "22:00",
            data: {}
        };
    }

    componentDidMount() {
        this.props.getAllProvinces();
    }

    onChangeCafeData(name, value) {
        if(name === 'province_id') {
            this.props.getAllDistricts(value);
            this.setState({
                data: {
                    ...this.state.data,
                    district_id: null,
                    village_id: null
                }
            })
        }
        if(name === 'district_id') {
            this.props.getAllCommunes(value);
            this.setState({
                data: {
                    ...this.state.data,
                    village_id: null
                }
            })
        }

        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        })
    }

    onChangeTime(name, value) {
        this.setState({
            [name]: value.hour + ':' + value.minute,
            data: {
                ...this.state.data,
                [name]: value.hour + ':' + value.minute,
            }
        })
    }

    onChangeAddress(address, coordinates) {
        this.setState({
            data: {
                ...this.state.data,
                address: address,
                lat: coordinates[0],
                lng: coordinates[1]
            }
        })
    }

    createCafe(event) {
        event.preventDefault();
        if(!this.state.data.district_id || !this.state.data.village_id) {
            alert("Vui lòng chọn huyện và xã");
        } else {
            this.props.createCafe(this.state.data);
        }
    }

    render() {

        return (
            <CafeLayout>
                <div className="ui-block">
                    <div className={"add-cafe-header"} >
                        <h4><i className="fas fa-map-marker-alt"></i> Thêm địa điểm</h4>
                        <h6>Tham gia cùng chúng tôi để tạo những trải nghiệm không gian lãng mạn</h6>
                    </div>

                    <div className={"add-cafe-banner"}>
                        <img src={"https://image.freepik.com/free-vector/different-types-of-coffee-and-phrase-i-need-coffee_1308-18167.jpg"} />
                    </div>

                    <form onSubmit={(event) => this.createCafe(event)}>
                        <div className={"add-cafe-basic"}>
                            <h3>THÔNG TIN CƠ BẢN</h3>
                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="name">Tên quán</label>
                                    <div className="col-md-9">
                                        <input type="text" name="name" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="type">Loại hình</label>
                                    <div className="col-md-9">
                                        <Select
                                            placeholder="Chọn một loại hình"
                                            options={[
                                                { label: "Cafe/Trà sữa", value: 1 },
                                                { label: "Quán ăn", value: 2 }
                                            ]}
                                            onChange={(option) => this.onChangeCafeData('type', option.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label">Địa chỉ</label>
                                    <div className="col-md-3">
                                        <Select
                                            placeholder="Tỉnh/TP"
                                            options={
                                                this.props.provinces.map((data, index) => {
                                                    return { label: data.name, value: data.matp }
                                                })
                                            }
                                            onChange={(option) => this.onChangeCafeData('province_id', option.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Select
                                            placeholder="Quận / Huyện"
                                            options={
                                                this.props.districts.map((data, index) => {
                                                    return { label: data.name, value: data.maqh }
                                                })
                                            }
                                            onChange={(option) => this.onChangeCafeData('district_id', option.value)}
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <Select
                                            placeholder="Xã / Phường"
                                            options={
                                                this.props.communes.map((data, index) => {
                                                    return { label: data.name, value: data.xaid }
                                                })
                                            }
                                            onChange={(option) => this.onChangeCafeData('village_id', option.value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="location">Vị trí trên bản đồ</label>
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#map-modal">Chọn vị trí</button>
                                    </div>
                                    <div className="col-md-6">{this.state.data.address}</div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="owner">Họ tên chủ quán</label>
                                    <div className="col-md-9">
                                        <input type="text" name="owner" className="form-control" onChange={(e) => this.onChangeCafeData(e.target.name, e.target.value)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="owner_mobile">SĐT chủ quán</label>
                                    <div className="col-md-9">
                                        <input type="text" name="owner_mobile" className="form-control" onChange={(e) => this.onChangeCafeData(e.target.name, e.target.value)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="manager">Quản lý</label>
                                    <div className="col-md-9">
                                        <input type="text" name="manager" className="form-control" onChange={(e) => this.onChangeCafeData(e.target.name, e.target.value)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="manager_mobile">SĐT quản lý</label>
                                    <div className="col-md-9">
                                        <input type="text" name="manager_mobile" className="form-control" onChange={(e) => this.onChangeCafeData(e.target.name, e.target.value)} required />
                                    </div>
                                </div>
                            </div>


                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="maxprice">Giá cao nhất</label>
                                    <div className="col-md-9">
                                        <NumericInput
                                            className="form-control"
                                            name="max_price"
                                            required
                                            step={10000}
                                            onChange={(value) => this.onChangeCafeData("max_price", value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="minprice">Giá thấp nhất</label>
                                    <div className="col-md-9">
                                        <NumericInput
                                            className="form-control"
                                            name="min_price"
                                            required
                                            step={10000}
                                            onChange={(value) => this.onChangeCafeData("min_price", value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="openHour">Mở cửa</label>
                                    <div className="col-md-9">
                                        <TimePicker
                                            time={this.state.open}
                                            theme="classic"
                                            timeConfig={{
                                                from: '07:00 AM',
                                                to: '24:00 PM',
                                                step: 15,
                                                unit: 'minute'
                                            }}
                                            onTimeChange={(value) => this.onChangeTime("open", value)}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="closeHour">Đóng cửa</label>
                                    <div className="col-md-9">
                                        <TimePicker
                                            time={this.state.close}
                                            theme="classic"
                                            timeConfig={{
                                                from: '07:00 AM',
                                                to: '24:00 PM',
                                                step: 15,
                                                unit: 'minute'
                                            }}
                                            onTimeChange={(value) => this.onChangeTime("close", value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"form-horizontal"}>
                            <div className={"row"}>
                                <div className={"col-md-6 offset-md-3"}>
                                    <button type="submit" className="btn btn-blue btn-md-2">
                                        + Thêm địa điểm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                <Modal id="map-modal" title="Chọn vị trí trên bản đồ">
                    <Map onChangeAddress={(address, coordinates) => this.onChangeAddress(address, coordinates)}></Map>
                </Modal>
            </CafeLayout>
        );
    }

}


function mapStateToProps(state) {
    return {
        provinces: state.address.provinces,
        districts: state.address.districts,
        communes: state.address.communes,
    };
}


function mapDispatchToProps(dispatch) {
    return {
        createCafe: (data) => dispatch(createCafe(data)),
        getAllCommunes: (id) => dispatch(getAllCommunes(id)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (id) => dispatch(getAllDistricts(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateNewCafe));