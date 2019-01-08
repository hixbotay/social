import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { getOtherUserDetail } from '../../actions/UserActions';
import { getCart, removeFromCart } from '../../actions/ProductActions';
import { withRouter, Link, Route } from 'react-router-dom';
import { CardWithTitle, Card } from '../../components/Card';
import SecondLayout from '../../layouts/SecondLayout';
import { RoundAvatar } from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';

class ProductLayout extends Component {

    componentDidMount() {
        if (this.props.location.state) {
            if (this.props.current_user.id != this.props.location.state.receiver) {
                this.props.getUserInfo(this.props.location.state.receiver);
            }
            this.props.getCart(this.props.location.state.receiver);
        } else {
            this.props.getCart(this.props.current_user.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.location.state) {
            if (nextProps.location.state.receiver != this.props.location.state.receiver) {
                if (this.props.current_user.id != nextProps.location.state.receiver) {
                    this.props.getUserInfo(this.props.location.state.receiver);
                }
                this.props.getCart(nextProps.location.state.receiver);
            }
        }
    }

    render() {
        const { other_user, current_user, cartItems, cartTotal, isShowCart } = this.props;
        var receiver = current_user.id;
        if (this.props.location.state) {
            receiver = this.props.location.state.receiver;
        }

        return (
            <div className="row">
                <main className="col col-xl-7 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <Card>
                        {this.props.children}
                    </Card>
                </main>
                <aside className="col col-xl-5 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    {
                        (receiver != current_user.id) ? (
                            <CardWithTitle title="BẠN ĐANG CHỌN QUÀ CHO">
                                <Link to={`/profile/${other_user.id}`}>
                                    <div className="author vcard inline-items profile-heading-info">
                                        <RoundAvatar img={other_user.avatar} size='medium'></RoundAvatar>

                                        <div className="author-date">
                                            <Heading heading={other_user.name} subHeading={other_user.address} size='medium'></Heading>
                                            {/* <InformationNumber likeNumber={this.state.likeNumber} viewNumber={this.props.user.viewNumber} heartNumber={this.state.loveNumber}></InformationNumber> */}
                                        </div>
                                    </div>
                                </Link>
                            </CardWithTitle>
                        ) : (
                                null
                            )
                    }
                    {
                        isShowCart ? (
                            <CardWithTitle title="GIỎ HÀNG CỦA BẠN">
                                <div className="mb-4"></div>
                                {
                                    cartItems.length ?
                                        <React.Fragment>
                                            {
                                                cartItems.map((item, index) => {
                                                    return (
                                                        <div className="cart-item mb-4" key={index}>
                                                            <div className="clearfix">
                                                                <div className="float-right" onClick={() => this.props.removeFromCart(item.id)}>
                                                                    <i className="fas fa-times"></i>
                                                                </div>
                                                            </div>
                                                            <div className="text-center mb-2">
                                                                <h5><b>{item.name}</b></h5>
                                                            </div>
                                                            <div className="text-center mb-2">
                                                                <img src={item.image} />
                                                            </div>
                                                            <div className="text-center item-price">
                                                                <b>{item.sale_price ? item.sale_price : item.price} xu x {item.quantity}</b>
                                                            </div>
                                                        </div>
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
                                                <p>Giỏ hàng của bạn không có bất kỳ sản phẩm nào.</p>
                                            </div>
                                        )
                                }
                            </CardWithTitle>
                        ) : null
                    }
                </aside>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        other_user: state.user.other_user_data.user,
        current_user: state.user.current_user,
        cartItems: state.product.cartItems,
        cartTotal: state.product.cartTotal
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (id) => dispatch(getOtherUserDetail(id)),
        getCart: (receiver) => dispatch(getCart(receiver)),
        removeFromCart: (id) => dispatch(removeFromCart(id))
    }
}

ProductLayout.defaultProps = {
    isShowCart: true
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProductLayout));