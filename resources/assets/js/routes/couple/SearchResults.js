import React, { Component } from 'react';
import { connect } from 'react-redux';
import SecondLayout from '../../layouts/SecondLayout';
import { Card, ImageCard, CardWithIcon } from '../../components/Card';
import InformationNumber from '../../components/Information/InformationNumber';
import { getCoupleResults } from '../../actions/CoupleActions';
import { withRouter } from 'react-router-dom';
import HomeNavigator from '../../components/HomeNavigator';
import { updateRelationship } from '../../actions/UserActions';
import Slider from "react-slick";
import SimpleSlider from '../../components/Slider/SimpleSlider';
import * as qs from 'query-string';
import CoupleView from '../../components/Couple';

class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            results: []
        }
    }

    componentDidMount() {
        this.props.getCoupleResults({ name: '' }).then(data => {
            this.setState({ results: data });
        });
    }

    changeKeyword(event) {
        this.setState({ keyword: event.target.value });
    }

    onSearch() {
        this.props.getCoupleResults({ name: this.state.keyword }).then(data => {
            this.setState({ results: data });
        });
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({results: nextProps.results});
    // }

    render() {
        var view = qs.parse(this.props.location.search).view;
        var currentYear = new Date().getFullYear();

        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true
            // adaptiveHeight: true
        };

        return (
            <div>
                <div className="row">
                    <div className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        <HomeNavigator></HomeNavigator>
                    </div>
                    <div className="col col-xl-2 order-xl-2">
                    </div>
                    <div className="col col-xl-3 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12 form-row">
                        <div className="col-md-9">
                            <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={(event) => this.changeKeyword(event)} />
                        </div>
                        <div className="col-md-3">
                            <button className='btn' onClick={() => this.onSearch()}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
                {
                    (view === 'many') ? (
                        <Card>
                            <div className="row">
                                {
                                    this.state.results.map((item, index) => {
                                        var birth = new Date(item.birthday).getFullYear();
                                        item.age = currentYear - birth;
                                        return (
                                            <div className='col col-md-3 col-lg-3' key={index}>
                                                <div className='container image-card-results'>
                                                    <ImageCard
                                                        user={item}
                                                        action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                                    ></ImageCard>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Card>
                    ) : (
                            <Slider {...settings}>
                                {
                                    this.state.results.map((item, index) => {
                                        
                                        return (
                                            <CoupleView 
                                                item={item} key={index}
                                                action={(data, user_id) => this.props.updateRelationship(data, user_id)}
                                            ></CoupleView>
                                        )
                                    })
                                }
                            </Slider>
                        )
                }



            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.couple.search_results,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCoupleResults: (keyword) => dispatch(getCoupleResults(keyword)),
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResults));