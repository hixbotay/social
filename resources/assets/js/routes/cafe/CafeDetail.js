import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import { Card } from '../../components/Card';
import {RoundAvatar} from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import connect from 'react-redux/es/connect/connect';
import {getCafeDetail} from '../../actions/CafeActions';
import {withRouter} from 'react-router-dom';

class CafeDetail extends Component {

    componentDidMount() {
        this.props.getCafeDetail(this.props.match.params.id);
    }

    handleImage(e) {
        console.log(e.target.attr('files')[0]);
    }

    render() {
        const {agency} = this.props;
        var now = new Date().getHours();

        return (
            <CafeLayout>
                <div className={"add-cafe-banner"}>
                    <img src='http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png'/>
                    
                    <label className="btn-add-image"> <i className="fas fa-camera fa-2x"></i> 
                        <input type="file" className="d-none" onChange={(e) => this.handleImage(e)}/>
                    </label>
                </div>
                <Card>
                    <div className="post__author author vcard inline-items">
                        <RoundAvatar img={agency.image} size="large"></RoundAvatar>

                        <div className="author-date">
                            <Heading size="medium" heading={agency.name} subHeading={agency.params}></Heading>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <div>
                                <i className="fas fa-map-marker-alt"></i> {agency.address}
                            </div>
                            <div>
                                <i className="far fa-clock"></i> 
                                {
                                    (agency.open < now.toString() && agency.close > now.toString()) ? ' Đang mở cửa' : ' Đã đóng cửa'
                                }
                            </div>
                            <div>
                                <i className="fas fa-tag"></i> {agency.min_price} - {agency.max_price}
                            </div>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-outline-primary" id="btn-cafe-1">Hẹn hò</button>
                            <button className="btn btn-primary" id="btn-cafe-2">Đặt chố</button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <p>Thêm ảnh có liên quan để mô tả rõ hơn về quán</p>
                </Card>
            </CafeLayout>
        );
    }
}

function mapStateToProps (state) {
    return {
        agency: state.cafe.currentCafe
    }
}

function mapDispatchToProps (dispatch) {
    return {
        getCafeDetail: (id) => dispatch(getCafeDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CafeDetail));