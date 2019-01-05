import React, { Component } from 'react';
import ProductLayout from './ProductLayout';
import {getProducts} from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Link} from 'react-router-dom';

class Products extends Component {
    componentDidMount() {
        this.props.getProducts({category_id: this.props.location.state.category.id});
    }

    render() {
        const {products} = this.props;

        return (
            <ProductLayout title={`KHO QUÀ >> ${this.props.location.state.category.name}`}>
                <div className="row">
                    {
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
                        })
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
        getProducts: (query) => dispatch(getProducts(query))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));