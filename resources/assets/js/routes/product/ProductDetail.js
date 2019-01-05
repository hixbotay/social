import React, { Component } from 'react';
import ProductLayout from './ProductLayout';
import {getProductDetail} from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Link} from 'react-router-dom';
import Carousel from 'nuka-carousel';

class ProductDetail extends Component {
    constructor() {
        super();
        this.state = {
            itemNumbers: 1
        }
    }

    componentDidMount() {
        this.props.getProductDetail(this.props.match.params.id);
    }

    onChangeItemNumber(type) {
        if(type === 'minus' ) {
            if(this.state.itemNumbers <= 1){
                alert("Số lượng quà nhỏ nhất phải là 1. Vui lòng xem lại.");
            } else {
                this.setState({itemNumbers: this.state.itemNumbers - 1});
            }
        } else if(type === 'plus') {
            this.setState({itemNumbers: this.state.itemNumbers + 1});
        }
    }

    render() {
        const {product} = this.props;

        var images = [product.image];
        product.photos.forEach(photo => {
            images.push(photo.url);
        });

        return (
            <ProductLayout title={`KHO QUÀ >> ${product.category_name} >> CHỌN QUÀ`}>
                <div>
                    <Carousel
                        slidesToShow={1} 
                        autoplay={true}
                        autoGenerateStyleTag={true}
                        initialSlideHeight={400}
                        autoplay={true}
                        renderCenterLeftControls={({ previousSlide }) => (
                            <button className="arrow-btn" onClick={previousSlide}><i className="fas fa-chevron-circle-left"></i></button>
                        )}
                        renderCenterRightControls={({ nextSlide }) => (
                            <button className="arrow-btn" onClick={nextSlide}><i className="fas fa-chevron-circle-right"></i></button>
                        )}
                    >
                        {
                            images.map((image, index) => {
                                return (
                                    <img src={image} className="product-slider-img" key={index}/>
                                )
                            })
                        }
                    </Carousel>
                    <div className="mt-4">
                        <div>
                            <h4>
                                <b>{product.name}</b>
                            </h4>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <b>Giá: </b> 
                            </div>
                            <div className="col-10">
                                {
                                    product.sale_price ? (
                                        <h5>
                                            <b className="red">{product.sale_price}</b> <strike className="red">{product.price}</strike> Xu
                                        </h5>
                                    ) : (
                                        <h5>
                                            <b className="red">{product.sale_price}</b> Xu
                                        </h5>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2">
                                <b>Số lượng: </b> 
                            </div>
                            <div className="col-3">
                                <div className="row no-gutters">
                                    <div className="col-4">
                                        <button className="product-btn" onClick={() => this.onChangeItemNumber('minus')}>
                                            <i className="fas fa-minus"></i>
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <button className="product-btn">
                                            <b>{this.state.itemNumbers}</b>
                                        </button>
                                    </div>
                                    <div className="col-4">
                                        <button className="product-btn" onClick={() => this.onChangeItemNumber('plus')}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-6">
                                <button className="btn btn-danger">CHỌN QUÀ</button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5>MÔ TẢ SẢN PHẨM</h5>
                            <hr/>
                            <p>{product.content}</p>
                        </div>
                    </div>
                </div>
            </ProductLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: state.product.product
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductDetail: (id) => dispatch(getProductDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));