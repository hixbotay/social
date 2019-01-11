import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {RoundAvatar} from '../Avatar';

class MobileMenu extends Component {
    render() {
        const {user, match} = this.props;

        return (
            <div className="row mobile-menu-bottom">
                <div className="col-1"></div>
                <div className="col-2 text-center">
                <Link to={`/profile/${user.id}`}>
                    <RoundAvatar img={user.avatar} size='small' />
                </Link>
                </div>
                <div className="col-2 text-center">
                    <img className="menu-bottom-image" src={`${baseUrl}/public/images/hen-toc-do-icon.png`} />
                </div>
                <div className="col-2 text-center">
                    <Link to="/couple"><i className="fas fa-heartbeat fa-2x"></i></Link>
                </div>
                <div className="col-2 text-center">
                    <Link to="/cafe"><i className="fas fa-coffee fa-2x"></i></Link>
                </div>
                <div className="col-2 text-center"></div>
                <div className="col-1"></div>

                

                

                {/* <ul className="list-group">
                    <li className={`dating-menu list-group-item ${match.path === '/dating/feature' ? 'active' : ''}`}><Link to='/dating/feature'>Cafe nhóm</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/invited' ? 'active' : ''}`}><Link to="/dating/invited">Lời mời</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating' ? 'active' : ''}`}><Link to="/dating">Lịch hẹn</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/subscribe' ? 'active' : ''}`}><Link to="/dating/subscribe">Đăng ký hẹn</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/dating/create' ? 'active' : ''}`}><Link to="/dating/create">Tạo cuộc hẹn</Link></li>
                    <li className={`dating-menu list-group-item ${match.path === '/payment/history' ? 'active' : ''}`}><Link to="/payment/history">Payment</Link></li>

                    <li className={`dating-menu list-group-item ${match.path === '/gift/categories' ? 'active' : ''}`}>
                        <Link to={{pathname: "/gift/categories", state: {receiver: user.id}}}>Quà tặng</Link>
                    </li>
                    <li className={`dating-menu list-group-item ${match.path === '/food/categories' ? 'active' : ''}`}>
                        <Link to={{pathname: "/food/categories", state: {receiver: user.id}}}>Ẩm thực</Link>
                    </li>

                    <li className="list-group-item-custom"><Link to="/couple"><i className="fas fa-heartbeat fa-2x"></i> KẾT ĐÔI</Link></li>
                    <li className="list-group-item-custom"><Link to="/cafe"><i className="fas fa-coffee fa-2x"></i> ĐẠI LÝ</Link></li>
                </ul> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
} 


export default connect(mapStateToProps)(MobileMenu);