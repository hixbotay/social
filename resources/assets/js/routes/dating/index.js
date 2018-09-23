import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllDistrict, getAllProvince} from "../../actions/CafeActions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

class Dating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            openLightBox: false,
            images: [
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
            ]
        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="row">

                <div className={'col-md-8'}>
                    <div className={"ui-block"}>
                        <div className={"ui-block-title"}>
                            <h5 className="title">Tìm quán cafe</h5>
                        </div>

                        <div className={"next-dating-box ui-block-content"}>

                            <div className={"next-dating-header"}>

                                <Slider>
                                    {this.state.images.map(
                                        (images, index) => {
                                            return (
                                                <div className={""} key={index}>
                                                    <div className={"row next-dating-header-row1"}>
                                                        <div className={"col-md-2 align-middle"} style={{
                                                            paddingTop: 9,
                                                            paddingLeft: 10,
                                                        }}>
                                                            <img
                                                                src={"https://lorempixel.com/200/300/?48789"}
                                                                style={{
                                                                    width: 60,
                                                                    height: 60,
                                                                    borderRadius: '50%'
                                                                }}
                                                            />
                                                        </div>
                                                        <div className={"col-md-7"} style={{
                                                            paddingTop: 9,
                                                            paddingLeft: 10,
                                                        }}>
                                                            <h4>Chợ coffe</h4>
                                                            <p>123 Nguyễn Trãi, Thanh Xuân</p>
                                                        </div>
                                                        <div className={"col-md-3 align-middle"}>
                                                            <div className={""} style={{
                                                                backgroundColor: 'green',
                                                                borderBottomLeftRadius: 15,
                                                                borderTopLeftRadius: 15
                                                            }}>
                                                                <h3>12h ngày 12/9</h3>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className={"row"}>
                                                        <div className={"col-md-7"}>
                                                            <img
                                                                src={"https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg"}
                                                            />
                                                        </div>
                                                        <div className={"col-md-5"}>
                                                            <p>Linh tinh here</p>
                                                        </div>
                                                    </div>

                                                </div>
                                            )
                                        }
                                    )}
                                </Slider>


                            </div>

                            <div className={"next-dating-body"}>

                            </div>

                        </div>

                    </div>
                </div>
                <div className={'col-md-4'}>
                    <h1>NGUYEN VAN TU</h1>
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

export default withRouter(connect(mapStateToProps, {getAllProvince, getAllDistrict})(Dating));