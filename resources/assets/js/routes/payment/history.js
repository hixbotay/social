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
                            <div className={"col-md-2"}>
                                <img style={{width: '90%',}} src="https://image.flaticon.com/icons/png/512/64/64979.png" />
                            </div>
                            <div className={"col-md-10"} onClick={() => {console.log(this.props)}}>
                                <div className="row">
                                    <div className={"col-md-6"}>
                                        So du hien tai
                                    </div>
                                    <div className={"col-md-6"}>
                                        : {formatMoney(this.props.current_user.credit)} VND
                                    </div>
                                </div>
                                <div className={"row"}>
                                    <div className={"col-md-6"}>
                                        Tai khoan khuyen mai
                                    </div>
                                    <div className={"col-md-6"}>
                                        : {formatMoney(this.props.current_user.credit)} VND
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 action">
                        <div className={"row middle-vertical"} onClick={() => {
                            alert("Dang hoan thien");
                            console.log(this.props)
                        }}>
                            <div className={"col-md-10 align-middle"}>
                                Rut tien
                            </div>
                            <div className={"col-md-2 align-middle"}>
                                <i className="fas fa-chevron-right"></i>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="mb-3"></div>

                <div className={"row"}>
                    <div className={"col-md-12"}>
                        <Link to={'/payment/charge'}>
                            <button type="button" className="btn btn-secondary">
                                Nap tien
                            </button>
                        </Link>
                        <button type="button" className={'btn btn-secondary'} onClick={() => {
                            console.log(this.props);
                        }}>
                            TEST
                        </button>
                    </div>
                </div>

                <div className="mb-3"></div>

                <div className={"row historyBox"}>

                    <div className={"col-md-12 title"}>
                        <div className={"row text-center"}>
                            <div className={"col-md-6 text-center row-right"}>
                                <p>Từ ngày</p>
                                <p align="center">
                                    <input type={'date'} name={'from_date'} onChange={() => {}} />
                                </p>
                            </div>
                            <div className={"col-md-6 text-center row-left"}>
                                <p>Đến ngày</p>
                                <p align="center">
                                    <input type={'date'} name={'to_date'} onChange={() => {

                                    }} />
                                </p>
                            </div>
                        </div>

                        <div className={"row"}>
                            <div className={"col-md-12 text-center"}>
                                <button type="button" className="custombutton1">Tìm kiếm</button>
                            </div>
                        </div>

                    </div>


                    <div className={"col-md-12 content"}>

                        <div className={"row paymentheading center text-center"}>
                            <ul className={"text-center"}>
                                <li className={"active"}>Tat ca</li>
                                <li>Tien vao</li>
                                <li>Tien ra</li>
                            </ul>
                        </div>

                        <div className="row item">
                            <div className={"col-md-8"}>
                                <div className={"row"}>
                                    <div className="col-md-4 text-right">
                                        <img src={"https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/heart-circle-red-2-512.png"} />
                                    </div>
                                    <div className="col-md-8">

                                        <h6>Nang cap tai khoan vip</h6>
                                        <h6>15h 15p</h6>
                                        <h6>Viettinbank</h6>
                                        <h6 className={"text-success"}>Done</h6>

                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <p className="text-success">+ 300.000 VND</p>
                            </div>
                        </div>
                        <div className="row item">
                            <div className={"col-md-8"}>
                                <div className={"row"}>
                                    <div className="col-md-4 text-right">
                                        <img src={"https://cdn3.iconfinder.com/data/icons/cash-card-starters-glyph/48/Sed-08-512.png"} />
                                    </div>
                                    <div className="col-md-8">

                                        <h6>Nang cap tai khoan vip</h6>
                                        <h6>15h 15p</h6>
                                        <h6>Viettinbank</h6>
                                        <h6 className={"text-danger"}>Đã hủy</h6>

                                    </div>
                                </div>
                            </div>
                            <div className={"col-md-4"}>
                                <p className="text-danger">- 300.000 VND</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={"mt-4"}></div>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        posts: state.post.posts,
        current_user: state.user.current_user,
        payment: state.payment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllPosts: () => dispatch(getAllPosts())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PaymentHistory));