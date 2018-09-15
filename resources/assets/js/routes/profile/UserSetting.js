import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import ProfileLayout from './ProfileLayout';
import { getUserDetail } from '../../actions/UserActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import InputRange from 'react-input-range';
import '../../../../../node_modules/react-input-range/lib/css/index.css';
import Modal from 'react-responsive-modal';

class UserSetting extends Component {
    constructor(props) {
        super(props);
        this.state = { isOpen: false };
    }

    componentDidMount() {
        this.props.getUserDetail(this.props.match.params.id);
    }

    openModal() {
        this.setState({ isOpen: true });
    }

    closeModal() {
        console.log(this);
        this.setState({ isOpen: false });
    }

    editUser(event) {
        this.setState({
            user: {
                [event.target.name]: event.target.value
            }
        }, () => {
            console.log(this.state.user);
        })
    }

    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <ProfileLayout
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                {
                    !user ? null : (
                        <div>
                            <Card leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true} rightActionIcon={() => this.openModal()}>
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
                                    <div className="col-8">{user.gender == 'M' ? "Nam" : "Nữ"}</div>
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
                                    <div className="col-8">{user.marital_status}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Số điện thoại</div>
                                    <div className="col-8">{user.mobile}</div>
                                </div>
                            </Card>
                            <Card leftIcon="fas fa-user" rightIcon="fas fa-pen-square" hasLine={true}>
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
                            </Card>
                            <Card leftIcon="fas fa-user" rightIcon="fas fa-pen-square" hasLine={true}>
                                <h6>Tiêu chí tìm người ấy của bạn</h6>
                                <div className="row">
                                    <div className="col-4">Chiều cao (cm)</div>
                                    <div className="col-8">
                                        <InputRange
                                            maxValue={200}
                                            minValue={140}
                                            value={parseInt(user.height)}
                                            onChange={value => this.setState({ user_height: value })}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Cân nặng (kg)</div>
                                    <div className="col-8">
                                        <InputRange
                                            maxValue={100}
                                            minValue={30}
                                            value={parseFloat(user.weight)}
                                            onChange={value => this.setState({ user_weight: value })}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Học vấn</div>
                                    <div className="col-8">{user.education}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Sở thích</div>
                                    <div className="col-8">{user.favourite}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Tuýp người</div>
                                    <div className="col-8">{user.type}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Quan điểm sống</div>
                                    <div className="col-8">{user.philosophy}</div>
                                </div>
                            </Card>
                        </div>
                    )
                }
                {/* Form in modal */}
                <Modal open={this.state.isOpen} onClose={() => this.closeModal()} center>
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
                                    {/* <input type="text" className="form-control" name="gender" defaultValue={user.gender} onChange={(event) => this.editUser(event)} /> */}
                                    <select name="gender" onChange={(event) => this.editUser(event)} className="form-control" defaultValue={user.gender}>
                                        <option value="M" selected>Nam</option>
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
                                    <input type="text" className="form-control" name="job" defaultValue={user.job} onChange={(event) => this.editUser(event)} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row align-items-center">
                                <div className="col-4">
                                    <label>Tình trạng hôn nhân</label>
                                </div>
                                <div className="col-8">
                                    <input type="text" className="form-control" name="marital_status" defaultValue={user.marital_status} onChange={(event) => this.editUser(event)} />
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
                    </form>
                </Modal>
            </ProfileLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDetail: (id) => dispatch(getUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserSetting));