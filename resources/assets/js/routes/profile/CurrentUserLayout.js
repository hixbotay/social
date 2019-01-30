import React, { Component } from 'react';
import {connect} from 'react-redux';
import ImageCompressor from 'image-compressor.js';
import {Card, CardWithIcon, CardWithTitle} from '../../components/Card';
import {RoundAvatar} from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';
import {withRouter, Link, Redirect } from 'react-router-dom';
import {updateAvatar, updateUser} from '../../actions/UserActions'; 
import VerificationBlock from '../../components/RightSidebar/VerificationBlock';
import Switch from "react-switch";

class ProfileLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            is_incognito: false
        }
    }

    handleImage(event) {
        var component = this;
        var file = event.target.files[0];

        // optimizer image upload
        new ImageCompressor(file, {
            quality: 0.6,
            convertSize: 400000,
            success(result) {
                var reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = function () {
                    component.props.updateAvatar({ image: reader.result });
                };
                reader.onerror = function (error) {
                    window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
                };
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            is_incognito: nextProps.user.is_incognito ? true : false
        })
    }

    handleChange() {
        let status = !this.state.is_incognito;
        this.setState({ is_incognito: status });
        this.props.updateUser({user: {is_incognito: status}}, this.props.user.id);
    }

    alert() {
        window.alert("Chức năng này sắp tới sẽ có. Mong bạn thông cảm!");
    }
    
    render() {
        const {user} = this.props;
    
        return (
            <div className="row">
                <div className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    {this.props.children}
                </div>
                <div className="col col-xl-5 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <CardWithIcon>
                        <div className="author vcard inline-items profile-heading-info">
                            <RoundAvatar img={this.props.avatar} size='large'></RoundAvatar>
                            <label className="btn-change-avatar">
                                <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e)} />
                            </label>

                            <div className="author-date">
                                <Heading heading={this.props.heading} subHeading={this.props.subHeading} size='medium'></Heading>
                                <InformationNumber likeNumber={user.likeNumber} viewNumber={user.viewNumber} heartNumber={user.loveNumber}></InformationNumber>
                            </div>
                        </div>
                    </CardWithIcon>
                    <Card>
                        <div className="row">
                            <div className="col-4">
                                <img src={`${baseUrl}/public/images/space-rocket-512.png`} className="status-info-icon" title="Nổi bật 24h"/>
                                <Switch
                                    onChange={() => this.alert()}
                                    checked={false}
                                    className="react-switch align-middle"
                                    id="normal-switch"
                                />
                            </div>
                            <div className="col-4">
                                <img src={`${baseUrl}/public/images/Pacman_Ghost-512.png`} className="status-info-icon" title="Ẩn danh"/>
                                <Switch
                                    onChange={() => this.handleChange()}
                                    checked={this.state.is_incognito}
                                    className="react-switch align-middle"
                                    id="normal-switch"
                                />
                            </div>
                            <div className="col-4">
                                <img src={`${baseUrl}/public/images/iconfinder_chat.png`} className="status-info-icon" title="Nhắn đồng thời 100 tin"/>
                                <Switch
                                    onChange={() => this.alert()}
                                    checked={false}
                                    className="react-switch align-middle"
                                    id="normal-switch"
                                />
                            </div>
                        </div>
                        
                    </Card>
                    <img src="http://file.hstatic.net/1000184601/file/457__1_.jpg" className="vip-upgrade"/>
                    <VerificationBlock user={user}/>
                    <CardWithTitle title="Xác thực CMT" hasLine={true}> 
                        <div className="row">
                            <div className="col-md-12">
                                <p>Xác thực CMT để dễ dàng tham gia các cuộc hẹn tốc độ</p>
                                {
                                    user.is_id_card_verified ? (
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
                    
                    <div>
                        <img src="https://momo.vn/Images/2018/03/13/banner-uu-dai-1080x540_131430747.png"/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        uploadIdCardPhoto: (data, id) => dispatch(uploadIdCardPhoto(data, id)),
        updateAvatar: (data) => dispatch(updateAvatar(data)),
        updateUser: (data, user_id) => dispatch(updateUser(data, user_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileLayout));