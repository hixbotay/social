import React, { Component } from 'react';
import { CardWithTitle } from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
import ProductLayout from './ProductLayout';
import CartItem from './CartItem';
import {withRouter} from 'react-router-dom';
import {getCart, updateCart, checkout} from '../../actions/ProductActions';
import Modal from 'react-modal';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
            reserveInformation: {},
            alert: "",
            isSuccess: false,
            isOpen: false
        }
    }

    componentDidMount() {
        var receiver = this.props.user.id;
        if(this.props.location.state) {
            receiver = this.props.location.state.receiver;
        }
        this.props.getCart(receiver);
    }

    onChangeInput(e) {
        this.setState({
            reserveInformation: {
                ...this.state.reserveInformation,
                [e.target.name]: e.target.value
            }
        })
    }

    checkout() {
        var receiver = this.props.user.id;
        if(this.props.location.state) {
            receiver = this.props.location.state.receiver;
        }

        this.props.checkout({
            cartTotal: this.props.cartTotal, 
            shipFee: 20000, 
            receiver: receiver, 
            params: JSON.stringify(this.state.reserveInformation)
        }).then(data => {
            if(data.ok) {
                this.setState({
                    isSuccess: true,
                    alert: "Bạn đã thanh toán thành công",
                    isOpen: true
                });
            }
            if(data.alert) {
                this.setState({
                    isSuccess: false,
                    alert: data.alert,
                    isOpen: true
                });
            }
        });
    }

    closeModal() {
        this.setState({isOpen: false});
        window.location.reload();
    }

    render() {
        var {cartItems, cartTotal} = this.props;

        return (
            <ProductLayout isShowCart={false}>
                <CardWithTitle title="HỘP QUÀ CỦA BẠN">
                    {
                        cartItems.length ?
                            <React.Fragment>
                                {
                                    cartItems.map((item, index) => {
                                        return (
                                            <CartItem item={item} key={index} onChangeItemNumbers={(id, data) => this.props.updateCart(id, data)} />
                                        )
                                    })
                                }
                                <div className="row">
                                    <div className="col-5"><h5>Tổng tiền quà:</h5></div>
                                    <div className="col-7"><h5>{cartTotal} xu</h5></div>
                                </div>
                                <div className="row">
                                    <div className="col-5"><h5>Phí gửi quà:</h5></div>
                                    <div className="col-7"><h5>20000 xu</h5></div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-5"><h5>Tổng chi phí:</h5></div>
                                    <div className="col-7"><h5 className="red">{cartTotal + 20000} xu</h5></div>
                                </div>
                            </React.Fragment>
                            : (
                                <div className="text-center">
                                    <p>Hộp quà này của bạn đang không có bất kỳ sản phẩm nào.</p>
                                </div>
                            )
                    }
                    <div className="mt-4"></div>
                    <h5>Quy định tặng quà</h5>
                    <div>
                        <p>
                            Quà tặng sẽ chỉ được gửi đến người ấy nếu người ấy đồng ý nhận quà.
                            Trường hợp người ấy không đồng ý tài khoản sẽ được hoàn lại cho bạn.
                        </p>
                        <p>
                            Nếu người ấy đồng ý nhưng sau đố từ chối nhận, quà sẽ được trả lại nơi xuất phát
                            và sẽ được gửi đến địa chỉ dự phòng bạn nhập dưới đây. Phí nhận quà sẽ do người nhận 
                            chi trả. Chúng tôi sẽ thông báo khi quà bị trả để bạn biết. Và nếu người nhận dự phòng
                            từ chối, quà tặng sẽ bị trả lại noiduyen.vn và được chuyển làm từ thiện theo chương trình 
                            hằng năm!!!
                        </p>
                    </div>

                    <h5>Địa chỉ dự phòng</h5>
                    <div className="preventive-form">
                        <div>Hãy ghi địa chỉ chính xác nhé</div>
                        <div className="row mt-2">
                            <div className="col-6">
                                Họ tên người nhận
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" name="name" onChange={(e) => this.onChangeInput(e)}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                Địa chỉ
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" name="address" onChange={(e) => this.onChangeInput(e)}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-6">
                                Số điện thoại
                            </div>
                            <div className="col-6">
                                <input type="text" className="form-control" name="phone" onChange={(e) => this.onChangeInput(e)}/>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <button className="btn btn-secondary" onClick={() => this.checkout()}>
                            XÁC NHẬN THANH TOÁN
                        </button>
                    </div>
                </CardWithTitle>
                <Modal isOpen={this.state.isOpen}>
                    <div className="float-right">
                        <a href="javascript:void(0);" onClick={this.closeModal}>
                            <i className="fas fa-times fa-2x"></i>
                        </a>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            {
                                this.state.isSuccess ? (
                                    <img src="public/images/success.png" width="256px" height="256px"/>
                                ) : (
                                    <img src="public/images/alert.png" width="256px" height="256px"/>
                                )
                            }
                        </div>
                        <div className="col-9 d-flex align-items-center">
                            <h5>{this.state.alert}</h5>
                        </div>
                    </div>
                </Modal>
            </ProductLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        cartItems: state.product.cartItems,
        cartTotal: state.product.cartTotal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCart: (receiver) => dispatch(getCart(receiver)),
        updateCart: (id, data) => dispatch(updateCart(id, data)),
        checkout: data => dispatch(checkout(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Checkout));