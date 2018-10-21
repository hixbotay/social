import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import {CardWithIcon} from '../../components/Card';
import CurrentUserLayout from './CurrentUserLayout';
import Modal from 'react-responsive-modal';

// action
import { getCurrentUserDetail, updateUser } from '../../actions/UserActions';
import {getAllHobbies} from '../../actions/HobbyActions';
import {getAllJobs} from '../../actions/JobActions';
import {getEducations} from '../../actions/EducationActions';

class UserSetting extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isOpenFirstModal: false, 
            isOpenSecondModal: false,
            data: {
                user: {},
            }
        };
    }

    componentDidMount() {
        this.props.getCurrentUserDetail();
        this.props.getAllHobbies();
        this.props.getAllJobs();
        this.props.getEducations();
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

    submit() {
        this.props.updateUser(this.state.data, this.props.user.id);
    }

    render() {
        const { user, user_hobbies, hobbies, jobs, educations } = this.props;
        if(this.props.match.params.id) {
            if(user.id != this.props.match.params.id) {
                return <Redirect to={`/profile/${user.id}/setting`}/>
            }
        }

        var hobbies_arr =  user_hobbies.map(hobby => {
            return hobby.id;
        });
        
        return (
            <CurrentUserLayout
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                {
                    !user ? null : (
                        <div>
                            <CardWithIcon leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true} rightIconAction={() => this.openFirstModal()}>
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
                                    <div className="col-8">{(user.gender === 'M') ? "Nam" : "Nữ"}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Quê quán</div>
                                    <div className="col-8">{user.home_town}</div>
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
                            <CardWithIcon leftIcon="fas fa-user" rightIcon="fas fa-pen-square" hasLine={true}>
                                <div className="row">
                                    <div className="col-4">Email</div>
                                    <div className="col-8">{user.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Mật khẩu</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Chứng thực hồ sơ</div>
                                    <div className="col-8"></div>
                                </div>
                            </CardWithIcon>
                            <CardWithIcon leftIcon="fas fa-user" rightIcon="fas fa-pen-square" hasLine={true} rightIconAction={() => this.openSecondModal()}>
                                <h6>Tiêu chí tìm người ấy của bạn</h6>
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
                                        user_hobbies.map((item, index) => {
                                            return (
                                                <div className="tag" key={index}>
                                                    {item.name}
                                                </div>
                                            )
                                        })
                                    }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Tuýp người</div>
                                    <div className="col-8">{user.type}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Quan điểm sống</div>
                                    <div className="col-8">{user.philosophy}</div>
                                </div>
                            </CardWithIcon>
                        </div>
                    )
                }
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
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Quê quán</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="home_town" defaultValue={user.home_town} onChange={(event) => this.editUser(event)} />
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
                                    <label>Tuýp người</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="type" defaultValue={user.type} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Quan điểm sống</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="philosophy" defaultValue={user.philosophy} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success float-right" type="button" onClick={() => this.submit()}>Gửi</button>
                        </div>
                    </form>
                </Modal>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user,
        user_hobbies: state.user.user_hobbies,
        hobbies: state.hobby.hobbies,
        jobs: state.job.jobs,
        educations: state.education.educations
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCurrentUserDetail: () => dispatch(getCurrentUserDetail()),
        getAllHobbies: () => dispatch(getAllHobbies()),
        getAllJobs: () => dispatch(getAllJobs()),
        getEducations: () => dispatch(getEducations()),
        updateUser: (data, id) => dispatch(updateUser(data, id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSetting));