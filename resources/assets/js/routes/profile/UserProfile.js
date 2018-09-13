import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import ProfileLayout from './ProfileLayout';
import {getUserDetail} from '../../actions/UserActions';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class UserProfile extends Component {
    componentDidMount() {
        this.props.getUserDetail(this.props.match.params.id);
    }

    render() {
        const {user} = this.props;
        return (
            <ProfileLayout
                avatar={user ? user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={user ? user.name : "UNDEFINED"}
                subHeading={user ? user.address : null}
            >
                <Card leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true}>
                    <textarea className="form-control custom-textarea" defaultValue="Viết điều gì đó..."></textarea>
                </Card>
                <Card leftIcon="fas fa-question-circle" rightIcon="fas fa-pen-square" hasLine={true}>
                    <textarea className="form-control custom-textarea" defaultValue="Tôi ở đây để..."></textarea>
                </Card>
                <Card leftIcon="fas fa-briefcase" rightIcon="fas fa-pen-square" hasLine={true}>
                    <p>
                        Bão BARIJAT đã đi vào biển Đông và trở thành cơn bão số 5,
                        dự báo sẽ gây mưa to đến rất to ở Bắc Bộ và Thanh Hóa vào khoảng ngày 14/9
                        </p>
                </Card>
                <Card leftIcon="fas fa-map-marker" rightIcon="fas fa-pen-square" hasLine={true}>
                    <address>Đại học Bách Khoa, Hà Nội, Việt Nam</address>
                    <div id="map"></div>
                </Card>
                <Card leftIcon="fas fa-info-circle" rightIcon="fas fa-pen-square" hasLine={true}>

                </Card>
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
        getUserDetail: (id) =>  dispatch(getUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));