import React, { Component } from 'react';
import {getEventDetail} from '../../actions/EventActions';
import connect from 'react-redux/es/connect/connect';
import DatingGroupDetail from '../../components/Dating/DatingGroupDetail';
import DatingCoupleDetailForm from '../../components/Dating/DatingCoupleDetailForm';
import DatingCoupleDetail from '../../components/Dating/DatingCoupleDetail';
 
class DatingDetail extends Component {
    componentDidMount() {
        this.props.getEventDetail(this.props.match.params.id).then(creator => {
            this.setState({
                isLikedCreator: creator.is_like,
                isLovedCreator: creator.is_loved,
                loveNumber: parseInt(creator.loveNumber),
                likeNumber: parseInt(creator.likeNumber)
            })
        });
    }

    render() {
        var {event, user} = this.props;

        return (
            <React.Fragment>
                {
                    (event.type === 'group') ? (
                        <DatingGroupDetail event={event}></DatingGroupDetail>
                    ) : (
                        <DatingCoupleDetail event={event}></DatingCoupleDetail>
                    )
                }
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        event: state.event.currentEvent,
        user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEventDetail: (id) => dispatch(getEventDetail(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatingDetail);