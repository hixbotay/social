import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import ProfileLayout from './ProfileLayout';
import { getUserDetail } from '../../actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class UserDetail extends Component {

    componentDidMount() {
        this.props.getUserDetail(this.props.match.params.id);
    }

    render() {
        const { user } = this.props;

        return (
            <ProfileLayout 
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                {
                    !user ? null : (
                        <div>
                            <Card leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true}>
                                <div className="row">
                                    <div className="col-4">Tên</div>
                                    <div className="col-8">{user.name}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Ngày sinh</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Giới tính</div>
                                    <div className="col-8">{user.gender == 'M' ? "Nam" : "Nữ"}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Quê quán</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Chỗ ở hiện tại</div>
                                    <div className="col-8">{user.address}</div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Nghề nghiệp</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Tình trạng hôn nhân</div>
                                    <div className="col-8"></div>
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
                                    <div className="col-4">Chiều cao</div>
                                    <div className="col-8">
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Cân nặng</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Học vấn</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Sở thích</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Tuýp người</div>
                                    <div className="col-8"></div>
                                </div>
                                <div className="row">
                                    <div className="col-4">Quan điểm sống</div>
                                    <div className="col-8"></div>
                                </div>
                            </Card>
                        </div>
                    )
                }
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserDetail));