import React, { Component } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

class Cafe extends Component {
    render() {

        console.log('this is cafe components')


        var posts = [1];

        var content = [1,2,3,4]

        return (

            <div className="ui-block">

                <h1>Quarng cao here</h1>

                <Slider>
                    {content.map((article, index) =>
                        <div
                            key={1}
                            style={{ background: `url('https://i.imgur.com/DvmN8Hx.jpg') no-repeat center center` }}
                        >
                            <div className="center">
                                {/*<h1>title o day</h1>*/}
                                {/*<p>MIeu ta</p>*/}
                                {/*<button>Nut</button>*/}
                            </div>
                        </div>
                    )}
                </Slider>

                <hr />

                {
                    posts.map(post => {

                        return (

                            <article className="" key={post}>
                                <div className="row">
                                    <div className="col-12">
                                        <h2>Danh sách quán cafe</h2>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <h2>Danh sách quán cafe</h2>
                                    </div>
                                    <div className="col-4">
                                        <h2>Danh sách quán cafe</h2>
                                    </div>
                                    <div className="col-4">
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