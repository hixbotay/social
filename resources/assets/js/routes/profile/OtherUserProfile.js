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
        this.props.getOtherUserPhotos(this.props.match.params.id);
    }

    render() {
        const { user_data, current_user, featured_photos, other_user_photos} = this.props;

        const images = other_user_photos.map(photo => {
            return {
                src: photo.source,
                thumbnail: photo.source,
                thumbnailWidth: 250,
                thumbnailHeight: 250,
            }
        })

        return (
            <OtherUserLayout user={user_data.user} current_user={current_user} relationship={user_data.relationship}>
                <Card>
                    <ProfileHeader user={user_data.user} current_user={current_user} isCurrentUser={false} images={featured_photos}></ProfileHeader>
                    <div className="text-center">
                        <button className="btn btn-primary" onClick={() => {this.setState({isOpen: true})}}>
                            Xem thêm ảnh về {user_data.user.name} <i className="fas fa-images"></i>
                        </button>
                    </div>
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
                </div>

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
                <Modal isOpen={this.state.isOpen}>
                    <div className="clearfix mb-4" onClick={() => {this.setState({isOpen: false})}}>
                        <i className="fas fa-times fa-2x float-right"></i>
                    </div>
                    <div className="clearfix">
                        <Gallery images={images} />
                    </div>
                    
                </Modal>
            </OtherUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user.other_user_data,
        current_user: state.user.current_user,
        featured_photos: state.user.featured_photos,
        other_user_photos: state.user.other_user_photos
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