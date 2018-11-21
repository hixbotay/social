import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import CreateGroupDating from './CreateGroupDating';
import DatingIntro from './DatingIntro';
import Fragment from 'react-dot-fragment';
import VerifyAlert from './VerifyAlert';

class CreateEvent extends Component {
    constructor() {
        super();
        this.state = {
            isShowIntro: true
        } 
    }

    closeIntro() {
        this.setState({
            isShowIntro: false
        })
    }

    render() {
        const {user} = this.props;

        if(this.props.user.group_id != 12) {
            return <Redirect to='/dating/subscribe'/>
        }

        return (
            <div>
                {
                    (this.state.isShowIntro) ? (
                        <DatingIntro closeAction={() => this.closeIntro()}></DatingIntro>
                    ) : (
                        <Fragment>
                            {
                                (user.mobile && user.is_id_verified) ? (
                                    <CreateGroupDating></CreateGroupDating>
                                ) : (
                                    <VerifyAlert user={user}></VerifyAlert>
                                )
                            }
                        </Fragment>
                        
                    )
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
}

export default connect(mapStateToProps, null)(CreateEvent);