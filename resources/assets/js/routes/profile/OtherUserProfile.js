import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import { getOtherUserDetail, getFeaturedUserPhotos, getOtherUserPhotos } from '../../actions/UserActions';
import Post from '../../components/Post';
import { withRouter, Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import OtherUserLayout from './OtherUserLayout';
import Modal from 'react-modal';
import Gallery from 'react-grid-gallery';
import EdiText from "react-editext";
import Line from "rc-progress/es/Line";
import moment from "moment";
import ToggleDisplay from "react-toggle-display";
import VerificationBlock from "../../components/RightSidebar/VerificationBlock";

class OtherPerson extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            show:false
        }
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.id);
        this.props.getFeaturedUserPhotos(this.props.match.params.id);
        this.props.getOtherUserPhotos(this.props.match.params.id);
    }

    viewMoreInfo() {
        if (true || this.props.current_user.vip.status) {
            this.setState({ show: !this.state.show });
        } else {
            alert("Chỉ thành viên VIP mới xem được thông tin người khác!");
        }

    }

    render() {
        const { user_data, current_user, featured_photos} = this.props;

        if(user_data.gender === 'M'){
            var textStr = 'Anh ấy tự miêu tả về mình';
        } else{
            var textStr = 'Cô ấy tự miêu tả về mình';
        }

        return (
            <OtherUserLayout user={user_data.user} current_user={current_user} relationship={user_data.relationship}>
                <Card>
                    <ProfileHeader user={user_data.user} current_user={current_user} isCurrentUser={false} images={featured_photos}></ProfileHeader>
                </Card>
                <div className="row profile-timeline">
                    <div className="col col-xl-7 order-xl-1 col-lg-7 order-lg-1 col-md-7 order-md-2 col-sm-12 order-sm-2 col-12">

                        <div className="row no-gutters">
                            <div className="col-4">
                                <button className="btn btn-primary btn-function" id="safe-btn">
                                    <i className="fas fa-shield-alt"></i> An toàn
                                </button>
                            </div>
                            <div className="col-4">
                                <Link to={{pathname: '/gift/categories', state: {receiver: user_data.user.id}}}>
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
                            <Card className='mb-3 user-profile-summary'>
                                <div id="user-description" className="mb-2 ">
                                    <h4 className='profile-title'>{textStr}</h4>
                                    <div>
                                        {
                                            user_data.user.description ? (
                                                <React.Fragment>
                                                    {
                                                        <div>{user_data.user.description}</div>
                                                    }
                                                </React.Fragment>
                                            ) : (
                                                <React.Fragment>
                                                    {
                                                        <div>
                                                            Chưa có mô tả về {user_data.user.name}
                                                        </div>
                                                    }
                                                </React.Fragment>
                                            )
                                        }

                                    </div>
                                </div>
                                <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Thông tin cơ bản</h4>
                                <div className="mb-4">
                                    <div className='col-12 pl-0'>
                                        <div className="flex pt-1 pb-1">
                                            <div className="left">Ngày sinh</div>
                                            <div className="right">
                                                {moment(user_data.user.birthday).format("DD/MM/YYYY")}
                                                {/* {user.birthday} */}
                                            </div>
                                        </div>
                                        <div className="flex pt-1 pb-1">
                                            <div className="left">Giới tính</div>
                                            <div className="right">
                                                {
                                                    user_data.user.gender ? (
                                                        (user_data.user.gender === 'M') ? "Nam" : "Nữ"
                                                    ) : "Chưa xác định"
                                                }
                                            </div>
                                        </div>
                                        <div className="flex pt-1 pb-1">
                                            <div className="left">Tình trạng hôn nhân</div>
                                            <div className="right">
                                                {
                                                    user_data.user.marial_status ? (
                                                        user_data.user.marial_status === 1 ? "Đã kết hôn" : "Đã từng kết hôn trước đó"
                                                    ) : "Độc thân"
                                                }
                                            </div>
                                        </div>
                                        <div className="flex pt-1 pb-1">
                                            <div className="left">Nơi ở hiện tại</div>
                                            <div className="right">{user_data.user.village_name}, {user_data.user.district_name}, {user_data.user.province_name}</div>
                                        </div>

                                        {
                                            <React.Fragment>
                                                <ToggleDisplay show={this.state.show}>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Chiều cao</div>
                                                        <div className="right">{user_data.user.height} cm</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Cân nặng</div>
                                                        <div className="right">{user_data.user.weight} kg</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Học vấn</div>
                                                        <div className="right">{user_data.user.education_name}</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Nghề nghiệp</div>
                                                        <div className="right">{user_data.user.job_name}</div>
                                                    </div>
                                                    <div className="flex">
                                                        <div className="left">Dân tộc</div>
                                                        <div className="right">{user_data.user.ethnicity_name}</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Tôn giáo</div>
                                                        <div className="right">{user_data.user.religion_name}</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Nơi ở hiện tại</div>
                                                        <div className="right">{user_data.user.village_name}, {user_data.user.district_name}, {user_data.user.province_name}</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Sở thích</div>
                                                        <div className="right">
                                                            {
                                                                user_data.user.hobbies.map(hobby => {
                                                                    return (
                                                                        <span key={hobby.id}>{hobby.name}, </span>
                                                                    )
                                                                })
                                                            }
                                                        </div>
                                                    </div>


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

                                <div className='disable-desktop user-profile-summary'>
                                    <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Xác thực</h4>
                                    {
                                        <div className='disable-desktop'>
                                            <VerificationBlock user={user_data.user}/>
                                        </div>
                                    }
                                </div>
                            </Card>
                        <Card>
                            {
                                user_data.posts.length ?
                                    user_data.posts.map((post, index) => {
                                        post.author = user_data.user.name;
                                        post.author_avatar = user_data.user.avatar;

                                        return (
                                            <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={false}></Post>
                                        )
                                    })
                                    : (
                                        <div className="text-center">
                                            Không có bài viết nào
                                        </div>
                                    )
                            }
                        </Card>
                    </div>
                    <div className="col col-xl-5 order-xl-2 col-lg-5 order-lg-2 col-md-5 order-md-1 col-sm-12 order-sm-1 col-12 pr-0">
                        {
                            <div className='disable-mobile user-profile-summary'>
                                <VerificationBlock user={user_data.user}/>
                            </div>
                        }
                        <div className='events mt-4 mb-3 disable-mobile user-profile-summary'>
                            <img src="http://file.hstatic.net/1000184601/file/457__1_.jpg" className="vip-upgrade"/>
                        </div>
                    </div>
                </div>


            </OtherUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user.other_user_data,
        current_user: state.user.current_user,
        featured_photos: state.user.featured_photos,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (id) => dispatch(getOtherUserDetail(id)),
        getFeaturedUserPhotos: (id) => dispatch(getFeaturedUserPhotos(id)),
        getOtherUserPhotos: (id) => dispatch(getOtherUserPhotos(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OtherPerson));