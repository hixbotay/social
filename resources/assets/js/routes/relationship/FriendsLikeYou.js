import React, { Component } from 'react';
import {CardWithTitle, ImageCard} from '../../components/Card';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class FriendsLikeYou extends Component {
    render() {
        var temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        return (
            <div>
                <div className="row">
                    <div className="banner"></div>
                </div>
                <CardWithTitle title="ĐÃ THÍCH BẠN">
                    <div className="row">
                        {
                            temp.map((item, index) => {
                                var number = getRandomInt(20);
                                return (
                                    <div className="col-3 col-md-3 mb-4" key={index}>
                                        <ImageCard
                                            img={`https://picsum.photos/400/300?image=${number}`}
                                            heading="Lorem Ipsum"
                                            subHeading="Lorem ipsum lositdomet"
                                        ></ImageCard>
                                    </div>
                                )
                            })
                        }
                    </div>
                </CardWithTitle>
            </div>
        );
    }
}

export default FriendsLikeYou;