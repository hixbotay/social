import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import { getOtherUserDetail, getFeaturedUserPhotos } from '../../actions/UserActions';
import Post from '../../components/Post';
import { withRouter, Link } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import OtherUserLayout from './OtherUserLayout';
import Modal from 'react-modal';

class OtherPerson extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.id);
        this.props.getFeaturedUserPhotos(this.props.match.params.id);
    }

    render() {
        const { user_data, current_user, featured_photos } = this.props;

        return (
            <OtherUserLayout user={user_data.user} current_user={current_user} relationship={user_data.relationship}>
                <Card>
                    <ProfileHeader user={user_data.user} isCurrentUser={false} images={featured_photos}></ProfileHeader>
                </Card>

                <div className="col-12">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <button className="btn btn-primary btn-function" id="safe-btn">
                                <i className="fas fa-shield-alt"></i> An toàn
                            </button>
                        </div>
                        <div className="col-4">
                            <Link to={{pathname: '/gift/categories', state: {receiver: user_data.user.id}}}>
                                <button className="btn btn-primary btn-function" id="gift-btn" onClick={() => {this.setState({isOpen: true})}}>
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
                </div>

                <Card>
                    {
                        user_data.posts.map((post, index) => {
                            post.author = user_data.user.name;
                            post.author_avatar = user_data.user.avatar;

                            return (
                                <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={false}></Post>
                            )
                        })
                    }
                </Card>
                {/* <Modal isOpen={this.state.isOpen}>
                    <div className="clearfix">
                        <div className="float-left">
                            <h3>Chọn loại quà bạn muốn tặng</h3>
                        </div>
                        <div className="float-right">
                            <a href="javascript:void(0);" onClick={() => {this.setState({isOpen: false})}}>
                                <i className="fas fa-times fa-2x"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col-4 gift-type">
                            <Link to={{pathname: '/gift/categories', state: {receiver: user_data.user.id}}}>
                                <img src="public/images/gift.png" className="gift-type-image"/>
                                <div className="text-center">
                                    <h4>Quà tặng</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 gift-type">
                            <Link to={{pathname: '/food/categories', state: {receiver: user_data.user.id}}}>
                                <img src="public/images/food.png" className="gift-type-image"/>
                                <div className="text-center">
                                    <h4>Đồ ăn</h4>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 gift-type">
                            <Link to={{pathname: '/drink/categories', state: {receiver: user_data.user.id}}}>
                                <img src="public/images/drink.jpg" className="gift-type-image"/>
                                <div className="text-center">
                                    <h4>Đồ uống</h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                </Modal> */}
            </OtherUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user.other_user_data,
        current_user: state.user.current_user,
        featured_photos: state.user.featured_photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (id) => dispatch(getOtherUserDetail(id)),
        getFeaturedUserPhotos: (id) => dispatch(getFeaturedUserPhotos(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OtherPerson));