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
        if(isCurrentUser){
            var textStr = 'Bạn là người như thế nào?'
        } else{
            if(user.gender === 'M'){
                var textStr = 'Anh ấy là người như thế nào?';
            } else{
                var textStr = 'Cô ấy là người như thế nào?';
            }
        }
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
                    <div className="col col-xl-12 order-xl-1 col-lg-12 order-lg-1 col-md-12 order-md-1 col-sm-12 order-sm-2 col-12 pb-3 border-bottom pl-0 pr-0">
                        <div className="td-block-title-wrap">
                            <h4 className="profile-title"><a className="td-pulldown-size"><i className="fas fa-star-of-life color-red mr-1"></i>Ảnh</a></h4>
                            <div className="td-subcat-filter disable-mobile">
                                <ul className="td-subcat-list">
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh nổi bật</a></li>
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh timeline</a></li>
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
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh timeline</a></li>
                                    <li className="td-subcat-item"><a className="td-subcat-link" href="#">Ảnh chia sẻ</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className='profile-controls'>
                            <button className="btn btn-upload-photo btn-xs" >
                                <div className="user-photo-icon">
                                    <label>
                                        <input className="d-none" type="file" name="photos" multiple accept="image/*" onChange={(e) => { this.handleImage(e) }} />
                                    </label><i className="fas fa-camera-retro fa-2x"></i> <span>Thêm ảnh</span>
                                </div>
                            </button>
                        </div>
                        <div className='profile-images'>
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

                <div className="col col-xl-7 order-xl-1 col-lg-7 order-lg-1 col-md-7 order-md-2 col-sm-12 order-sm-2 col-12">
                    {
                        isCurrentUser?(
                             null
                        ) : (
                            <div className="row no-gutters">
                                <div className="col-4">
                                    <button className="btn btn-primary btn-function" id="safe-btn">
                                        <i className="fas fa-shield-alt"></i> An toàn
                                    </button>
                                </div>
                                <div className="col-4">
                                    <Link to={{pathname: '/gift/categories', state: {receiver: user.id}}}>
                                        <button className="btn btn-primary btn-function" id="gift-btn">
                                            <i className="fas fa-gift"></i> Tặng quà
                                        </button>
                                    </Link>
                                </div>
                                <div className="col-4">
                                    <button className="btn btn-primary btn-function" id="fortune-btn">
                                        <i className="fas fa-hand-holding-heart"></i> Bói yêu
                                    </button>
                                </div>
                            </div>
                        )
                    }
                <Card className='mb-0'>
                    <div id="user-description" className="mb-2  border-bottom">
                        <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>{textStr}</h4>
                        <div>
                            {
                                user.description ? (
                                    <React.Fragment>
                                        {
                                            isCurrentUser ? (
                                                <EdiText
                                                    type="textarea"
                                                    value={user.description}
                                                    editButtonText="Cập nhật"
                                                    editButtonClassName="btn btn-link btn-sm"
                                                    saveButtonText="Lưu"
                                                    cancelButtonText="Hủy"
                                                    saveButtonClassName="btn btn-primary btn-sm"
                                                    cancelButtonClassName="btn btn-secondary btn-sm"
                                                    onSave={(content) => this.props.updateUser({ user: { description: content } }, user.id)}
                                                    hideIcons={false}

                                                />
                                            ) : (
                                                <div>{user.description}</div>
                                            )
                                        }
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        {
                                            isCurrentUser ? (
                                                <div>
                                                    <EdiText
                                                        type="textarea"
                                                        value="Bạn là người như thế nào, hãy chia sẻ một chút để người ấy hiểu bạn hơn nhé!!!"
                                                        editButtonText="Cập nhật"
                                                        editButtonClassName="btn btn-link btn-sm"
                                                        saveButtonContent="Lưu"
                                                        cancelButtonContent="Hủy"
                                                        saveButtonClassName="btn btn-primary btn-sm"
                                                        cancelButtonClassName="btn btn-secondary btn-sm"
                                                        onSave={(content) => this.props.updateUser({ user: { description: content } }, user.id)}
                                                        hideIcons={true}

                                                    />
                                                </div>
                                            ) : (
                                                <div>
                                                    Chưa có mô tả về {user.name}
                                                </div>
                                            )
                                        }
                                    </React.Fragment>
                                )
                            }

                        </div>
                    </div>
                    <div className='border-bottom'>
                        <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Thông tin cơ bản</h4>
                        {
                            isCurrentUser ? (
                                <div className="mb-4">
                                    <div className="row">
                                        <div className="col-8">
                                            <div>Hồ sơ đã hoàn thiện: <span>{Math.round(completePercentage)}%</span></div>
                                            <Line percent={completePercentage} strokeWidth="4" strokeColor="#2ecc71" trailWidth="4" trailColor="#bdc3c7" />
                                        </div>
                                        <div className="col-4">
                                            <Link to="/profile/edit">
                                                <button className="btn btn-link btn-sm" id="regulations-btn">
                                                    <i className="fas fa-fire"></i> Cập nhật hồ sơ
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="mb-4">
                            <div className='col-12 pl-0'>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Ngày sinh</div>
                                    <div className="right">
                                        {moment(user.birthday).format("DD/MM/YYYY")}
                                        {/* {user.birthday} */}
                                    </div>
                                </div>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Giới tính</div>
                                    <div className="right">
                                        {
                                            user.gender ? (
                                                (user.gender === 'M') ? "Nam" : "Nữ"
                                            ) : "Chưa xác định"
                                        }
                                    </div>
                                </div>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Tình trạng hôn nhân</div>
                                    <div className="right">
                                        {
                                            user.marial_status ? (
                                                user.marial_status === 1 ? "Đã kết hôn" : "Đã từng kết hôn trước đó"
                                            ) : "Độc thân"
                                        }
                                    </div>
                                </div>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Nơi ở hiện tại</div>
                                    <div className="right">{user.village_name}, {user.district_name}, {user.province_name}</div>
                                </div>

                                {
                                    <React.Fragment>
                                        <ToggleDisplay show={this.state.show}>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Chiều cao</div>
                                                <div className="right">{user.height} cm</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Cân nặng</div>
                                                <div className="right">{user.weight} kg</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Học vấn</div>
                                                <div className="right">{user.education_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Nghề nghiệp</div>
                                                <div className="right">{user.job_name}</div>
                                            </div>
                                            <div className="flex">
                                                <div className="left">Dân tộc</div>
                                                <div className="right">{user.ethnicity_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Tôn giáo</div>
                                                <div className="right">{user.religion_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Nơi ở hiện tại</div>
                                                <div className="right">{user.village_name}, {user.district_name}, {user.province_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Sở thích</div>
                                                <div className="right">
                                                    {
                                                        user.hobbies.map(hobby => {
                                                            return (
                                                                <span key={hobby.id}>{hobby.name}, </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {
                                                isCurrentUser ? (
                                                    <React.Fragment>
                                                        <div className="flex pt-1 pb-1">
                                                            <div className="left">Số điện thoại</div>
                                                            <div className="right">{user.mobile}</div>
                                                        </div>
                                                        <div className="flex pt-1 pb-1">
                                                            <div className="left">Email</div>
                                                            <div className="right">{user.email}</div>
                                                        </div>
                                                    </React.Fragment>
                                                ) : null
                                            }

                                        </ToggleDisplay>
                                        <div className="text-center" onClick={() => this.viewMoreInfo()}>
                                            {
                                                this.state.show ? (
                                                    <u>Ẩn bớt</u>
                                                ) : (
                                                    <u>Xem thêm </u>
                                                )
                                            }
                                        </div>
                                    </React.Fragment>
                                }

                            </div>
                        </div>
                    </div>

                    <div className='disable-desktop border-bottom'>
                        <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Xác thực</h4>
                        {
                            <div className='disable-desktop'>
                                <VerificationBlock user={user}/>
                            </div>
                        }
                        {
                            isCurrentUser ? (
                                <div className='disable-desktop'>
                                    <CardWithTitle title="" className='pl-0' hasLine={false}>
                                        <div className="row">
                                            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0">
                                                <p>Xác thực CMT để dễ dàng tham gia các cuộc hẹn tốc độ</p>
                                                {
                                                    user.is_id_card_verified === 'verified' ? (
                                                        <div className="alert alert-success">
                                                            Bạn đã được phê duyệt Chứng minh thư
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <div className="alert alert-danger">
                                                                Bạn chưa xác thực Chứng minh thư. Hãy xác minh ngay!

                                                                <div className="text-center">
                                                                    <Link to="/verify/id-card">
                                                                        <button className="btn-add-image" id="upload-id-card">
                                                                            <i className="fas fa-camera"></i> Upload
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </CardWithTitle>
                                </div>
                            ) : (
                                null
                            )
                        }
                    </div>
                </Card>
                </div>
                <div className="col col-xl-5 order-xl-2 col-lg-5 order-lg-2 col-md-5 order-md-1 col-sm-12 order-sm-1 col-12 pr-0">
                    {
                        <div className='disable-mobile'>
                            <VerificationBlock user={user}/>
                        </div>
                    }
                    {
                        isCurrentUser ? (
                            <div className='disable-mobile'>
                                <CardWithTitle title="" className='pl-0' hasLine={false}>
                                    <div className="row">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0">
                                            <p>Xác thực CMT để dễ dàng tham gia các cuộc hẹn tốc độ</p>
                                            {
                                                user.is_id_card_verified === 'verified' ? (
                                                    <div className="alert alert-success">
                                                        Bạn đã được phê duyệt Chứng minh thư
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <div className="alert alert-danger">
                                                            Bạn chưa xác thực Chứng minh thư. Hãy xác minh ngay!

                                                            <div className="text-center">
                                                                <Link to="/verify/id-card">
                                                                    <button className="btn-add-image" id="upload-id-card">
                                                                        <i className="fas fa-camera"></i> Upload
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </CardWithTitle>
                            </div>
                        ) : (
                            null
                        )
                    }
                    <div className='events mt-4 mb-3 disable-mobile'>
                        <img src="http://file.hstatic.net/1000184601/file/457__1_.jpg" className="vip-upgrade"/>
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