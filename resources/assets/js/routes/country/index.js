import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllCountries } from '../../actions';
import CircleButton from '../../components/Button/CircleButton';
import PostHeader from '../../components/Post/PostHeader';

class Country extends Component {
    componentDidMount() {
        this.props.getAllCountries();
    }

    render() {
        return (
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
        );
    }
}

function mapStateToProps(state) {
    return {
        countries: state.country
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: () => dispatch(getAllCountries())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Country);