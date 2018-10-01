import React, { Component } from 'react';
import { Card, CardWithIcon } from '../../components/Card';
import CurrentUserLayout from './CurrentUserLayout';
import { addVisitor } from '../../actions/UserActions';
import { getMyPosts } from '../../actions/PostActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import Post from '../../components/Post';
import CreatePostForm from '../../components/Post/CreatePostForm';

class UserProfile extends Component {
    componentDidMount() {
        this.props.getMyPosts();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            posts: nextProps.posts
        });
    }

    addPost(post) {
        this.state.posts.unshift(post);
        this.setState({
            posts: this.state.posts
        })
    }

    render() {
        var images = [
            'https://picsum.photos/400/300?image=0',
            'https://picsum.photos/400/300?image=1',
            'https://picsum.photos/400/300?image=2',
            'https://picsum.photos/400/300?image=3',
            'https://picsum.photos/400/300?image=4'
        ];

        // const {user} = this.props;
        const { current_user } = this.props;

        // if (user.id && user.id !== current_user.id){
        //     this.props.addVisitor({
        //         'profile_id': user.id,
        //         'visitor_id': current_user.id
        //     })
        // }

        return (
            <CurrentUserLayout
                avatar={current_user ? current_user.avatar : "https://www.w3schools.com/howto/img_avatar.png"}
                heading={current_user ? current_user.name : "UNDEFINED"}
                subHeading={current_user ? current_user.address : null}
            >
                <Card>
                    <SimpleSlider images={images} slidesToShow={3}></SimpleSlider>
                    <div className="row">

                        <div className="float-left">Ngày sinh</div>
                        <div className="float-right">{current_user.birthday}</div>

                    </div>
                    <div className="row">

                        <div className="float-left">Giới tính</div>
                        <div className="float-right">{current_user.gender}</div>

                    </div>
                    <div className="row">
                        <div className="float-left">Tình trạng hôn nhân</div>
                        <div className="float-right">{current_user.marial_status}</div>

                    </div>
                    <div className="row">
                        <div className="float-left">Nơi sống</div>
                        <div className="float-right">{current_user.address}</div>
                    </div>
                </Card>
                <CreatePostForm user={current_user} addPost={this.addPost.bind(this)}></CreatePostForm>
                <Card>
                    {
                        this.props.posts.map((post, index) => {
                            post.author = current_user.name;
                            post.author_avatar = current_user.avatar;
                            return (
                                <Post post={post} key={index} user_id={current_user.id}></Post>
                            )
                        })
                    }
                </Card>
            </CurrentUserLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        current_user: state.user.current_user,
        posts: state.post.myPosts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getMyPosts: () => dispatch(getMyPosts()),
        addVisitor: (data) => dispatch(addVisitor(data))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserProfile));