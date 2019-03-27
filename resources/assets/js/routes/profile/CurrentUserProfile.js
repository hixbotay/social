import React, { Component } from 'react';
import {Card, CardWithIcon, CardWithTitle} from '../../components/Card';
import CurrentUserLayout from './CurrentUserLayout';
import { addVisitor, getFeaturedUserPhotos } from '../../actions/UserActions';
import { getMyPosts } from '../../actions/PostActions';
import { connect } from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import Post from '../../components/Post';
import CreatePostForm from '../../components/Post/CreatePostForm';
import ProfileHeader from './ProfileHeader';
import InfiniteScroll from 'react-infinite-scroller';
import VerificationBlock from "../../components/RightSidebar/VerificationBlock";
import ProfilePhotos from "./ProfilePhotos";
import EdiText from "react-editext";
import Line from "rc-progress/es/Line";
import moment from "moment";
import ToggleDisplay from "react-toggle-display";

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            hasMorePost: false,
            page: 1,
            show:false
        }
    }

    componentDidMount() {
        var {current_user} = this.props;
        // this.props.getMyPosts();
        this.props.getFeaturedUserPhotos(this.props.match.params.id);

        this.props.getMyPosts(1).then(posts => {
            if(posts.length) {
                let temp = posts.map((post, index) => {
                    post.author = current_user.name;
                    post.author_avatar = current_user.avatar;
                    return (
                        <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={true}></Post>
                    )
                });

                this.setState({
                    posts: [...this.state.posts, temp],
                    hasMorePost: true
                })
            } else {
                this.setState({hasMorePost: false})
            }
        });
    }

    onLoad() {
        var {current_user} = this.props;
        let page = this.state.page + 1;

        this.props.getMyPosts(page).then(posts => {
            if(posts.length) {
                let temp = posts.map((post, index) => {
                    post.author = current_user.name;
                    post.author_avatar = current_user.avatar;
                    return (
                        <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={true}></Post>
                    )
                });

                this.setState({
                    posts: [...this.state.posts, temp],
                    hasMore: true,
                    page: page
                })
            } else {
                this.setState({
                    hasMorePost: false
                })
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        var {current_user} = this.props;
        if(nextProps.posts.length != this.props.posts.length && nextProps.posts.length) {
            this.setState({
                posts: [
                    <Post post={nextProps.posts[0]} key={nextProps.posts[0].id} user_id={current_user.id} isInNewsfeed={true}></Post>,
                    ...this.state.posts
                ]
            })
        }
    }

    viewMoreInfo() {
        if (true || this.props.current_user.vip.status) {
            this.setState({ show: !this.state.show });
        } else {
            alert("Chỉ thành viên VIP mới xem được thông tin người khác!");
        }

    }

    render() {

        const { current_user, featured_photos} = this.props;
        var completePercentage = localStorage.getItem("percentage");
        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.hometown_province_name : null}
            >

                <ProfileHeader user={current_user} isCurrentUser={true} images={featured_photos}></ProfileHeader>
                <div className="row">
                    <div className="col col-xl-7 order-xl-1 col-lg-7 order-lg-1 col-md-7 order-md-2 col-sm-12 col-12 order-sm-2">
                        <Card className='mb-3 user-profile-summary'>
                            <div id="user-description" className="mb-2 ">
                                <h4 className='profile-title'>Miêu tả một chút về bạn để xem người ấy hiểu bạn không nhé !!</h4>
                                <div>
                                    {
                                        current_user.description ? (
                                            <React.Fragment>
                                                {
                                                    <EdiText
                                                        type="textarea"
                                                        value={current_user.description}
                                                        editButtonText="Cập nhật"
                                                        editButtonClassName="btn btn-link btn-sm"
                                                        saveButtonText="Lưu"
                                                        cancelButtonText="Hủy"
                                                        saveButtonClassName="btn btn-primary btn-sm"
                                                        cancelButtonClassName="btn btn-secondary btn-sm"
                                                        onSave={(content) => this.props.updateUser({ user: { description: content } }, current_user.id)}
                                                        hideIcons={false}

                                                    />
                                                }
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment>
                                                {
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
                                                            onSave={(content) => this.props.updateUser({ user: { description: content } }, current_user.id)}
                                                            hideIcons={true}

                                                        />
                                                    </div>
                                                }
                                            </React.Fragment>
                                        )
                                    }

                                </div>
                            </div>
                        <h4 className='profile-title'>Thông tin cơ bản</h4>
                        {
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
                        }
                            <div className='col-12 pl-0'>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Ngày sinh</div>
                                    <div className="right">
                                        {moment(current_user.birthday).format("DD/MM/YYYY")}
                                        {/* {current_user.birthday} */}
                                    </div>
                                </div>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Giới tính</div>
                                    <div className="right">
                                        {
                                            current_user.gender ? (
                                                (current_user.gender === 'M') ? "Nam" : "Nữ"
                                            ) : "Chưa xác định"
                                        }
                                    </div>
                                </div>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Tình trạng hôn nhân</div>
                                    <div className="right">
                                        {
                                            current_user.marial_status ? (
                                                current_user.marial_status === 1 ? "Đã kết hôn" : "Đã từng kết hôn trước đó"
                                            ) : "Độc thân"
                                        }
                                    </div>
                                </div>
                                <div className="flex pt-1 pb-1">
                                    <div className="left">Nơi ở hiện tại</div>
                                    <div className="right">{current_user.village_name}, {current_user.district_name}, {current_user.province_name}</div>
                                </div>

                                {
                                    <React.Fragment>
                                        <ToggleDisplay show={this.state.show}>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Chiều cao</div>
                                                <div className="right">{current_user.height} cm</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Cân nặng</div>
                                                <div className="right">{current_user.weight} kg</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Học vấn</div>
                                                <div className="right">{current_user.education_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Nghề nghiệp</div>
                                                <div className="right">{current_user.job_name}</div>
                                            </div>
                                            <div className="flex">
                                                <div className="left">Dân tộc</div>
                                                <div className="right">{current_user.ethnicity_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Tôn giáo</div>
                                                <div className="right">{current_user.religion_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Nơi ở hiện tại</div>
                                                <div className="right">{current_user.village_name}, {current_user.district_name}, {current_user.province_name}</div>
                                            </div>
                                            <div className="flex pt-1 pb-1">
                                                <div className="left">Sở thích</div>
                                                <div className="right">
                                                    {
                                                        current_user.hobbies.map(hobby => {
                                                            return (
                                                                <span key={hobby.id}>{hobby.name}, </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            {
                                                <React.Fragment>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Số điện thoại</div>
                                                        <div className="right">{current_user.mobile}</div>
                                                    </div>
                                                    <div className="flex pt-1 pb-1">
                                                        <div className="left">Email</div>
                                                        <div className="right">{current_user.email}</div>
                                                    </div>
                                                </React.Fragment>
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
                        </Card>
                        <Card>
                            <div className='disable-desktop user-profile-summary'>
                                <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Xác thực</h4>
                                {
                                    <div className='disable-desktop'>
                                        <VerificationBlock user={current_user}/>
                                    </div>
                                }
                            </div>
                        </Card>
                        <Card>
                            <CreatePostForm user={current_user}></CreatePostForm>
                        </Card>

                        <Card>
                            {
                                this.state.posts.length ? (
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={this.onLoad.bind(this)}
                                        hasMore={this.state.hasMorePost}
                                        loader={<div className="text-center" key={0}>Loading...</div>}
                                    >
                                        {this.state.posts}
                                    </InfiniteScroll>
                                ) : (
                                    <div className="alert alert-warning">
                                        <div className="text-center">
                                            Bạn chưa có bài viết nào. Hãy tạo bài viết ngay nhé!
                                        </div>
                                    </div>
                                )
                            }
                        </Card>
                    </div>
                    <div className="col col-xl-5 order-xl-2 col-lg-5 order-lg-2 col-md-5 order-md-1 col-sm-12 col-12 order-sm-1 pr-0">
                        {
                            <div className='disable-mobile user-profile-summary'>
                                <VerificationBlock user={current_user}/>
                            </div>
                        }
                        <div className='events mt-4 mb-3 disable-mobile user-profile-summary'>
                            <img src="http://file.hstatic.net/1000184601/file/457__1_.jpg" className="vip-upgrade"/>
                        </div>
                    </div>
                </div>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user,
        posts: state.post.posts,
        featured_photos: state.user.featured_photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyPosts: (page) => dispatch(getMyPosts(page)),
        addVisitor: (data) => dispatch(addVisitor(data)),
        getFeaturedUserPhotos: (user_id) => dispatch(getFeaturedUserPhotos(user_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));