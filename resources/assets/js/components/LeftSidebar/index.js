import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';

class LeftSidebar extends Component {

    render() {
        const {user, match} = this.props;

        return (
            <aside className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 col-sm-12 col-12 leftslider">

                <Link to={`/profile/${user.id}`}>
                    <RoundAvatar img={user.avatar} size='large' />
                    <h4>{user.name}</h4>
                </Link>

                <Link to={`/profile/`} className="btn btn-primary">
                    Nâng cấp tài khoản VIP
                </Link>

                <ul className="list-group">
                    <li className="dating-menu list-group-title"><a href="#">HẸN HÒ THỰC TẾ</a></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/feature' ? 'active' : ''}`}><div className='icon'><i
                        className="fas fa-store"></i></div><Link to='/dating/feature'>Cafe nhóm</Link><span className="count">10</span></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/invited' ? 'active' : ''}`}><div className='icon'><i
                        className="fas fa-envelope"></i></div><Link to="/dating/invited">Lời mời</Link><span className="count">10</span></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating' ? 'active' : ''}`}><div className='icon'><i
                        className="fas fa-calendar-alt"></i></div><Link to="/dating">Lịch hẹn</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/subscribe' ? 'active' : ''}`}>
                        <div className='icon'><i className="fas fa-edit"></i></div><Link to="/dating/subscribe">Đăng ký hẹn</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/create' ? 'active' : ''}`}><div className='icon'><i
                        className="fas fa-diagnoses"></i></div><Link to="/dating/create">Tạo cuộc hẹn</Link></li>
                </ul>
                <ul className='list-group bg-white border-default'>
                    <li className="list-group-item border-custom"><div className='icon color-red-dark'><i className="fas fa-heartbeat"></i></div><Link to="/couple" className="color-black"> KẾT ĐÔI</Link></li>
                </ul>
                <ul className='list-group bg-white border-default'>
                    <li className="list-group-item border-custom"><div className='icon color-blue'><i className="fas fa-store-alt"></i></div><Link to="/cafe" className="color-black"> ĐẠI LÝ</Link></li>
                </ul>
            </aside>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
} 

export default withRouter(connect(mapStateToProps, null)(LeftSidebar));