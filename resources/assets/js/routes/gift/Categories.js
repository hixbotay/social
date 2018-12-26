import React, { Component } from 'react';
import GiftLayout from './GiftLayout';
import {getProductCategories} from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Link} from 'react-router-dom';

class Categories extends Component {
    componentDidMount() {
        this.props.getProductCategories();
    }

    render() {
        const {categories} = this.props;

        return (
            <GiftLayout title="HÃY CHỌN MÓN QUÀ Ý NGHĨA ĐỐI VỚI NGƯỜI ẤY">
                <div className="row">
                    {
                        categories.map((category, index) => {
                            return (
                                <div className="col-6" key={index}>
                                    <Link to={{pathname: `/gift/categories/${category.id}`, state: {category: category, receiver: this.props.location.state.receiver}}}>
                                        <div className="gift text-center">
                                            <div className="gift-image">
                                                <img src={category.image}/>
                                            </div>
                                            <h5>{category.name}</h5>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                </div>
            </GiftLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);