import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom';
import CreatePostForm from '../../components/Post/CreatePostForm';
import PostHeader from '../../components/Post/PostHeader';
import CircleButton from '../../components/Button/CircleButton';
import Card from '../../components/Card/Card';
import Avatar from '../../components/Information/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';

class NewFeeds extends Component {
    render() {
        var posts = [1, 2, 3, 4];

        return (

            <div className="ui-block">
                <CreatePostForm></CreatePostForm>
                <hr />
                {
                    posts.map(post => {
                        return (
                            <article className="hentry post" key={post}>
                                <div className="row">
                                    <div className="col-12">
                                        <div className="float-left">
                                            <PostHeader
                                                avatar="https://www.w3schools.com/howto/img_avatar.png"
                                                name="Pham Anh Thu"
                                                heartNumber="100"
                                                viewNumber="200"
                                                likeNumber="300"
                                            />
                                        </div>
                                        <div className="float-right">
                                            <CircleButton icon="fas fa-flag"></CircleButton>
                                        </div>
                                    </div>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
                                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
                                    in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                                    deserunt mollit anim id est laborum.
                                    </p>
                                <div className="row">
                                    <div className="col">
                                        <CircleButton icon="fas fa-heart"></CircleButton>
                                        Yêu thích
                                        </div>
                                    <div className="col">
                                        <CircleButton icon="fas fa-thumbs-up"></CircleButton>
                                        Thích
                                        </div>
                                    <div className="col">
                                        <CircleButton icon="fas fa-comment"></CircleButton>
                                        Bình luận
                                        </div>
                                    <div className="col">
                                        <CircleButton icon="fas fa-times"></CircleButton>
                                        Xóa
                                        </div>
                                </div>
                            </article>
                        )
                    })
                }
            </div>
        );
    }
}

export default NewFeeds;