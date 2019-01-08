import React, { Component } from 'react';
import ProductLayout from './ProductLayout';
import { getProductDetail, addToCart, updateWishlist } from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Link } from 'react-router-dom';
import Carousel from 'nuka-carousel';
import Modal from 'react-modal';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

Modal.setAppElement('#app');

class ProductDetail extends Component {

    constructor() {
        super();
        this.state = {
            itemNumbers: 1,
            isOpenAlert: false,
            isOpenSuccess: false,
            isInWishlist: false
        }
    }

    componentDidMount() {
        this.props.getProductDetail(this.props.match.params.id);
        if(this.props.user.wishlist_product) {
            this.setState({
                isInWishlist: this.props.user.wishlist_product.split(',').indexOf(this.props.match.params.id) >= 0
            });
        }
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
                quantity: this.state.itemNumbers,
                receiver: this.props.location.state.receiver
            });
            this.setState({ isOpenSuccess: true });
        } else {
            this.setState({ isOpenAlert: true });
        }
    }

    closeAlert() {
        this.setState({ isOpenAlert: false })
    }

    closeSuccessModal() {
        this.setState({ isOpenSuccess: false });
        // window.location.reload();
    }

    toggleWishlist() {
        var type = 'add';
        if(this.state.isInWishlist) {
            type = 'remove';
        }

        this.props.updateWishlist({type: type, product_id: this.props.product.id}).then(data => {
            if(data.ok) {
                this.setState({isInWishlist: !this.state.isInWishlist});
            }
        })
    }

    render() {
        const { product } = this.props;
        var {isInWishlist} = this.state;

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
                                            <b className="red">{product.price}</b> Xu
                                        </h5>
                                    )
                                }
                            </div>
                        </div>
                        <div className="row d-flex align-items-center">
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
                                    <div className="col-4 d-flex align-items-center">
                                        <button className="product-btn" onClick={() => this.onChangeItemNumber('plus')}>
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-1"></div>
                            <div className="col-3">
                                <button className="btn btn-danger" id="choose-product-btn" onClick={() => this.addToCart()}>
                                    CHỌN QUÀ
                                </button>
                            </div>
                            <div className="col-3">
                                <div onClick={() => this.toggleWishlist()}>
                                    {
                                        isInWishlist ? (
                                            <FaHeart color='#e74c3c' id="wishlist-icon"/>
                                        ) : (
                                            <FaRegHeart id="wishlist-icon"/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5>MÔ TẢ SẢN PHẨM</h5>
                            <hr />
                            <p>{product.content}</p>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isOpenAlert} >
                    <div className="text-center">
                        <h4 className="red"><b>RẤT TIẾC!!!</b></h4>
                    </div>
                    <div>
                        <h5 className="red">Bạn không đủ xu để chọn quà với số lượng này!</h5>
                        <div>Lưu ý: Phí gửi quà là 20000 xu</div>
                        <div>Bạn phải nạp đủ xu cho quà tặng và phí gửi</div>
                        <div>Nếu  bạn không phải người ga lăng, hãy...</div>
                        <div className="text-center mt-2">
                            <button className="btn btn-secondary" onClick={() => this.closeAlert()}>
                                BỎ QUA
                            </button>
                        </div>
                    </div>
                </Modal>
                <Modal isOpen={this.state.isOpenSuccess} >
                    <div className="text-center">
                        <h4 className="red"><b>ĐÃ XONG!!!</b></h4>
                    </div>
                    <div>
                        <h5>Bạn muốn chọn tiếp quà cho người ấy hay chuyển sang phần thanh toán</h5>
                        <div className="row">
                            <div className="col-6">
                                <div className="text-center mt-2">
                                    <button className="btn btn-secondary" onClick={() => this.closeSuccessModal()}>
                                        CHỌN TIẾP
                                    </button>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="text-center mt-2">
                                    <Link to={{pathname: "/checkout", state: {receiver: this.props.location.state.receiver}}}>
                                        <button className="btn btn-secondary">
                                            THANH TOÁN
                                        </button>
                                    </Link>
                                </div>
                            </div>
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
        user: state.user.current_user,
        cartItems: state.product.cartItems,
        cartTotal:state.product.cartTotal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductDetail: (id) => dispatch(getProductDetail(id)),
        addToCart: (data) => dispatch(addToCart(data)),
        updateWishlist: (data) => dispatch(updateWishlist(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductDetail));