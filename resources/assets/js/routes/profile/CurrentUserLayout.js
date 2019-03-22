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
import LeftSidebarTypeTwo from "../../components/LeftSidebarTypeTwo";
import CircleButton from "../../components/Button/CircleButton";

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
        if(confirm("Bạn có chắc chắn muốn thay đổi ảnh đại diện?")) {
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
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            is_incognito: nextProps.user.is_incognito ? true : false,
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

                <div className="col col-xl-12 order-xl-1 col-lg-12 order-lg-1 col-md-12 order-md-2 col-sm-12 order-sm-2 col-12">
                    <div className='top-div'>
                        <CardWithIcon>
                            {/*<div className="col col-xl-7 order-xl-1 col-lg-7 order-lg-1 col-md-7 order-md-2 col-sm-12 order-sm-2 col-12">*/}
                                <div className="author vcard inline-items profile-heading-info">
                                    <RoundAvatar img={user.avatar} size='large'></RoundAvatar>
                                    <label className="btn-change-avatar">
                                        <input type="file" className="d-none" name="image" accept="image/*" onChange={(e) => this.handleImage(e)} />
                                    </label>

                                    <div className="author-date">
                                        <Heading heading={this.props.heading} subHeading={this.props.subHeading} size='medium'></Heading>
                                        <InformationNumber likeNumber={user.likeNumber} viewNumber={user.viewNumber} heartNumber={user.loveNumber}></InformationNumber>
                                    </div>
                                {/*</div>*/}
                            </div>
                            {/*<div className="col col-xl-5 order-xl-2 col-lg-5 order-lg-2 col-md-5 order-md-2 col-sm-12 order-sm-2 col-12">*/}
                                {/**/}
                            {/*</div>*/}
                        </CardWithIcon>
                    </div>
                    <div className='bottom-div current-user'>
                        {this.props.children}
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