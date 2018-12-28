import React, { Component } from 'react';
import {getProductCategories} from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Link} from 'react-router-dom';
import CategoryItem from '../../components/Product/category';
import Loading from '../../components/Loading/';

class FoodCategories extends Component {
    componentDidMount() {
        this.props.getProductCategories();
    }

    render() {
        const {categories} = this.props;

        console.log(categories);

        return (
            <div className={'row'}>
                <div className={'col-md-12'}>
                    <Loading />
                </div>
                <CategoryItem />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        categories: state.product.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductCategories: () => dispatch(getProductCategories())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FoodCategories);