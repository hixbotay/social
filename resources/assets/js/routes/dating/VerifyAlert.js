import React, { Component } from 'react';
import { Card, CardWithTitle } from '../../components/Card';
import DatingLayout from './DatingLayout';

class VerifyAlert extends Component {
    render() {
        return (
            <DatingLayout>
                <CardWithTitle hasLine={true} title="TẠO CUỘC HẸN TỐC ĐỘ">
                    <h5>
                        Bạn không thể tạo cuộc hẹn vì đang còn thiếu một trong một trong
                        các điều kiện đảm bảo sau:
                </h5>
                    <ul>
                        <li>Bạn phải thực hiện xác minh số điện thoại</li>
                        <li>Bạn phải thực hiện xác minh chứng minh thư</li>
                        <li>Bạn phải thực hiện xác minh Facebook</li>
                        <li>
                            Bạn phải có số tiền đảm bảo lớn hơn 200.000đ. (Tài khoản của bạn nạp vào có thể rút lại bất cứ lúc nào. Số tiền này đảm bảo
                            bạn sẽ có mặt để chủ trì cuộc hẹn)
                        </li>
                    </ul>
                    <b>Những điều này đảm bảo bạn là một người tổ chức sự kiện chân chính</b>

                    <div>
                        <b>Nếu cần hỗ trợ hoặc tư vấn, vui lòng liên hệ noiduyen.vn thông qua các kênh sau:</b><br/>
                        <i>Email: admin@noiduyen.vn</i><br/>
                        <i>Phone: <phone>0193023092</phone></i>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary">Chuyển tới mục xác minh</button>
                    </div>
                </CardWithTitle>
            </DatingLayout>
        );
    }
}

export default VerifyAlert;