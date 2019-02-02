import React, { Component } from 'react';
import { Card, CardWithTitle } from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
// action
import { updateUser, updatePassword } from '../../actions/UserActions';
import { getAllHobbies } from '../../actions/HobbyActions';
import { getAllJobs } from '../../actions/JobActions';
import { getEducations } from '../../actions/EducationActions';
import { getAllProvinces, getAllDistricts, getAllCommunes } from '../../actions/AddressActions';
import { getEthnicities } from '../../actions/EthnicityActions';
import { getReligion } from '../../actions/ReligionActions';
import CurrentUserLayout from './CurrentUserLayout';
import _ from "lodash";
import Modal from 'react-modal';
import moment from 'moment';
import Select from 'react-select';
import 'moment/locale/vi.js';
import { DatePickerInput } from 'rc-datepicker';
import NumericInput from 'react-numeric-input';
import TimePicker from 'react-times';
// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

class EditProfilePage extends Component {
    constructor(props) {
        super(props);
        var ideal_person = props.user.ideal_person ? JSON.parse(props.user.ideal_person) : {};
        var hobbies = props.user.hobbies.map(hobby => {
            return { value: hobby.id, label: hobby.name };
        });

        // clone user props to other variable
        var user = _.cloneDeep(props.user);
        // remove field if it not exist in user table
        delete user.job_name;
        delete user.education_name;
        delete user.ethnicity_name;
        delete user.religion_name;
        delete user.province_name;
        delete user.district_name;
        delete user.village_name;
        delete user.is_id_card_verified;
        delete user.hobbies;

        this.state = {
            data: {
                user: user,
                hobby: []
            },
            ideal_person: ideal_person,
            hobbies: hobbies,
            isOpenAlert: false,
            isOpenAlert2: false,
            isOpenSuccess: false,
            isOpenChangePassword: false,
            alert: ""
        };
    }

    componentDidMount() {
        this.props.getAllDistricts(this.props.user.province_id);
        this.props.getAllCommunes(this.props.user.district_id);
        this.props.getAllHobbies();
        this.props.getAllJobs();
        this.props.getEducations();
        this.props.getAllProvinces();
        this.props.getEthnicities();
        this.props.getReligion();
    }

    editUser(event) {
        this.setState({
            data: {
                ...this.state.data,
                user: {
                    ...this.state.data.user,
                    [event.target.name]: event.target.value
                }
            }
        });
    }

    onChangeDate(date) {
        // console.log(date);
        this.setState({
            data: {
                ...this.state.data,
                user: {
                    ...this.state.data.user,
                    birthday: moment(date).format("YYYY-MM-DD")
                }
            }
        })
    }

    onChangeSelect(option, name) {
        this.setState({
            data: {
                ...this.state.data,
                user: {
                    ...this.state.data.user,
                    [name]: option.value
                }
            }
        })
    }

    onChangeSelectAddress(option, name) {
        let value = option.value;
        switch (name) {
            case "province_id": {
                this.props.getAllDistricts(value);
                this.setState({
                    data: {
                        ...this.state.data,
                        user: {
                            ...this.state.data.user,
                            [name]: value,
                            district_id: null,
                            village_id: null
                        }
                    }
                });
                break;
            }
            case "district_id": {
                this.props.getAllCommunes(value);
                this.setState({
                    data: {
                        ...this.state.data,
                        user: {
                            ...this.state.data.user,
                            [name]: value,
                            village_id: null
                        }
                    }
                });
                break;
            }
            case "village_id": {
                this.setState({
                    data: {
                        ...this.state.data,
                        user: {
                            ...this.state.data.user,
                            [name]: value,
                        }
                    }
                });
                break;
            }
        }
    }

    onChangeHobby(selectedOptions) {
        var temp = selectedOptions.map((option) => {
            return { user_id: this.props.user.id, hobby_id: option.value };
        });

        this.setState({
            data: {
                ...this.state.data,
                hobby: temp
            },
            hobbies: selectedOptions
        });
    }

