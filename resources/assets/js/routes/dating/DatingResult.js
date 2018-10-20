import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter } from 'react-router-dom';
import { getEventDetail } from '../../actions/EventActions';
import DatingLayout from './DatingLayout';
import { CardWithTitle } from '../../components/Card';
import { RoundAvatar, SquareAvatar } from '../../components/Avatar';
import CircleButton from '../../components/Button/CircleButton';

class DatingResult extends Component {
    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.id);
    }

    render() {
        const { event, user } = this.props;

        console.log(event);

        return (
            <DatingLayout>
                <CardWithTitle title="KẾT QUẢ CUỘC HẸN" hasLine={true}>
                    <div className="alert alert-danger">
                        Bạn chỉ có 48h từ khi kết thúc để đánh giá cuộc hẹn!
                    </div>
                    {
                        event ? (
                            <div className={"row next-dating-header-row1"}>
                                <div className={"col-md-2 align-middle dating-header"}>
                                    <RoundAvatar size={"medium"} img={event.address_avatar}></RoundAvatar>
                                </div>
                                <div className={"col-md-7 dating-header"}>
                                    <h5>
                                        {event.name}
                                        {
                                            event.is_approved ?
                                                <i className="fas fa-check-circle event-status-icon" style={{ color: '#27ae60' }}></i>
                                                : <i className="fas fa-ellipsis-h event-status-icon" style={{ color: '#f1c40f' }}></i>
                                        }
                                    </h5>
                                    <div>{event.address}</div>
                                </div>
                                <div className={"col-md-3 align-right dating-time"}>
                                    <p>{event.start_time}</p>
                                </div>
                            </div>
                        ) : null
                    }
                    <br/>
                    {
                        (event.type === 'couple') ? (
                            <div className="row">
                                <div className="col-3">
                                    <SquareAvatar img={user.avatar} size="large"></SquareAvatar>
                                </div>
                                <div className="col-9">
                                    <form>
                                        <div className="form-group">
                                            <label>Bạn đánh giá thế nào về cuộc hẹn này?</label>
                                            <div className="row">
                                                <div className="col-4">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option1" />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">Thú vị</label>
                                                </div>
                                                <div className="col-4">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option1" />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">Bình thường</label>
                                                </div>
                                                <div className="col-4">
                                                    <input className="form-check-input" type="radio" name="inlineRadioOptions" value="option1" />
                                                    <label className="form-check-label" htmlFor="inlineRadio1">Thất vọng</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label>Bạn có muốn nói gì với người ấy không:</label>
                                            <textarea className="form-control"></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-sm btn-primary">Gửi</button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="row">
                                <div className="alert alert-success">
                                    Nếu bạn thích ai hãy nhấn vào trái tim để người ấy biết bạn thích họ. 
                                    Và ngược lại bạn chỉ thấy người ấy nếu họ thích bạn.
                                </div>
                                <br/>
                                <div className="container">
                                    {
                                        event.registers.map((user, index) => {
                                            return (
                                                <div className="row" key={index}>
                                                    <div className="col-3">
                                                        <SquareAvatar img={user.avatar} size="large"></SquareAvatar>
                                                    </div>
                                                    <div className="col-9">
                                                        <h5>{user.name}</h5>
                                                        <div>{user.address}</div>
                                                        {
                                                            user.is_loved ? (
                                                                <p>{user.name} thích bạn. Hãy nhắn tin và hẹn đôi với anh ấy!</p>
                                                            ) : null
                                                        }
                                                        <div>
                                                            <CircleButton
                                                                icon="fas fa-heart"
                                                                color={user.is_loved ? '#e74c3c' : '#34495e'}
                                                                action={() => this.onUpdateRelationship('love')}
                                                            ></CircleButton>
                                                            <CircleButton
                                                                icon="fas fa-thumbs-up"
                                                                color={user.is_like ? '#2980b9' : '#34495e'}
                                                                action={() => this.onUpdateRelationship('like')}
                                                            ></CircleButton>
                                                            <CircleButton
                                                                icon="fas fa-comments"
                                                                color='#34495e'
                                                                // action
                                                            ></CircleButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    }
                    
                </CardWithTitle>
            </DatingLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user,
        event: state.event.currentEvent
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEventDetail: (id) => dispatch(getEventDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingResult));