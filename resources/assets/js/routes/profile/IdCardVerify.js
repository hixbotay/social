import React, { Component } from 'react';
import CurrentUserLayout from './CurrentUserLayout';
import connect from 'react-redux/es/connect/connect';
import { Card } from '../../components/Card';
import { verifyIdCard, getIdCardVerify, updateIdCardVerify } from '../../actions/UserActions';
import ImageCompressor from 'image-compressor.js';
import 'moment/locale/vi.js';
import { DatePickerInput } from 'rc-datepicker';
import moment from 'moment';
import ToggleDisplay from 'react-toggle-display';

class IdCardVerify extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                date_of_issues: new Date(),
                id_number: null,
                id_card_backside_photo: null,
                id_card_front_photo: null
            },
            frontPhoto: "",
            backsidePhoto: "",
            show: false
        }
    }

    componentDidMount() {
        this.setState({
            data: {
                ...this.state.data,
                name: this.props.current_user.name,
                birthday: this.props.current_user.birthday
            }
        });

        this.props.getIdCardVerify().then(idCard => {
            if (idCard) {
                this.setState({
                    frontPhoto: idCard.id_card_front_photo,
                    backsidePhoto: idCard.id_card_backside_photo,
                    // data: {
                    //     name: idCard.name,
                    //     birthday: idCard.birthday,
                    //     date_of_issues: idCard.date_of_issues,
                    //     id_number: idCard.id_number,
                    //     // id_card_backside_photo: idCard.id_card_backside_photo,
                    //     // id_card_front_photo: idCard.id_card_front_photo
                    // }
                })
            }
        })
    }

    handleImage(e, type) {
        const component = this;
        var file = e.target.files[0];
        var name = e.target.name;
        var reader = new FileReader();
        // preview image
        var src = URL.createObjectURL(file);
        if (type === 'front') {
            this.setState({
                frontPhoto: src
            });
        } else if (type === 'backside') {
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

    onChangeDate(name, value) {
        this.setState({
            data: {
                ...this.state.data,
                [name]: value
            }
        })
    }

    submit(e) {
        e.preventDefault();
        var { data } = this.state;
        let isAlert = false;

        Object.keys(data).some(key => {
            if (!data[key]) {
                isAlert = true;
                return;
            }
        });

        if (isAlert) {
            return alert("Bạn cần điền đầy đủ thông tin các trường có dấu *");
        }

        if (!moment(data.birthday).isValid() || !moment(data.date_of_issues).isValid()) {
            return alert("Ngày sinh hoặc ngày cấp chứng minh thư đang bị sai định dạng ngày!");
        }

        if (data.id_number.length !== 9 && data.id_number.length !== 12) {
            return alert("Số chứng minh thư phải có 9 hoặc 12 chữ số!");
        }

        let cardData = {
            ...data,
            birthday: moment(data.birthday).format("YYYY-MM-DD"),
            date_of_issues: moment(data.date_of_issues).format("YYYY-MM-DD"),
        }

        this.props.verify(cardData);
    }

    update(e) {
        e.preventDefault();
        var { data } = this.state;

        if (data.birthday) {
            if (!moment(data.birthday).isValid()) {
                return alert("Ngày sinh đang bị sai định dạng ngày!");
            }
        }

        if (data.birthday) {
            if (!moment(data.date_of_issues).isValid()) {
                return alert("Ngày cấp chứng minh thư đang bị sai định dạng ngày!");
            }
        }

        if (data.id_number) {
            if (data.id_number.length !== 9 && data.id_number.length !== 12) {
                return alert("Số chứng minh thư phải có 9 hoặc 12 chữ số!");
            }
        }

        this.props.updateIdCardVerify(data);
    }

    render() {
        const { current_user, idCard } = this.props;
        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.hometown_province_name : null}
            >
                <Card>
                    {
                        (current_user.is_id_card_verified === 'not_yet') ? (
                            <form onSubmit={(e) => this.submit(e)}>
                                <h5>Thông tin chứng minh thư của bạn</h5>
                                <br />
                                <div className="form-group row">
                                    <div className="col-3">
                                        <div>Họ tên *</div>
                                    </div>
                                    <div className="col-9">
                                        <input type="text" className="form-control" value={this.state.data.name} name="name" onChange={(e) => this.onChangeData(e)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-3">
                                        Số CMT *
                                    </div>
                                    <div className="col-9">
                                        <input type="text" className="form-control" name="id_number" onChange={(e) => this.onChangeData(e)} />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-3">
                                        Ngày sinh *
                                    </div>
                                    <div className="col-9">
                                        <DatePickerInput
                                            showOnInputClick={true}
                                            className='react-datepicker-component my-react-component'
                                            value={this.state.data.birthday}
                                            onChange={(date) => this.onChangeDate("birthday", date)}
                                            locale='vi'
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-3">
                                        Ngày cấp *
                                    </div>
                                    <div className="col-9">
                                        <DatePickerInput
                                            showOnInputClick={true}
                                            className='react-datepicker-component my-react-component'
                                            value={this.state.data.date_of_issues || new Date()}
                                            onChange={(date) => this.onChangeDate("date_of_issues", date)}
                                            locale='vi'
                                        />
                                    </div>
                                </div>
                                <div className="clearfix">
                                    <h5 className="float-left">Tải chứng minh thư mặt trước *</h5>
                                    <div className="float-right">
                                        <label className="id-card-upload" htmlFor="front-photo">
                                            <i className="fas fa-cloud-upload-alt"></i> Tải ảnh
                                        </label>
                                        <input id="front-photo" name="id_card_front_photo" className="d-none" type="file" onChange={(e) => this.handleImage(e, 'front')} />
                                    </div>
                                </div>
                                <div className="clearfix text-center">
                                    <img src={this.state.frontPhoto} className="mt-2 mb-4 id-card-preview" />
                                </div>
                                <div className="clearfix">
                                    <h5 className="float-left">Tải chứng minh thư mặt sau *</h5>
                                    <div className="float-right">
                                        <label className="id-card-upload" htmlFor="backside-photo">
                                            <i className="fa fa-cloud-upload-alt"></i> Tải ảnh
                                        </label>
                                        <input id="backside-photo" name="id_card_backside_photo" className="d-none" type="file" onChange={(e) => this.handleImage(e, 'backside')} />
                                    </div>
                                </div>
                                <div className="clearfix text-center">
                                    <img src={this.state.backsidePhoto} className="mt-2 mb-4 id-card-preview" />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary" type="submit">Gửi</button>
                                </div>
                            </form>
                        ) : (
                                <div>
                                    {
                                        (current_user.is_id_card_verified === 'verified') ? (
                                            <div className="alert alert-success">
                                                Chứng minh thư của bạn đã được xác minh thành công!
                                       </div>
                                        ) : (
                                                <div className="alert alert-warning">
                                                    Chứng minh thư của bạn đang được xem xét. Vui lòng chờ.
                                        </div>
                                            )
                                    }
                                </div>
                            )
                    }

                    <div id="id-verify-regulation">
                        Sau khi đã tải chứng minh thư thành công sau 48h bạn sẽ không thể thay đổi được
                        chứng minh thư đã tải lên. Vì vậy hãy chắc chắn rằng bạn không tải nhầm chứng minh
                        thư của người khác. <br />
                        Khi bạn tham gia các sự kiện trên noiduyen.vn mà có yêu cầu xác minh chứng minh thư nếu
                        có sự kiểm tra mà không đúng thực tế, chúng tôi sẽ từ chối sự tham gia của bạn mà
                        không hoàn trả bất cứ chi phí nào liên quan.
                    </div>
                </Card>
                <Card>
                    {
                        idCard ? (
                            <div>
                                <h5>Chứng minh thư đã tải lên trước đó vào lúc {moment(idCard.created_at).format("HH:mm DD/MM/YYYY")}</h5>
                                <br />
                                <ToggleDisplay show={!this.state.show}>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <div><b>Họ tên</b></div>
                                            <div>{idCard.name}</div>
                                            <div><b>Số CMND / Số thẻ căn cước</b></div>
                                            <div>{idCard.id_number}</div>
                                        </div>
                                        <div className="col-6">
                                            <div><b>Ngày sinh</b></div>
                                            <div>{moment(idCard.birthday).format("DD/MM/YYYY")}</div>
                                            <div><b>Ngày cấp CMND / thẻ căn cước</b></div>
                                            <div>{moment(idCard.date_of_issues).format("DD/MM/YYYY")}</div>
                                        </div>
                                    </div>
                                    <div className="row mb-4">
                                        <div className="col-6">
                                            <div className="id_photo">
                                                <div className="mb-2"><b>Mặt trước</b></div>
                                                <img src={idCard.id_card_front_photo} />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="id_photo">
                                                <div className="mb-2"><b>Mặt sau</b></div>
                                                <img src={idCard.id_card_backside_photo} />
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        (moment(idCard.created_at).add(2, "days") >= moment()) ? (
                                            <div className="row mb-4">
                                                <div className="text-center">
                                                    <button className="btn btn-primary" onClick={() => { this.setState({ show: !this.state.show }) }}>
                                                        {
                                                            this.state.show ? "Hủy" : "Sửa"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        ) : null
                                    }
                                </ToggleDisplay>

                                <ToggleDisplay show={this.state.show}>
                                    <form onSubmit={(e) => this.update(e)}>
                                        <div className="form-group row">
                                            <div className="col-3">
                                                <div>Họ tên *</div>
                                            </div>
                                            <div className="col-9">
                                                <input type="text" className="form-control" defaultValue={idCard.name} name="name" onChange={(e) => this.onChangeData(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3">
                                                Số CMT *
                                        </div>
                                            <div className="col-9">
                                                <input type="text" className="form-control" defaultValue={idCard.id_number} name="id_number" onChange={(e) => this.onChangeData(e)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3">
                                                Ngày sinh *
                                        </div>
                                            <div className="col-9">
                                                <DatePickerInput
                                                    showOnInputClick={true}
                                                    className='react-datepicker-component my-react-component'
                                                    value={idCard.birthday}
                                                    onChange={(date) => this.onChangeDate("birthday", date)}
                                                    locale='vi'
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-3">
                                                Ngày cấp *
                                        </div>
                                            <div className="col-9">
                                                <DatePickerInput
                                                    showOnInputClick={true}
                                                    className='react-datepicker-component my-react-component'
                                                    value={idCard.date_of_issues}
                                                    onChange={(date) => this.onChangeDate("date_of_issues", date)}
                                                    locale='vi'
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <div className="col-12 col-md-6">
                                                <div className="id_photo">
                                                    <div className="mb-2"><b>Ảnh mặt trước</b></div>
                                                    <label className="change-id-photo-btn">
                                                        Đổi ảnh
                                                    <input type="file" name="id_card_front_photo" className="d-none" onChange={(e) => this.handleImage(e, 'front')} />
                                                    </label>

                                                    <img src={this.state.frontPhoto} />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <div className="id_photo">
                                                    <div className="mb-2"><b>Ảnh mặt sau</b></div>
                                                    <label className="change-id-photo-btn">
                                                        Đổi ảnh
                                                    <input type="file" name="id_card_backside_photo" className="d-none" onChange={(e) => this.handleImage(e, 'backside')} />
                                                    </label>
                                                    <img src={this.state.backsidePhoto} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-primary mr-2" type="submit">Cập nhật</button>
                                            <button className="btn btn-secondary" type="button" onClick={() => this.setState({ show: false })}>Hủy</button>
                                        </div>
                                    </form>
                                </ToggleDisplay>
                            </div>
                        ) : null
                    }
                </Card>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user,
        idCard: state.user.idCard
    }
}

function mapDispatchToProps(dispatch) {
    return {
        verify: (data) => dispatch(verifyIdCard(data)),
        updateIdCardVerify: (data) => dispatch(updateIdCardVerify(data)),
        getIdCardVerify: () => dispatch(getIdCardVerify())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdCardVerify);