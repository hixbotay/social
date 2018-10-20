import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Card, CardWithIcon} from '../../components/Card';
import {RoundAvatar} from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';
import {withRouter, Link, Redirect } from 'react-router-dom';
import {uploadIdCardPhoto} from '../../actions/UserActions'; 

class ProfileLayout extends Component {

    redirect() {
        if(document.getElementById('redirect-user-setting')) {
            document.getElementById('redirect-user-setting').click();
        }
    }

    uploadIdCard(event) {
        var component = this;
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            component.props.uploadIdCardPhoto({ image: reader.result }, component.props.match.params.id);
        };
        reader.onerror = function (error) {
            window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
        };
    }
    
    render() {
        const {user} = this.props;
        return (
            <div className="row">
                <div className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    {this.props.children}
                </div>
                <div className="col col-xl-5 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <div className="d-none">
                        {
                            user ? (
                                <Link to={`/profile/${user.id}/setting`}>
                                    <button id='redirect-user-setting'></button>
                                </Link>
                            ) : null
                        }
                        
                    </div>
                    <CardWithIcon rightIcon="fas fa-cog user-setting" rightIconAction={() => this.redirect()}>
                        <div className="author vcard inline-items profile-heading-info">
                            <RoundAvatar img={this.props.avatar} size='large'></RoundAvatar>

                            <div className="author-date">
                                <Heading heading={this.props.heading} subHeading={this.props.subHeading} size='medium'></Heading>
                                <InformationNumber likeNumber={100} viewNumber={200} heartNumber={300}></InformationNumber>
                            </div>
                        </div>
                    </CardWithIcon>
                    <Card>
                        <div className="row">
                            <div className="col-4">
                                <img src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/space-rocket-512.png" className="status-info-icon"/>
                                
                            </div>
                            <div className="col-4">
                                <img src="https://cdn0.iconfinder.com/data/icons/shift-free/32/Pacman_Ghost-512.png" className="status-info-icon"/>
                                
                            </div>
                            <div className="col-4">
                                <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678132-gift-512.png" className="status-info-icon"/>
                                
                            </div>
                        </div>
                        
                    </Card>
                    <img src="http://file.hstatic.net/1000184601/file/457__1_.jpg" className="vip-upgrade"/>
                    <Card 
                        backgroundImage={"url('https://thumb9.shutterstock.com/display_pic_with_logo/176475360/779963938/stock-vector-geometric-abstract-background-geometric-pattern-shapes-art-geometric-background-mosaic-pattern-779963938.jpg')"}
                        className="verify-user"
                    >
                        <button className="btn btn-primary">Xác thực CMT</button>    
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-8">
                                <h5>Xác thực CMT để dễ dàng tham gia các cuộc hẹn tốc độ</h5>
                                {
                                    user.is_id_verified ? (
                                        <div className="alert alert-success">
                                            Bạn đã được phê duyệt Chứng minh thư
                                        </div>
                                    ) : (
                                        user.id_card_photos ? (
                                            <div className="alert alert-warning">
                                                Đang chờ phê duyệt Chứng minh thư 
                                            </div>
                                        ) : (
                                            <label className="btn-add-image"> 
                                                <i className="fas fa-camera"></i> Upload
                                                <input type="file" className="d-none" name="image" onChange={(e) => this.uploadIdCard(e)} />
                                            </label>
                                        )
                                    )
                                }
                                
                            </div>
                            <div className="col-md-2"></div>
                        </div>
                    </Card>
                    <div>
                        <div className="row pending-list">
                            <div className="container">
                                {
                                    [1,2,3,4].map(item => {
                                        return (
                                            <span className='avatar-list' key={item}>
                                                <RoundAvatar img="https://www.w3schools.com/howto/img_avatar.png" size="medium"/>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="row pending-list">
                            <div className="container">
                                {
                                    [1,2,3,4].map(item => {
                                        return (
                                            <span className='avatar-list' key={item}>
                                                <RoundAvatar img="https://www.w3schools.com/howto/img_avatar.png" size="medium"/>
                                            </span>
                                        )
                                    })
                                }
                            </div>
                            
                        </div>
                        <p>Những người này đang chờ bạn phản hồi tin nhắn</p>
                    </div>
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
        uploadIdCardPhoto: (data, id) => dispatch(uploadIdCardPhoto(data, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileLayout));