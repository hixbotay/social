import React, { Component } from 'react';
import { Card, CardWithIcon } from '../../components/Card';
import CurrentUserLayout from './CurrentUserLayout';
import { addVisitor } from '../../actions/UserActions';
import { getMyPosts } from '../../actions/PostActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import Post from '../../components/Post';
import CreatePostForm from '../../components/Post/CreatePostForm';
import ToggleDisplay from 'react-toggle-display';
import { Line } from 'rc-progress';

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_1: false,
            show_2: false,
            show_3: false,
            show_4: false,
            show_5: false,
            show_6: false
        }
    }

    componentDidMount() {
        this.props.getMyPosts();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            posts: nextProps.posts
        });
    }

    addPost(post) {
        this.state.posts.unshift(post);
        this.setState({
            posts: this.state.posts
        })
    }

    show(orderNumber) {
        switch(orderNumber) {
            case 1: {
                this.setState(prevState => ({show_1: !prevState.show_1}));
                break;
            }
            case 2: {
                this.setState(prevState => ({show_2: !prevState.show_2}));
                break;
            }
            case 3: {
                this.setState(prevState => ({show_3: !prevState.show_3}));
                break;
            }
            case 4: {
                this.setState(prevState => ({show_4: !prevState.show_4}));
                break;
            }
            case 5: {
                this.setState(prevState => ({show_5: !prevState.show_5}));
                break;
            }
            case 6: {
                this.setState(prevState => ({show_6: !prevState.show_6}));
                break;
            }
        }
        
    }

    render() {
        var images = [
            'https://picsum.photos/400/300?image=0',
            'https://picsum.photos/400/300?image=1',
            'https://picsum.photos/400/300?image=2',
            'https://picsum.photos/400/300?image=3',
            'https://picsum.photos/400/300?image=4'
        ];

        const { current_user } = this.props;
        var ideal_person = current_user.ideal_person ? JSON.parse(current_user.ideal_person) : {};
        var curent_year = new Date().getFullYear();
        var completePercentage = localStorage.getItem("percentage");

        var {show_1, show_2, show_3, show_4, show_5, show_6} = this.state;

        // if (user.id && user.id !== current_user.id){
        //     this.props.addVisitor({
        //         'profile_id': user.id,
        //         'visitor_id': current_user.id
        //     })
        // }

        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.address : null}
            >
                <Card>
                    <SimpleSlider images={images} slidesToShow={3}></SimpleSlider>
                    <div className="mb-4">
                        <div className="row">
                            <div className="col-8">
                                <div><b>Hồ sơ đã hoàn thiện: <span>{Math.round(completePercentage)}%</span></b></div>
                                <Line percent={completePercentage} strokeWidth="4" strokeColor="#2ecc71" trailWidth="4" trailColor="#bdc3c7"/>
                            </div>
                            <div className="col-4">
                                <button className="btn btn-primary" id="regulations-btn">
                                    <i className="fas fa-fire"></i> Quy định hồ sơ
                                </button>
                            </div>
                        </div>
                        
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <h5 className="page-header left">Thông tin ban đầu</h5>
                            <button className="right btn-show" onClick={() => this.show(1)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <hr className="profile-horizontal"/>
                        <ToggleDisplay show={show_1}>
                            <div className="flex">
                                <div className="left">Ngày sinh</div>
                                <div className="right">{current_user.birthday}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Giới tính</div>
                                <div className="right">
                                {
                                    current_user.gender ? (
                                        (current_user.gender === 'M') ? "Nam" : "Nữ" 
                                    ) : "Chưa xác định"
                                }
                                </div>
                            </div>
                            <div className="flex">
                                <div className="left">Tình trạng hôn nhân</div>
                                <div className="right">
                                {
                                    (current_user.marial_status != null) ? ( 
                                        (current_user.marial_status === 0) ? 'Độc thân' : "Đã kết hôn"
                                    ) : "Chưa xác định"
                                }</div>
                            </div>
                            <div className="flex">
                                <div className="left">Nơi sống</div>
                                <div className="right">{current_user.address}</div>
                            </div>
                        </ToggleDisplay>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <h5 className="page-header left">Mẫu người bạn tìm</h5>
                            <button className="right btn-show" onClick={() => this.show(2)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <hr className="profile-horizontal"/>
                        <ToggleDisplay   show={show_2}>
                            <div className="flex">
                                <div className="left">Độ tuổi</div>
                                <div className="right">
                                    {
                                        ideal_person.yearOfBirth ? (
                                            (curent_year - ideal_person.yearOfBirth.max) + "-" + (curent_year - ideal_person.yearOfBirth.min)
                                        ) : "Chưa xác định"
                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <div className="left">Giới tính</div>
                                <div className="right">
                                {
                                    ideal_person.gender ? (
                                        (ideal_person.gender === 'M') ? "Nam" : "Nữ"
                                    ) : "Chưa xác định"
                                }
                                    
                                </div>
                            </div>
                            <div className="flex">
                                <div className="left">Tình trạng hôn nhân</div>
                                <div className="right">
                                    {
                                        ideal_person.marial_status ? (
                                            (ideal_person.marial_status === 0) ? 'Độc thân' : "Đã kết hôn"
                                        ) : "Chưa xác định"
                                    }
                                </div>
                            </div>
                            <div className="flex">
                                <div className="left">Nghề nghiệp</div>
                                <div className="right">
                                {
                                    ideal_person.jobs ? (
                                        ideal_person.jobs.map((item, index) => {
                                            return (
                                                <span key={index} className="mr-1">{item},</span>
                                            )
                                        })
                                    ) : "Chưa xác định"
                                }
                                </div>
                            </div>
                            <div className="flex">
                                <div className="left">Dân tộc</div>
                                <div className="right">{ideal_person.ethnicity ? ideal_person.ethnicity : "Chưa xác định"}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Tôn giáo</div>
                                <div className="right">{ideal_person.religion ? ideal_person.religion : "Chưa xác định"}</div>
                            </div>
                        </ToggleDisplay>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <h5 className="page-header left">Thông tin cơ bản</h5>
                            <button className="right btn-show" onClick={() => this.show(3)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <hr className="profile-horizontal"/>
                        <ToggleDisplay   show={show_3}>
                            <div className="flex">
                                <div className="left">Học vấn</div>
                                <div className="right">{current_user.education_name}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Nghề nghiệp</div>
                                <div className="right">{current_user.job_name}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Quê quán</div>
                                <div className="right">{current_user.village_name + ", " + current_user.district_name + ", " + current_user.province_name}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Dân tộc</div>
                                <div className="right">{current_user.ethnicity}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Tôn giáo</div>
                                <div className="right">{current_user.religion}</div>
                            </div>
                        </ToggleDisplay>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <h5 className="page-header left">Ngoại hình</h5>
                            <button className="right btn-show" onClick={() => this.show(4)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <hr className="profile-horizontal"/>
                        <ToggleDisplay   show={show_4}>
                            <div className="flex">
                                <div className="left">Chiều cao</div>
                                <div className="right">{current_user.height}</div>
                            </div>
                            <div className="flex">
                                <div className="left">Cân nặng</div>
                                <div className="right">{current_user.weight}</div>
                            </div>
                        </ToggleDisplay>
                    </div>
                    <div className="mb-4">
                        <div className="flex">
                            <h5 className="page-header left">Sở thích</h5>
                            <button className="right btn-show" onClick={() => this.show(5)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <hr className="profile-horizontal"/>
                        <ToggleDisplay   show={show_5}>
                            <div>
                            {
                                current_user.hobbies.map(item => {
                                    return (
                                        <span className="tag" key={item.id}>{item.name}</span>
                                    )
                                })
                            }
                            </div>
                        </ToggleDisplay>
                    </div>
                    <div>
                        <div className="flex">
                            <h5 className="page-header left">Phong cách sống</h5>
                            <button className="right btn-show" onClick={() => this.show(6)}>
                                <i className="fas fa-plus"></i>
                            </button>
                        </div>
                        <hr className="profile-horizontal"/>
                        <ToggleDisplay   show={show_6}>
                            <div>{current_user.lifestyle}</div>
                        </ToggleDisplay>
                    </div>

                </Card>
                <Card>
                    <CreatePostForm user={current_user} addPost={this.addPost.bind(this)}></CreatePostForm>
                </Card>
                
                <Card>
                    {
                        this.props.posts.map((post, index) => {
                            post.author = current_user.name;
                            post.author_avatar = current_user.avatar;
                            return (
                                <Post post={post} key={index} user_id={current_user.id}></Post>
                            )
                        })
                    }
                </Card>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user,
        posts: state.post.myPosts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyPosts: () => dispatch(getMyPosts()),
        addVisitor: (data) => dispatch(addVisitor(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));