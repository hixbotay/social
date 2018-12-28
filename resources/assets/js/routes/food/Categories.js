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

        if (categories.length < 1){
            return (
                <div className={'row'}>
                    <div className={'col-md-12 text-center'}>
                        <Loading />
                    </div>
                </div>
            );
        }

        console.log(categories);

        return (
            <div className={'ui-block custom-card'}>
                <div className={'container'}>
                    <h6>Kho qùa</h6>
                    <hr className="seperate-line"/>

                    <CategoryItem categories={categories} />


                </div>
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