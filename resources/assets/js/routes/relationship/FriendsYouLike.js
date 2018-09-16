import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import ImageCard from '../../components/Card/ImageCard';

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

class FriendYouLike extends Component {
    render() {
        var temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

        return (
            <div>
                <div className="row">
                    <div className="banner"></div>
                </div>
                <Card>
                    <div className="row">
                        <h4>BẠN ĐÃ THÍCH</h4>
                    </div>
                    <div className="row">
                        {
                            temp.map((item, index) => {
                                var number = getRandomInt(20);
                                return (
                                    <ImageCard
                                        key={index}
                                        src={`https://picsum.photos/400/300?image=${number}`}
                                        heading="Lorem Ipsum"
                                        subHeading="Lorem ipsum lositdomet"
                                    ></ImageCard>
                                )
                            })
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

export default FriendYouLike;