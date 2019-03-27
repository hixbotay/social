import React, { PureComponent } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Line } from 'rc-progress';
import {Card, CardWithTitle} from '../../components/Card';
import { withRouter, Link } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import EdiText from 'react-editext';
import moment from "moment";
import VerificationBlock from "../../components/RightSidebar/VerificationBlock";
import Slider from "react-slick/lib";
import {isMobileOnly} from "react-device-detect";
import Switch from "react-switch";
function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div className='btn-previous' onClick={onClick}>
            <i className="fa fa-chevron-left slick-prev couple-slider-nav"/>
        </div>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div className='btn-next' onClick={onClick}>
            <i className="fa fa-chevron-right slick-next couple-slider-nav"/>
        </div>
    );
}
class ProfileHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false,
            condition:false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        return nextProps.user !== this.props.user;
    }

    viewMoreInfo() {
        if (this.props.isCurrentUser || this.props.current_user.vip.status) {
            this.setState({ show: !this.state.show });
        } else {
            alert("Chỉ thành viên VIP mới xem được thông tin người khác!");
        }

    }

    getInitialState() {
        return {
            condition: false
        }
    }
    handleClick() {
        this.setState({
            condition: !this.state.condition
        });
    }

    render() {
        const { user, isCurrentUser, images, current_user } = this.props;
        var completePercentage = localStorage.getItem("percentage");

        if(isMobileOnly){
            var settings = {
                accessibility: true,
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />
            };
        } else{
            var settings = {
                accessibility: true,
                dots: false,
                infinite: false,
                speed: 500,
                slidesToShow: 5,
                slidesToScroll: 5,
                nextArrow: <NextArrow />,
                prevArrow: <PrevArrow />
            };
        }

        return (
            <div className="row">
                <div className="col col-xl-12 order-xl-1 col-lg-12 order-lg-1 col-md-12 order-md-1 col-sm-12 order-sm-2 col-12 mb-3">
                    <div className="col col-xl-12 order-xl-1 col-lg-12 order-lg-1 col-md-12 order-md-1 col-sm-12 order-sm-2 col-12 pb-3 pl-0 pr-0">
                        <div className="td-block-title-wrap border-bottom">
                            {
                                isCurrentUser?(
                                    <div className="profile-title">
                                        <div className="td-pulldown-size">
                                            <div className='profile-controls'>
                                                <button className="btn btn-upload-photo btn-xs" >
                                                    <div className="user-photo-icon">
                                                        <label>
                                                            <input className="d-none" type="file" name="photos" multiple accept="image/*" onChange={(e) => { this.handleImage(e) }} />
                                                        </label><i className="fas fa-camera-retro fa-2x"></i> <span>Thêm ảnh</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    null
                                )
                            }

                            <div className="td-subcat-filter disable-mobile">
                                <ul className="td-subcat-list">
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh nổi bật</a></li>
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh nhật ký</a></li>
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh chia sẻ</a></li>
                                </ul>
                            </div>
                            <div className="td-subcat-filter disable-desktop">
                                <ul className="td-subcat-list">
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh nổi bật</a></li>
                                </ul>
                            </div>
                            <div className='td-subcat-dropdown disable-desktop'>
                                <div className="td-subcat-more" onClick={() => this.handleClick()}><span className="td-subcat-link">Xem thêm</span><i className="fas fa-angle-down"></i></div>
                                <ul className= { this.state.condition ? "td-subcat-list active" : "td-subcat-list" }>
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh nhật ký</a></li>
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh chia sẻ</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className='profile-images mt-2'>
                            {

                                <Slider {...settings}>
                                    {
                                        images.map((item, index) => {
                                            return (
                                                <div key={index} className="custom-slider-item">
                                                    <img src={item} width='100%' height='auto' />
                                                </div>
                                            )
                                        })
                                    }
                                </Slider>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (data, user_id) => dispatch(updateUser(data, user_id))
    }
}

export default connect(null, mapDispatchToProps)(ProfileHeader);