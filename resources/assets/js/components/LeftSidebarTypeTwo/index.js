import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';

class LeftSidebarTypeTwo extends Component {

    render() {
        const {user, match} = this.props;
        var currentYear = new Date().getFullYear();
        var birth = new Date(user.birthday).getFullYear();
        user.age = currentYear - birth;
        return (
            <aside className="leftslider pl-0 pr-0">
                <ul className="list-group disable-mobile">
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
                <ul className='list-group bg-white border-default disable-mobile'>
                    <li className="list-group-item border-custom"><div className='icon color-red-dark'><i className="fas fa-heartbeat"></i></div><Link to="/couple" className="color-black"> KẾT ĐÔI</Link></li>
                </ul>
                <ul className='list-group bg-white border-default disable-mobile'>
                    <li className="list-group-item border-custom"><div className='icon color-blue'><i className="fas fa-heartbeat"></i></div><Link to="/cafe" className="color-black"> ĐẠI LÝ</Link></li>
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

export default withRouter(connect(mapStateToProps, null)(LeftSidebarTypeTwo));