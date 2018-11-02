import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostHeader from '../../components/Post/PostHeader';
import CircleButton from '../../components/Button/CircleButton';

import {likePost, unlikePost} from '../../actions/PostActions';

class Post extends Component {

    constructor(props) {
        super(props);
        this.state = {
            like: props.post.like ? JSON.parse(props.post.like).length : 0,
            love: props.post.love ? JSON.parse(props.post.love).length : 0,
            view: props.post.view ? JSON.parse(props.post.view).length : 0,
            isLoved: (props.post.love === null || props.post.love.indexOf(props.user_id) < 0) ? false : true,
            isLiked: (props.post.like === null || props.post.like.indexOf(props.user_id) < 0) ? false : true,
        }
    }

    changeReaction(actionType, post_id) {
        if (actionType === 'love') {
            if(this.state.isLoved) {
                this.props.unlikePost({type: actionType}, post_id);
                this.setState(prevState => ({ love: prevState.love - 1, isLoved: false}));
            } else {
                this.props.likePost({type: actionType}, post_id);
                this.setState(prevState => ({ love: prevState.love + 1, isLoved: true}));
            }
        }
        else if (actionType === 'like') {
            if(this.state.isLiked) {
                this.props.unlikePost({type: actionType}, post_id);
                this.setState(prevState => ({ like: prevState.like - 1, isLiked: false}));
            } else {
                this.props.likePost({type: actionType}, post_id);
                this.setState(prevState => ({ like: prevState.like + 1, isLiked: true}));
            }
        }
    }

    render() {
        const {post} = this.props;

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
                            <PostHeader
                                user_id={post.user_id}
                                avatar={post.author_avatar}
                                name={post.author}
                                heartNumber={this.state.love}
                                viewNumber={this.state.view}
                                likeNumber={this.state.like}
                            />
                        </div>
                        <div className="float-right">
                            <CircleButton icon="fas fa-flag"></CircleButton>
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
                    <div className="col text-center">
                        <CircleButton 
                            icon="fas fa-heart" 
                            name='love' 
                            color={this.state.isLoved ? '#e74c3c' : '#34495e'}
                            action={() => this.changeReaction('love', post.id)}
                        ></CircleButton>
                    </div>
                    <div className="col text-center">
                        <CircleButton 
                            icon="fas fa-thumbs-up"
                            name='like' 
                            color={this.state.isLiked ? '#2980b9' : '#34495e'}
                            action={() => this.changeReaction('like', post.id)}
                        ></CircleButton>
                    </div>
                    <div className="col text-center">
                        <CircleButton icon="fas fa-comment"></CircleButton>
                    </div>
                    <div className="col text-center">
                        <CircleButton icon="fas fa-times"></CircleButton>
                    </div>
                </div>
            </article>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        likePost: (type, post_id) => dispatch(likePost(type, post_id)),
        unlikePost: (type, post_id) => dispatch(unlikePost(type, post_id))
    }
}

export default connect(null, mapDispatchToProps)(Post);