import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { Card } from '../../components/Card';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import connect from 'react-redux/es/connect/connect';
import {getAllJobs} from '../../actions/JobActions';

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 0,
            newEvent: {}
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
    }

    selectTheme(item) {
        this.setState({
            selectedItem: item,
            newEvent: {
                ...this.state.newEvent,
                image: `storage/app/public/event-theme/theme_${item}.jpg`
            }
        });
    }

    render() {
        var img = [
            'https://picsum.photos/300/200/?image=72',
            'https://picsum.photos/300/200/?image=73',
            'https://picsum.photos/300/200/?image=74',
            'https://picsum.photos/300/200/?image=75'
        ];

        var age = [];
        for(let $i=18; $i<=60; $i++) {
            age.push($i);
        }

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
                    {
                        [1,2,3,4,5,6].map((item) => {
                            return (
                                <div className="col-4 event-theme" key={item}>
                                    <img 
                                        src={`storage/app/public/event-theme/theme_${item}.jpg`} 
                                        className={this.state.selectedItem == item ? `selected-image` : ``}
                                        onClick={() => this.selectTheme(item)}
                                    />
                                </div>
                            );
                        }) 
                    }
                    </div>
                    <div className="row">
                        <h5><i className="far fa-calendar-check"></i> Cuộc hẹn</h5>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Tên cuộc hẹn</div>
                        <div className="col-8">
                            <input className="form-control" type="text" name="name" required/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Lịch hẹn</div>
                        <div className="col-8">
                            <input className="form-control" type="datetime-local" name="start_time" required/>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Thời gian chốt đăng ký</div>
                        <div className="col-8">
                            <input className="form-control" type="datetime-local" name="limit_time_register" required/>
                        </div>
                    </div>

                    <div className="row">
                        <h5><i className="fas fa-map-marker-alt"></i> Chọn địa chỉ</h5>
                    </div>
                    <SimpleSlider images={img} slidesToShow={3}></SimpleSlider>
                    
                    <div className="row form-group">
                        <div className="col-4">Số lượng nam tham gia</div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Nhỏ nhất</option>
                                {
                                    [1,2,3,4,5,6,7,8,9,10].map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Lớn nhất</option>
                                {
                                    [2,3,4,5,6,7,8,9,10].map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Số lượng nữ tham gia</div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Nhỏ nhất</option>
                                {
                                    [1,2,3,4,5,6,7,8,9,10].map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Lớn nhất</option>
                                {
                                    [2,3,4,5,6,7,8,9,10].map(item => {
                                        return (<option key={item} value={item}>{item}</option>);
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Độ tuổi của nam từ:</div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Nhỏ nhất</option>
                                {
                                    age.map(item => {
                                        return (<option key={item} value={item}>{item}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Lớn nhất</option>
                                {
                                    age.map(item => {
                                        return (<option key={item} value={item}>{item}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Độ tuổi của nữ từ:</div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Nhỏ nhất</option>
                                {
                                    age.map(item => {
                                        return (<option key={item} value={item}>{item}</option>)
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-4">
                            <select className="custom-select">
                                <option>Lớn nhất</option>
                                {
                                    age.map(item => {
                                        return (<option key={item} value={item}>{item}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Chọn nghề nghiệp</div>
                        <div className="col-8">
                            <select className="custom-select" multiple>
                                {
                                    this.props.jobs.map((item, index) => {
                                        return (<option key={index} value={item.id}>{item.name}</option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-4">Tình trạng hôn nhân</div>
                        <div className="col-8">
                            <select className="custom-select">
                                <option value={0}>Single</option>
                                <option value={1}>Married</option>
                            </select>
                        </div>
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

function mapStateToProps(state) {
    return {
        jobs: state.job.jobs
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllJobs: () => dispatch(getAllJobs())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEvent);