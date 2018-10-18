import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { Card } from '../../components/Card';
import Slider from "react-slick";
import connect from 'react-redux/es/connect/connect';
import { getAllJobs } from '../../actions/JobActions';
import { getAllCafe } from '../../actions/CafeActions';
import { createNewEvent } from '../../actions/EventActions';
import { RoundAvatar } from '../../components/Avatar';
import Modal from '../../components/Modal';

class CreateGroupDating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTheme: 0,
            selectedAddress: -1,
            newEvent: {
                type: 'group',
            },
            metadata: {
                marital_status: 0
            }
        }
    }

    componentDidMount() {
        this.props.getAllJobs();
        this.props.getAllCafe();
    }

    selectTheme(item) {
        this.setState({
            selectedTheme: item,
            newEvent: {
                ...this.state.newEvent,
                image: `storage/app/public/event-theme/theme_${item}.jpg`
            }
        });
    }

    selectAddress(item, index) {
        this.setState({
            selectedAddress: index,
            newEvent: {
                ...this.state.newEvent,
                agency_id: item.id
            }
        })
    }

    onChangeData(event) {
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                [event.target.name]: event.target.value
            }
        })
    }

    onChangeMetadata(event) {
        var options = Array.apply(null, event.target.options);
        
        if (event.target.name !== 'job_conditional') {
            options.map((option) => {
                if (option.selected) {
                    this.setState({
                        metadata: {
                            ...this.state.metadata,
                            [event.target.name]: option.value
                        }
                    }, () => {
                        console.log(this.state.metadata);
                    })
                }
            })
        } else {
            var temp = [];
            options.map((option) => {
                if (option.selected) {
                   temp.push(option.value);
                }
            });
            this.setState({
                metadata: {
                    ...this.state.metadata,
                    job_conditional: temp
                }
            })
        }
    }

    onChangeSelectData(event) {
        var options = Array.apply(null, event.target.options);
        options.map((option) => {
            if (option.selected) {
                this.setState({
                    newEvent: {
                        ...this.state.newEvent,
                        [event.target.name]: option.value
                    }
                }, () => {
                    console.log(this.state.newEvent);
                })
            }
        })
    }

    createNewEvent(e) {
        e.preventDefault();
        if (this.state.selectedTheme && (this.state.selectedAddress >= 0)) {
            this.props.createNewEvent({event: this.state.newEvent, event_meta: this.state.metadata});
            document.getElementById('open-modal').click();
        } else {
            window.alert("Bạn chọn thiếu chủ đề hoặc địa chỉ");
        }
    }

    render() {
        const { cafes } = this.props;

        console.log(APP_URL)

        //setting for slider
        var settings = {
            accessibility: true,
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true
        };

        var age = [];
        for (let $i = 18; $i <= 60; $i++) {
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
                    <form onSubmit={(e) => this.createNewEvent(e)}>
                        <div>
                            <div className="float-left"><i className="fas fa-folder"></i> Chọn chủ đề</div>
                            <div className="float-right"><i className="fas fa-camera"></i> Tải ảnh/video</div>
                        </div>
                        <div className="row image-chooser">
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    return (
                                        <div className="col-4 event-theme" key={item}>
                                            <img
                                                src={`${APP_URL}/storage/app/public/event-theme/theme_${item}.jpg`}
                                                className={this.state.selectedTheme == item ? `selected-image` : ``}
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
                                <input className="form-control" type="text" name="name" required onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Lịch hẹn</div>
                            <div className="col-8">
                                <input className="form-control" type="datetime-local" name="start_time" required onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Thời gian chốt đăng ký</div>
                            <div className="col-8">
                                <input className="form-control" type="datetime-local" name="limit_time_register" required onChange={(e) => this.onChangeData(e)}/>
                            </div>
                        </div>

                        <div className="row">
                            <h5><i className="fas fa-map-marker-alt"></i> Chọn địa chỉ</h5>
                        </div>
                        <Slider {...settings}>
                            {
                                cafes.map((item, index) => {
                                    return (
                                        <div key={index}>
                                            <img src={item.cover} onClick={() => this.selectAddress(item, index)}
                                                className={this.state.selectedAddress == index ? `address-image selected-image` : `address-image`}
                                            />
                                            <div className="address-avatar">
                                                <RoundAvatar size="small" img={item.avatar}></RoundAvatar>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </Slider>

                        <div className="row form-group">
                            <div className="col-4">Số lượng nam tham gia</div>
                            <div className="col-4">
                                <select className="custom-select" name="min_male_number" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Nhỏ nhất</option>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="custom-select" name="max_male_number" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Lớn nhất</option>
                                    {
                                        [2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Số lượng nữ tham gia</div>
                            <div className="col-4">
                                <select className="custom-select" name="min_female_number" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Nhỏ nhất</option>
                                    {
                                        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="custom-select" name="max_female_number" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Lớn nhất</option>
                                    {
                                        [2, 3, 4, 5, 6, 7, 8, 9, 10].map(item => {
                                            return (<option key={item} value={item}>{item}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Độ tuổi của nam từ:</div>
                            <div className="col-4">
                                <select className="custom-select" name="min_male_age" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Nhỏ nhất</option>
                                    {
                                        age.map(item => {
                                            return (<option key={item} value={item}>{item}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="custom-select" name="max_male_age" onChange={(e) => this.onChangeMetadata(e)}>
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
                                <select className="custom-select" name="min_female_age" onChange={(e) => this.onChangeMetadata(e)}>
                                    <option>Nhỏ nhất</option>
                                    {
                                        age.map(item => {
                                            return (<option key={item} value={item}>{item}</option>)
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="custom-select" name="max_female_age" onChange={(e) => this.onChangeMetadata(e)}>
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
                                <select className="custom-select" multiple name="job_conditional" onChange={(e) => this.onChangeMetadata(e)}>
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
                                <select className="custom-select" name="marital_status" required onChange={(e) => this.onChangeSelectData(e)}>
                                    <option value={0}>Single</option>
                                    <option value={1}>Married</option>
                                </select>
                            </div>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Phí tham gia</div>
                            <div className="col-4">
                                <select className="custom-select" name="payment_m" required onChange={(e) => this.onChangeSelectData(e)}>
                                    <option>Đối với nam</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="custom-select" name="payment_f" required onChange={(e) => this.onChangeSelectData(e)}>
                                    <option>Đối với nữ</option>
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
                            <button type="submit" className="btn btn-primary">ĐĂNG KÝ</button>
                        </div>
                    </form>
                    <button type="button" id="open-modal" className="d-none" data-toggle="modal" data-target="#create-event-alert"></button>
                </Card>
                <Modal id="create-event-alert">
                    <div className="row">
                        <div className="col-6">
                            <img src="https://i.pinimg.com/originals/69/89/db/6989db04751259bbd958ebd57e8c7814.jpg" id="create-event-alert-img"/>
                        </div>
                        <div className="col-6">
                            <div className="text-center" id="create-event-alert-header">
                                CHƯA XONG!
                            </div>
                            <div className="text-center create-event-alert-content">
                                Khởi tạo cuộc hẹn của bạn đang chờ admin duyệt!
                            </div>
                            <div className="text-center create-event-alert-content">
                                <button className="btn btn-primary" onClick={() => window.location.reload()}>OK</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </DatingLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        jobs: state.job.jobs,
        cafes: state.cafe.cafes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
        getAllCafe: (filter, page) => dispatch(getAllCafe(filter, page)),
        createNewEvent: (data) => dispatch(createNewEvent(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupDating);