import React, { Component } from 'react';
import {Card, CardWithIcon} from '../../components/Card';
import ProfileLayout from './ProfileLayout';
import {getUserDetail, addVisitor} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SimpleSlider from '../../components/Slider';

class UserProfile extends Component {
    componentDidMount() {
        this.props.getUserDetail(this.props.match.params.id);
    }

    render() {
        var images = [
            'https://picsum.photos/400/300?image=0',
            'https://picsum.photos/400/300?image=1',
            'https://picsum.photos/400/300?image=2',
            'https://picsum.photos/400/300?image=3',
            'https://picsum.photos/400/300?image=4'
        ];

        const {user} = this.props;

        if (user.id){
            this.props.addVisitor({
                'profile_id': 1,
                'visitor_id': 2
            })
        }

        return (
            <ProfileLayout
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                <CardWithIcon leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true}>
                    <textarea className="form-control custom-textarea" defaultValue="Viết điều gì đó..."></textarea>
                </CardWithIcon>
                <div>
                    <div className="row">
                        <div className="col-3">
                            <button className="btn btn-camera"><i className="fas fa-camera fa-2x"></i></button>
                        </div>
                        <div className="col-9 invididual-image">
                        <SimpleSlider slidesToShow={3}  images={images}></SimpleSlider>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <button className="btn btn-video"><i className="fas fa-file-video fa-2x"></i></button>
                        </div>
                        <div className="col-9 invididual-video">
                        <SimpleSlider slidesToShow={3} images={images}></SimpleSlider>
                        </div>
                    </div>
                </div>
                <CardWithIcon leftIcon="fas fa-question-circle" rightIcon="fas fa-pen-square" hasLine={true}>
                    <textarea className="form-control custom-textarea" defaultValue="Tôi ở đây để..."></textarea>
                </CardWithIcon>
                <CardWithIcon leftIcon="fas fa-briefcase" rightIcon="fas fa-pen-square" hasLine={true}>
                    <p>
                        Bão BARIJAT đã đi vào biển Đông và trở thành cơn bão số 5,
                        dự báo sẽ gây mưa to đến rất to ở Bắc Bộ và Thanh Hóa vào khoảng ngày 14/9
                        </p>
                </CardWithIcon>
                <CardWithIcon leftIcon="fas fa-map-marker" rightIcon="fas fa-pen-square" hasLine={true}>
                    <address>Đại học Bách Khoa, Hà Nội, Việt Nam</address>
                    <div id="map"></div>
                </CardWithIcon>
                <CardWithIcon leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true}>

                </CardWithIcon>
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
        getUserDetail: (id) =>  dispatch(getUserDetail(id)),
        addVisitor: (data) => dispatch(addVisitor(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));