import React, { Component } from 'react';
import Table from "rc-table";
import { getOrders } from '../../actions/ProductActions';
import { connect } from 'react-redux';
import { CardWithTitle } from '../../components/Card';
import {Link} from 'react-router-dom';

class Order extends Component {
    componentDidMount() {
        this.props.getOrders();
    }

    render() {
        var {orders} = this.props;

        return (
            <CardWithTitle title="ĐƠN HÀNG CỦA BẠN" hasLine={true}>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Mã đơn hàng</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col">Người nhận</th>
                            <th scope="col" width="25%">Địa chỉ</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Khác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => {
                                var status = <div className="pending-tag order-tag">Đang xử lý</div>
                                switch(order.order_status) {
                                    case "1": {
                                        status = <div className="success-tag order-tag">Đã hoàn thành</div>;
                                        break;
                                    }
                                    case "2": {
                                        status = <div className="cancel-tag order-tag">Bị hủy</div>;
                                        break;
                                    }
                                }

                                return (
                                    <tr>
                                        <td>{order.order_number}</td>
                                        <td>{status}</td>
                                        <td>
                                            <Link to={`/profile/${order.receiver_id}`}>
                                                {order.receiver_name}    
                                            </Link>
                                        </td>
                                        <td>{order.address1}</td>
                                        <td>{order.total + order.ship_fee}</td>
                                        <td>
                                            <a href="#">Xem chi tiết</a>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </CardWithTitle>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.product.orders
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getOrders: () => dispatch(getOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);