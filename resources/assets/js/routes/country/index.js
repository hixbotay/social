import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import {getAllCountries} from '../../actions';

class Country extends Component {
    componentDidMount() {
        this.props.getAllCountries();
    }

    render() {
        return (
            <main className="col col-xl-6 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                <div className="ui-block">
                    <ul className='list-group'>
                        {
                            this.props.countries.map((item, index) => {
                                return (
                                    <li className="list-group-item" key={index}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </main>
        );
    }
}

function mapStateToProps(state) {
    return {
        countries: state.countryReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);