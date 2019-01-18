import React, { Component } from 'react';
import {Card} from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
// action
import { updateUser, updatePassword } from '../../actions/UserActions';
import {getAllHobbies} from '../../actions/HobbyActions';
import {getAllJobs} from '../../actions/JobActions';
import {getEducations} from '../../actions/EducationActions';
import {getAllProvinces, getAllDistricts, getAllCommunes} from '../../actions/AddressActions';
import {getEthnicities} from '../../actions/EthnicityActions';
import {getReligion} from '../../actions/ReligionActions';
import CurrentUserLayout from './CurrentUserLayout';
import Select from 'react-select';
import _ from "lodash";
import Modal from 'react-modal';

class EditProfilePage extends Component {
    constructor(props) {
        super(props);
        var ideal_person = props.user.ideal_person ? JSON.parse(props.user.ideal_person) : {};
        var hobbies = props.user.hobbies.map(hobby => {
            return {value: hobby.id, label: hobby.name};
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
        }, () => {
            console.log(this.state.data);
        });
    }

    onChangeHobby(selectedOptions) {
        var temp = selectedOptions.map((option) => {
            return {user_id: this.props.user.id, hobby_id: option.value};
        });
        
        this.setState({
            data: {
                ...this.state.data,
                hobby: temp
            },
            hobbies: selectedOptions
        });
    }

    onChangeProvince(e) {
        var province_id = e.target.value;
        this.setState({
            data: {
                ...this.state.data,
                user: {
                    ...this.state.data.user,
                    province_id: province_id
                }
            }
        }, () => {
            this.props.getAllDistricts(province_id);
        });
    }

    onChangeDistrict(e) {
        var district_id = e.target.value;
        this.setState({
            data: {
                ...this.state.data,
                user: {
                    ...this.state.data.user,
                    district_id: district_id
                }
            }
        }, () => {
            this.props.getAllCommunes(district_id);
        });
    }

    onChangeIdealPerson(e) {
        this.setState({
            ideal_person: {
                ...this.state.ideal_person,
                [e.target.name]: e.target.value
            }
        }, () => {
            console.log(this.state.ideal_person);
        })
    }

    onChangeIdealPersonJobs(selectedOptions) {
        this.setState({
            ideal_person: {
                ...this.state.ideal_person,
                jobs: selectedOptions
            }
        });
    }

