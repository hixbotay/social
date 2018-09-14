import React, { Component } from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import CafeRight from '../../components/RightSidebar/Cafe';

class Cafe extends Component {

    render() {

        console.log('this is cafe components')

        var posts = [1];

        var content = [1,2,3,4]

        var cafeList = [1, 2, 3, 4];

        return (

            <div className="row">

                <div className="col-md-8">

                    <div className="ui-block">

                        <h1>Quarng cao here</h1>

                        <Slider>
                            {content.map((article, index) =>
                                <div key={index}
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
                                            </div>
                                        </div>


                                        <div className="row" style={{
                                            margin:5,
                                        }}>

                                            {cafeList.map((data, index) => {
                                                return (
                                                    <div className="col col-xl-4 col-lg-3 col-md-6 col-sm-6 col-6 box-cafe-item" key={index}>

                                                        <div className="landing-item">

                                                            <div className="landing-item-thumb">
                                                                <img src={'http://www.royalhotelchilliwack.com/Content/images/Hotel-Cafe-o.jpg'} alt="page" />

                                                                <div className="overlay overlay-dark"> </div>

                                                                <div className="btn-sm">
                                                                    <a target="_blank" href="#"
                                                                       className="btn  box-cafe-item-btn">Hẹn hò</a>
                                                                    <a target="_blank" href="#"
                                                                       className="btn box-cafe-item-btn">Đặt chỗ</a>
                                                                </div>


                                                            </div>

                                                            <div className="video-content">
                                                                <a href="#" className="h6 title">Quán cafe xịn</a>
                                                                <p>123 Nguyễn Trãi</p>
                                                            </div>

                                                        </div>

                                                    </div>
                                                );
                                            })}


                                            <div className="col col-xl-12 align-center">
                                                <a target="_blank"
                                                   href="#"
                                                   className="">Xem Thêm</a>
                                            </div>

                                        </div>


                                    </article>
                                )
                            })
                        }
                    </div>
                </div>

                <div className="col col-md-4">
                    <CafeRight />
                </div>

            </div>
        );
    }
}

export default Cafe;