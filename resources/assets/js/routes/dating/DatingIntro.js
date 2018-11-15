import React, { Component } from 'react';
import DatingLayout from './DatingLayout';
import { CardWithTitle } from '../../components/Card';

class DatingIntro extends Component {
    render() {
        return (
            <DatingLayout>
                <CardWithTitle hasLine={true} title="TẠO CUỘC HẸN TỐC ĐỘ">
                    <div className="alert alert-warning">
                        <h5>
                            Bạn có khả năng kết nối mọi người. Hãy tạo cuộc hẹn
                            và mời mọi người cùng tham gia
                        </h5>
                    </div>
                    <div>
                        <img src="https://cdn-ak.f.st-hatena.com/images/fotolife/h/hironanpa/20180830/20180830135621.jpg"/>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-primary" onClick={() => this.props.closeAction()}>
                            TẠO CUỘC HẸN
                        </button>
                    </div>
                    <div className="alert alert-warning">
                        <h5>
                            Nếu bạn muốn tham gia noiduyen.vn để cùng nhau dành tặng những điều tốt đẹp
                            đến mọi người. Chúng tôi luôn chào đón bạn.
                        </h5>
                        <i>Email: admin@noiduyen.vn</i><br/>
                        <i>Phone: <phone>0941.121.666</phone></i>
                        <div className="text-center">
                            <h4><b>Hãy cho đi để nhận lại!</b></h4>
                        </div>
                    </div>
                </CardWithTitle>
            </DatingLayout>
        );
    }
}

export default DatingIntro;