    onChangeIdealPerson(option, name) {
        this.setState({
            ideal_person: {
                ...this.state.ideal_person,
                [name]: option.value
            }
        }, () => {
            console.log(this.state.ideal_person);
        })
    }

    onChangeIdealPerson2(selectedOption, name) {

        this.setState({
            ideal_person: {
                ...this.state.ideal_person,
                [name]: selectedOption
            }
        }, () => {
            console.log(this.state.ideal_person);
        });
    }

    submit(e) {
        e.preventDefault();

        if (!moment(this.state.data.user.birthday).isValid()) {
            this.setState({ isOpenAlert: false });
            return alert("Ngày sinh không hợp lệ!");
        }

        if (!this.state.data.user.district_id || !this.state.data.user.village_id) {
            this.setState({ isOpenAlert: false });
            return alert("Vui lòng chọn lại quận/huyện và xã/phường của bạn!");
        }

        this.props.updateUser({
            user: {
                ...this.state.data.user,
            },
            hobby: this.state.data.hobby
        }, this.props.user.id).then(data => {
            this.setState({
                isOpenAlert: false,
                isOpenSuccess: true
            });
        });
    }

    submitIdealPerson(e) {
        e.preventDefault();
        this.props.updateUser({ 
            user: { 
                ideal_person: JSON.stringify(this.state.ideal_person) } 
            }, 
            this.props.user.id
        ).then(data => {
            this.setState({
                isOpenAlert2: false,
                isOpenSuccess: true
            });
        });
    }

    openAlert(e) {
        e.preventDefault();
        this.setState({ isOpenAlert: true });
    }

    openAlert2(e) {
        e.preventDefault();
        this.setState({ isOpenAlert2: true });
    }

