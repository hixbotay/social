import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// component
import CreatePostForm from '../../components/Post/CreatePostForm';
import Post from '../../components/Post';
// action
import { getAllPosts } from '../../actions/PostActions';

class PaymentHistory extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }

    render() {

        return (
            <div className={"paymentHistory"}>
                <h2>Trang PAYMENT History</h2>
                <p>THÔNG TIN History</p>

                <div className="row">
                    <div className={"col-md-9 sodu"}>
                        <div className="row">
                            <div className={"col-md-1"}>
                                <i className="fas fa-money-bill-alt"></i>
                            </div>
                            <div className={"col-md-11"}>
                                So du hien tai: 2.000.000 VND
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