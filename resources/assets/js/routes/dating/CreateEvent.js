import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import CreateGroupDating from './CreateGroupDating';
import CreateCoupleDating from './CreateCoupleDating';

class CreateEvent extends Component {


    render() {
        return (
            <div>
                {
                    (this.props.user.group_id === 12) ? <CreateGroupDating></CreateGroupDating>
                            : <CreateCoupleDating></CreateCoupleDating>
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

// function mapDispatchToProps(dispatch) {
//     return {
//         getAllJobs: () => dispatch(getAllJobs()),
//         getAllCafe: (filter, page) => dispatch(getAllCafe(filter, page)),
//         createNewEvent: (data) => dispatch(createNewEvent(data))
//     }
// }

export default connect(mapStateToProps, null)(CreateEvent);