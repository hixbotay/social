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

                <img className={"imgMenu1"} src={"/public/images/main/hen-toc-do.png"} />

                <ul className="list-group">
                    <li className="list-group-item"><Link to='/dating'>Cafe nhóm</Link></li>
                    <li className="list-group-item"><Link to="/dating/invited">Lời mời</Link></li>
                    <li className="list-group-item"><Link to="/dating/feature">Lịch hẹn</Link></li>
                    <li className="list-group-item"><Link to="/dating/create">Tạo cuộc hẹn</Link></li>
                    <li className="list-group-item-custom"><Link to="/couple"><i className="fas fa-heartbeat fa-2x"></i> KẾT ĐÔI</Link></li>
                    <li className="list-group-item-custom"><Link to="/cafe"><i className="fas fa-coffee fa-2x"></i> ĐẠI LÝ CAFE</Link></li>
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