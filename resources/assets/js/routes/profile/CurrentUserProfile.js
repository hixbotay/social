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
import InfiniteScroll from 'react-infinite-scroller';

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            hasMorePost: false,
            page: 1,
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

    render() {

        const { current_user, featured_photos} = this.props;

        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.hometown_province_name : null}
            >
                <ProfileHeader user={current_user} isCurrentUser={true} images={featured_photos}></ProfileHeader>
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