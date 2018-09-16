import React, { Component } from 'react';

class SecondEditForm extends Component {
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
                                <label>Chiều cao (cm)</label>
                            </div>
                            <div className="col-8">
                                <input type="number" className="form-control" name="height" defaultValue={user.height} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Cân nặng (kg)</label>
                            </div>
                            <div className="col-8">
                                <input type="number" className="form-control" name="weight" defaultValue={user.weight} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Học vấn</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="education" defaultValue={user.education} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Sở thích</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="hobby" defaultValue={user.hobby} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Tuýp người</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="type" defaultValue={user.type} onChange={(event) => this.props.editUser(event)} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row align-items-center">
                            <div className="col-4">
                                <label>Quan điểm sống</label>
                            </div>
                            <div className="col-8">
                                <input type="text" className="form-control" name="philosophy" defaultValue={user.philosophy} onChange={(event) => this.props.editUser(event)} />
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

export default SecondEditForm;