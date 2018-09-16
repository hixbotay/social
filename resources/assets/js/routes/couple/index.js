import React, { Component } from 'react';
import CoupleLayout from './CoupleLayout';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {getUserDetail} from '../../actions/UserActions';

class Couple extends Component {

    componentDidMount() {
        this.props.getUserDetail(this.props.match.params.id);
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                {
                    user ? <CoupleLayout user={user}></CoupleLayout> : "Loading..."
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserDetail: (id) => dispatch(getUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Couple));