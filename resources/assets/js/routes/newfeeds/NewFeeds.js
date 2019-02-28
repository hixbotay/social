import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// component
import CreatePostForm from '../../components/Post/CreatePostForm';
import Post from '../../components/Post';
// action
import { getAllPosts } from '../../actions/PostActions';
import InfiniteScroll from 'react-infinite-scroller';

class NewFeeds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            hasMorePost: false,
            page: 1,
        }
    }

    componentDidMount() {
        var {current_user} = this.props;
        this.props.getAllPosts(1).then(posts => {
            if(posts.length) {
                let temp = posts.map((post, index) => {
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

        this.props.getAllPosts(page).then(posts => {
            if(posts.length) {
                let temp = posts.map((post, index) => {
                    return (
                        <Post post={post} key={post.id} user_id={current_user.id} isInNewsfeed={true}></Post>
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
        if(nextProps.posts.length != this.props.posts.length) {
            this.setState({
                posts: [
                    <Post post={nextProps.posts[0]} key={nextProps.posts[0].id} user_id={current_user.id} isInNewsfeed={true}></Post>,
                    ...this.state.posts
                ]
            })
        }
    }

    render() {
        const {current_user, posts} = this.props;
        return (
            <div>
            {
                current_user.id ? (
                    <div id="newfeeds">
                        <div className="ui-block">
                            <CreatePostForm user={current_user} 
                            // addPost={this.addPost.bind(this)}
                            ></CreatePostForm>
                            <div className="col-12">
                                <div className="row vip-recommend">
                                    <div className="col-2">
                                        <img src={`${baseUrl}/public/images/diamond.png`} />
                                    </div>
                                    <div className="col-7">
                                        <div><h5>NÂNG CẤP TÀI KHOẢN VIP?</h5></div>
                                        <div>Nâng cấp ngay và tận hưởng nhiều tính năng tuyệt vời!</div>
                                    </div>
                                    <div className="col-3">
                                        <button className="btn btn-danger">NÂNG CẤP</button>
                                    </div>
                                </div>
                            </div>
                            {/* {
                                posts.map((post, index) => {
                                    return (
                                        <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={true}></Post>
                                    )
                                })
                            } */}
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={this.onLoad.bind(this)}
                                hasMore={this.state.hasMorePost}
                                loader={<div className="text-center" key={0}>Loading...</div>}
                            >
                                {this.state.posts} 
                            </InfiniteScroll>
                        </div>
                    </div>
                ) : (
                    <div>Loading...</div>
                )
            }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.post.posts,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: (page) => dispatch(getAllPosts(page))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFeeds));