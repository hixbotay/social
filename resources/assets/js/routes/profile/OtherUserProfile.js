import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';

import { getOtherUserDetail } from '../../actions/UserActions';
import Post from '../../components/Post';
import { withRouter } from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import OtherUserLayout from './OtherUserLayout';

class OtherPerson extends Component {

    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.id);
    }

    render() {
        const { user_data, current_user } = this.props;

        return (
            <OtherUserLayout user={user_data.user} current_user={current_user} relationship={user_data.relationship}>
                <Card>
                    <ProfileHeader user={user_data.user} isCurrentUser={false}></ProfileHeader>
                </Card>

                <div className="col-12">
                    <div className="row no-gutters">
                        <div className="col-4">
                            <button className="btn btn-primary btn-function" id="safe-btn">
                                <i className="fas fa-shield-alt"></i> An toàn
                            </button>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary btn-function" id="gift-btn">
                                <i className="fas fa-gift"></i> Tặng quà
                            </button>
                        </div>
                        <div className="col-4">
                            <button className="btn btn-primary btn-function" id="fortune-btn">
                                <i className="fas fa-hand-holding-heart"></i> Bói yêu
                            </button>
                        </div>
                    </div>
                </div>

                <Card>
                    {
                        user_data.posts.map((post, index) => {
                            post.author = user_data.user.name;
                            post.author_avatar = user_data.user.avatar;

                            return (
                                <Post post={post} key={index} user_id={current_user.id} isInNewsfeed={false}></Post>
                            )
                        })
                    }
                </Card>
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
        getUserInfo: (id) => dispatch(getOtherUserDetail(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OtherPerson));