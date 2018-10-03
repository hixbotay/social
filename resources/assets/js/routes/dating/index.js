import React, {Component} from 'react';

import {withRouter} from "react-router-dom";
import connect from "react-redux/es/connect/connect";
import {getAllDistrict, getAllProvince} from "../../actions/CafeActions";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import DatingCard from '../../components/Card/DatingCard';

class Dating extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            openLightBox: false,
            images: [
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
                'https://vicbrokers.com.au/wp-content/uploads/2018/03/11-1.jpg',
            ]
        };
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="row">

                <div className={'col-md-8'}>
                    <DatingCard title="aaaaaaaaa"></DatingCard>
                </div>
                <div className={'col-md-4'}>
                    <h1>NGUYEN VAN TU</h1>
                </div>

            </div>
        );
    }

}


function mapStateToProps(state) {
    return {
        province: state.cafe.allprovince,
        district: state.cafe.alldistrict
    };
}

export default withRouter(connect(mapStateToProps, {getAllProvince, getAllDistrict})(Dating));