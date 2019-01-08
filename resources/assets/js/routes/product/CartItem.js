import React, { Component } from 'react';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            itemNumbers: props.item.quantity
        }
    }

    onChangeItemNumber(type) {
        if(type === 'minus') {
            this.setState({itemNumbers: this.state.itemNumbers - 1});
        } else if(type === 'plus') {
            this.setState({itemNumbers: this.state.itemNumbers + 1})
        }
        
        setTimeout(() => {
            console.log(1);
            this.props.onChangeItemNumbers(this.props.item.id, {quantity: this.state.itemNumbers});
        }, 1000);
    }

    render() {
        var {item} = this.props;
        // console.log(this.props);

        return (
            <div className="row mb-4">
                <div className="col-4">
                    <img src={item.image} />
                </div>
                <div className="col-4">
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
                <div className="col-4">
                    <div className="float-right">
                        <b>{item.sale_price ? item.sale_price : item.price} xu</b>
                    </div>
                </div>
            </div>
        );
    }
}

export default CartItem;