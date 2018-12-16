import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Line } from 'rc-progress';
import { Card, CardWithIcon } from '../../components/Card';
import {Link} from 'react-router-dom';
import CenterModeSlider from '../../components/Slider/CenterModeSlider';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user, isCurrentUser} = this.props;
        var completePercentage = localStorage.getItem("percentage");

        return (
            <Card>
                <div id="user-description" className="mb-2">
                    <i className="fas fa-info-circle"></i><br/>
                    <div>
                    {
                        user.description ? user.description : (
                            <React.Fragment>
                            {
                                isCurrentUser ? (
                                    <div>
                                        <p>
                                            Bạn là người như thế nào, hãy chia sẻ một chút để người ấy hiểu bạn hơn nhé!!!
                                        </p>
                                        <div className="text-center">
                                            <button className="btn btn-primary">Lưu</button>
                                        </div>
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
                <CenterModeSlider></CenterModeSlider>
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
                                    (user.marial_status != null) ? (
                                        (user.marial_status === 0) ? 'Độc thân' : "Đã kết hôn"
                                    ) : "Chưa xác định"
                                }</div>
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
                            <div className="right">{user.ethnicity}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Tôn giáo</div>
                            <div className="right">{user.religion}</div>
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

export default ProfileHeader;