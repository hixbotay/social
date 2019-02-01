import React, { Component } from 'react';
import ImageCompressor from 'image-compressor.js';
import Carousel from "nuka-carousel";
import Modal from 'react-modal';
import {getPhotosByType, uploadFeaturedPhotos} from '../../actions/UserActions';
import connect from 'react-redux/es/connect/connect';
import Gallery from "react-grid-gallery";

class ProfilePhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "",
            images: [],
            isOpenModal: false
        }
    }

    getPhotos(type) {
        this.props.getPhotosByType(type).then(photos => {
            var images = photos.map(photo => {
                return {
                    src: photo,
                    thumbnail: photo,
                    thumbnailWidth: 250,
                    thumbnailHeight: 250
                }
            });


                this.setState({type: type, images: images, isOpenModal: true});
            
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
        console.log(this.state);
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
                            <b>UPLOAD ẢNH</b>
                        </button>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-user-photo" onClick={() => {this.getPhotos('featured')}}>
                            <div className="user-photo-icon"><i className="fas fa-folder-open"></i></div>
                            <b>ẢNH NỔI BẬT</b>
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
                <Modal 
                    id="gallery-images"  
                    isOpen={this.state.isOpenModal}
                    onRequestClose={() => {this.setState({isOpenModal: false})}}
                >
                    <h5>
                        {title}
                    </h5>
                    <button id="close-modal-btn" className="float-right" onClick={() => {this.setState({isOpenModal: false})}}>
                        <i className="fas fa-times"></i>
                    </button>
                    <hr/>
                    <Gallery images={this.state.images} />
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