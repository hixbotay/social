import React, { Component } from 'react';
import { getOrderDetail } from '../../actions/ProductActions';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { Card } from '../../components/Card';

class OrderDetail extends Component {
    componentDidMount() {
        this.props.getOrderDetail(this.props.match.params.id);
    }

    render() {
        var { order } = this.props;

        var status = <div className="pending-tag order-tag">Đang xử lý</div>
        if (order) {
            switch (order.order_status) {
                case "1": {
                    status = <div className="success-tag order-tag">Đã hoàn thành</div>;
                    break;
                }
                case "2": {
                    status = <div className="cancel-tag order-tag">Bị hủy</div>;
                    break;
                }
            }
        }

        return (
            <Card>
                {
                    order ? (
                        <div className="row">
                            
                            <div className="text-center mb-4">
                                <h3><b>Chi tiết đơn hàng #{order.order_number}</b></h3>
                            </div>
                            <div className="row">
                                <div className="col-md-4 col-12">
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <div>{status}</div>
                                    </div>
                                    <div className="form-group">
                                        <label>Người nhận</label>
                                        <input type="text" className="form-control" value={order.receiver_name} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ nhận 1</label>
                                        <input type="text" className="form-control" value={order.address1} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Địa chỉ nhận 2</label>
                                        <input type="text" className="form-control" value={order.address2} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 col-12">
                                    <div className="form-group">
                                        <label>Tổng tiền</label>
                                        <input type="text" className="form-control" value={order.total} readOnly />
                                    </div>
                                    <div className="form-group">
                                        <label>Phí vận chuyển</label>
                                        <input type="text" className="form-control" value={order.ship_fee} readOnly />
                                    </div>
                                </div>
                                <div className="col-md-4 col-12">

                                </div>
                            </div>
                        </div>
                    ) : (
                            <div className="text-center">
                                Đang tải dữ liệu...
                        </div>
                        )
                }

            </Card>
        );
    }
}

function mapStateToProps(state) {
    return {
        order: state.product.order
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getOrderDetail: (id) => dispatch(getOrderDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderDetail));