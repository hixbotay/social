import React, { Component } from 'react';
import CafeLayout from './CafeLayout';
import { Card, CafeCard, CardWithTitle } from '../../components/Card';
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
                <CardWithTitle title="KẾT QUẢ TÌM KIẾM" hasLine={true}>
                    <div className="row">
                        {
                            results.length ? (
                                results.map((agency, index) => {
                                    return (
                                        <div className="col-4" key={index}>
                                            <CafeCard agency={agency}></CafeCard>
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
                </CardWithTitle>
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