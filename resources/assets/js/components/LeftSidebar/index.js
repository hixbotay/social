import React, { Component } from 'react';
import Avatar from '../Information/Avatar';
import {Link} from 'react-router-dom';

class LeftSidebar extends Component {
    render() {
        return (
            <aside className="col col-xl-2 order-xl-1 col-lg-6 order-lg-2 col-md-6 col-sm-12 col-12">
                {/* <div className="ui-block"> */}

                    <Link to="/profile">
                        <Avatar src="https://images.vexels.com/media/users/3/145908/preview2/52eabf633ca6414e60a7677b0b917d92-male-avatar-maker.jpg" />
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
                {/* </div> */}
            </aside>
        );
    }
}

export default LeftSidebar;