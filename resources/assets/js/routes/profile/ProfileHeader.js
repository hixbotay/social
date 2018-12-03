import React, { Component } from 'react';
import ToggleDisplay from 'react-toggle-display';
import { Line } from 'rc-progress';
import { Card, CardWithIcon } from '../../components/Card';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import CenterModeSlider from '../../components/Slider/CenterModeSlider';

class ProfileHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show_1: false,
            show_2: false,
            show_3: false,
            show_4: false,
            show_5: false,
            show_6: false
        }
    }

    show(orderNumber) {
        switch(orderNumber) {
            case 1: {
                this.setState(prevState => ({show_1: !prevState.show_1}));
                break;
            }
            case 2: {
                this.setState(prevState => ({show_2: !prevState.show_2}));
                break;
            }
            case 3: {
                this.setState(prevState => ({show_3: !prevState.show_3}));
                break;
            }
            case 4: {
                this.setState(prevState => ({show_4: !prevState.show_4}));
                break;
            }
            case 5: {
                this.setState(prevState => ({show_5: !prevState.show_5}));
                break;
            }
            case 6: {
                this.setState(prevState => ({show_6: !prevState.show_6}));
                break;
            }
        }
        
    }

    render() {
        const {user, isCurrentUser} = this.props;

        var ideal_person = user.ideal_person ? JSON.parse(user.ideal_person) : {};
        var current_year = new Date().getFullYear();
        var completePercentage = localStorage.getItem("percentage");

        var {show_1, show_2, show_3, show_4, show_5, show_6} = this.state;

        return (
            <Card>
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
                                    <button className="btn btn-primary" id="regulations-btn">
                                        <i className="fas fa-fire"></i> Quy định hồ sơ
                                        </button>
                                </div>
                            </div>
                        </div>
                    ) :null
                }

                <div className="mb-4">
                    <div className="flex">
                        <h5 className="page-header left">Thông tin ban đầu</h5>
                        <button className="right btn-show" onClick={() => this.show(1)}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <hr className="profile-horizontal" />
                    <ToggleDisplay show={show_1}>
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
                            <div className="left">Nơi sống</div>
                            <div className="right">{user.address}</div>
                        </div>
                    </ToggleDisplay>
                </div>
                
                {
                    isCurrentUser ? (
                        <div className="mb-4">
                            <div className="flex">
                                <h5 className="page-header left">Mẫu người bạn tìm</h5>
                                <button className="right btn-show" onClick={() => this.show(2)}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <hr className="profile-horizontal" />
                            <ToggleDisplay show={show_2}>
                                <div className="flex">
                                    <div className="left">Độ tuổi</div>
                                    <div className="right">
                                        {
                                            (ideal_person.max_year && ideal_person.min_year) ? (
                                                <span>
                                                    {current_year - ideal_person.max_year} - {current_year - ideal_person.min_year}
                                                </span>
                                            ) : "Chưa xác định"
                                        }
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="left">Giới tính</div>
                                    <div className="right">
                                        {
                                            ideal_person.gender ? (
                                                (ideal_person.gender === 'M') ? "Nam" : "Nữ"
                                            ) : "Chưa xác định"
                                        }

                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="left">Tình trạng hôn nhân</div>
                                    <div className="right">
                                        {
                                            ideal_person.marial_status >= 0 ? (
                                                (ideal_person.marial_status === 0) ? 'Độc thân' : "Đã kết hôn"
                                            ) : "Chưa xác định"
                                        }
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="left">Nghề nghiệp</div>
                                    <div className="right">
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
                                <div className="flex">
                                    <div className="left">Dân tộc</div>
                                    <div className="right">{ideal_person.ethnicity ? ideal_person.ethnicity : "Chưa xác định"}</div>
                                </div>
                                <div className="flex">
                                    <div className="left">Tôn giáo</div>
                                    <div className="right">{ideal_person.religion ? ideal_person.religion : "Chưa xác định"}</div>
                                </div>
                            </ToggleDisplay>
                        </div>
                    ) : null
                }
                
                <div className="mb-4">
                    <div className="flex">
                        <h5 className="page-header left">Thông tin cơ bản</h5>
                        <button className="right btn-show" onClick={() => this.show(3)}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <hr className="profile-horizontal" />
                    <ToggleDisplay show={show_3}>
                        <div className="flex">
                            <div className="left">Học vấn</div>
                            <div className="right">{user.education_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Nghề nghiệp</div>
                            <div className="right">{user.job_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Quê quán</div>
                            <div className="right">{user.village_name + ", " + user.district_name + ", " + user.province_name}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Dân tộc</div>
                            <div className="right">{user.ethnicity}</div>
                        </div>
                        <div className="flex">
                            <div className="left">Tôn giáo</div>
                            <div className="right">{user.religion}</div>
                        </div>
                    </ToggleDisplay>
                </div>

                {
                    isCurrentUser ? (
                        <div className="mb-4">
                            <div className="flex">
                                <h5 className="page-header left">Ngoại hình</h5>
                                <button className="right btn-show" onClick={() => this.show(4)}>
                                    <i className="fas fa-plus"></i>
                                </button>
                            </div>
                            <hr className="profile-horizontal" />
                            <ToggleDisplay show={show_4}>
                                <div className="flex">
                                    <div className="left">Chiều cao</div>
                                    <div className="right">{user.height}</div>
                                </div>
                                <div className="flex">
                                    <div className="left">Cân nặng</div>
                                    <div className="right">{user.weight}</div>
                                </div>
                            </ToggleDisplay>
                        </div>
                    ) : null
                }
                
                <div className="mb-4">
                    <div className="flex">
                        <h5 className="page-header left">Sở thích</h5>
                        <button className="right btn-show" onClick={() => this.show(5)}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <hr className="profile-horizontal" />
                    <ToggleDisplay show={show_5}>
                        <div>
                            {
                                user.hobbies.map(item => {
                                    return (
                                        <span className="tag" key={item.id}>{item.name}</span>
                                    )
                                })
                            }
                        </div>
                    </ToggleDisplay>
                </div>
                <div>
                    <div className="flex">
                        <h5 className="page-header left">Phong cách sống</h5>
                        <button className="right btn-show" onClick={() => this.show(6)}>
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                    <hr className="profile-horizontal" />
                    <ToggleDisplay show={show_6}>
                        <div>{user.lifestyle}</div>
                    </ToggleDisplay>
                </div>

            </Card>
        );
    }
}

export default ProfileHeader;