import React, { Component } from 'react';
import {Card, CardWithIcon} from '../../components/Card';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import InformationNumber from '../../components/Information/InformationNumber';
import {getCoupleDetail} from '../../actions/CoupleActions';
import {connect} from 'react-redux';
import HomeNavigator from '../../components/HomeNavigator';

class ViewCouple extends Component {
    componentDidMount() {
        this.props.getCoupleDetail(this.props.match.params.id);
    }

    changeKeyword(event) {
        this.setState({keyword: event.target.value});
    }

    onSearch() {
        // this.props.getCoupleResults(this.state.keyword);
    }

    render() {
        const {coupleDetail} = this.props;

        var images = coupleDetail.photos.map(item => {
            return item.source;
        });

        console.log(images);

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
                <div className="row">
                    <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-1 col-md-8 col-sm-8 col-8">
                    {
                        (images.length) ? <SimpleSlider slidesToShow={1} images={images}></SimpleSlider> : <SimpleSlider slidesToShow={1}></SimpleSlider>
                    }
                        
                    </div>
                    <div className="col col-xl-4 order-xl-2 col-lg-4 order-lg-1 col-md-4 col-sm-4 col-4">
                        <CardWithIcon rightIcon="fas fa-user-circle">
                            <h4>{coupleDetail.user.name}</h4>
                            <small>{coupleDetail.user.address}</small>
                            <InformationNumber></InformationNumber>
                            <div className="row">
                                <i className="fas fa-info-circle"></i>
                                <p>{coupleDetail.user.type}</p>
                            </div>
                            <div className="row">
                                <i className="fas fa-question-circle"></i>
                                <p>{coupleDetail.user.philosophy}</p>
                            </div>
                        </CardWithIcon>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        coupleDetail: state.couple.coupleDetail
    }
} 

function mapDispatchToProps(dispatch) {
    return {
        getCoupleDetail: (id) => dispatch(getCoupleDetail(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCouple);