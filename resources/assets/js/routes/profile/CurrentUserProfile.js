import React, { Component } from 'react';
import { Card, CardWithIcon } from '../../components/Card';
import CurrentUserLayout from './CurrentUserLayout';
import { addVisitor, getFeaturedUserPhotos } from '../../actions/UserActions';
import { getMyPosts } from '../../actions/PostActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Post from '../../components/Post';
import CreatePostForm from '../../components/Post/CreatePostForm';
import ProfileHeader from './ProfileHeader';

class UserProfile extends Component {

    componentDidMount() {
        this.props.getMyPosts();
        this.props.getFeaturedUserPhotos(this.props.match.params.id);
    }

    render() {

        const { current_user, featured_photos, posts } = this.props;

        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.address : null}
            >
                <ProfileHeader user={current_user} isCurrentUser={true} images={featured_photos}></ProfileHeader>
                <Card>
                    <CreatePostForm user={current_user}></CreatePostForm>
                </Card>
                
                <Card>
                    {
                        posts.length ?
                        posts.map((post, index) => {
                            post.author = current_user.name;
                            post.author_avatar = current_user.avatar;
                            return (
                                <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={false}></Post>
                            )
                        })
                        : (
                            <div className="alert alert-warning">
                                <div className="text-center">
                                    Bạn chưa có bài viết nào. Hãy tạo bài viết ngay nhé! 
                                </div>
                            </div>
                        )
                    }
                </Card>
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
        getMyPosts: () => dispatch(getMyPosts()),
        addVisitor: (data) => dispatch(addVisitor(data)),
        getFeaturedUserPhotos: (user_id) => dispatch(getFeaturedUserPhotos(user_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));