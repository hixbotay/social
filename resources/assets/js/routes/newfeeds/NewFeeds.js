import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
// component
import CreatePostForm from '../../components/Post/CreatePostForm';
import PostHeader from '../../components/Post/PostHeader';
import CircleButton from '../../components/Button/CircleButton';
// action
import {getAllPosts} from '../../actions/NewFeedsActions';

class NewFeeds extends Component {
    componentDidMount() {
        this.props.getAllPosts();
    }

    render() {      
        return (
            <div className="ui-block">
                <CreatePostForm></CreatePostForm>
                <hr />
                {
                    this.props.posts.map((post, index) => {
                        return (
                            <article className="hentry post" key={index}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="float-left">
                                            <PostHeader
                                                avatar={post.author_avatar}
                                                name={post.author}
                                                heartNumber={100}
                                                viewNumber={200}
                                                likeNumber={300}
                                            />
                                        </div>
                                        <div className="float-right">
                                            <CircleButton icon="fas fa-flag"></CircleButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="post-photo">
                                    {post.photo_id ? <img src={post.source} /> : null}
                                </div>
                                <p>
                                    {post.content}    
                                </p>
                                <div className="row">
                                    <div className="col">
                                        <CircleButton icon="fas fa-heart"></CircleButton>
                                        Yêu thích
                                        </div>
                                    <div className="col">
                                        <CircleButton icon="fas fa-thumbs-up"></CircleButton>
                                        Thích
                                        </div>
                                    <div className="col">
                                        <CircleButton icon="fas fa-comment"></CircleButton>
                                        Bình luận
                                        </div>
                                    <div className="col">
                                        <CircleButton icon="fas fa-times"></CircleButton>
                                        Xóa
                                        </div>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.newfeeds.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewFeeds));