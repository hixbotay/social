import React, { Component } from 'react';
import { RoundAvatar } from '../Avatar';
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {getCurrentUser} from '../../actions/UserActions';

class LeftSidebar extends Component {
    componentDidMount () {
        this.props.getCurrentUser();
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.props !== nextProps);
    }

    render() {
        const {user} = this.props;

        return (
            <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">

                <Link to={`/profile/${user.id}`}>
                    <RoundAvatar img={user.avatar} size='large' />
                    <h4>{user.name}</h4>
                </Link>

                <ul className="list-group">
                    <li className="list-group-item-custom"><i className="fas fa-clock fa-2x"></i> HẸN TỐC ĐỘ</li>
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

function mapDispatchToProps(dispatch) {
    return {
        getCurrentUser: () => dispatch(getCurrentUser())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftSidebar));