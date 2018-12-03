import React, { Component } from 'react';
import {CardWithIcon} from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-responsive-modal';
// action
import { updateUser } from '../../actions/UserActions';
import {getAllHobbies} from '../../actions/HobbyActions';
import {getAllJobs} from '../../actions/JobActions';
import {getEducations} from '../../actions/EducationActions';
import {getAllProvinces, getAllDistricts, getAllCommunes} from '../../actions/AddressActions';
import {getEthnicities} from '../../actions/EthnicityActions';
import {getReligion} from '../../actions/ReligionActions';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpenFirstModal: false, 
            isOpenSecondModal: false,
            isOpenThirdModal: false,
            data: {
                user: {},
            },
            ideal_person: {
                religion: 0
            }
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

    openFirstModal() {
        this.setState({ user: {}, isOpenFirstModal: true });
    }

    closeFirstModal() {
        this.setState({ isOpenFirstModal: false });
    }

    openSecondModal() {
        this.setState({ user: {}, isOpenSecondModal: true });
    }

    closeSecondModal() {
        this.setState({ isOpenSecondModal: false });
    }

    openThirdModal() {
        this.setState({isOpenThirdModal: true});
    }

    closeThirdModal() {
        this.setState({ isOpenThirdModal: false });
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

    onChangeHobby(event, user_id) {
        var options = Array.apply(null, event.target.options);
        var temp = [];
        options.map((option) => {
            if (option.selected) {
                temp.push({user_id: user_id, hobby_id: option.value});
            }
        });
        
        this.setState({
            data: {
                ...this.state.data,
                hobby: temp
            }
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
        if(e.target.name === 'jobs') {
            var options = Array.apply(null, e.target.options);
            var temp = [];
            options.map((option) => {
                if (option.selected) {
                    temp.push(option.value);
                }
            });
            
            this.setState({
                ideal_person: {
                    ...this.state.ideal_person,
                    jobs: temp
                }
            });
        } else {
            this.setState({
                ideal_person: {
                    ...this.state.ideal_person,
                    [e.target.name]: e.target.value
                }
            })
        }
        console.log(this.state.ideal_person);
    }

    submit() {
        this.props.updateUser(this.state.data, this.props.user.id);
    }

    submitIdealPerson(e) {
        e.preventDefault();
        this.props.updateUser({user: {ideal_person: JSON.stringify(this.state.ideal_person)}}, this.props.user.id);
    }

    render() {
        const {user, hobbies, jobs, educations, provinces, districts, communes, ethnicities, religions} = this.props;
        var ideal_person = user.ideal_person ? JSON.parse(user.ideal_person) : {};
        var curent_year = new Date().getFullYear();
        var year_arr = [];
        for(let i=curent_year-18; i>=1950; i--) {
            year_arr.push(i);
        }

        var hobbies_arr =  user.hobbies.map(hobby => {
            return hobby.id;
        });

        return (
            <div>
                <div>
                    <CardWithIcon 
                        leftIcon="fas fa-info-circle" 
                        rightIcon="fas fa-pen-square" 
                        hasLine={true} 
                        rightIconAction={() => this.openFirstModal()}
                        title="THÔNG TIN CƠ BẢN"
                    >
                        <div className="row">
                            <div className="col-4">Tên</div>
                            <div className="col-8">{user.name}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Ngày sinh</div>
                            <div className="col-8">{user.birthday}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Giới tính</div>
                            <div className="col-8">{(user.gender === 'M') ? "Nam" : (user.gender === 'F' ? "Nữ" : "Chưa xác định")}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Quê quán</div>
                            <div className="col-8">{user.village_name}, {user.district_name}, {user.province_name}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Chỗ ở hiện tại</div>
                            <div className="col-8">{user.address}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Nghề nghiệp</div>
                            <div className="col-8">{user.job_name}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Tình trạng hôn nhân</div>
                            <div className="col-8">{(user.marital_status == 0) ? "Độc thân" : "Đã kết hôn"}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Số điện thoại</div>
                            <div className="col-8">{user.mobile}</div>
                        </div>
                    </CardWithIcon>
                    <CardWithIcon 
                        leftIcon="fas fa-user" 
                        rightIcon="fas fa-pen-square" 
                        hasLine={true}
                        title="THÔNG TIN TÀI KHOẢN"
                    >
                        <div className="row">
                            <div className="col-4">Email</div>
                            <div className="col-8">{user.email}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Mật khẩu</div>
                            <div className="col-8">
                                <a href="#">Đổi mật khẩu</a>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Chứng thực hồ sơ</div>
                            <div className="col-8"></div>
                        </div>
                    </CardWithIcon>
                    <CardWithIcon 
                        leftIcon="fas fa-user" 
                        rightIcon="fas fa-pen-square" 
                        hasLine={true} 
                        rightIconAction={() => this.openSecondModal()}
                        title="SƠ YẾU LÝ LỊCH"
                    >
                        <div className="row">
                            <div className="col-4">Chiều cao</div>
                            <div className="col-8">
                                {user.height ? `${user.height} cm` : "Chưa xác định"}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Cân nặng</div>
                            <div className="col-8">
                                {user.weight ? `${user.weight} kg` : "Chưa xác định"}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Học vấn</div>
                            <div className="col-8">{user.education_name}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Sở thích</div>
                            <div className="col-8">
                            {
                                user.hobbies.map((item, index) => {
                                    return (
                                        <span key={index}>{item.name}, </span>
                                    )
                                })
                            }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Dân tộc</div>
                            <div className="col-8">{user.ethnicity_name ? user.ethnicity_name : "Chưa xác định"}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Tôn giáo</div>
                            <div className="col-8">{user.religion_name ? user.religion_name : "Chưa xác định"}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Phong cách sống</div>
                            <div className="col-8">{user.lifestyle}</div>
                        </div>
                    </CardWithIcon>
                    <CardWithIcon 
                        leftIcon="fas fa-user" 
                        rightIcon="fas fa-pen-square" 
                        hasLine={true} 
                        rightIconAction={() => this.openThirdModal()}
                        title="TIÊU CHÍ TÌM NGƯỜI ẤY"
                    >
                        <div className="row">
                            <div className="col-4">Độ tuổi</div>
                            <div className="col-8">
                                {
                                    ideal_person.yearOfBirth ? (
                                        curent_year - ideal_person.yearOfBirth.max + "-" + curent_year - ideal_person.yearOfBirth.min
                                    ) : "Chưa xác định"
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Giới tính</div>
                            <div className="col-8">
                                {
                                    ideal_person.gender ? (
                                        ideal_person.gender === "M" ? "Nam" : "Nữ"
                                    ) : "Chưa xác định"
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Tình trạng hôn nhân</div>
                            <div className="col-8">
                            {
                                ideal_person.marial_status > 0 ? (
                                    (ideal_person.marial_status === 0) ? 'Độc thân' : "Đã kết hôn"
                                ) : "Chưa xác định"
                            }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Nghề nghiệp</div>
                            <div className="col-8">
                                {
                                    ideal_person.jobs ? (
                                        ideal_person.jobs.map((item, index) => {
                                            return (
                                                <span key={index} className="mr-1">{item},</span>
                                            )
                                        })
                                    ) : "Chưa xác định"
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-4">Dân tộc</div>
                            <div className="col-8">{ideal_person.ethnicity ? ideal_person.ethnicity : "Chưa xác định"}</div>
                        </div>
                        <div className="row">
                            <div className="col-4">Tôn giáo</div>
                            <div className="col-8">{ideal_person.religion ? ideal_person.religion : "Chưa xác định"}</div>
                        </div>
                    </CardWithIcon>
                </div>
                {/* Form in modal */}
                <Modal open={this.state.isOpenFirstModal} onClose={() => this.closeFirstModal()} center>
                    <div className="page-header">
                        <h5>Edit User</h5>
                    </div>
                    <form>
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
                                        <select className="custom-select" defaultValue={user.province_id} onChange={(e) => this.onChangeProvince(e)}>
                                            <option value="">Chọn tỉnh/TP</option>
                                            {
                                                provinces.map((province, index) => {
                                                    return (
                                                        <option value={province.matp} key={index}>{province.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="custom-select" defaultValue={user.district_id} onChange={(e) => this.onChangeDistrict(e)}>
                                            <option value="">Chọn quận/huyện</option>
                                            {
                                                districts.map((item, index) => {
                                                    return (
                                                        <option value={item.maqh} key={index}>{item.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="col-4">
                                        <select className="custom-select" defaultValue={user.village_id} name="village_id" onChange={(e) => this.editUser(e)}>
                                            <option value="">Chọn xã/phường</option>
                                            {
                                                communes.map((item, index) => {
                                                    return (
                                                        <option value={item.xaid} key={index}>{item.name}</option>
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
                                    <select name="job" className="custom-select" defaultValue={user.job_id} onChange={(event) => this.editUser(event)}>
                                        <option>Chọn một nghề nghiệp</option>
                                        {
                                            jobs.map(job => {
                                                return (
                                                    <option key={job.id} value={job.id}>{job.name}</option>
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
                                    <select className="custom-select" name="marital_status" defaultValue={user.marital_status} onChange={(event) => this.editUser(event)}>
                                        <option>Chọn một trạng thái</option>
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
                            <button className="btn btn-success float-right" type="button" onClick={() => this.submit()}>Cập nhật</button>
                        </div>
                    </form>
                </Modal>
                {/* Form in modal */}
                <Modal open={this.state.isOpenSecondModal} onClose={() => this.closeSecondModal()} center>
                    <div className="page-header">
                        <h5>Edit User</h5>
                    </div>
                    <form>
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
                                    <select className="custom-select" name="education" defaultValue={user.education} onChange={(event) => this.editUser(event)}>
                                        <option>Chọn học vấn</option>
                                        {
                                            educations.map(item => {
                                                return (
                                                    <option key={item.id} value={item.id}>{item.name}</option>
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
                                    <select name="hobby_id" className="custom-select" defaultValue={hobbies_arr} onChange={(event) => this.onChangeHobby(event, user.id)} multiple>
                                        {
                                            hobbies.map((item, index) => {
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
                                    <label>Dân tộc</label>
                                </div>
                                <div className="col-8">
                                    <select name="ethnicity" className="custom-select" defaultValue={user.ethnicity} onChange={(event) => this.editUser(event)}>
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
                                    <select name="religion" className="custom-select" defaultValue={user.religion} onChange={(event) => this.editUser(event)}>
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
                            <button className="btn btn-success float-right" type="button" onClick={() => this.submit()}>Gửi</button>
                        </div>
                    </form>
                </Modal>
                {/* edit ideal person */}
                <Modal open={this.state.isOpenThirdModal} onClose={() => this.closeThirdModal()} center>
                    <div className="page-header">
                        <h5>Tiêu chí tìm người ấy</h5>
                    </div>
                    <form onSubmit={(e) => this.submitIdealPerson(e)}>
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
                                <select className="custom-select" name="jobs" value={ideal_person.jobs} onChange={(e) => this.onChangeIdealPerson(e)} required multiple>
                                    {
                                        jobs.map(job => {
                                            return (
                                                <option key={job.id} value={job.id}>{job.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="form-group row">
                            <div className="col-4">
                                Dân tộc
                            </div>
                            <div className="col-8">
                                <select className="custom-select" name="ethnicity" value={ideal_person.ethnicity} onChange={(e) => this.onChangeIdealPerson(e)} required>
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
                                <select className="custom-select" name="religion" value={ideal_person.religion} onChange={(e) => this.onChangeIdealPerson(e)} required>
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
                            <button className="btn btn-success float-right" type="submit">Gửi</button>
                        </div>
                    </form>
                </Modal>
            </div>
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
        getReligion: () => dispatch(getReligion())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);