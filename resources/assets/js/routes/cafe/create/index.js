import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllDistrict, getAllProvince, getAllCommune} from "../../../actions/CafeActions";
import Slider from "react-animated-slider";
import CafeRight from "../../../components/RightSidebar/Cafe";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class CafeView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {
                name: '',
                province_id: '',
                district_id: '',
                commune_id: '',
                hotline: '',
                email: '',
                website: '',
                lat: '',
                lng: '',
                owner: '',
                owner_mobile: '',
                manager: '',
                manager_mobile: '',
                min_price: '',
                max_price: '',
                open: '',
                close: '',
            }
        };
    }

    componentDidMount() {
        this.props.getAllProvince();
        this.props.getAllDistrict();
        // this.props.getAllCommune();
    }

    changeProvince(event){
        console.log(event)
    }

    render() {

        var hours = [];
        var minutes = [];
        for (let i = 0; i < 24; i ++){
            hours.push(i);
        }

        for (let i = 0; i < 60; i ++){
            minutes.push(i);
        }


        return (
            <div className="row">

                <div className="col-md-8">

                    <div className="ui-block">

                        <div className={"add-cafe-header"} >
                            <h4><i className="fas fa-map-marker-alt"></i> Thêm địa điểm</h4>
                            <h6>Tham gia cùng chúng tôi để tạo những trải nghiệm không gian lãng mạn</h6>
                        </div>

                        <div className={"add-cafe-banner"}>
                            <img src={"https://image.freepik.com/free-vector/different-types-of-coffee-and-phrase-i-need-coffee_1308-18167.jpg"} />
                        </div>

                        <div className={"add-cafe-basic"}>
                            <h3>THÔNG TIN CƠ BẢN</h3>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="name">Tên quán</label>
                                    <div className="col-md-10">
                                        <input type="text" id="name" className="form-control" placeholder="Tên quán" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="province">Tỉnh/TP</label>
                                    <div className="col-md-10">
                                        <select style={{height:40,padding:10}} id={"province"} onChange={
                                            (event) => {
                                                alert(111);
                                                this.changeProvince(event);
                                            }
                                        } value={this.state.data.province_id}>
                                            <option>Tỉnh/TP</option>

                                            {
                                                this.props.province.map((data, index) => {
                                                    return (<option value={data.matp} key={index}>{data.name}</option> );
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="district">Quận/Huyện</label>
                                    <div className="col-md-10">
                                        <select style={{height:40,padding:10}} id={"district"}>
                                            <option>Quận/Huyện</option>

                                            {
                                                this.props.district.map((data, index) => {
                                                    return (<option value={data.maqh} key={index}>{data.name}</option> );
                                                })
                                            }

                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="commune">Xã/Phường</label>
                                    <div className="col-md-10">
                                        <select style={{height:40,padding:10}} id={"commune"}>
                                            <option>Xã/Phường</option>
                                            {
                                                this.props.commune.map((data, index) => {
                                                    return (<option value={data.xaid} key={index}>{data.name}</option> );
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="hotline">Hotline</label>
                                    <div className="col-md-10">
                                        <input type="text" id="hotline" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="Email">Email</label>
                                    <div className="col-md-10">
                                        <input type="Email" id="Email" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="website">Website</label>
                                    <div className="col-md-10">
                                        <input type="text" id="website" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="location">Vị trí</label>
                                    <div className="col-md-10">
                                        <a href="#" className="btn btn-secondary btn-sm">Small Button
                                            <div className="ripple-container"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>


                        </div>

                    </div>


                    <div className="ui-block">
                        <div className={"add-cafe-basic"}>
                            <h3>THÔNG TIN KHÁC</h3>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="owner">Họ tên chủ quán</label>
                                    <div className="col-md-10">
                                        <input type="text" id="owner" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="owner_mobile">SĐT chủ quán</label>
                                    <div className="col-md-10">
                                        <input type="text" id="owner_mobile" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="manager">Quản lý</label>
                                    <div className="col-md-10">
                                        <input type="text" id="manager" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="manager_mobile">SĐT quản lý</label>
                                    <div className="col-md-10">
                                        <input type="text" id="manager_mobile" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="maxprice">Giá max</label>
                                    <div className="col-md-10">
                                        <input type="number" step={0.01} id="maxprice" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="minprice">Giá min</label>
                                    <div className="col-md-10">
                                        <input type="number" step={0.01} id="minprice" className="form-control" />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="openHour">Mở cửa</label>
                                    <div className="col-md-5">
                                        <select style={{height:40,padding:10}} id={"openHour"}>
                                            <option>Giờ</option>
                                            {
                                                hours.map((data, index) => {
                                                    return (<option value={data} key={index}>{data}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-5">
                                        <select style={{height:40,padding:10}}>
                                            <option>Phút</option>
                                            {
                                                minutes.map((data, index) => {
                                                    return (<option value={data} key={index}>{data}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="closeHour">Đóng cửa</label>
                                    <div className="col-md-5">
                                        <select style={{height:40,padding:10}} id={"closeHour"}>
                                            <option>Giờ</option>
                                            {
                                                hours.map((data, index) => {
                                                    return (<option value={data} key={index}>{data}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-md-5">
                                        <select style={{height:40,padding:10}}>
                                            <option>Phút</option>
                                            {
                                                minutes.map((data, index) => {
                                                    return (<option value={data} key={index}>{data}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>


                            <div className={"form-horizontal"}>
                                <div className={"row"}>

                                    <div className={"col-md-6 offset-md-3"}>
                                        <a href="#" className="btn btn-blue btn-md-2">+ Thêm địa điểm
                                            <div className="ripple-container"></div>
                                        </a>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>

                </div>

                <div className="col col-md-4">
                    <CafeRight province={this.props.province} district={this.props.district}/>
                </div>

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        province: state.cafe.allprovince,
        district: state.cafe.alldistrict,
        commune: state.cafe.allCommune
    };
}

export default withRouter(connect(mapStateToProps, {
    getAllProvince, getAllDistrict, getAllCommune
})(CafeView));