import React, { PureComponent } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Line } from 'rc-progress';
import {Card, CardWithIcon, CardWithTitle} from '../../components/Card';
import { Link } from 'react-router-dom';
import CenterModeSlider from '../../components/Slider/CenterModeSlider';
import ProfilePhotos from './ProfilePhotos';
import { getFeaturedUserPhotos, updateUser } from '../../actions/UserActions';
import connect from 'react-redux/es/connect/connect';
import EdiText from 'react-editext';
import moment from "moment";
import { reactPost } from '../../actions/PostActions';
import VerificationBlock from "../../components/RightSidebar/VerificationBlock";
import CurrentUserLayout from "./CurrentUserLayout";

class ProfileHeader extends PureComponent {
    constructor() {
        super();
        this.state = {
            show: false
        }
    }

    componentWillUpdate(nextProps, nextState) {
        return nextProps.user !== this.props.user;
    }

    viewMoreInfo() {
        if (this.props.isCurrentUser || this.props.current_user.vip.status) {
            this.setState({ show: !this.state.show });
        } else {
            alert("Chỉ thành viên VIP mới xem được thông tin người khác!");
        }

    }

    render() {
        const { user, isCurrentUser, images, current_user } = this.props;
        var completePercentage = localStorage.getItem("percentage");
        if(isCurrentUser){
            var textStr = 'Bạn là người như thế nào?'
        } else{
            if(user.gender === 'M'){
                var textStr = 'Anh ấy là người như thế nào?';
            } else{
                var textStr = 'Cô ấy là người như thế nào?';
            }
        }

        return (
            <Card>
                <div id="user-description" className="mb-2">
                    <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>{textStr}</h4>
                    <div>
                        {
                            user.description ? (
                                <React.Fragment>
                                    {
                                        isCurrentUser ? (
                                            <EdiText
                                                type="textarea"
                                                value={user.description}
                                                editButtonText="Cập nhật"
                                                editButtonClassName="btn btn-link btn-sm"
                                                saveButtonText="Lưu"
                                                cancelButtonText="Hủy"
                                                saveButtonClassName="btn btn-primary btn-sm"
                                                cancelButtonClassName="btn btn-secondary btn-sm"
                                                onSave={(content) => this.props.updateUser({ user: { description: content } }, user.id)}
                                                hideIcons={false}

                                            />
                                        ) : (
                                                <div>{user.description}</div>
                                            )
                                    }
                                </React.Fragment>
                            ) : (
                                    <React.Fragment>
                                        {
                                            isCurrentUser ? (
                                                <div>
                                                    <EdiText
                                                        type="textarea"
                                                        value="Bạn là người như thế nào, hãy chia sẻ một chút để người ấy hiểu bạn hơn nhé!!!"
                                                        editButtonText="Cập nhật"
                                                        editButtonClassName="btn btn-link btn-sm"
                                                        saveButtonContent="Lưu"
                                                        cancelButtonContent="Hủy"
                                                        saveButtonClassName="btn btn-primary btn-sm"
                                                        cancelButtonClassName="btn btn-secondary btn-sm"
                                                        onSave={(content) => this.props.updateUser({ user: { description: content } }, user.id)}
                                                        hideIcons={true}

                                                    />
                                                </div>
                                            ) : (
                                                    <div>
                                                        Chưa có mô tả về {user.name}
                                                    </div>
                                                )
                                        }
                                    </React.Fragment>
                                )
                        }

                    </div>
                </div>
                
                <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Thông tin cơ bản</h4>
                {
                    isCurrentUser ? (
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-8">
                                    <div>Hồ sơ đã hoàn thiện: <span>{Math.round(completePercentage)}%</span></div>
                                    <Line percent={completePercentage} strokeWidth="4" strokeColor="#2ecc71" trailWidth="4" trailColor="#bdc3c7" />
                                </div>
                                <div className="col-4">
                                    <Link to="/profile/edit">
                                        <button className="btn btn-link btn-sm" id="regulations-btn">
                                            <i className="fas fa-fire"></i> Cập nhật hồ sơ
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : null
                }

                <div className="mb-4">
                    <div className='col-12 pl-0'>
                        <div className="flex pt-1 pb-1">
                            <div className="left">Ngày sinh</div>
                            <div className="right">
                                {moment(user.birthday).format("DD/MM/YYYY")}
                                {/* {user.birthday} */}
                            </div>
                        </div>
                        <div className="flex pt-1 pb-1">
                            <div className="left">Giới tính</div>
                            <div className="right">
                                {
                                    user.gender ? (
                                        (user.gender === 'M') ? "Nam" : "Nữ"
                                    ) : "Chưa xác định"
                                }
                            </div>
                        </div>
                        <div className="flex pt-1 pb-1">
                            <div className="left">Tình trạng hôn nhân</div>
                            <div className="right">
                                {
                                    user.marial_status ? (
                                        user.marial_status === 1 ? "Đã kết hôn" : "Đã từng kết hôn trước đó"
                                    ) : "Độc thân"
                                }
                            </div>
                        </div>
                        <div className="flex pt-1 pb-1">
                            <div className="left">Nơi ở hiện tại</div>
                            <div className="right">{user.village_name}, {user.district_name}, {user.province_name}</div>
                        </div>

                        {
                            <React.Fragment>
                                <ToggleDisplay show={this.state.show}>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Chiều cao</div>
                                        <div className="right">{user.height} cm</div>
                                    </div>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Cân nặng</div>
                                        <div className="right">{user.weight} kg</div>
                                    </div>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Học vấn</div>
                                        <div className="right">{user.education_name}</div>
                                    </div>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Nghề nghiệp</div>
                                        <div className="right">{user.job_name}</div>
                                    </div>
                                    <div className="flex">
                                        <div className="left">Dân tộc</div>
                                        <div className="right">{user.ethnicity_name}</div>
                                    </div>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Tôn giáo</div>
                                        <div className="right">{user.religion_name}</div>
                                    </div>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Nơi ở hiện tại</div>
                                        <div className="right">{user.village_name}, {user.district_name}, {user.province_name}</div>
                                    </div>
                                    <div className="flex pt-1 pb-1">
                                        <div className="left">Sở thích</div>
                                        <div className="right">
                                            {
                                                user.hobbies.map(hobby => {
                                                    return (
                                                        <span key={hobby.id}>{hobby.name}, </span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    {
                                        isCurrentUser ? (
                                            <React.Fragment>
                                                 <div className="flex pt-1 pb-1">
                                                    <div className="left">Số điện thoại</div>
                                                    <div className="right">{user.mobile}</div>
                                                </div>
                                                <div className="flex pt-1 pb-1">
                                                    <div className="left">Email</div>
                                                    <div className="right">{user.email}</div>
                                                </div>
                                            </React.Fragment>
                                        ) : null
                                    }
                                   
                                </ToggleDisplay>
                                <div className="text-center" onClick={() => this.viewMoreInfo()}>
                                    {
                                        this.state.show ? (
                                            <u>Ẩn bớt</u>
                                        ) : (
                                            <u>Xem thêm </u>
                                        )
                                    }
                                </div>
                            </React.Fragment>
                        }

                    </div>
                </div>

                <div className='disable-desktop'>
                    <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Xác thực</h4>
                </div>
                {
                    <div className='disable-desktop'>
                        <VerificationBlock user={user}/>
                    </div>
                }
                {
                    isCurrentUser ? (
                        <div className='disable-desktop'>
                            <CardWithTitle title="" className='pl-0' hasLine={false}>
                                <div className="row">
                                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 pl-0">
                                        <p>Xác thực CMT để dễ dàng tham gia các cuộc hẹn tốc độ</p>
                                        {
                                            user.is_id_card_verified === 'verified' ? (
                                                <div className="alert alert-success">
                                                    Bạn đã được phê duyệt Chứng minh thư
                                                </div>
                                            ) : (
                                                <div>
                                                    <div className="alert alert-danger">
                                                        Bạn chưa xác thực Chứng minh thư. Hãy xác minh ngay!

                                                        <div className="text-center">
                                                            <Link to="/verify/id-card">
                                                                <button className="btn-add-image" id="upload-id-card">
                                                                    <i className="fas fa-camera"></i> Upload
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </CardWithTitle>
                        </div>
                    ) : (
                        null
                    )
                }
                
                <h4 className='profile-title'><i className="fas fa-star-of-life color-red mr-1"></i>Ảnh</h4>
                {
                    isCurrentUser ? (
                        <ProfilePhotos images={images}></ProfilePhotos>
                    ) : (
                        <CenterModeSlider images={[user.avatar, ...images]}></CenterModeSlider>
                    )
                }
            </Card>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateUser: (data, user_id) => dispatch(updateUser(data, user_id))
    }
}

export default connect(null, mapDispatchToProps)(ProfileHeader);