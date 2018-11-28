import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// component
import CreatePostForm from '../../components/Post/CreatePostForm';
import Post from '../../components/Post';
// action
import { chargePayment } from '../../actions/Payment';

class PaymentCharge extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            error: '',
        }
    }

    charge() {
        const { amount } = this.state;
        if(amount < 50000){
            this.setState({error: "SO TIEN QUA IT"});
            return;
        }
        this.props.chargePayment({amount: amount})
            .then( (response) => {
                console.log(response);
            });
    }

    render() {

        return (
            <div className="ui-block custom-card undefined">
                <div className="container">
                    <h6>Trang Charge tien</h6>
                    <hr className="seperate-line" />

                    <form action="api/payment/request" method="POST">
                        <div className="form-group">
                            <label htmlFor="amount">Số tiền nạp:</label>
                            <input
                                type="number" id="amount"
                                value={this.state.amount}
                                onChange={(evt) => {
                                    this.setState({amount: evt.target.value})
                                }}
                                className="form-control" />
                            <small id="amountHelp" className="form-text text-danger">{this.state.error}</small>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={this.charge.bind(this)}>NAP TIEN</button>
                    </form>
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.post.posts,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chargePayment: (data) => dispatch(chargePayment(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentCharge));