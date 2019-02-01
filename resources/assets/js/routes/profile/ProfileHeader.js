import React, { PureComponent } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Line } from 'rc-progress';
import { Card, CardWithIcon } from '../../components/Card';
import {Link} from 'react-router-dom';
import CenterModeSlider from '../../components/Slider/CenterModeSlider';
import ProfilePhotos from './ProfilePhotos';
import {getFeaturedUserPhotos, updateUser} from '../../actions/UserActions';
import connect from 'react-redux/es/connect/connect';
import EdiText from 'react-editext';

class ProfileHeader extends PureComponent {

    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps.user);
        return nextProps.user !== this.props.user; 
    }

    render() {
        const {user, isCurrentUser, images} = this.props;
        var completePercentage = localStorage.getItem("percentage");

        return (
            <Card>
                <div id="user-description" className="mb-2">
                    <i className="fas fa-info-circle"></i><br/>
                    <div>
                    {
                        user.description ? (
                            <EdiText 
                                type="textarea" 
                                value={user.description} 
                                editButtonText="Sửa"
                                editButtonClassName="btn btn-primary btn-sm"
                                onSave={(content) => this.props.updateUser({user: {description: content}}, user.id)}
                            />
                        ) : (
                            <React.Fragment>
                            {
                                isCurrentUser ? (
                                    <div>
                                        <EdiText 
                                            type="textarea" 
                                            value="Bạn là người như thế nào, hãy chia sẻ một chút để người ấy hiểu bạn hơn nhé!!!"
                                            editButtonText="Sửa"
                                            editButtonClassName="btn btn-primary btn-sm"
                                            onSave={(content) => this.props.updateUser({user: {description: content}}, user.id)}
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
                {
                    isCurrentUser ? (
                        <ProfilePhotos images={images}></ProfilePhotos>
                    ) : (
                        <CenterModeSlider images={[user.avatar, ...images]}></CenterModeSlider>
                    )
                }
                
                <br/>
                {
                    isCurrentUser ? (
                        <div className="mb-4">
                            <div className="row">
                                <div className="col-8">
                                    <div><b>Hồ sơ đã hoàn thiện: <span>{Math.round(completePercentage)}%</span></b></div>
                                    <Line percent={completePercentage} strokeWidth="4" strokeColor="#2ecc71" trailWidth="4" trailColor="#bdc3c7" />
                                </div>
                                <div className="col-4">
                                    <Link to="/profile/edit">
                                        <button className="btn btn-primary" id="regulations-btn">
                                            <i className="fas fa-fire"></i> Cập nhật hồ sơ
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) :null
                }

                <div className="mb-4">
                    <div>
                        <div className="flex">
                            <div className="left">Ngày sinh</div>
                            <div className="right">{user.birthday}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Giới tính</div>
                            <div className="right">
                                {
                                    user.gender ? (
                                        (user.gender === 'M') ? "Nam" : "Nữ"
                                    ) : "Chưa xác định"
                                }
                            </div>
                        </div>
                        <div className="flex">
                            <div className="left">Tình trạng hôn nhân</div>
                            <div className="right">
                                {
                                    user.marial_status ? (
                                        user.marial_status === 1 ? "Đã kết hôn" : "Đã từng kết hôn trước đó"
                                    ) : "Độc thân" 
                                }
                            </div>
                        </div>
                        <div className="flex">
                            <div className="left">Học vấn</div>
                            <div className="right">{user.education_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Nghề nghiệp</div>
                            <div className="right">{user.job_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Dân tộc</div>
                            <div className="right">{user.ethnicity_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Tôn giáo</div>
                            <div className="right">{user.religion_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Nơi sống</div>
                            <div className="right">{user.address}</div>
                        </div>
                    </div>
                </div>
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