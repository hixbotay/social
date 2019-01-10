import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import { Card, CardWithTitle } from '../../components/Card';
import { RoundAvatar } from '../../components/Avatar';
import connect from 'react-redux/es/connect/connect';
import { getCafeDetail, updateImage } from '../../actions/CafeActions';
import { getProducts } from '../../actions/ProductActions';
import { withRouter, Link } from 'react-router-dom';
import ImageCompressor from 'image-compressor.js';
import Carousel from "nuka-carousel";

class CafeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    componentDidMount() {
        this.props.getCafeDetail(this.props.match.params.id);
        this.props.getProducts({agency_id: this.props.match.params.id});
    }

    createDating(id) {
        setCookie('cafe_id', id, 1);
        window.location.href = `${baseUrl}/dating/create`;
    }

    handleImage(event, type) {
        var component = this;
        var file = event.target.files[0];

        new ImageCompressor(file, {
            quality: 0.6,
            convertSize: 400000,
            success(result) {
                var reader = new FileReader();
                reader.readAsDataURL(result);
                reader.onload = function () {
                    component.props.updateCafeImage({ image: reader.result, type: type }, component.props.match.params.id);
                };
                reader.onerror = function (error) {
                    window.alert("Đã có lỗi xảy ra, vui lòng chọn lại ảnh");
                };
            }
        });
    }

    render() {
        const { user, agency, products } = this.props;
        var now = new Date().getHours();

        return (
            <CafeLayout>
                <div className={"add-cafe-banner"}>
                    <img src={agency.cover ? baseUrl + '/' + agency.cover : 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png'} />
                    {
                        (user.id === agency.user_id) ? (
                            <label className="btn-add-image"> <i className="fas fa-camera fa-2x"></i>
                                <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'cover')} />
                            </label>
                        ) : null
                    }
                </div>
                <Card>
                    <div className="post__author author vcard inline-items" id="cafe-avatar">
                        <RoundAvatar img={baseUrl + '/' + agency.avatar} size="large"></RoundAvatar>
                        {
                            (user.id === agency.user_id) ? (
                                <label className="btn-change-avatar">
                                    <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'avatar')} />
                                </label>
                            ) : null
                        }

                        <div className="author-date">
                            <h3>{agency.name}</h3>
                            <div>
                                {
                                    agency.type == 1 ? (
                                        <div className="address-type">CAFE</div>
                                    ) : (
                                        <div className="address-type">QUÁN ĂN</div>
                                    )
                                }
                            </div>
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
                            <button className="btn btn-primary" id="btn-cafe-1" onClick={() => this.createDating(agency.id)}>
                                Hẹn hò
                            </button>
                            <button className="btn btn-primary" id="btn-cafe-2">
                                Đặt chố
                            </button>
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
                            <Carousel 
                                slidesToShow={3} 
                                cellSpacing={5}
                                autoplay={true}
                                autoGenerateStyleTag={true}
                                initialSlideHeight={250}
                                autoplay={true}
                                renderCenterLeftControls={({ previousSlide }) => (
                                    <button className="arrow-btn" onClick={previousSlide}><i className="fas fa-chevron-circle-left"></i></button>
                                )}
                                renderCenterRightControls={({ nextSlide }) => (
                                    <button className="arrow-btn" onClick={nextSlide}><i className="fas fa-chevron-circle-right"></i></button>
                                )}
                            >
                                {
                                    agency.images.map((item, index) => {
                                        return (
                                            <img src={item} key={index}/>
                                        )
                                    })
                                }
                            </Carousel>
                        </div>
                    </div>
                </Card>
                <CardWithTitle title="SẢN PHẨM CỦA QUÁN" hasLine={true}>
                    <div className="row">
                    {
                        products.map((product, index) => {
                            return (
                                <div className="col-4" key={index}>
                                    <Link to={`/products/${product.id}`}>
                                        <img src={product.image} className="product-thumbnail" />
                                        <h5>
                                            <b>{product.name}</b>
                                        </h5>
                                        <div>
                                            <b className="red">{product.sale_price ? product.sale_price : product.price} xu</b>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    </div>
                </CardWithTitle>
            </CafeLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        agency: state.cafe.currentCafe,
        products: state.product.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCafeDetail: (id) => dispatch(getCafeDetail(id)),
        updateCafeImage: (data, id) => dispatch(updateImage(data, id)),
        getProducts: (query) => dispatch(getProducts(query))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CafeDetail));