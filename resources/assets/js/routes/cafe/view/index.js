import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllDistrict, getAllProvince} from "../../../actions/CafeActions";
import Slider from "react-animated-slider";
import CafeRight from "../../../components/RightSidebar/Cafe";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class CafeView extends Component {

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
        this.props.getAllProvince();
        this.props.getAllDistrict();
    }

    render() {
        var content = [1, 2, 3, 4];
        var posts = [1];
        var image = [12, 13, 14, 5, 8, 9];

        const { photoIndex, openLightBox, images } = this.state;

        return (
            <div className="row">

                <div className="col-md-8">

                    <div className="ui-block">

                        <Slider>
                            {content.map((article, index) =>
                                <div key={index}
                                     style={{background: `url('https://i.imgur.com/DvmN8Hx.jpg') no-repeat center center`}}
                                >
                                    <div className="center">
                                        {/*<h1>title o day</h1>*/}
                                        {/*<p>MIeu ta</p>*/}
                                        {/*<button>Nut</button>*/}
                                    </div>
                                </div>
                            )}
                        </Slider>

                        <div style={{
                            padding: 20
                        }}>
                            <div className="row">
                                <div className={"col-md-12"}>
                                    <h3>Cafe X - Nguyễn Trãi</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className={"col-md-6"}>
                                    <div>
                                        <i className="fas fa-map-marker-alt"></i>
                                        334 Nguyễn trãi - Thanh Xuân - Hà Nội
                                    </div>
                                    <div>
                                        <i className="fas fa-clock"></i>
                                        Đang mở cửa
                                    </div>
                                    <div>
                                        <i className="fas fa-bookmark"></i>
                                        30.000 đ - 500.000 đ
                                    </div>

                                </div>

                                <div className={"col-md-6"}>
                                    <button type="submit" className="btn btn-primary waves-effect waves-light">
                                        Hẹn hò
                                    </button>
                                    <button type="reset" className="btn btn-default waves-effect m-l-5">
                                        Đặt chỗ
                                    </button>
                                </div>

                            </div>
                        </div>


                        <hr/>

                        {
                            posts.map(post => {

                                return (

                                    <article className="" key={post}>
                                        <div className="row">
                                            <div className="col-12">
                                                <p onClick={() => {
                                                    console.log(this.props.province)
                                                }}>hihihihihi</p>
                                            </div>
                                        </div>

                                    </article>
                                )
                            })
                        }
                    </div>

                    <div className="ui-block cafe-box">

                        <div className="ui-block-title">
                            <h6 className="title">Hình ảnh</h6>
                        </div>

                        <div className="row cafe-box-content">

                            {
                                image.map((data, index) => {
                                    return (
                                        <div className="col-md-3" key={index} style={{padding: 3}}>
                                            <a href="javascript:void(0)">
                                                <img
                                                    onClick={() => {
                                                        this.setState({
                                                            openLightBox: true,
                                                            photoIndex: index,
                                                        }, ()=>{
                                                        });
                                                    }}
                                                    src={'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg'}
                                                />
                                            </a>
                                        </div>
                                    );
                                })
                            }


                        </div>

                        <div className="row" style={{
                            margin: 5,
                        }}>


                            <div className="col col-xl-12 align-center">
                                <a target="_blank"
                                   href="#"
                                   className="">Xem Thêm</a>
                            </div>

                        </div>

                    </div>

                    {this.state.openLightBox && (
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            nextSrc={images[(photoIndex + 1) % images.length]}
                            prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            onCloseRequest={() => this.setState({ openLightBox: false })}
                            onMovePrevRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + images.length - 1) % images.length,
                                })
                            }
                            onMoveNextRequest={() =>
                                this.setState({
                                    photoIndex: (photoIndex + 1) % images.length,
                                })
                            }
                        />
                    )}

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
        district: state.cafe.alldistrict
    };
}

export default withRouter(connect(mapStateToProps, {getAllProvince, getAllDistrict})(CafeView));