import React, { Component } from 'react';
import ProductLayout from './ProductLayout';
import {getProductCategories} from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import {withRouter, Link} from 'react-router-dom';
import qs from 'qs';

class Categories extends Component {
    componentDidMount() {
        var type = 1;
        switch(this.props.match.params.type) {
            case 'gift': {
                type = 1;
                break;
            }
            case 'food': {
                type = 2;
                break;
            }
            case 'cafe': {
                type = 3;
                break;
            }
        }

        this.props.getProductCategories(type);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.match.params != nextProps.match.params) {
            var type = 1;
            switch(nextProps.match.params.type) {
                case 'gift': {
                    type = 1;
                    break;
                }
                case 'food': {
                    type = 2;
                    break;
                }
                case 'cafe': {
                    type = 3;
                    break;
                }
            }

            this.props.getProductCategories(type);
        }
    }

    render() {
        const {categories, user} = this.props;
        var receiver = user.id;
        if(this.props.location.state) {
            receiver = this.props.location.state.receiver;
        }

        return (
            <ProductLayout title="HÃY CHỌN MÓN QUÀ Ý NGHĨA ĐỐI VỚI NGƯỜI ẤY">
                <div className="row">
                    {
                        categories.length ? 
                            categories.map((category, index) => {
                                return (
                                    <div className="col-6" key={index}>
                                        <Link to={{pathname: `/product/categories/${category.id}`, state: {category: category, receiver: receiver}}}>
                                            <div className="gift text-center">
                                                <div className="gift-image">
                                                    <img src={category.image}/>
                                                </div>
                                                <h5>{category.name}</h5>
                                            </div>
                                        </Link>
                                    </div>
                                )
                            }) : (
                                <div>
                                    Không tìm thấy bất cứ danh mục sản phẩm nào!
                                </div>
                            )
                    }
                </div>
            </ProductLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        categories: state.product.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProductCategories: (type) => dispatch(getProductCategories(type))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));