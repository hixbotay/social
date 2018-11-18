import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class NotFound extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    render() {

        return (
            <div className={"row text-center"}>
                <div className={"col-12"}>
                    <h2>Không tìm thấy !!</h2>
                        <br />
                    <h4>Liên kết bạn theo dõi có thể bị hỏng hoặc trang có thể đã bị xóa.</h4>
                        <br />
                </div>
                <div className={"col-12"}>
                    <img src={"https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/KoMvLlw5YQV.png"} />
                </div>
            </div>
        );
    }
}

export default NotFound;