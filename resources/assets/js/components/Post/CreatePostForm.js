import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost, getAllPosts } from '../../actions/PostActions';
import { cleanObject } from '../../helper/function';

class CreatePostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPost: {
                content: '',
                image: ''
            }
        }
    }

    updateStatus(event) {
        this.setState({
            newPost: {
                ...this.state.newPost,
                content: event.target.value
            }
        });
    }

    createPost(e) {
        e.preventDefault();
        let newPost = this.state.newPost;
        if(newPost.content == '' && newPost.image == '') {
            window.alert("Không thể đăng bài viết rỗng!");
        } else {
            this.props.createPost(newPost).then(data => {
                var post = {
                    ...data,
                    author: this.props.user.name,
                    author_avatar: this.props.user.avatar
                };
                // console.log(post);
                this.props.addPost(post);
            });
    
            this.setState({
                newPost: {
                    ...this.state.newPost,
                    content: '',
                    image: ''
                }
            })
        }
    }

    handleImage(event) {
        var component = this;
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(component.state);
            component.setState({ 
                newPost: {
                    ...component.state.newPost,
                    image: reader.result
                }
            });
        };
        reader.onerror = function (error) {
            window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
        };
    }

    removeImage() {
        this.setState({
            newPost: {
                ...this.state.newPost,
                image: ""
            }
        })
    }

    render() {
        return (
            <div className="news-feed-form">
                <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                        <a className="nav-link active inline-items" data-toggle="tab" href="#home-1" role="tab" aria-expanded="true">
                            <i className="fas fa-pencil-alt fa-2x"></i> <span>Viết gì đó</span>
                        </a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link inline-items" >
                            <div onClick={() => { document.getElementById('add-photo').click() }}>
                                <i className="fas fa-camera fa-2x"></i> <span>Tải ảnh</span>
                            </div>
                            <input type="file" className="d-none" id="add-photo" onChange={(e) => this.handleImage(e)}/>
                        </a>
                    </li>

                    {/* <li className="nav-item">
                        <a className="nav-link inline-items" data-toggle="tab" href="#blog" role="tab" aria-expanded="false">
                            <span>Tải video</span>
                        </a>
                    </li> */}
                </ul>

                <div className="tab-content">
                    <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                        <form onSubmit={(e) => this.createPost(e)}>
                            <div className="author-thumb">
                            </div>
                            <div className="form-group with-icon label-floating is-empty">
                                <textarea
                                    className="form-control"
                                    placeholder="Share what you are thinking here..."
                                    onChange={(event) => this.updateStatus(event)}
                                    value={this.state.newPost.content}
                                ></textarea>
                            </div>

                            {
                                this.state.newPost.image ? (
                                    <div className="preview-img col-4">
                                        <img src={this.state.newPost.image} />
                                        <button onClick={() => this.removeImage()}>
                                            <i className="fas fa-times-circle fa-2x"></i>
                                        </button>
                                    </div>
                                ) : null
                            }
                            
                            <div className="add-options-message">
                                <button type="submit" className="btn btn-primary btn-md-2">Post Status</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        createPost: (data) => dispatch(createPost(data)),
        getAllPosts: () => dispatch(getAllPosts()),
    }
}

export default connect(null, mapDispatchToProps)(CreatePostForm);