import React, { Component } from 'react';
import {connect} from 'react-redux';
import PostHeader from '../../components/Post/PostHeader';
import {FaRegThumbsUp, FaRegThumbsDown} from 'react-icons/fa';
import EdiText from 'react-editext';
import {reactPost, unreactPost, share, removePost, updatePost} from '../../actions/PostActions';
import Modal from 'react-modal';

class Post extends Component {

    constructor(props) {
        super(props);
        var likeArr = JSON.parse(props.post.like);
        var dislikeArr = JSON.parse(props.post.dislike);
        this.state = {
            like: Array.isArray(likeArr) ? likeArr.length : 0,
            dislike: Array.isArray(dislikeArr)  ? dislikeArr.length : 0,
            view: props.post.view ? JSON.parse(props.post.view).length : 0,
            isLiked: (Array.isArray(likeArr) && likeArr.indexOf(props.user_id) >= 0) ? true : false,
            isDisliked: (Array.isArray(dislikeArr) && dislikeArr.indexOf(props.user_id) >= 0) ? true : false,
            isOpenControl: false,
            isEdit: false,
            isOpenAlert: false,
            isOpenSuccess: false
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

    handleClick() {
        this.setState(prevState => ({
            isOpenControl: !prevState.isOpenControl
        }));
    }

    remove(post_id) {
        this.setState({isOpenControl: false});
        if(confirm("Bạn muốn xóa bài viết này chứ?")) {
            this.props.removePost(post_id);
        }
    }

    openFormEdit(post_id) {
        this.setState({
            isOpenControl: false, 
            isEdit: true
        }, () => {
            var buttons = document.getElementsByClassName(`edit-button-${post_id}`);
            buttons[0].click();
        });
        
    }

    update(content, post_id) {
        this.props.updatePost({content: content}, post_id).then(data => {
            this.setState({isEdit: false});
        });
    }

    sharePost(post_id) {
        this.props.share(post_id).then(res => {
            this.setState({
                isOpenAlert: false,
                isOpenSuccess: true
            })
        }); 
    }

    render() {
        const {post, user_id, isInNewsfeed} = this.props;

        var isShare = post.original_author ? true : false;

        return (
            <article className="hentry post">
                <div className="row">
                    <div className="col-12">
                        <div className="float-left">
                            <PostHeader
                                user_id={post.user_id}
                                avatar={post.user_avatar}
                                name={post.user_name}
                                created={post.created_at}
                                isShare={isShare}
                            />
                        </div>
                        {
                            post.user_id === user_id ? (
                                <div className="float-right">
                                    <div onClick={() => this.handleClick()}>
                                        <i className="fas fa-ellipsis-h" ></i>
                                    </div>
                                    
                                    <div className={this.state.isOpenControl ? "" : "d-none"}>
                                        <ul className="list-group post-control">
                                            {
                                                !isShare ? (
                                                    <li className="list-group-item" onClick={() => this.openFormEdit(post.id)}>
                                                        Sửa bài viết
                                                    </li>
                                                ) : null
                                            }
                                            
                                            <li className="list-group-item" onClick={() => this.remove(post.id)}>
                                                Xóa
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                </div>
                {
                    isShare ? (
                        <div className="shared-post">
                            <PostHeader
                                user_id={post.original_author}
                                avatar={post.original_author_avatar}
                                name={post.original_author_name}
                                created={post.original_created}
                            />
                            <p>{post.content}</p>
                            <div className="shared-post-photo">
                                {post.photo_id ? <img src={post.source}/> : null}
                            </div>
                        </div>
                    ) : (
                        <React.Fragment>
                            <div className="mb-4">
                            {
                                this.state.isEdit ? (
                                    <EdiText 
                                        type="textarea" 
                                        value={post.content} 
                                        editButtonClassName={`d-none edit-button-${post.id}`}
                                        onSave={(content) => this.update(content, post.id)}
                                    />
                                ) : (
                                    <p>{post.content}</p>
                                )
                            }
                            </div>
                            
                            <div className="post-photo">
                                {post.photo_id ? <img src={post.source}/> : null}
                            </div>
                        </React.Fragment>
                    )
                }
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
                            <span className="btn-post" onClick={() => {this.setState({ isOpenAlert: true })}}>
                                <i className="fas fa-share"></i> <b>Chia sẻ</b>
                            </span>
                        </div>
                    </div>
                </div>

                <Modal isOpen={this.state.isOpenAlert}>
                    <h5>Bạn có muốn chia sẻ bài viết này trên timeline của bạn?</h5>
                    <hr />
                    <button className="float-right btn btn-sm btn-primary" onClick={() => this.sharePost(post.id)}>
                        Đồng ý
                    </button>
                    <button className="float-right btn btn-sm btn-secondary mr-2" onClick={() => { this.setState({ isOpenAlert: false }) }}>
                        Hủy
                    </button>
                </Modal>
                <Modal isOpen={this.state.isOpenSuccess}>
                    <h5>Bạn đã chia sẻ bài viết thành công</h5>
                    <hr />
                    <button className="float-right btn btn-primary" onClick={() => { this.setState({ isOpenSuccess: false }) }}>
                        Đóng
                    </button>
                </Modal>
            </article>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        reactPost: (type, post_id) => dispatch(reactPost(type, post_id)),
        unreactPost: (type, post_id) => dispatch(unreactPost(type, post_id)),
        share: (post_id) => dispatch(share(post_id)),
        removePost: (post_id) => dispatch(removePost(post_id)),
        updatePost: (data, post_id) => dispatch(updatePost(data, post_id))
    }
}

export default connect(null, mapDispatchToProps)(Post);