import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { Card } from '../../components/Card';
import SimpleSlider from '../../components/Slider/SimpleSlider';

class CreateEvent extends Component {
    render() {
        var img = [
            'https://picsum.photos/300/200/?image=72',
            'https://picsum.photos/300/200/?image=73',
            'https://picsum.photos/300/200/?image=74',
            'https://picsum.photos/300/200/?image=75'
        ];

        return (
            <DatingLayout>
                <Card>
                    <div className="row">
                        <div className="col-6">
                            TẠO CUỘC HẸN NHÓM
                        </div>
                        <div className="col-6">
                            TẠO CUỘC HẸN ĐÔI
                        </div>
                    </div>
                    <div>
                        <div className="float-left"><i className="fas fa-folder"></i> Chọn chủ đề</div>
                        <div className="float-right"><i className="fas fa-camera"></i> Tải ảnh/video</div>
                    </div>
                    <div className="row image-chooser">
                        <div className="col-4">
                            <img src="https://pp.vk.me/VDRJb-1A1jxb7N31Njyc77KDpZQajiYRhgfnCA/KSIWRq0oaFo.jpg" />
                        </div>
                        <div className="col-4">
                            <img src="https://pp.vk.me/VDRJb-1A1jxb7N31Njyc77KDpZQajiYRhgfnCA/KSIWRq0oaFo.jpg" />
                        </div>
                        <div className="col-4">
                            <img src="https://pp.vk.me/VDRJb-1A1jxb7N31Njyc77KDpZQajiYRhgfnCA/KSIWRq0oaFo.jpg" />
                        </div>
                    </div>
                    <div className="row image-chooser">
                        <div className="col-4">
                            <img src="https://pp.vk.me/VDRJb-1A1jxb7N31Njyc77KDpZQajiYRhgfnCA/KSIWRq0oaFo.jpg" />
                        </div>
                        <div className="col-4">
                            <img src="https://pp.vk.me/VDRJb-1A1jxb7N31Njyc77KDpZQajiYRhgfnCA/KSIWRq0oaFo.jpg" />
                        </div>
                        <div className="col-4">
                            <img src="https://pp.vk.me/VDRJb-1A1jxb7N31Njyc77KDpZQajiYRhgfnCA/KSIWRq0oaFo.jpg" />
                        </div>
                    </div>
                    <div className="row">
                        <h5><i className="far fa-calendar-check"></i> Tên cuộc hẹn</h5>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Lịch hẹn</div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Giờ</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Ngày</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Tháng</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Năm</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Thời gian chốt đăng ký</div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Giờ</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Ngày</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Tháng</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>Năm</option>
                            </select>
                        </div>
                    </div>
                    <SimpleSlider images={img} slidesToShow={3}></SimpleSlider>
                    <div className="row">
                        <h5><i className="fas fa-map-marker-alt"></i> Chọn địa chỉ</h5>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Số lượng người tham gia</div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Độ tuổi</div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <h5><i className="fas fa-suitcase"></i> Chọn nghề nghiệp</h5>
                    </div>
                    <div className="row">
                        <h5><i className="fas fa-heart"></i> Tình trạng hôn nhân</h5>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Phí tham gia</div>
                        <div className="col-2"></div>
                        <div className="col-2"></div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="col-2">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row text-center">
                        <p>Bạn chỉ có thể nhìn thấy thành viên đã kết đôi với mình. Đã hiểu?</p>
                    </div>
                    
                    <div className="text-center">
                        <button type="button" className="btn btn-primary">ĐĂNG KÝ</button>
                    </div>
                </Card>
            </DatingLayout>
        );
    }
}

export default CreateEvent;