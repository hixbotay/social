import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import {Card, CardWithTitle, ImageCard} from '../../components/Card';
import { RoundAvatar } from '../../components/Avatar';
import connect from 'react-redux/es/connect/connect';
import { getCafeDetail, updateImage } from '../../actions/CafeActions';
import { getProducts } from '../../actions/ProductActions';
import { withRouter, Link } from 'react-router-dom';
import ImageCompressor from 'image-compressor.js';
import Carousel from "nuka-carousel";
import Image from "react-image-resizer";
import Slider from "react-slick/lib";
function PrevArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
        >
            <i className="fa fa-chevron-left slick-prev couple-slider-nav"/>
        </div>
    );
}

function NextArrow(props) {
    const { onClick } = props;
    return (
        <div
            onClick={onClick}
        ><i className="fa fa-chevron-right slick-next couple-slider-nav"/></div>
    );
}
class CafeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }

    componentDidMount() {
        this.props.getCafeDetail(this.props.match.params.id);
        this.props.getProducts({ agency_id: this.props.match.params.id });
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
        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
        };
        var images = [
            'landing1.jpg',
            'landing2.jpg',

        ];
        return (
            <CafeLayout>
                <div className={"add-cafe-banner"}>
                    <Slider {...settings}>
                        {
                            images.map((item, index) => {
                                return (
                                    <div key={index} className="custom-slider-item">
                                        <Image src={`${baseUrl}/public/images/main/`+item} width='100%' height={400}/>
                                    </div>
                                )
                            })
                        }
                    </Slider>
                </div>
                <Card>
                    <div className="row">
                        <RoundAvatar img={baseUrl + '/' + agency.avatar} size="x-medium"></RoundAvatar>
                        {
                            (user.id === agency.user_id) ? (
                                <label className="btn-change-avatar medium">
                                    <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'avatar')} /><i
                                    className="fas fa-camera fa-2x camera"></i>
                                </label>
                            ) : null
                        }
                        <div className="post__author author vcard inline-items" id="cafe-avatar">
                            <div className="author-date">
                                <h4 className='store-name'>{agency.name}</h4>
                                <div>
                                    {
                                        agency.type ?
                                            (
                                                agency.type === 1 ? (
                                                    <div>CAFE</div>
                                                ) : (
                                                    <div className="address-type">QUÁN ĂN</div>
                                                )
                                            ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-4">
                            <div>
                                <i className="fas fa-map-marker-alt"></i> {agency.address}
                            </div>
                            <div className={(agency.open < now.toString() && agency.close > now.toString()) ? "open-now" : ""}>
                                <i className="far fa-clock"></i>
                                <span>
                                    {
                                        (agency.open < now.toString() && agency.close > now.toString()) ? ' Đang mở cửa' : ' Đã đóng cửa'
                                    }
                                </span>
                            </div>
                            <div>
                                <i className="fas fa-tag"></i> {agency.min_price} - {agency.max_price}
                            </div>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary btn-sm" id="btn-cafe-2">
                                Đặt chỗ
                            </button>
                            <button className="btn btn-primary btn-sm  bg-white" id="btn-cafe-1" onClick={() => this.createDating(agency.id)}>
                                Hẹn hò
                            </button>

                        </div>
                    </div>
                </Card>
                <CardWithTitle title="HÌNH ẢNH CÓ LIÊN QUAN" hasLine={true}>
                    {
                        (user.id === agency.user_id) ? (
                            <div className="row store-images cafe-details">
                                <div className='image-item col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                    <div className="image-card box-shadow-default border-0">
                                        <label className="btn-add-image" id="btn-normal-img">
                                            <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e, 'normal')} />
                                            <i className="fas fa-camera"></i> <span>Thêm ảnh</span>
                                        </label>

                                    </div>
                                </div>
                                <div className='image-item col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                    <div className="image-card box-shadow-default border-0">
                                        <label className="btn-add-image" id="btn-normal-video">
                                            <input type="file" className="d-none" name="video" onChange={(e) => this.handleImage(e, 'normal')} />
                                            <i className="fas fa-film"></i> <span>Thêm video</span>
                                        </label>

                                    </div>
                                </div>
                                {
                                    agency.images.map((item, index) => {
                                        return (
                                            <div className='image-item col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                                <div className="image-card box-shadow-default">
                                                    <img src={item} key={index}/>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <div className="row store-images cafe-details">
                                {
                                    agency.images.map((item, index) => {
                                        return (
                                            <div className='image-item col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-12'>
                                                <div className="image-card box-shadow-default">
                                                    <img src={item} key={index} />
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <div className='col-12'>
                                    <div className='load-more text-center'>
                                        <a className='btn btn-link color-blue'>
                                            Xem thêm ảnh
                                        </a>
                                    </div>
                                </div>
                            </div>
                            )
                    }
                </CardWithTitle>
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