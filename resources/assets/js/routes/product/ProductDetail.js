import React, { Component } from 'react';
import ProductLayout from './ProductLayout';
import { getProductDetail, addToCart } from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import Modal from 'react-modal';

Modal.setAppElement('#app');

class ProductDetail extends Component {

    constructor() {
        super();
        this.state = {
            itemNumbers: 1,
            isOpen: false
        }
    }

    componentDidMount() {
        this.props.getProductDetail(this.props.match.params.id);
    }

    onChangeItemNumber(type) {
        if (type === 'minus') {
            if (this.state.itemNumbers <= 1) {
                alert("Số lượng quà nhỏ nhất phải là 1. Vui lòng xem lại.");
            } else {
                this.setState({ itemNumbers: this.state.itemNumbers - 1 });
            }
        } else if (type === 'plus') {
            this.setState({ itemNumbers: this.state.itemNumbers + 1 });
        }
    }

    addToCart() {
        var price = this.props.product.sale_price ? this.props.product.sale_price : this.props.product.price;
        var itemNumbers = this.state.itemNumbers;
        if (this.props.user.credit >= price * itemNumbers) {
            this.props.addToCart({
                product_id: this.props.product.id,
                quantity: this.state.itemNumbers
            })
        } else {
            this.setState({ isOpen: true });
        }
    }

    closeModal() {
        this.setState({ isOpen: false })
    }

    render() {
        const { product } = this.props;

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
                                    <img src={image} className="product-slider-img" key={index} />
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
                                <button className="btn btn-danger" onClick={() => this.addToCart()}>
                                    CHỌN QUÀ
                                </button>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5>MÔ TẢ SẢN PHẨM</h5>
                            <hr />
                            <p>{product.content}</p>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isOpen} >
                    <div className="text-center">
                        <h4 className="red"><b>RẤT TIẾC!!!</b></h4>
                    </div>
                    <div>
                        <h5 className="red">Bạn không đủ xu để chọn quà với số lượng này!</h5>
                        <div>Lưu ý: Phí gửi quà là 20000 xu</div>
                        <div>Bạn phải nạp đủ xu cho quà tặng và phí gửi</div>
                        <div>Nếu  bạn không phải người ga lăng, hãy...</div>
                        <div className="text-center mt-2">
                            <button className="btn btn-secondary" onClick={() => this.closeModal()}>
                                BỎ QUA
                            </button>
                        </div>
                    </div>
                </Modal>
            </ProductLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        product: state.product.product,
        user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductDetail: (id) => dispatch(getProductDetail(id)),
        addToCart: (data) => dispatch(addToCart(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));