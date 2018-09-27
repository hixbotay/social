import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';

class LeftSidebar extends Component {

    render() {
        const {user} = this.props;

        return (
            <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12 leftslider">

                <Link to={`/profile/${user.id}`}>
                    <RoundAvatar img={user.avatar} size='large' />
                    <h4>{user.name}</h4>
                </Link>

                <img className={"imgMenu1"} src={"http://125.212.227.39/social/public/images/main/hen-toc-do.png"} />

                <ul className="list-group">
                    <li className="list-group-item">Cafe nhóm</li>
                    <li className="list-group-item">Lời mời</li>
                    <li className="list-group-item">Lịch hẹn</li>
                    <li className="list-group-item">Tạo cuộc hẹn</li>
                    <li className="list-group-item-custom"><i className="fas fa-heartbeat fa-2x"></i> KẾT ĐÔI</li>
                    <li className="list-group-item-custom"><i className="fas fa-coffee fa-2x"></i> ĐẠI LÝ CAFE</li>
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

export default connect(mapStateToProps, null)(LeftSidebar);