import React, { Component } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import CafeRight from '../../components/RightSidebar/Cafe';
import {getAllProvince, getAllDistrict, listCafe} from "../../actions/CafeActions";
import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";

class Cafe extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cafeList: []
        }
    }

    componentDidMount(){
        this.props.getAllProvince();
        this.props.getAllDistrict();
        this.props.listCafe()
            .then(data => {
                var push = [];
                for (let i = 0; i < data.length; i ++){
                    push.push(data['i']);
                }
                this.setState({
                    cafeList: push,
                });
            })
    }

    render() {

        var posts = [1];

        var cafeList = this.state.cafeList;

        return (

            <div className="row">

                <div className="col-md-8">

                    <div className="ui-block">

                        {
                            posts.map(post => {

                                return (

                                    <article className="" key={post}>
                                        <div className="row">
                                            <div className="col-12">

                                            </div>
                                        </div>


                                        <div className="row" style={{
                                            margin:5,
                                        }}>

                                            {this.state.cafeList.map((data, index) => {
                                                return (
                                                    <div className="col col-xl-4 col-lg-3 col-md-6 col-sm-6 col-6 box-cafe-item" key={index} style={{marginBottom:20}}>

                                                        <div className="landing-item">

                                                            <div className="landing-item-thumb">

                                                                <img
                                                                    style={{height: 200}}
                                                                    src={'http://www.royalhotelchilliwack.com/Content/images/Hotel-Cafe-o.jpg'} alt="page" />

                                                                <div className="btn-sm">
                                                                    <a target="_blank" href="#"
                                                                       className="btnhenho box-cafe-item-btn">Đặt chỗ</a>
                                                                    <a target={"_blank"} href={"#"} className={"btnbook box-cafe-item-btn"} >Hẹn hò</a>
                                                                </div>

                                                            </div>

                                                            <div className="video-content">
                                                                <a href="#" className="h6 title">YyxXx</a>
                                                                <p>YYY</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                );
                                            })}


                                            <div className="col col-xl-12 align-center">
                                                <a target="_blank"
                                                   href="#"
                                                   className="">Xem Thêm</a>
                                            </div>

                                        </div>


                                    </article>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col col-md-4">
                    <CafeRight province={this.props.province} district={this.props.district} />
                </div>

            </div>
        );
    }
}


function mapStateToProps(state) {
    return {
        province: state.cafe.allprovince,
        district: state.cafe.alldistrict
    };
}

export default withRouter(connect(mapStateToProps, {getAllProvince, getAllDistrict, listCafe})(Cafe));