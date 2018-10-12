import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import { Card } from '../../components/Card';
import { RoundAvatar } from '../../components/Avatar';
import connect from 'react-redux/es/connect/connect';
import { getCafeDetail, updateImage } from '../../actions/CafeActions';
import { withRouter } from 'react-router-dom';
import SimpleSlider from '../../components/Slider/SimpleSlider';

class CafeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    componentDidMount() {
        this.props.getCafeDetail(this.props.match.params.id);
    }

    handleImage(event, type) {
        var component = this;
        var file = event.target.files[0];

        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            component.props.updateCafeImage({ image: reader.result, type: type }, component.props.match.params.id);
        };
        reader.onerror = function (error) {
            window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
        };
    }

    render() {
        const { agency } = this.props;
        var now = new Date().getHours();

        return (
            <CafeLayout>
                <div className={"add-cafe-banner"}>
                    <img src={agency.cover ? agency.cover : 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png'} />
                    <label className="btn-add-image"> <i className="fas fa-camera fa-2x"></i>
                        <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'cover')} />
                    </label>
                </div>
                <Card>
                    <div className="post__author author vcard inline-items" id="cafe-avatar">
                        <RoundAvatar img={agency.avatar} size="large"></RoundAvatar>
                        <label className="btn-change-avatar">
                            <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'avatar')} />
                        </label>

                        <div className="author-date">
                            <h3>{agency.name}</h3>
                            <p>{agency.params}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-4">
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
                            <button className="btn btn-primary" id="btn-cafe-1">Hẹn hò</button>
                            <button className="btn btn-primary" id="btn-cafe-2">Đặt chố</button>
                        </div>
                    </div>
                </Card>
                <Card>
                    <p>Thêm ảnh có liên quan để mô tả rõ hơn về quán</p>
                    <div className="row">
                        <div className="col-3">
                            <label className="btn-add-image" id="btn-normal-img"> 
                                <i className="fas fa-camera fa-2x"></i>
                                <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'normal')} />
                            </label>
                        </div>
                        <div className="col-9">
                            <SimpleSlider images={agency.images} slidesToShow={3}></SimpleSlider>
                        </div>
                    </div>
                </Card>
            </CafeLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        agency: state.cafe.currentCafe
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCafeDetail: (id) => dispatch(getCafeDetail(id)),
        updateCafeImage: (data, id) => dispatch(updateImage(data, id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CafeDetail));