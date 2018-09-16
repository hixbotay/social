import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class FirstEditForm extends Component {
    render() {
        const {user} = this.props;

        return (
            <div>
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
                                <input type="text" className="form-control" name="name" defaultValue={user.name} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Ngày sinh</label>
                            </div>
                            <div className="col-8">
                                <input type="date" className="form-control" name="birthday" defaultValue={user.birthday} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Giới tính</label>
                            </div>
                            <div className="col-8">
                                <select className="custom-select" name="gender" onChange={(event) => this.props.editUser(event)} defaultValue={user.gender}>
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
                                <input type="text" className="form-control" name="home_town" defaultValue={user.home_town} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Chỗ ở hiện tại</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="address" defaultValue={user.address} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Nghề nghiệp</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control"  name="job" defaultValue={user.job_name} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Tình trạng hôn nhân</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="marital_status" defaultValue={user.marital_status} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Số điện thoại</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="mobile" defaultValue={user.mobile} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-success float-right" type="button">Gửi</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FirstEditForm;