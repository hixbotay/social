import React, { Component } from 'react';
import { SquareAvatar } from '../Avatar';

class Subscriber extends Component {
    constructor() {
        super();
        this.state = {
            isAccept: false,
            start_time: null
        }        
    }

    accept() {
        this.setState({
            isAccept: true
        })
    }

    cancel() {
        this.setState({
            isAccept: false
        })
    }

    onChangeDate(e) {
        this.setState({
            start_time: e.target.value
        })
    }

    createDating(e) {
        e.preventDefault();
        var data = {
            event: {
                name: `Cuộc hẹn đôi với ${this.props.user.name}`,
                schedule_id: 0,
                start_time:  this.state.start_time,
                limit_time_register: this.state.start_time,
                payment_m: 0,
                payment_f: 0,
                type: 'couple',
                agency_id: this.props.subscriber.agency_id,
                is_secret: 0
            },
            event_meta: {
                job_conditional: [this.props.subscriber.expect_job],
                min_male_number: 1,
                max_male_number: 1,
                min_female_number: 1,
                max_female_number: 1,
                marital_status: this.props.subscriber.expect_marital_status,
                payer: (this.props.subscriber.payer === 'self') ? this.props.subscriber.id : this.props.user.id
            },
            subscriber: this.props.subscriber.user_id
        }

        this.props.createDating(data);
    }

    render() {
        
        const {subscriber} = this.props;

        return (
            <div className="row">
                <div className="col-3">
                    <SquareAvatar img={subscriber.avatar} size="large"/>
                </div>
                <div className="col-9">
                    <h5>{subscriber.name}</h5>
                    <div>{subscriber.address}</div>
                    <div>Địa điểm: <span>{subscriber.district}, {subscriber.province}</span></div>
                    <div>Quán: <span>{subscriber.agency_name}</span></div>
                    <div>Chi phí: <span>{(subscriber.payer === 'self') ? `${subscriber.name} trả` : 'Bạn trả'}</span></div>
                    {
                        this.state.isAccept ? (
                            <div className="mt-2">
                                <form onSubmit={(e) => this.createDating(e)}>
                                    <div className="form-group">
                                        <label>Chọn ngày hẹn</label>
                                        <input 
                                            className="form-control" 
                                            type="date" 
                                            min={subscriber.expect_date_from} 
                                            max={subscriber.expect_date_to} 
                                            required
                                            name="start_time"
                                            onChange={(e) => this.onChangeDate(e)}
                                        />
                                    </div>
                                    <div>
                                        <button className="btn btn-primary mr-4" type="submit">
                                            Xác nhận
                                        </button>
                                        <button className="btn btn-secondary" onClick={() => this.cancel()}>
                                            Hủy
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="mt-2">
                                <button className="btn btn-primary btn-sm" onClick={() => this.accept()}>Nhận lời cafe đôi</button>
                            </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

export default Subscriber;