    submit(e) {
        e.preventDefault();
        this.props.updateUser({
            user: {
                ...this.state.data.user,
                // ideal_person: JSON.stringify(this.state.ideal_person)
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
        this.props.updateUser({user: {ideal_person: JSON.stringify(this.state.ideal_person)}}, this.props.user.id);
    }

    openAlert(e) {
        e.preventDefault();
        this.setState({isOpenAlert: true});
    }

    onChangePasswordForm(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onChangePassword(e) {
        e.preventDefault();
        console.log(this.state)
        this.props.updatePassword({
            old_password: this.state.old_password,
            new_password: this.state.new_password,
            verify_new_password: this.state.verify_new_password
        }).then(data => {
            if(data.ok) {
                console.log(data);
                this.setState({isOpenChangePassword: false});
            } else {
                this.setState({alert: "Đã có lỗi xảy ra. Vui lòng thử lại"});
            } 
        });
    }

    render() {
        const {hobbies, jobs, educations, provinces, districts, communes, ethnicities, religions} = this.props;
        var {ideal_person} = this.state;
        var user = this.state.data.user;

        var current_year = new Date().getFullYear();
        var year_arr = [];
        for(let i=current_year-18; i>=1950; i--) {
            year_arr.push(i);
        }

        var hobbies_arr = hobbies.map(hobby => {
            return {value: hobby.id, label: hobby.name};
        });

        var job_arr = jobs.map(job => {
            return {value: job.id, label: job.name};
        });

        console.log(this.state.alert)
        
        return (
            <CurrentUserLayout
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                <Card className="clearfix">
                    <h5 className="page-header">Cập nhật thông tin cá nhân</h5>
                    <hr/>
                    <form onSubmit={(e) => this.openAlert(e)} className="mt-4">
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
                                    <input type="date" className="form-control" name="birthday" defaultValue={user.birthday} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Giới tính</label>
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="gender" onChange={(event) => this.editUser(event)} defaultValue={user.gender}>
                                        <option>Chọn giới tính</option>
                                        <option value="M">Nam</option>
                                        <option value="F">Nữ</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                    <label className="col-12">Chọn địa chỉ</label>
                                    <div className="col-4">
                                        <select className="custom-select" onChange={(e) => this.onChangeProvince(e)} value={user.province_id}>
                                            <option value="">Chọn tỉnh/TP</option>
                                            {
                                                provinces.map((province, index) => {
                                                    return (
                                                        <option value={province.matp} key={index}>
                                                            {province.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="custom-select" onChange={(e) => this.onChangeDistrict(e)} value={user.district_id}>
                                            <option value="">Chọn quận/huyện</option>
                                            {
                                                districts.map((item, index) => {
                                                    return (
                                                        <option value={item.maqh} key={index}>
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="custom-select" name="village_id" onChange={(e) => this.editUser(e)} value={user.village_id}>
                                            <option value="">Chọn xã/phường</option>
                                            {
                                                communes.map((item, index) => {
                                                    return (
                                                        <option value={item.xaid} key={index}>
                                                            {item.name}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </select>
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
                                    <select name="job" className="custom-select" onChange={(event) => this.editUser(event)} value={user.job}>
                                        <option>Chọn một nghề nghiệp</option>
                                        {
                                            jobs.map(job => {
                                                return (
                                                    <option key={job.id} value={job.id}>
                                                        {job.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Tình trạng hôn nhân</label>
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="marital_status" onChange={(event) => this.editUser(event)} value={user.marital_status}> 
                                        <option value="">Chọn một trạng thái</option>
                                        <option value={0}>Độc thân</option>
                                        <option value={1}>Đã kết hôn</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Số điện thoại</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="mobile" defaultValue={user.mobile} onChange={(event) => this.editUser(event)} />
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
                                    <a href="javascript:void(0);" onClick={() => {this.setState({isOpenChangePassword: true})}}>Đổi mật khẩu</a>
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
                                    <select className="custom-select" name="education" onChange={(event) => this.editUser(event)} value={user.education}>
                                        <option>Chọn học vấn</option>
                                        {
                                            educations.map(item => {
                                                return (
                                                    <option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
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
                                    <select name="ethnicity" className="custom-select" value={user.ethnicity} onChange={(event) => this.editUser(event)}>
                                        <option value="">Không xác định</option>
                                        {
                                            ethnicities.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Tôn giáo</label>
                                </div>
                                <div className="col-8">
                                    <select name="religion" className="custom-select" value={user.religion} onChange={(event) => this.editUser(event)}>
                                        <option value="">Không tôn giáo</option>
                                        {
                                            religions.map((item, index) => {
                                                return (
                                                    <option value={item.id} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
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
                </Card>
                <Card className="clearfix">
                        <h5 className="page-header">Cập nhật mẫu người lý tưởng</h5>
                        <hr/>
                        <form onSubmit={(e) => this.submitIdealPerson(e)} className="mt-4">
                            <div className="form-group row">
                                <div className="col-4">
                                    Năm sinh
                                </div> 
                                <div className="col-4">
                                    <select className="custom-select" name="min_year" value={ideal_person.min_year} onChange={(e) => this.onChangeIdealPerson(e)} required>
                                        <option value="">Nhỏ nhất</option>
                                    {
                                        year_arr.map(item => {
                                            return (
                                                <option value={item} key={item}>{item}</option>
                                            )
                                        }) 
                                    }
                                    </select>
                                </div>     
                                <div className="col-4">
                                    <select className="custom-select" name="max_year" value={ideal_person.max_year}  onChange={(e) => this.onChangeIdealPerson(e)} required>
                                        <option value="">Lớn nhất</option>  
                                    {
                                        year_arr.map(item => {
                                            return (
                                                <option value={item} key={item}>{item}</option>
                                            )
                                        }) 
                                    }
                                    </select>
                                </div>               
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Giới tính
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="gender" value={ideal_person.gender} onChange={(e) => this.onChangeIdealPerson(e)} required>
                                        <option value="">Chọn một</option>
                                        <option value="M">Nam</option>
                                        <option value="F">Nữ</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Tình trạng hôn nhân
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="marital_status" value={ideal_person.marital_status} onChange={(e) => this.onChangeIdealPerson(e)} required>
                                        <option value="">Chọn một</option>
                                        <option value={0}>Độc thân</option>
                                        <option value={1}>Đã kết hôn</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Nghề nghiệp
                                </div>
                                <div className="col-8">
                                    <Select 
                                        options={job_arr}
                                        onChange={(selectedOptions) => this.onChangeIdealPersonJobs(selectedOptions)}
                                        isMulti={true}
                                        value={ideal_person.jobs}
                                    />
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Dân tộc
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="ethnicity" value={ideal_person.ethnicity} onChange={(e) => this.onChangeIdealPerson(e)}>
                                        <option value="">Chọn một</option>
                                        {
                                            ethnicities.map(item => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-4">
                                    Tôn giáo
                                </div>
                                <div className="col-8">
                                    <select className="custom-select" name="religion" value={ideal_person.religion} onChange={(e) => this.onChangeIdealPerson(e)}>
                                        <option value={0}>Không tôn giáo</option>
                                        {
                                            religions.map(item => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-success float-right" type="submit">Cập nhật</button>
                            </div>
                        </form>
                </Card>
                <Modal  isOpen={this.state.isOpenAlert}>
                    <h5>Bạn có chắc chắn muốn sửa thông tin cá nhân?</h5>
                    <hr/>
                    <button className="float-right btn btn-sm btn-primary" onClick={(e) => this.submit(e)}>Đồng ý</button>
                    <button className="float-right btn btn-sm btn-secondary" onClick={() => {this.setState({isOpenAlert: false})}}>
                        Hủy
                    </button>
                </Modal>
                <Modal  isOpen={this.state.isOpenSuccess}>
                    <h5>Bạn đã cập nhật thông tin thành công</h5>
                    <hr/>
                    <button className="float-right btn btn-primary" onClick={() => {this.setState({isOpenSuccess: false})}}>
                        Đóng
                    </button>
                </Modal>
                <Modal isOpen={this.state.isOpenChangePassword}>
                    <h5>Đổi mật khẩu</h5>
                    <hr/>
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
                                <input type="password" className="form-control" name="old_password" onChange={(e) => this.onChangePasswordForm(e)}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-4 col-sm-12">Mật khẩu mới</div>
                            <div className="col-md-8 col-sm-12">
                                <input type="password" className="form-control" name="new_password" onChange={(e) => this.onChangePasswordForm(e)}/>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-4 col-sm-12">Nhập lại mật khẩu mới</div>
                            <div className="col-md-8 col-sm-12">
                                <input type="password" className="form-control" name="verify_new_password" onChange={(e) => this.onChangePasswordForm(e)}/>
                            </div>
                        </div>
                        <div className="float-right">
                            <button className="btn btn-sm btn-secondary" type="button" onClick={() => this.setState({isOpenChangePassword: false})}>Hủy</button>
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
        getAllCommunes: (district_id)  => dispatch(getAllCommunes(district_id)),
        getEthnicities: () => dispatch(getEthnicities()),
        getReligion: () => dispatch(getReligion()),
        updatePassword: (data) => dispatch(updatePassword(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage);