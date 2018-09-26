import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import CircleButton from '../../components/Button/CircleButton';
import { RoundAvatar } from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';
import CenterModeSlider from '../../components/Slider/CenterModeSlider';
import {getOtherUserDetail} from '../../actions/UserActions';
import Post from '../../components/Post';
import {withRouter} from 'react-router-dom';

class OtherPerson extends Component {
    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.id);
    }

    render() {
        const { user_data } = this.props;

        return (
            <div className="row">
                <div className="col col-xl-8 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <CardWithIcon leftIcon="fas fa-info-circle">
                        <br/>
                        <p>{user_data.user.favourite}</p>
                        <CenterModeSlider></CenterModeSlider>
                        <div>
                            <i className="fas fa-briefcase"></i>
                            <br />
                            <h5>{user_data.user.job_name}</h5>
                            <p>{user_data.user.address}</p>
                        </div>
                        <div>
                            <i className="fas fa-heart"></i>
                            <br />
                            <h5>Sở thích</h5>
                            {
                                user_data.hobbies.map((item, index) => {
                                    return (
                                        <div key={index}>{item.name}</div>
                                    )
                                })
                            }
                        </div>
                    </CardWithIcon>
                    <div className="align-center">
                        Xem thêm...
                    </div>
                    <div className="row">
                        <button className="btn btn-function"><i></i> An toàn</button>
                        <button className="btn btn-function"><i></i> Tặng quà</button>
                        <button className="btn btn-function"><i></i> Bói yêu</button>
                    </div>

                    <Card>
                        {
                            user_data.posts.map((post, index) => {
                                post.author = user_data.user.name;
                                post.author_avatar = user_data.user.avatar;
                                return (
                                    <Post post={post} key={index} user_id={user_data.user.id}></Post>
                                )
                            })
                        }
                    </Card>
                </div>
                <div className="col col-xl-4 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <Card>
                        <div className="row">
                            <div className="col-4">
                                <CircleButton
                                    icon="fas fa-heart"
                                    name='love'
                                    // color={this.state.isLoved ? '#e74c3c' : '#34495e'}
                                // action={() => this.changeReaction('love', post.id)}
                                ></CircleButton>
                            </div>
                            <div className="col-4">
                                <CircleButton
                                    icon="fas fa-thumbs-up"
                                    name='like'
                                    // color={this.state.isLiked ? '#2980b9' : '#34495e'}
                                // action={() => this.changeReaction('like', post.id)}
                                ></CircleButton>
                            </div>
                            <div className="col-4">
                                <CircleButton icon="fas fa-times"></CircleButton>
                            </div>
                        </div>
                    </Card>
                    <Card>
                        <div className="row">
                            <div className="col-9">
                                <input className="form-control" />
                            </div>
                            <div className="col-3">
                                <CircleButton icon="fab fa-telegram-plane"></CircleButton>
                            </div>
                        </div>
                        <div>Bắt đầu chat với {user_data.user.name} ngay!</div>
                    </Card>
                    <CardWithTitle 
                        title={"Đề xuất thành viên có thể hợp với bạn"}
                        hasLine={true}    
                    >
                        {/* {
                            proposals.map((item, index) => {
                                return (
                                    <div>
                                        <RoundAvatar img={item.avatar} size="small"></RoundAvatar>
                                        <Heading heading={item.name}></Heading>
                                        <InformationNumber ></InformationNumber>
                                        <hr/>
                                    </div>
                                )
                            })
                        } */}
                        <ul className="list-group">
                            <li className="list-group-item">aaaaaaaaaaa</li>
                            <li className="list-group-item">bbbbbbbbbbbbb</li>
                            <li className="list-group-item">ccccccccc</li>
                        </ul>
                    </CardWithTitle>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user.other_user_data
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (id) => dispatch(getOtherUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OtherPerson));