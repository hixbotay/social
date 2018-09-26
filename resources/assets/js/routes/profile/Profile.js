import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import CurrentUserProfile from './CurrentUserProfile';
import OtherUserProfile from './OtherUserProfile';

class Profile extends Component {
    // componentDidMount() {
    //     if(this.props.current_user.id == )
    // }

    render() {
        const {current_user} = this.props;

        var content = "Loading...";
        if(current_user.id) {
            content = (current_user.id == this.props.match.params.id) ?
            <CurrentUserProfile></CurrentUserProfile>
            : <OtherUserProfile></OtherUserProfile>
        }

        return (
            <div>
                {content}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user
    }
}

export default withRouter(connect(mapStateToProps, null)(Profile));