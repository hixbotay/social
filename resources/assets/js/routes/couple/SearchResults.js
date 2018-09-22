import React, { Component } from 'react';
import {connect} from 'react-redux';
import SecondLayout from '../../layouts/SecondLayout';
import {Card, ImageCard} from '../../components/Card';
import {getCoupleResults} from '../../actions/CoupleActions';
import {Link} from 'react-router-dom';


class SearchResults extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            results: []
        }
    }

    changeKeyword(event) {
        this.setState({keyword: event.target.value});
    }

    onSearch() {
        this.props.getCoupleResults(this.state.keyword);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({results: nextProps.results});
    }

    render() {
        
        return (
            <div>
                <div className="row">
                    <div className="col col-xl-6 order-xl-2 col-lg-6 order-lg-1 col-md-6 col-sm-6 col-6">
                        <Card>
                            <button className="btn tab-btn">Tìm kiếm một</button>
                            <button className="btn tab-btn">Tìm kiếm nhiều</button>
                        </Card>
                    </div>
                    <div className="col col-xl-3 order-xl-2 col-lg-3 order-lg-1 col-md-3 col-sm-3 col-3">
                    </div>
                    <div className="col col-xl-3 order-xl-2 col-lg-3 order-lg-1 col-md-3 col-sm-3 col-3">
                        <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={(event) => this.changeKeyword(event)}/>
                        <button className='btn' onClick={() => this.onSearch()}><i className="fas fa-search"></i></button>
                    </div>
                </div>

                <Card>
                    <div className="row">
                    {
                        this.state.results.map((item, index) => {
                            return (
                                <div className='col col-md-3 col-lg-3' key={index}>
                                    <div className='container image-card-results'>
                                        <Link to={`couple/${item.id}`}>
                                            <ImageCard 
                                                img={item.avatar} 
                                                heading={item.name} 
                                                subHeading={item.address} 
                                            >
                                            </ImageCard>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })
                    }
                    </div>
                </Card>
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
        getCoupleResults: (keyword) => dispatch(getCoupleResults(keyword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);