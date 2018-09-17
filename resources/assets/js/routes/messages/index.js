import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllDistrict, getAllProvince} from "../../actions/CafeActions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

class Messages extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            openLightBox: false,
            images: [
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
            ]
        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="row">

                <div className="col-md-5">

                    <div className="ui-block">

                        <div className={"chat-list-title"}>

                            <div className={"row"}>
                                <ul>
                                    <li>Tất cả</li>
                                    <li>Chưa đọc</li>
                                    <li>Online</li>
                                    <li>Soạn tin</li>
                                    <li><i className="fas fa-star"></i></li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>

                <div className="col col-md-7">
                    <div className="ui-block">
                        <p>Nội dung chát</p>
                    </div>
                </div>

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        province: state.cafe.allprovince,
        district: state.cafe.alldistrict
    };
}

export default withRouter(connect(mapStateToProps, {getAllProvince, getAllDistrict})(Messages));