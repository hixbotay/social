import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import { Card, CafeCard } from '../../components/Card';
import * as qs from 'qs';
import { cleanObject } from '../../helper/function';
import { searchCafe } from '../../actions/CafeActions';
import connect from 'react-redux/es/connect/connect';
import { withRouter, Redirect } from 'react-router-dom';

class SearchResult extends Component {
    constructor() {
        super();
        this.state = {
            isRedirect: false
        }
    }

    componentDidMount() {
        var query = qs.parse(this.props.location.search.slice(1));
        this.props.searchCafe(query);
    }

    render() {
        const { results } = this.props;

        return (
            <CafeLayout>
                <div className='card-title'>
                    <h6 className='title'>KẾT QUẢ TÌM KIẾM</h6>
                </div>
                <Card className='block-cafe-stores'>
                    <div className="row">
                        {
                            results.length ? (
                                results.map((agency, index) => {
                                    return (
                                        <div className="store-item col-xl-4 col-lg-4 col-md-4 col-sm-6 col-xs-12" key={index}>
                                            <CafeCard className='image-card cafe-card box-shadow-default' agency={agency}></CafeCard>
                                        </div>
                                    )
                                })
                            ) : (
                                <div>
                                    Xin lỗi, chúng tôi không tìm thấy kết quả nào khớp với truy vấn.
                                </div>
                            )
                        }
                    </div>
                </Card>
            </CafeLayout>
        );
    }
}
function mapStateToProps(state) {
    return {
        results: state.cafe.results
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchCafe: (filter) => dispatch(searchCafe(filter))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchResult));