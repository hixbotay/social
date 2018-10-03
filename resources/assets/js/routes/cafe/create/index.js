import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllDistrict, getAllProvince, getAllCommune, createCafe} from "../../../actions/CafeActions";
import Slider from "react-animated-slider";
import CafeRight from "../../../components/RightSidebar/Cafe";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import {load_commune_by_district, load_district_by_province} from "../../../helper/function";
import {createPost, getAllPosts} from "../../../actions/PostActions";

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
                user_id: this.props.user.id
            },
            district: [],
            commune: [],
            canSubmit: true
        };
    }

    componentDidMount() {
        this.props.getAllProvince();
        this.props.getAllDistrict();
        this.props.getAllCommune();
    }

    changeProvince(event){
        var value = event.currentTarget.value;
        this.state.data.province_id = value;
        var district = load_district_by_province(this.props.district, value);
        this.setState({
            data: this.state.data,
            district: district,
        });
    }

    changeDistrict(event){
        var value = event.currentTarget.value;
        this.state.data.district_id = value;
        var commune = load_commune_by_district(this.props.commune, value);
        this.setState({
            data: this.state.data,
            commune: commune,
        });
    }

    changeCommune(event){
        var value = event.currentTarget.value;
        this.state.data.commune_id = value;
        this.setState({
            data: this.state.data,
        });
    }

    createCafe(){
        if (this.state.canSubmit === true){
            this.setState({
                canSubmit: false
            }, () => {
                this.props.createCafe(this.state.data)
                    .then((data) => {
                        console.log(data);
                        if (data.status === 'ok'){
                            alert('OK');
                            window.location.reload();
                        } else {
                            alert(data.message);
                            this.setState({
                                canSubmit: false
                            })
                        }
                    });
            })

        }else{

        }

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
                                        <input type="text" id="name" className="form-control" onChange={(event)=>{
                                            this.state.data.name = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }} />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="province">Tỉnh/TP</label>
                                    <div className="col-md-10">
                                        <select style={{height:40,padding:10}} id={"province"} onChange={
                                            (event) => {
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
                                        <select style={{height:40,padding:10}} id={"district"} value={this.state.data.district_id}
                                            onChange={(event) => {
                                                this.changeDistrict(event);
                                            }}
                                        >
                                            <option>Quận/Huyện</option>
                                            {
                                                this.state.district.map((data, index) => {
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
                                        <select style={{height:40,padding:10}}
                                                value={this.state.data.commune_id}
                                                onChange={(event) => {this.changeCommune(event)}}
                                                id={"commune"}>
                                            <option>Xã/Phường</option>
                                            {
                                                this.state.commune.map((data, index) => {
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
                                        <input type="text" id="hotline" className="form-control" onChange={(event)=>{
                                            this.state.data.hotline = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }} />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="Email">Email</label>
                                    <div className="col-md-10">
                                        <input type="Email" id="Email" className="form-control" onChange={(event)=>{
                                            this.state.data.email = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }}/>
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
                                        <input type="text" id="owner" className="form-control" onChange={(event)=>{
                                            this.state.data.owner = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }}/>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="owner_mobile">SĐT chủ quán</label>
                                    <div className="col-md-10">
                                        <input type="text" id="owner_mobile" className="form-control" onChange={(event)=>{
                                            this.state.data.owner_mobile = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }}/>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="manager">Quản lý</label>
                                    <div className="col-md-10">
                                        <input type="text" id="manager" className="form-control" onChange={(event)=>{
                                            this.state.data.manager = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }}/>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="manager_mobile">SĐT quản lý</label>
                                    <div className="col-md-10">
                                        <input type="text" id="manager_mobile" className="form-control" onChange={(event)=>{
                                            this.state.data.manager_mobile = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }}/>
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="maxprice">Giá max</label>
                                    <div className="col-md-10">
                                        <input type="number" step={0.01} id="maxprice" className="form-control" onChange={(event)=>{
                                            this.state.data.max_price = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }} />
                                    </div>
                                </div>
                            </div>

                            <div className={"form-horizontal"}>
                                <div className="row">
                                    <label className="col-md-2 control-label" htmlFor="minprice">Giá min</label>
                                    <div className="col-md-10">
                                        <input type="number" step={0.01} id="minprice" className="form-control" onChange={(event)=>{
                                            this.state.data.min_price = event.currentTarget.value;
                                            this.setState({data: this.state.data})
                                        }} />
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
                                        <button href="#"
                                                onClick={()=>{
                                                    this.createCafe();
                                                }}
                                                className="btn btn-blue btn-md-2">+ Thêm địa điểm
                                            <div className="ripple-container"></div>
                                        </button>
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
        commune: state.cafe.allCommune,
        user: state.user.current_user
    };
}


function mapDispatchToProps(dispatch) {
    return {
        createCafe: (data) => dispatch(createCafe(data)),
        getAllCommune: () => dispatch(getAllCommune()),
        getAllProvince: () => dispatch(getAllProvince()),
        getAllDistrict: () => dispatch(getAllDistrict()),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CafeView));