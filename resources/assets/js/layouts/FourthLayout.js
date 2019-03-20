import React, { Component } from 'react';
import LeftSidebar from '../components/LeftSidebar';
import {isMobileOnly} from 'react-device-detect';
import Settings from '../routes/Settings';
import CreatePostForm from "../components/Post/CreatePostForm";
import Post from "../components/Post";
import RightSidebar from "../components/RightSidebar";
class FourthLayout extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        !isMobileOnly ? <LeftSidebar></LeftSidebar> : null
                    }
                    <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 col-sm-12 col-12 main-content-wrap">
                        <div className="row verify-block">
                            <div className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                                <div className="ui-block-title bg-facebook box-shadow-default">
                                    <h6 className="title"><i className="far fa-star"></i> Xác minh thông tin để tăng độ phổ biến</h6>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <main className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                                <div className='row mb-4 mt-4'>
                                    <div className='col-12'>
                                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-timeline-tab" data-toggle="pill"
                                                   href="#pills-timeline" role="tab" aria-controls="pills-timeline"
                                                   aria-selected="true">Dòng thời gian</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link active" id="pills-about-tab" data-toggle="pill"
                                                   href="#pills-about" role="tab" aria-controls="pills-about"
                                                   aria-selected="true">Giới thiệu</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-settings-tab" data-toggle="pill"
                                                   href="#pills-settings" role="tab" aria-controls="pills-settings"
                                                   aria-selected="false">Cài đặt</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-event-tab" data-toggle="pill"
                                                   href="#pills-event" role="tab" aria-controls="pills-event"
                                                   aria-selected="false">Sự kiện sắp tới</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" id="pills-images-tab" data-toggle="pill"
                                                   href="#pills-images" role="tab" aria-controls="pills-images"
                                                   aria-selected="false">Ảnh</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className='col-12'>
                                        <div className="tab-content" id="pills-tabContent">
                                            <div className="tab-pane fade" id="pills-timeline" role="tabpanel" aria-labelledby="pills-timeline-tab">
                                                <div className="col col-xl-8 order-xl-1 col-lg-8 order-lg-1 col-md-8 col-sm-12">
                                                    <CreatePostForm/>
                                                </div>
                                                <RightSidebar/>
                                            </div>
                                            <div className="tab-pane fade show active" id="pills-about" role="tabpanel" aria-labelledby="pills-about-tab">
                                                <div className="row">
                                                    <div className="col-3">
                                                        <div className="nav flex-column nav-pills" id="v-pills-tab"
                                                             role="tablist"
                                                             aria-orientation="vertical">
                                                            <a className="nav-link active" id="v-pills-home-tab"
                                                               data-toggle="pill"
                                                               href="#v-pills-home" role="tab"
                                                               aria-controls="v-pills-home"
                                                               aria-selected="true">Bạn là người như thế nào?</a>
                                                            <a className="nav-link" id="v-pills-profile-tab"
                                                               data-toggle="pill"
                                                               href="#v-pills-profile" role="tab"
                                                               aria-controls="v-pills-profile"
                                                               aria-selected="false">Profile</a>
                                                            <a className="nav-link" id="v-pills-verify-tab"
                                                               data-toggle="pill"
                                                               href="#v-pills-verify" role="tab"
                                                               aria-controls="v-pills-verify"
                                                               aria-selected="false">Xác thực tài khoản</a>
                                                        </div>
                                                    </div>
                                                    <div className="col-9">
                                                        <div className="tab-content" id="v-pills-tabContent">
                                                            <div className="tab-pane fade show active" id="v-pills-home"
                                                                 role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                                <div id="user-description">
                                                                    <div className='content'>
                                                                        Consequat occaecat ullamco amet non eiusmod
                                                                        nostrud dolore irure incididunt est duis anim
                                                                        sunt officia. Fugiat velit proident aliquip nisi
                                                                        incididunt nostrud exercitation proident est
                                                                        nisi. Irure magna elit commodo anim ex veniam
                                                                        culpa eiusmod id nostrud sit cupidatat in veniam
                                                                        ad. Eiusmod consequat eu adipisicing minim anim
                                                                        aliquip cupidatat culpa excepteur quis. Occaecat
                                                                        sit eu exercitation irure Lorem incididunt
                                                                        nostrud.
                                                                    </div>
                                                                    <div className='form disabled'></div>
                                                                    <a className='link-default'>Viết một số điều chính
                                                                        về bạn</a>
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade" id="v-pills-profile"
                                                                 role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                                                <p>Hồ sơ đã hoàn thiện 76% <a className='link-default'>Cập
                                                                    nhật hồ sơ</a></p>
                                                                <div className="progress mb-4">
                                                                    <div className="progress-bar w-75"
                                                                         role="progressbar" aria-valuenow="75"
                                                                         aria-valuemin="0" aria-valuemax="100"></div>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <div>
                                                                        <div className="flex">
                                                                            <div className="left">Ngày sinh</div>
                                                                            <div className="right">01/01/1997</div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div className="left">Giới tính</div>
                                                                            <div className="right">Nam</div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div className="left">Tình trạng hôn nhân
                                                                            </div>
                                                                            <div className="right">Độc thân</div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div className="left">Nơi ở hiện tại</div>
                                                                            <div className="right">Phường Bách Khoa,
                                                                                Quận Hai Bà Trưng,
                                                                                Thành phố Hà Nội
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div className="left">Chiều cao</div>
                                                                            <div
                                                                                className="right">175 cm
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div
                                                                                className="left">Cân nặng
                                                                            </div>
                                                                            <div
                                                                                className="right">64 kg
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div
                                                                                className="left">Học vấn
                                                                            </div>
                                                                            <div
                                                                                className="right">Giáo sư
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div
                                                                                className="left">Nghề nghiệp
                                                                            </div>
                                                                            <div className="right">Surgical
                                                                                Technologist
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flex">
                                                                            <div className="left">Dân tộc</div>
                                                                            <div
                                                                                className="right">Kinh
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex">
                                                                            <div
                                                                                className="left">Tôn giáo
                                                                            </div>
                                                                            <div className="right">Công giáo</div>
                                                                        </div>
                                                                        <div
                                                                            className="flex">
                                                                            <div className="left">Nơi ở hiện tại</div>
                                                                            <div
                                                                                className="right">Phường Bách Khoa, Quận
                                                                                Hai Bà Trưng, Thành phố Hà Nội
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flex">
                                                                            <div className="left">Sở thích</div>
                                                                            <div
                                                                                className="right">
                                                                                <span>Rượu chè, </span><span>Cướp ngân hàng, </span><span>Cờ bạc, </span><span>Đua xe, </span>
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flex">
                                                                            <div className="left">Số điện thoại</div>
                                                                            <div
                                                                                className="right">1669209256
                                                                            </div>
                                                                        </div>
                                                                        <div
                                                                            className="flex">
                                                                            <div className="left">Email</div>
                                                                            <div
                                                                                className="right">admin@gmail.com
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-center"><u>Ẩn bớt</u></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="tab-pane fade" id="v-pills-verify"
                                                                 role="tabpanel" aria-labelledby="v-pills-verify-tab">
                                                                <div className="ui-block">
                                                                    <ul className="widget w-friend-pages-added notification-list border-0">
                                                                        <li className="inline-items">
                                                                            <div
                                                                                className="author-thumb verification-icon">
                                                                                <img
                                                                                    src="https://lh5.googleusercontent.com/-2r7nkB71SpM/AAAAAAAAAAI/AAAAAAAC5RI/yYrFyU20Boc/photo.jpg"
                                                                                    alt="verification-image"/></div>
                                                                            <div className="notification-event"><a
                                                                                href="#"
                                                                                className="h6 notification-friend">Google+</a><span
                                                                                className="chat-message-item">Chưa xác minh</span>
                                                                            </div>
                                                                            <span className="notification-icon"><a
                                                                                href="#"><button
                                                                                className="verify-btn">Xác minh</button></a></span>
                                                                        </li>
                                                                        <li className="inline-items">
                                                                            <div
                                                                                className="author-thumb verification-icon">
                                                                                <img
                                                                                    src="https://upload.wikimedia.org/wikipedia/commons/1/16/Facebook-icon-1.png"
                                                                                    alt="verification-image"/></div>
                                                                            <div className="notification-event"><a
                                                                                href="#"
                                                                                className="h6 notification-friend">Facebook</a><span
                                                                                className="chat-message-item">Chưa xác minh</span>
                                                                            </div>
                                                                            <span className="notification-icon"><a
                                                                                href="#"><button
                                                                                className="verify-btn">Xác minh</button></a></span>
                                                                        </li>
                                                                        <li className="inline-items">
                                                                            <div
                                                                                className="author-thumb verification-icon">
                                                                                <img
                                                                                    src="https://i0.wp.com/onedollargraphics.market/wp-content/uploads/2018/02/phone-icon.jpg"
                                                                                    alt="verification-image"/></div>
                                                                            <div className="notification-event"><a
                                                                                href="#"
                                                                                className="h6 notification-friend">Số
                                                                                điện thoại</a><span
                                                                                className="chat-message-item">Đã xác minh</span>
                                                                            </div>
                                                                            <span className="notification-icon">
                                                                 <i className="fas fa-check"></i> </span></li>
                                                                        <li className="inline-items">
                                                                            <div
                                                                                className="author-thumb verification-icon">
                                                                                <img
                                                                                    src="https://www.colorid.com/uploads/4/2/2/9/42295857/published/id-card-icon.png?1529077382"
                                                                                    alt="verification-image"/></div>
                                                                            <div className="notification-event"><a
                                                                                href="/verify/id-card"
                                                                                className="h6 notification-friend">Chứng
                                                                                minh
                                                                                thư</a><span
                                                                                className="chat-message-item">Chưa xác minh</span>
                                                                            </div>
                                                                            <span className="notification-icon"><a
                                                                                href="/verify/id-card"><button
                                                                                className="verify-btn">Xác minh</button></a></span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="ui-block custom-card undefined">
                                                                    <div className="card-title"><h6
                                                                        className="title">Xác thực CMT</h6>
                                                                        <hr className="seperate-line"/>
                                                                    </div>
                                                                    <div
                                                                        className="col-xl-12 col-lg-12 col-md-12 col-xs-12">
                                                                        <div className="row">
                                                                            <div className="col-md-12"><p>Xác thực CMT
                                                                                để dễ dàng tham gia các cuộc hẹn tốc
                                                                                độ</p>
                                                                                <div>
                                                                                    <div
                                                                                        className="alert alert-danger">Bạn
                                                                                        chưa xác thực Chứng minh thư.
                                                                                        Hãy xác minh ngay!
                                                                                        <div className="text-center"><a
                                                                                            href="/social/verify/id-card">

                                                                                            <i className="fas fa-camera"></i> Upload

                                                                                        </a></div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-settings" role="tabpanel"
                                                 aria-labelledby="pills-settings-tab">
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-xs-12'>
                                                    <Settings/>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade custom-grid mt-4" id="pills-event" role="tabpanel" aria-labelledby="pills-event-tab">
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-xs-12'>
                                                    <div className='row'>
                                                        <div className='col-xl-4 col-lg-4 col-md-4 mb-4'>
                                                            <img
                                                                src="http://file.hstatic.net/1000184601/file/457__1_.jpg"
                                                                className="vip-upgrade"/>
                                                        </div>
                                                        <div className='col-xl-4 col-lg-4 col-md-4 mb-4'>
                                                            <img
                                                                src="http://file.hstatic.net/1000184601/file/457__1_.jpg"
                                                                className="vip-upgrade"/>
                                                        </div>
                                                        <div className='col-xl-4 col-lg-4 col-md-4 mb-4'>
                                                            <img
                                                                src="http://file.hstatic.net/1000184601/file/457__1_.jpg"
                                                                className="vip-upgrade"/>
                                                        </div>
                                                        <div className='col-xl-4 col-lg-4 col-md-4 mb-4'>
                                                            <img
                                                                src="http://file.hstatic.net/1000184601/file/457__1_.jpg"
                                                                className="vip-upgrade"/>
                                                        </div>
                                                        <div className='col-xl-4 col-lg-4 col-md-4 mb-4'>
                                                            <img
                                                                src="http://file.hstatic.net/1000184601/file/457__1_.jpg"
                                                                className="vip-upgrade"/>
                                                        </div>
                                                        <div className='col-xl-4 col-lg-4 col-md-4 mb-4'>
                                                            <img
                                                                src="http://file.hstatic.net/1000184601/file/457__1_.jpg"
                                                                className="vip-upgrade"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="pills-images" role="tabpanel" aria-labelledby="pills-images-tab">
                                                <div className='col-xl-12 col-lg-12 col-md-12 col-xs-12'>
                                                    <nav>
                                                        <div className="nav nav-tabs mb-4" id="nav-images-tab" role="tablist">
                                                            <a className="nav-item nav-link active" id="nav-home-tab"
                                                               data-toggle="tab" href="#nav-images-featured" role="tab"
                                                               aria-controls="nav-images-featured" aria-selected="true">Ảnh nổi bật</a>
                                                            <a className="nav-item nav-link" id="nav-profile-tab"
                                                               data-toggle="tab" href="#nav-images-timeline" role="tab"
                                                               aria-controls="nav-images-timeline" aria-selected="false">Ảnh trên dòng thời gian</a>
                                                            <a className="nav-item nav-link" id="nav-contact-tab"
                                                               data-toggle="tab" href="#nav-images-shared" role="tab"
                                                               aria-controls="nav-images-shared" aria-selected="false">Ảnh đã chia sẻ</a>
                                                        </div>
                                                    </nav>
                                                    <div className="tab-content" id="nav-tabContent">
                                                        <div className="tab-pane fade show active custom-grid" id="nav-images-featured"
                                                             role="tabpanel" aria-labelledby="nav-images-featured-tab">
                                                            <div className="row">
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade custom-grid" id="nav-images-timeline" role="tabpanel"
                                                             aria-labelledby="nav-images-timeline-tab">
                                                            <div className="row">
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane fade custom-grid" id="nav-images-shared" role="tabpanel"
                                                             aria-labelledby="nav-images-shared-tab">
                                                            <div className="row">
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-xl-3 col-lg-3 col-md-3 col-xs-3">
                                                                    <div className="image-card-results show-many">
                                                                        <div className="image-card border-0 box-shadow-default">
                                                                            <div><a href="/social/profile/2"><img
                                                                                src="http://hinhanhdep.org/wp-content/uploads/2016/07/avatar-pikachu-de-thuong.jpg"/></a>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FourthLayout;