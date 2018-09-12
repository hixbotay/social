import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import ProfileLayout from './ProfileLayout';

class Profile extends Component {
    render() {
        console.log(121323455);
        console.log(this.props.location.pathname)
        return (
            <ProfileLayout>
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

export default Profile;