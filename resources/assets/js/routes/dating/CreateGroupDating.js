import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { CardWithTitle } from '../../components/Card';
import Slider from "react-slick";
import connect from 'react-redux/es/connect/connect';
import { getAllJobs } from '../../actions/JobActions';
import { getAllCafe, getCafeDetail } from '../../actions/CafeActions';
import { createGroupEvent } from '../../actions/EventActions';
import { RoundAvatar } from '../../components/Avatar';
import Modal from '../../components/Modal';
import { getCookie } from '../../helper/cookie';

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

        var cafe_id = getCookie('cafe_id');
        if (cafe_id) {
            this.props.getCafeDetail(cafe_id);
            this.setState({
                newEvent: {
                    ...this.state.newEvent,
                    agency_id: cafe_id
                }
            })
        } else {
            this.props.getAllCafe();
        }
    }

    selectTheme(item, index) {
        this.setState({
            selectedTheme: index,
            newEvent: {
                ...this.state.newEvent,
                image: item
            }
        });
    }

    selectAddress(item, index) {
        this.setState({
            selectedAddress: index,
            selectedTheme: -1,
            newEvent: {
                ...this.state.newEvent,
                agency_id: item.id, 
                name: item.name,
                image: ""
            },
            themes: item.images
        }, () => {
            console.log(this.state.newEvent);
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
        const {is_secret} = this.form;
        this.setState({
            newEvent: {
                ...this.state.newEvent,
                is_secret: parseInt(is_secret.value)
            }
        }, () => {
            if (this.state.selectedTheme >=0 && (this.state.selectedAddress >= 0)) {
                this.props.createGroupEvent({event: this.state.newEvent, event_meta: this.state.metadata}).then(data => {
                    document.getElementById('open-modal').click();
                });
            } else {
                window.alert("Bạn chọn thiếu chủ đề hoặc địa chỉ");
            }
        })
    }

    render() {
        const { cafes, current_cafe } = this.props;

        //setting for slider
        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
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
                <CardWithTitle hasLine={true} title="TẠO CUỘC HẸN TỐC ĐỘ">
                    <form onSubmit={(e) => this.createNewEvent(e)} ref={form => this.form = form}>
                        {/* <div>
                            <div className="float-left"><i className="fas fa-folder"></i> Chọn chủ đề</div>
                            <div className="float-right"><i className="fas fa-camera"></i> Tải ảnh/video</div>
                        </div>
                        <div className="row image-chooser">
                            {
                                [1, 2, 3, 4, 5, 6].map((item) => {
                                    return (
                                        <div className="col-4 event-theme" key={item}>
                                            <img
                                                src={`${baseUrl}/public/images/dating-theme/theme-${item}.jpg`}
                                                className={this.state.selectedTheme == item ? `selected-image` : ``}
                                                onClick={() => this.selectTheme(item)}
                                            />
                                        </div>
                                    );
                                })
                            }
                        </div> */}
                        <div className="row">
                            <h5><i className="far fa-calendar-check"></i> Cuộc hẹn</h5>
                        </div>
                        <div className="row form-group">
                            <div className="col-4">Kiểu cuộc hẹn</div>
                            <div className="col-1">
                                <input className="custom-input" type="radio" name="is_secret" value={0} required/>
                            </div>
                            <div className="col-3">
                                <label>Công khai</label>
                            </div>
                            <div className="col-1">
                                <input className="custom-input" type="radio" name="is_secret" value={1} required/>
                            </div>
                            <div className="col-3">
                                <label>Bí mật</label>
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
                        {
                            getCookie('cafe_id') ? (
                                <div className="form-group">
                                {
                                    current_cafe ? (
                                        <div>{current_cafe.address}, {current_cafe.district_name}, {current_cafe.province_name}</div>
                                    ) : null
                                }
                                </div>
                            ) : (
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
                            )
                        }

                        {
                            (this.state.themes) ? (
                                <React.Fragment>
                                    <h5>Chọn chủ đề cuộc hẹn</h5>
                                    <Slider {...settings}>
                                        {
                                            this.state.themes.map((item, index) => {
                                                return (
                                                    <div className="event-theme" key={index}>
                                                        <img
                                                            src={item}
                                                            className={this.state.selectedTheme == index ? `selected-image` : ``}
                                                            onClick={() => this.selectTheme(item, index)}
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                    </Slider>
                                </React.Fragment>
                            ) : null
                        }

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
                </CardWithTitle>
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
                                <a href={`${baseUrl}/dating`}>
                                    <button className="btn btn-primary">OK</button>
                                </a>
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
        cafes: state.cafe.cafes,
        current_cafe: state.cafe.currentCafe
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllJobs: () => dispatch(getAllJobs()),
        getAllCafe: (filter, page) => dispatch(getAllCafe(filter, page)),
        getCafeDetail: (id) =>  dispatch(getCafeDetail(id)),
        createGroupEvent: (data) => dispatch(createGroupEvent(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupDating);