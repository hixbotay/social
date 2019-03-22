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
        const { user_data, current_user, featured_photos} = this.props;

        return (
            <OtherUserLayout user={user_data.user} current_user={current_user} relationship={user_data.relationship}>
                <Card>
                    <ProfileHeader user={user_data.user} current_user={current_user} isCurrentUser={false} images={featured_photos}></ProfileHeader>
                </Card>
                <div className="row profile-timeline">
                    <div className="col col-xl-12 order-xl-1 col-lg-12 order-lg-1 col-md-12 order-md-1 col-sm-12 order-sm-2 col-12 pl-0 pr-0">
                        <div className="col col-xl-7 order-xl-1 col-lg-7 order-lg-1 col-md-7 order-md-2 col-sm-12 order-sm-2 col-12">
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