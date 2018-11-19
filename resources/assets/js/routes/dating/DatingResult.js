import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Redirect, Link } from 'react-router-dom';
import { getEventDetail, reviewDating } from '../../actions/EventActions';
import DatingLayout from './DatingLayout';
import { CardWithTitle } from '../../components/Card';
import { RoundAvatar, SquareAvatar } from '../../components/Avatar';
import CircleButton from '../../components/Button/CircleButton';
import { updateRelationship } from '../../actions/UserActions';
import RegisterItem from '../../components/Dating/RegisterItem';

class DatingResult extends Component {
    constructor() {
        super();
        this.state = {data: {}}
    }

    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.id);
    }

    changeData(e) {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            }
        })
    }

    review(e) {
        e.preventDefault();
        const { rating } = this.form;
        this.setState({
            data: {
                ...this.state.data,
                rating: parseInt(rating.value)
            }
        }, () => {
            console.log(this.state.data);
            this.props.reviewDating(this.state.data, this.props.match.params.id);
        });
    }

    render() {
        const { event, user } = this.props;

        return (
            (event.id != undefined) ? (
                (event.status === "finished") ? (
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
                            <br />
                            {
                                (event.type === 'couple') ? (
                                    <div className="row">
                                        <div className="col-3">
                                            <SquareAvatar img={user.avatar} size="large"></SquareAvatar>
                                        </div>
                                        <div className="col-9">
                                            <form onSubmit={(e) => this.review(e)} ref={form => this.form = form}  >
                                                <div className="form-group">
                                                    <label>Bạn đánh giá thế nào về cuộc hẹn này?</label>
                                                    <div className="row">
                                                        <div className="col-1">
                                                            <input className="form-check-input" type="radio" name="rating" value={3} required/>
                                                        </div>
                                                        <div className="col-3">
                                                            <label className="form-check-label" htmlFor="rating">Thú vị</label>
                                                        </div>
                                                        <div className="col-1">
                                                            <input className="form-check-input" type="radio" name="rating" value={2} required/>
                                                        </div>
                                                        <div className="col-3">
                                                            <label className="form-check-label" htmlFor="rating">Bình thường</label>
                                                        </div>
                                                        <div className="col-1">
                                                            <input className="form-check-input" type="radio" name="rating" value={1} required/>
                                                        </div>
                                                        <div className="col-3">
                                                            <label className="form-check-label" htmlFor="rating">Thất vọng</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Bạn có muốn nói gì với người ấy không:</label>
                                                    <textarea className="form-control" name="content" onChange={(e) => this.changeData(e)}></textarea>
                                                </div>
                                                <button type="submit" className="btn btn-sm btn-primary">Gửi</button>
                                            </form>
                                        </div>
                                        <hr/>
                                        <p>
                                            Nếu bạn có điều gì đó không hài lòng về tổ chức cuộc hẹn, vui lòng phản hồi về email: abc@gmil.com hoặc số điện thoại
                                            090138092830. Chúc bạn có những phút giây vui vẻ trên noiduyen.vn
                                        </p>
                                        <hr/>
                                        {
                                            event.reviews.map((item, index) => {
                                                return (
                                                    <React.Fragment key={index}>
                                                        <hr/>
                                                        <div className="col-3 mb-4">
                                                            <Link to={`/profile/${item.user_id}`}>
                                                                <SquareAvatar img={item.user_avatar} size="large"></SquareAvatar>
                                                                <h5>{item.user_name}</h5>
                                                            </Link>
                                                        </div>
                                                        <div className="col-9 mb-4">
                                                            {
                                                                item.rating === 3 ? (
                                                                    <b>{item.user_name} thích cuộc hẹn vừa rồi</b>
                                                                ) : (
                                                                    <div>
                                                                        {
                                                                            (item.rating) == 1 ? (
                                                                                <b>Hình như {item.user_name} đang buồn</b>
                                                                            ) : (
                                                                                <b>{item.user_name} cảm thấy bình thường</b>
                                                                            )
                                                                        }
                                                                    </div>
                                                                )
                                                            }
                                                            
                                                            <div><i>{item.content}</i></div>
                                                        </div>
                                                    </React.Fragment>
                                                )
                                            })
                                        }
                                    </div>
                                ) : (
                                        <div className="row">
                                            <div className="alert alert-success">
                                                Nếu bạn thích ai hãy nhấn vào trái tim để người ấy biết bạn thích họ.
                                                Và ngược lại bạn chỉ thấy người ấy nếu họ thích bạn.
                                        </div>
                                            <br />
                                            <div className="container">
                                                {
                                                    event.registers.map((user, index) => {
                                                        return (
                                                            <RegisterItem
                                                                key={index}
                                                                type="register"
                                                                user={user}
                                                                isSecretEvent = {event.is_secret}
                                                                action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                                            ></RegisterItem>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                            }

                        </CardWithTitle>
                    </DatingLayout>
                ) : (
                        <Redirect to={`/dating/${this.props.match.params.id}`} />
                    )
            ) : (
                    null
                )
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
        getEventDetail: (id) => dispatch(getEventDetail(id)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id)),
        reviewDating: (data, event_id) => dispatch(reviewDating(data, event_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatingResult));