import React, { Component } from 'react';
import {connect} from 'react-redux';
import {CardWithTitle, ImageCard} from '../../components/Card';
import {getListFriends, updateRelationship} from '../../actions/UserActions';

class FriendYouLike extends Component {
    componentDidMount() {
        this.props.getListFriends('you-like');
    }

    render() {
        const { users } = this.props;
        var currentYear = new Date().getFullYear();

        return (
            <div>
                <div className="row">
                    <div className="banner"></div>
                </div>
                <CardWithTitle title="BẠN ĐÃ THÍCH" hasLine={true}>
                    <div className="row">
                        {
                            users ? users.map((user, index) => {
                                let birth = new Date(user.birthday).getFullYear();
                                user.age = currentYear - birth;
                                return (
                                    <div className="col-4 col-md-4 mb-4" key={index}>
                                        <ImageCard
                                            user={user}
                                            action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                        ></ImageCard>
                                    </div>
                                )
                            }) : <div>Loading...</div>
                        }
                    </div>
                </CardWithTitle>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        users: state.user.friendsYouLiked
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getListFriends: (type) => dispatch(getListFriends(type)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendYouLike);