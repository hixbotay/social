import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { getOtherUserDetail } from '../../actions/UserActions';
import {withRouter, Link, Route} from 'react-router-dom';
import { CardWithTitle, Card } from '../../components/Card';
import SecondLayout from '../../layouts/SecondLayout';
import {RoundAvatar} from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';

class GiftLayout extends Component {

    componentDidMount() {
        if(this.props.location.state) {
            if(!this.props.other_user.id 
                || this.props.other_user.id != this.props.location.state.receiver 
                || this.props.current_user.id != this.props.location.state.receiver) {
                this.props.getUserInfo(this.props.location.state.receiver);
            }
        }
    }

    componentDidUpdate() {
        if(this.props.location.state) {
            if(!this.props.other_user.id 
                || this.props.other_user.id != this.props.location.state.receiver
                || this.props.current_user.id != this.props.location.state.receiver) {
                this.props.getUserInfo(this.props.location.state.receiver);
            }
        }
    }

    render() {
        const { other_user, current_user } = this.props;

        return (
                <div className="row">
                    <main className="col col-xl-7 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        <Card>
                            {this.props.children}
                        </Card>
                    </main>
                    <aside className="col col-xl-5 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        {
                            (this.props.location.state.receiver != current_user.id) ? (
                                <CardWithTitle title="BẠN ĐANG CHỌN QUÀ CHO">
                                    <Link to={`/profile/${other_user.id}`}>
                                        <div className="author vcard inline-items profile-heading-info">
                                            <RoundAvatar img={other_user.avatar} size='medium'></RoundAvatar>
                                            
                                            <div className="author-date">
                                                <Heading heading={other_user.name} subHeading={other_user.address} size='medium'></Heading>
                                                {/* <InformationNumber likeNumber={this.state.likeNumber} viewNumber={this.props.user.viewNumber} heartNumber={this.state.loveNumber}></InformationNumber> */}
                                            </div>
                                        </div>
                                    </Link>
                                </CardWithTitle>
                            ) : (
                                <Card>
                                    <h4>Bạn đang mua đồ cho chính bạn.</h4>
                                </Card>
                            )
                        }
                        <CardWithTitle title="GIỎ HÀNG CỦA BẠN">
                            
                        </CardWithTitle>
                    </aside>
                </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        other_user: state.user.other_user_data.user,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (id) => dispatch(getOtherUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftLayout));