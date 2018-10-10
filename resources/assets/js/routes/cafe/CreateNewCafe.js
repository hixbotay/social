import React, { Component } from 'react';

import { withRouter } from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import { getAllDistricts, getAllProvinces, getAllCommunes } from "../../actions/AddressActions";
import 'react-image-lightbox/style.css';
import { createCafe } from "../../actions/CafeActions";
import Modal from '../../components/Modal';
import Map from './Map';
import CafeLayout from './CafeLayout';

class CreateNewCafe extends Component {

    constructor(props) {
        super(props);
        this.address = {};
        this.state = {
            data: {}
        };
    }

    componentDidMount() {
        this.props.getAllProvinces();
    }

    changeProvince(event) {
        this.setState({
            data: {
                ...this.state.data,
                province_id: this.province_id.value
            }
        }, () => {
            this.props.getAllDistricts(this.province_id.value);
        });
    }

    changeDistrict(event) {
        this.setState({
            data: {
                ...this.state.data,
                district_id: this.district_id.value
            }
        }, () => {
            this.props.getAllCommunes(this.district_id.value);
        });
    }

    onChangeCafeType() {
        this.setState({
            data: {
                ...this.state.data,
                params: this.type.value
            }
        });
    }

    onChangeCafeData(event) {
        this.setState({
            data: {
                ...this.state.data,
                [event.target.name]: event.target.value
            }
        }, () => {
            console.log(this.state);
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
        event.preventDefault()
        this.props.createCafe(this.state.data);
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
                                    <label className="col-md-3 control-label" htmlFor="province">Tỉnh/TP</label>
                                    <div className="col-md-3">
                                        <select className="custom-select" name="province_id" ref={select => this.province_id = select} onChange={(e) => this.changeProvince(e)} required>
                                            <option>Tỉnh/TP</option>
                                            {
                                                this.props.provinces.map((data, index) => {
                                                    return (<option value={data.matp} key={index}>{data.name}</option>);
                                                })
                                            }

                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <select className="custom-select" name="district_id" ref={select => this.district_id = select} onChange={(e) => this.changeDistrict(e)} required>
                                            <option>Quận/Huyện</option>
                                            {
                                                this.props.districts.map((data, index) => {
                                                    return (<option value={data.maqh} key={index}>{data.name}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-3">
                                        <select className="custom-select" name="village_id" ref={select => this.village_id = select} onChange={(e) => this.onChangeCafeData(e)} required>
                                            <option>Xã/Phường</option>
                                            {
                                                this.props.communes.map((data, index) => {
                                                    return (<option value={data.xaid} key={index}>{data.name}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="hotline">Hotline</label>
                                    <div className="col-md-9">
                                        <input type="text" name="hotline" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="params">Loại hình</label>
                                    <div className="col-md-9">
                                        <select className="custom-select" ref={select => this.type = select} onChange={() => this.onChangeCafeType()}>
                                            <option>Chọn một loại hình</option>
                                            <option value="Cafe/Trà sữa">Cafe/Trà sữa</option>
                                            <option value="Quán ăn">Quán ăn</option>
                                            <option value="Gameboard">Gameboard</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="Email">Email</label>
                                    <div className="col-md-9">
                                        <input type="Email" name="email" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="website">Website</label>
                                    <div className="col-md-9">
                                        <input type="text" name="website" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-3 control-label" htmlFor="location">Vị trí</label>
                                    <div className="col-md-3">
                                        <button type="button" className="btn btn-info btn-sm" data-toggle="modal" data-target="#myModal">Chọn vị trí</button>
                                    </div>
                                    <div className="col-md-6">{this.state.data.address}</div>
                                </div>
                            </div>
                        </div>

                        <div className="ui-block">
                            <div className={"add-cafe-basic"}>
                                <h3>THÔNG TIN KHÁC</h3>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="owner">Họ tên chủ quán</label>
                                        <div className="col-md-9">
                                            <input type="text" name="owner" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="owner_mobile">SĐT chủ quán</label>
                                        <div className="col-md-9">
                                            <input type="text" name="owner_mobile" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="manager">Quản lý</label>
                                        <div className="col-md-9">
                                            <input type="text" name="manager" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="manager_mobile">SĐT quản lý</label>
                                        <div className="col-md-9">
                                            <input type="text" name="manager_mobile" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="maxprice">Giá max</label>
                                        <div className="col-md-9">
                                            <input type="number" step={0.01} name="max_price" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="minprice">Giá min</label>
                                        <div className="col-md-9">
                                            <input type="number" step={0.01} name="min_price" className="form-control" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="openHour">Mở cửa</label>
                                        <div className="col-md-9">
                                            <input type="time" className="form-control" name="open" onChange={(e) => this.onChangeCafeData(e)} required />
                                        </div>
                                    </div>
                                </div>

                                <div className={"form-horizontal"}>
                                    <div className="row">
                                        <label className="col-md-3 control-label" htmlFor="closeHour">Đóng cửa</label>
                                        <div className="col-md-9">
                                            <input type="time" className="form-control" name="close" onChange={(e) => this.onChangeCafeData(e)} required />
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

                            </div>
                        </div>
                    </form>
                </div>

                <Modal title="Chọn vị trí trên bản đồ">
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