    onChangePasswordForm(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePassword(e) {
        e.preventDefault();
        this.props.updatePassword({
            old_password: this.state.old_password,
            new_password: this.state.new_password,
            verify_new_password: this.state.verify_new_password
        }).then(data => {
            if (data.ok) {
                this.setState({ isOpenChangePassword: false });
            } else {
                this.setState({ alert: "Đã có lỗi xảy ra. Vui lòng thử lại" });
            }
        });
    }

    render() {
        const { hobbies, jobs, educations, provinces, districts, communes, ethnicities, religions } = this.props;
        var { ideal_person } = this.state;

        var user = this.state.data.user;

        var current_year = new Date().getFullYear();
        var year_arr = [];
        for (let i = current_year - 18; i >= 1950; i--) {
            year_arr.push(i);
        }

        var hobbies_arr = hobbies.map(hobby => {
            return { value: hobby.id, label: hobby.name };
        });

        var job_arr = jobs.map(job => {
            return { value: job.id, label: job.name };
        });

        return (
            <CurrentUserLayout
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                <CardWithTitle title="CẬP NHẬT THÔNG TIN CÁ NHÂN" hasLine={true} className="clearfix">
                    <form onSubmit={(e) => this.openAlert(e)} className="mt-4">

                        <h5>Thông tin tài khoản</h5>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Số điện thoại</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="mobile" defaultValue={user.mobile} readOnly />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Email</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="email" defaultValue={user.email} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Mật khẩu</label>
                                </div>
                                <div className="col-8">
                                    <a href="javascript:void(0);" onClick={() => { this.setState({ isOpenChangePassword: true }) }}>
                                        Đổi mật khẩu
                                    </a>
                                </div>
                            </div>
                        </div>

                        <h5>Thông tin người dùng</h5>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Tên</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="name" defaultValue={user.name} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Ngày sinh</label>
                                </div>
                                <div className="col-8">
                                    <DatePickerInput
                                        className='react-datepicker-component my-react-component'
                                        value={user.birthday}
                                        onChange={(date) => this.onChangeDate(date)}
                                        locale='vi'
                                        showOnInputClick={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Giới tính</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        placeholder={`Chọn giới tính`}
                                        defaultValue={{ value: user.gender, label: (user.gender === "M") ? "Nam" : "Nữ" }}
                                        options={
                                            [
                                                { value: 'M', label: 'Nam' },
                                                { value: 'F', label: 'Nữ' }
                                            ]
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "gender")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <label className="col-12">Chọn địa chỉ</label>
                                <div className="col-4">
                                    <Select
                                        placeholder={`Chọn tỉnh/TP`}
                                        defaultValue={{ value: user.province_id, label: this.props.user.province_name }}
                                        options={
                                            provinces.map((province) => {
                                                return { value: province.matp, label: province.name };
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelectAddress(selectedOption, "province_id")}
                                    />
                                </div>
                                <div className="col-4">
                                    <Select
                                        name="district"
                                        defaultValue={{ value: user.district_id, label: this.props.user.district_name }}
                                        placeholder={`Chọn quận/huyện`}
                                        options={
                                            districts.map((district) => {
                                                return { value: district.maqh, label: district.name };
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelectAddress(selectedOption, "district_id")}
                                    />
                                </div>
                                <div className="col-4">
                                    <Select
                                        placeholder={`Chọn quận/huyện`}
                                        defaultValue={{ value: user.village_id, label: this.props.user.village_name }}
                                        options={
                                            communes.map((commune) => {
                                                return { value: commune.xaid, label: commune.name };
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelectAddress(selectedOption, "village_id")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Chỗ ở hiện tại</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="address" defaultValue={user.address} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Nghề nghiệp</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        placeholder={`Chọn một nghề nghiệp`}
                                        defaultValue={{ value: user.job, label: this.props.user.job_name }}
                                        options={
                                            jobs.map((job) => {
                                                return { value: job.id, label: job.name };
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "job")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Tình trạng hôn nhân</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        placeholder={`Chọn một trạng thái`}
                                        defaultValue={{
                                            value: user.marital_status,
                                            label: this.props.user.marital_status ? ((this.props.user.marital_status === 1) ? "Đã kết hôn" : "Đã từng kết hôn trước đó") : "Độc thân"
                                        }}
                                        options={
                                            [
                                                { value: 0, label: "Độc thân" },
                                                { value: 1, label: "Đã kết hôn" },
                                                { value: 2, label: "Đã từng kết hôn trước đó" }
                                            ]
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "marital_status")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Chiều cao (cm)</label>
                                </div>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="height" defaultValue={user.height} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Cân nặng (kg)</label>
                                </div>
                                <div className="col-8">
                                    <input type="number" className="form-control" name="weight" defaultValue={user.weight} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Học vấn</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        placeholder={`Chọn học vấn`}
                                        defaultValue={{ value: user.education, label: this.props.user.education_name }}
                                        options={
                                            educations.map(item => {
                                                return { value: item.id, label: item.name }
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "education")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Sở thích</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        options={hobbies_arr}
                                        onChange={(selectedOptions) => this.onChangeHobby(selectedOptions)}
                                        isMulti={true}
                                        value={this.state.hobbies}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Dân tộc</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        placeholder={`Chưa xác định`}
                                        defaultValue={{ value: user.ethnicity, label: this.props.user.ethnicity_name }}
                                        options={
                                            ethnicities.map(item => {
                                                return { value: item.id, label: item.name }
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "ethnicity")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Tôn giáo</label>
                                </div>
                                <div className="col-8">
                                    <Select
                                        placeholder={`Chưa xác định`}
                                        defaultValue={{ value: user.religion, label: this.props.user.religion_name }}
                                        options={
                                            religions.map(item => {
                                                return { value: item.id, label: item.name }
                                            })
                                        }
                                        onChange={(selectedOption) => this.onChangeSelect(selectedOption, "religion")}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-4">
                                    <label>Phong cách sống</label>
                                </div>
                                <div className="col-8">
                                    <textarea
                                        className="form-control"
                                        name="lifestyle"
                                        defaultValue={user.lifestyle}
                                        placeholder="Thêm mô tả về tính cách bản thân bạn"
                                        onChange={(event) => this.editUser(event)}
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success float-right" type="submit">Cập nhật</button>
                        </div>
                    </form>
                </CardWithTitle>


                <CardWithTitle title="CẬP NHẬT MẪU NGƯỜI LÝ TƯỞNG" hasLine={true}>
                    <form onSubmit={(e) => this.openAlert2(e)} className="mt-4">
                        <div className="form-group row">
                            <div className="col-4">
                                Năm sinh
                                </div>
                            <div className="col-4">
                                <Select
                                    placeholder={`Nhỏ nhất`}
                                    defaultValue={{ value: ideal_person.min_year, label: ideal_person.min_year }}
                                    options={
                                        year_arr.map(item => {
                                            return { value: item, label: item }
                                        })
                                    }
                                    onChange={(selectedOption) => this.onChangeIdealPerson(selectedOption, "min_year")}
                                />
                            </div>
                            <div className="col-4">
                                <Select
                                    placeholder={`Lớn nhất`}
                                    defaultValue={{ value: ideal_person.max_year, label: ideal_person.max_year }}
                                    options={
                                        year_arr.map(item => {
                                            return { value: item, label: item }
                                        })
                                    }
                                    onChange={(selectedOption) => this.onChangeIdealPerson(selectedOption, "max_year")}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                Giới tính
                                </div>
                            <div className="col-8">
                                <Select
                                    placeholder={`Chọn giới tính`}
                                    defaultValue={{ value: ideal_person.gender, label: (ideal_person.gender === "M") ? "Nam" : "Nữ" }}
                                    options={
                                        [
                                            { value: "M", label: "Nam" },
                                            { value: "F", label: "Nữ" }
                                        ]
                                    }
                                    onChange={(selectedOption) => this.onChangeIdealPerson(selectedOption, "gender")}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                Tình trạng hôn nhân
                            </div>
                            <div className="col-8">
                                <Select
                                    placeholder={`Chọn một trạng thái`}
                                    defaultValue={{
                                        value: ideal_person.marital_status,
                                        label: ideal_person.marital_status ? (ideal_person.marital_status === 1 ? "Đã kết hôn" : "Đã từng kết hôn trước đó") : "Độc thân"  
                                    }}
                                    options={
                                        [
                                            { value: 0, label: "Độc thân" },
                                            { value: 1, label: "Đã kết hôn" },
                                            { value: 2, label: "Đã từng kết hôn trước đó" }
                                        ]
                                    }
                                    onChange={(selectedOption) => this.onChangeIdealPerson(selectedOption, "marital_status")}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                Nghề nghiệp
                                </div>
                            <div className="col-8">
                                <Select
                                    options={job_arr}
                                    onChange={(selectedOptions) => this.onChangeIdealPerson2(selectedOptions, "jobs")}
                                    isMulti={true}
                                    defaultValue={ideal_person.jobs}
                                />
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                Dân tộc
                                </div>
                            <div className="col-8">
                            {
                                <Select
                                    placeholder={`Chọn một`}
                                    options={
                                        ethnicities.map(item => {
                                            return {value: item.id, label: item.name}
                                        })
                                    }
                                    defaultValue={ideal_person.ethnicity}
                                    onChange={(selectedOption) => this.onChangeIdealPerson2(selectedOption, "ethnicity")}
                                />
                            }
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                Tôn giáo
                                </div>
                            <div className="col-8">
                            {
                                <Select
                                    placeholder={`Chọn một`}
                                    options={
                                        religions.map(item => {
                                            return {value: item.id, label: item.name}
                                        })
                                    }
                                    defaultValue={ideal_person.religion}
                                    onChange={(selectedOption) => this.onChangeIdealPerson2(selectedOption, "religion")}
                                />
                            }
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success float-right" type="submit">Cập nhật</button>
                        </div>
                    </form>
                </CardWithTitle>
                <Modal isOpen={this.state.isOpenAlert}>
                    <h5>Bạn có chắc chắn muốn sửa thông tin cá nhân?</h5>
                    <hr />
                    <button className="float-right btn btn-sm btn-primary" onClick={(e) => this.submit(e)}>
                        Đồng ý
                    </button>
                    <button className="float-right btn btn-sm btn-secondary mr-2" onClick={() => { this.setState({ isOpenAlert: false }) }}>
                        Hủy
                    </button>
                </Modal>
                <Modal isOpen={this.state.isOpenAlert2}>
                    <h5>Bạn có chắc chắn muốn sửa thông tin mẫu người lý tưởng?</h5>
                    <hr />
                    <button className="float-right btn btn-sm btn-primary" onClick={(e) => this.submitIdealPerson(e)}>
                        Đồng ý
                    </button>
                    <button className="float-right btn btn-sm btn-secondary mr-2" onClick={() => { this.setState({ isOpenAlert: false }) }}>
                        Hủy
                    </button>
                </Modal>
                <Modal isOpen={this.state.isOpenSuccess}>
                    <h5>Bạn đã cập nhật thông tin thành công</h5>
                    <hr />
                    <button className="float-right btn btn-primary" onClick={() => { this.setState({ isOpenSuccess: false }) }}>
                        Đóng
                    </button>
                </Modal>
                <Modal isOpen={this.state.isOpenChangePassword}>
                    <h5>Đổi mật khẩu</h5>
                    <hr />
                    <form onSubmit={(e) => this.onChangePassword(e)}>
                        {
                            this.state.alert ? (
                                <div className="alert alert-danger">
                                    {this.state.alert}
                                </div>
                            ) : null
                        }

                        <div className="row mb-4">
                            <div className="col-md-4 col-sm-12">Mật khẩu cũ</div>
                            <div className="col-md-8 col-sm-12">
                                <input type="password" className="form-control" name="old_password" onChange={(e) => this.onChangePasswordForm(e)} />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-4 col-sm-12">Mật khẩu mới</div>
                            <div className="col-md-8 col-sm-12">
                                <input type="password" className="form-control" name="new_password" onChange={(e) => this.onChangePasswordForm(e)} />
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-4 col-sm-12">Nhập lại mật khẩu mới</div>
                            <div className="col-md-8 col-sm-12">
                                <input type="password" className="form-control" name="verify_new_password" onChange={(e) => this.onChangePasswordForm(e)} />
                            </div>
                        </div>
                        <div className="float-right">
                            <button className="btn btn-sm btn-secondary mr-2" type="button" onClick={() => this.setState({ isOpenChangePassword: false })}>Hủy</button>
                            <button className="btn btn-sm btn-primary" type="submit" >OK</button>
                        </div>
                    </form>
                </Modal>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        hobbies: state.hobby.hobbies,
        jobs: state.job.jobs,
        educations: state.education.educations,
        provinces: state.address.provinces,
        districts: state.address.districts,
        communes: state.address.communes,
        ethnicities: state.ethnicity.ethnicities,
        religions: state.religion.religions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentUserDetail: () => dispatch(getCurrentUserDetail()),
        getAllHobbies: () => dispatch(getAllHobbies()),
        getAllJobs: () => dispatch(getAllJobs()),
        getEducations: () => dispatch(getEducations()),
        updateUser: (data, id) => dispatch(updateUser(data, id)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
        getAllCommunes: (district_id) => dispatch(getAllCommunes(district_id)),
        getEthnicities: () => dispatch(getEthnicities()),
        getReligion: () => dispatch(getReligion()),
        updatePassword: (data) => dispatch(updatePassword(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);