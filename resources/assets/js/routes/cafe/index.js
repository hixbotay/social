import React, { Component } from 'react';
import CreatePostForm from '../../components/Post/CreatePostForm';
import PostHeader from '../../components/Post/PostHeader';
import CircleButton from '../../components/Button/CircleButton';
import Card from '../../components/Card/Card';
import Avatar from '../../components/Information/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';

class Cafe extends Component {
    render() {

        console.log('this is cafe components')


        var posts = [1];

        return (

            <div className="ui-block">
                <h1>Quarng cao here</h1>

                <hr />

                {
                    posts.map(post => {
                        return (
                            <article className="hentry post" key={post}>
                                <div className="row">
                                    <div className="col-12">
                                        <h2>Danh sách quán cafe</h2>
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

export default Cafe;