import React, { Component } from 'react';
import ProductLayout from './ProductLayout';
import {getProductsInWishlist} from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Link} from 'react-router-dom';

class Wishlist extends Component {
    componentDidMount() {
        this.props.getProductsInWishlist();
    }

    render() {
        const {products} = this.props;

        return (
            <ProductLayout title={`KHO QUÀ >> Quà yêu thích`}>
                <div className="row">
                    {
                        products.length ?
                        products.map((product, index) => {
                            return (
                                <div className="col-6" key={index}>
                                    <Link to={{pathname: `/products/${product.id}`, state: {receiver: this.props.location.state.receiver}}}>
                                        <div className="gift text-center">
                                            <h4>{product.name}</h4>
                                            <div className="gift-image">
                                                <img src={product.image}/>
                                            </div>
                                            <h5>{product.sale_price ? product.sale_price : product.price} xu</h5>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }) : (
                            <div>Bạn chưa yêu thích bất kỳ sản phẩm nào</div>
                        )
                    }
                </div>
            </ProductLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.product.products
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductsInWishlist: () => dispatch(getProductsInWishlist())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Wishlist));