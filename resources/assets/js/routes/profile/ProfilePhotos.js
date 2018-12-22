import React, { Component } from 'react';
import ImageCompressor from 'image-compressor.js';
import Carousel from "nuka-carousel";
import Modal from '../../components/Modal';
import {getPhotosByType, uploadFeaturedPhotos} from '../../actions/UserActions';
import connect from 'react-redux/es/connect/connect';
import Gallery from "react-photo-gallery";

class ProfilePhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            images: []
        }
    }

    getPhotos(type) {
        var images = [];
        this.props.getPhotosByType(type).then(photos => {
            photos.forEach(photo => {
                images.push({
                    src: photo,
                    width: 1,
                    height: 1
                });
            });
            
            this.setState({type: type, images: images}, () => {
                document.getElementById("open-gallery-btn").click();
            });
        })
    }

    handleImage(event) {
        var files = event.target.files;
        var images = []; 

        // optimizer image upload
        Array.from(files).forEach(file => {
            new ImageCompressor(file, {
                quality: 0.6,
                convertSize: 400000,
                success(result) {
                    var reader = new FileReader();
                    reader.readAsDataURL(result);
                    reader.onload = function () {
                        images.push(reader.result);
                    };
                    reader.onerror = function (error) {
                        window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
                    };
                }
            });
        });
        // wait 
        setTimeout(() => {
            this.props.uploadFeaturedPhotos(images);
        }, 2000)
    }

    render() {
        var {images} = this.props;
        var title = "";
        switch(this.state.type) {
            case "featured": {
                title = "Ảnh nổi bật của bạn";
                break;
            }
            case "timeline": {
                title = "Ảnh trên timeline của bạn";
                break;
            }
            case "shared": {
                title = "Ảnh chia sẻ trên timeline của bạn";
                break;
            }
        }

        return (
            <div>
                <div className="row">
                    <div className="col-12 mb-2">
                        <Carousel 
                            slidesToShow={3} 
                            cellSpacing={5}
                            autoplay={true}
                            autoGenerateStyleTag={true}
                            initialSlideHeight={250}
                            autoplay={true}
                            renderCenterLeftControls={({ previousSlide }) => (
                                <button className="arrow-btn" onClick={previousSlide}><i className="fas fa-chevron-circle-left"></i></button>
                            )}
                            renderCenterRightControls={({ nextSlide }) => (
                                <button className="arrow-btn" onClick={nextSlide}><i className="fas fa-chevron-circle-right"></i></button>
                            )}
                        >
                        {
                            images.map((item, index) => {
                                return (
                                    <img src={item} key={index}/>
                                )
                            })
                        }
                        </Carousel>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <button className="btn btn-upload-photo" >
                            <div className="user-photo-icon">
                                <label>
                                    <input className="d-none" type="file" name="photos" multiple accept="image/*" onChange={(e) => {this.handleImage(e)}} />
                                    <i className="fas fa-camera-retro"></i>
                                </label>
                            </div>
                            <b>UPLOAD</b>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-user-photo" onClick={() => {this.getPhotos('featured')}}>
                            <div className="user-photo-icon"><i className="fas fa-folder-open"></i></div>
                            <b>ẢNH TẢI LÊN</b>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-user-photo" onClick={() => {this.getPhotos('timeline')}}>
                            <div className="user-photo-icon"><i className="fas fa-folder-open"></i></div>
                            <b>ẢNH TIMELINE</b>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-user-photo" onClick={() => {this.getPhotos('shared')}}>
                            <div className="user-photo-icon"><i className="fas fa-folder-open"></i></div>
                            <b>ẢNH CHIA SẺ</b>
                        </button>
                    </div>
                </div>

                <button className="d-none" data-toggle="modal" data-target="#gallery-images" id="open-gallery-btn"></button>
                <Modal id="gallery-images" title={title}>
                    <Gallery photos={this.state.images} width={200} columns={4}/>
                </Modal>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        photos: state.user.photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getPhotosByType: (type) => dispatch(getPhotosByType(type)),
        uploadFeaturedPhotos: (images) => dispatch(uploadFeaturedPhotos(images))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotos);