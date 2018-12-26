import React, { Component } from 'react';
import OtherUserLayout from '../profile/OtherUserLayout';
import connect from 'react-redux/es/connect/connect';
import { getOtherUserDetail } from '../../actions/UserActions';
import {withRouter, Switch, Route} from 'react-router-dom';
import { CardWithTitle } from '../../components/Card';

class GiftLayout extends Component {

    componentDidMount() {
        if(!this.props.user_data.user.id || this.props.user_data.user.id != this.props.location.state.receiver) {
            this.props.getUserInfo(this.props.location.state.receiver);
        }
    }

    componentDidUpdate() {
        if(!this.props.user_data.user.id || this.props.user_data.user.id != this.props.location.state.receiver) {
            this.props.getUserInfo(this.props.location.state.receiver);
        }
    }

    render() {
        const { user_data, current_user } = this.props;

        return (
            <OtherUserLayout user={user_data.user} current_user={current_user} relationship={user_data.relationship}>
                <CardWithTitle  title={this.props.title} hasLine={true}>
                    {this.props.children}
                </CardWithTitle>
            </OtherUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        user_data: state.user.other_user_data,
        current_user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserInfo: (id) => dispatch(getOtherUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GiftLayout));