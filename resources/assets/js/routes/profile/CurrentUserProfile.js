import React, { Component } from 'react';
import { Card, CardWithIcon } from '../../components/Card';
import CurrentUserLayout from './CurrentUserLayout';
import { addVisitor } from '../../actions/UserActions';
import { getMyPosts } from '../../actions/PostActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Post from '../../components/Post';
import CreatePostForm from '../../components/Post/CreatePostForm';
import ProfileHeader from './ProfileHeader';

class UserProfile extends Component {

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

    render() {

        const { current_user } = this.props;

        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.address : null}
            >
                <ProfileHeader user={current_user} isCurrentUser={true}></ProfileHeader>
                <Card>
                    <CreatePostForm user={current_user} addPost={this.addPost.bind(this)}></CreatePostForm>
                </Card>
                
                <Card>
                    {
                        this.props.posts.map((post, index) => {
                            post.author = current_user.name;
                            post.author_avatar = current_user.avatar;
                            return (
                                <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={false}></Post>
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