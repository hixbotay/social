import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostHeader from '../../components/Post/PostHeader';
import CircleButton from '../../components/Button/CircleButton';

import {reactPost, unreactPost, share} from '../../actions/PostActions';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            like: props.post.like ? JSON.parse(props.post.like).length : 0,
            dislike: props.post.dislike  ? JSON.parse(props.post.dislike).length : 0,
            love: props.post.love ? JSON.parse(props.post.love).length : 0,
            view: props.post.view ? JSON.parse(props.post.view).length : 0,
            isLoved: (props.post.love === null || props.post.love.indexOf(props.user_id) < 0) ? false : true,
            isLiked: (props.post.like === null || props.post.like.indexOf(props.user_id) < 0) ? false : true,
            isDisliked: (props.post.dislike === null || props.post.dislike.indexOf(props.user_id) < 0) ? false : true,
        }
    }

    changeReaction(actionType, post_id) {
        if (actionType === 'love') {
            if(this.state.isLoved) {
                this.props.unreactPost({type: actionType}, post_id);
                this.setState(prevState => ({ love: prevState.love - 1, isLoved: false}));
            } else {
                this.props.reactPost({type: actionType}, post_id);
                this.setState(prevState => ({ love: prevState.love + 1, isLoved: true}));
            }
        }
        else if (actionType === 'like') {
            if(this.state.isLiked) {
                this.props.unreactPost({type: actionType}, post_id);
                this.setState(prevState => ({ like: prevState.like - 1, isLiked: false}));
            } else {
                this.props.reactPost({type: actionType}, post_id);
                this.setState(prevState => ({ like: prevState.like + 1, isLiked: true}));
            }
        } else if(actionType === 'dislike') {
            if(this.state.isDisliked) {
                this.props.unreactPost({type: actionType}, post_id);
                this.setState(prevState => ({ dislike: prevState.dislike - 1, isDisliked: false}));
            } else {
                this.props.reactPost({type: actionType}, post_id);
                this.setState(prevState => ({ dislike: prevState.dislike + 1, isDisliked: true}));
            }
        }
    }

    render() {
        const {post, user_id, isInNewsfeed} = this.props;

        const style = {
            image: {
              border: '1px solid #ccc',
              background: '#fefefe',
            },
        };
        
        return (
            <article className="hentry post">
                <div className="row">
                    <div className="col-12">
                        <div className="float-left">
                        {/* {
                            (post.user_id !== user_id || isInNewsfeed) ? (
                                <PostHeader
                                    user_id={post.user_id}
                                    avatar={post.author_avatar}
                                    name={post.author}
                                    created={post.created_at}
                                />
                            ) : (
                                <div><i className="far fa-clock"></i> {post.created_at}</div>
                            )
                        } */}
                            <PostHeader
                                user_id={post.user_id}
                                avatar={post.author_avatar}
                                name={post.author}
                                created={post.created_at}
                            />
                        </div>
                        <div className="float-right">
                            <i className="fas fa-flag flag-btn"></i>
                        </div>
                    </div>
                </div>
                <p>
                    {post.content}
                </p>
                <div className="post-photo">
                    {post.photo_id ? <img src={post.source}/> : null}
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="float-left">
                            <span className={`btn-post mr-2 ${this.state.isLiked ? "active" : ""}`} onClick={() => this.changeReaction('like', post.id)}>
                                {this.state.like} <i className="far fa-thumbs-up"></i>
                            </span> 
                            | 
                            <span className={`btn-post ml-2 ${this.state.isDisliked ? "active" : ""}`} onClick={() => this.changeReaction('dislike', post.id)}>
                                {this.state.dislike} <i className="far fa-thumbs-down"></i>
                            </span> 
                        </div>
                        <div className="float-right">
                            <span className="btn-post mr-4">
                                <i className="far fa-comment"></i> <b>Bình luận</b>
                            </span>
                            <span className="btn-post" onClick={() => {this.props.share(post.id)}}>
                                <i className="fas fa-share"></i> <b>Chia sẻ</b>
                            </span>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reactPost: (type, post_id) => dispatch(reactPost(type, post_id)),
        unreactPost: (type, post_id) => dispatch(unreactPost(type, post_id)),
        share: (post_id) => dispatch(share(post_id))
    }
}

export default connect(null, mapDispatchToProps)(Post);