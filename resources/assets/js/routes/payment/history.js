import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllPosts } from '../../actions/PostActions';
import { formatMoney } from '../../helper/function'


class PaymentHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    componentDidMount() {
        document.title = "Lich su thanh toan"
    }

    render() {

        return (
            <div className={"paymentHistory"}>

                <div className="row">
                    <div className={"col-md-9 sodu"}>
                        <div className="row">
                            <div className={"col-md-1"}>
                                <i className="fas fa-money-bill-alt"></i>
                            </div>
                            <div className={"col-md-11"} onClick={() => {console.log(this.props)}}>
                                So du hien tai: {formatMoney(this.props.current_user.credit)} VND
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 action">
                        <div className={"row"} onClick={() => {alert("Dang hoan thien")}}>
                            <div className={"col-md-10"}>
                                Rut tien
                            </div>
                            <div className={"col-md-2"}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="mb-3"></div>

                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <button type="button" className="btn btn-secondary">
                            <Link to={'/payment/charge'}>Nap tien</Link>
                        </button>
                    </div>
                </div>

                <div className="mb-3"></div>

                <div className={"row historyBox"}>
                    <div className={"col-md-12 title"}>
                        Hom nay
                    </div>
                    <div className={"col-md-12 content"}>
                        <div className="row">
                            <div className={"col-md-8"}>
                                <div className={"row"}>
                                    <div className="col-md-4 text-right">
                                        <i className="fab fa-500px"></i>
                                    </div>
                                    <div className="col-md-8">

                                        <p>Nang cap tai khoan vip</p>
                                        <p>15h 15p</p>
                                        <p>Viettinbank</p>

                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <p className="text-danger">- 300.000 VND</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className={"col-md-8"}>
                                <div className={"row"}>
                                    <div className="col-md-4 text-right">
                                        <i className="fab fa-500px"></i>
                                    </div>
                                    <div className="col-md-8">

                                        <h6>Nang cap tai khoan vip</h6>
                                        <p>15h 15p</p>
                                        <p>Viettinbank</p>

                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <p className={"text-success"}>+ 600.000 VND</p>
                            </div>
                        </div>
                    </div>
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
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentHistory));