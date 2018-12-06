import React, { Component } from 'react';
import CurrentUserLayout from './CurrentUserLayout';
import connect from 'react-redux/es/connect/connect';
import { Card } from '../../components/Card';
import {verifyIdCard} from '../../actions/UserActions';
import ImageCompressor from 'image-compressor.js';

class IdCardVerify extends Component {
    constructor() {
        super();
        this.state = {
            data: {},
            frontPhoto: "",
            backsidePhoto: ""
        }
    }

    handleImage(e, type) {
        const component = this;
        var file = e.target.files[0];
        var name = e.target.name;
        var reader = new FileReader();
        // preview image
        var src = URL.createObjectURL(file);
        if(type === 'front') {
            this.setState({
                frontPhoto: src
            });
        } else {
            this.setState({
                backsidePhoto: src
            });
        }

        // optimizer image upload and convert to base64
        new ImageCompressor(file, {
            quality: 0.6,
            convertSize: 400000,
            success(result) {
                reader.readAsDataURL(result);
                reader.onload = function () {
                    component.setState({
                        data: {
                            ...component.state.data,
                            [name]: reader.result
                        }
                    });
                };
                reader.onerror = function (error) {
                    window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
                };
            }
        });
    }

    onChangeData(e) {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    submit(e) {
        e.preventDefault();
        this.props.verify(this.state.data);
    }

    render() {
        const {current_user} = this.props;
        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.address : null}
            >
                <Card>
                    <form onSubmit={(e) => this.submit(e)}>
                        <h5>Thông tin chứng minh thư của bạn</h5>
                        <br/>
                        <div className="form-group row">
                            <div className="col-3">
                                Họ tên
                            </div>
                            <div className="col-9">
                                <input type="text" className="form-control" name="name" onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                Số CMT
                            </div>
                            <div className="col-9">
                                <input type="number" className="form-control" name="id_number" onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                Ngày sinh
                            </div>
                            <div className="col-9">
                                <input type="date" className="form-control" name="birthday" onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-3">
                                Ngày cấp
                            </div>
                            <div className="col-9">
                                <input type="date" className="form-control" name="date_of_issues" onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>
                        <div className="clearfix">
                            <h5 className="float-left">Tải chứng minh thư mặt trước</h5>
                            <div className="float-right">
                                <label className="id-card-upload" htmlFor="front-photo">
                                    <i className="fas fa-cloud-upload-alt"></i> Tải ảnh
                                </label>
                                <input id="front-photo" name="id_card_front_photo" className="d-none" type="file" onChange={(e) => this.handleImage(e, 'front')}/>
                            </div>
                        </div>
                        <div className="clearfix text-center">
                            <img src={this.state.frontPhoto} className="mt-2 mb-4 id-card-preview"/>
                        </div>
                        <div className="clearfix">
                            <h5 className="float-left">Tải chứng minh thư mặt sau</h5>
                            <div className="float-right">
                                <label className="id-card-upload" htmlFor="backside-photo">
                                    <i className="fa fa-cloud-upload-alt"></i> Tải ảnh
                                </label>
                                <input id="backside-photo" name="id_card_backside_photo" className="d-none" type="file" onChange={(e) => this.handleImage(e, 'backside')}/>
                            </div>
                        </div>
                        <div className="clearfix text-center">
                            <img src={this.state.backsidePhoto} className="mt-2 mb-4 id-card-preview"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary" type="submit">Gửi</button>
                        </div>
                    </form>
                    <div id="id-verify-regulation">
                        Sau khi đã tải chứng minh thư thành công sau 48h bạn sẽ không thể thay đổi được 
                        chứng minh thư đã tải lên. Vì vậy hãy chắc chắn rằng bạn không tải nhầm chứng minh 
                        thư của người khác. <br/>
                        Khi bạn tham gia các sự kiện trên noiduyen.vn mà có yêu cầu xác minh chứng minh thư nếu 
                        có sự kiểm tra mà không đúng thực tế, chúng tôi sẽ từ chối sự tham gia của bạn mà
                        không hoàn trả bất cứ chi phí nào liên quan.
                    </div>
                </Card>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        verify: (data) => dispatch(verifyIdCard(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdCardVerify);