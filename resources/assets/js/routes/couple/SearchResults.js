import React, { Component } from 'react';
import {connect} from 'react-redux';
import SecondLayout from '../../layouts/SecondLayout';
import {Card, ImageCard} from '../../components/Card';
import InformationNumber from '../../components/Information/InformationNumber';
import {getCoupleResults} from '../../actions/CoupleActions';
import {Link} from 'react-router-dom';
import HomeNavigator from '../../components/HomeNavigator';
import {updateRelationship} from '../../actions/UserActions';

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

        var currentYear = new Date().getFullYear();
        
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
                            <input type="text" className="form-control" placeholder="Tìm kiếm" onChange={(event) => this.changeKeyword(event)}/>
                        </div>
                        <div className="col-md-3">
                            <button className='btn' onClick={() => this.onSearch()}>
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);