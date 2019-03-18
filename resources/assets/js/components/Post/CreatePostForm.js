import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../../actions/PostActions';
import { cleanObject } from '../../helper/function';
import ImageCompressor from 'image-compressor.js';
import {UPDATE_LIST_JOB} from '../../actions/types';

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
            this.props.createPost(newPost);
    
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

        new ImageCompressor(file, {
            quality: 0.6,
            convertSize: 400000,
            success(result) {
                var reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = function () {
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
        });
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
            <div className="news-feed-form box-shadow-default">
                <div className="tab-content">
                    <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                        <form onSubmit={(e) => this.createPost(e)}>
                            <div className="author-thumb">
                            </div>
                            <div className="form-group is-empty">
                                <textarea
                                    className="form-control"
                                    placeholder="Bạn đang nghĩ gì !"
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
                                <a className="btn btn-secondary btn-xs " onClick={() => { document.getElementById('add-photo').click() }}>
                                    Tải ảnh
                                </a>
                                <input type="file" accept="image/*" className="d-none" id="add-photo" onChange={(e) => this.handleImage(e)}/>
                                <button type="submit" className="btn btn-primary btn-xs">Đăng</button>
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
    }
}

export default connect(null, mapDispatchToProps)(CreatePostForm);