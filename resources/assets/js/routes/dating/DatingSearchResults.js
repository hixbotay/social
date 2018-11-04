import React, { Component } from 'react';
import qs from 'qs';
import connect from 'react-redux/es/connect/connect';
import DatingCouple from '../../components/Dating/DatingCouple';
import DatingGroup from '../../components/Dating/DatingGroup';
import {Card} from '../../components/Card';
import {searchEvent} from '../../actions/EventActions';
import DatingLayout from './DatingLayout';

class DatingSearchResults extends Component {
    componentDidMount() {
        var query_string = this.props.location.search.slice(1);
        this.props.searchEvent(query_string);
    }

    render() {
        const {events} = this.props;
        console.log(events);

        return (
            <DatingLayout>
                <h4>KẾT QUẢ TÌM KIẾM CUỘC HẸN</h4>
                {
                    (events.length) ? (
                        events.map((event, index) => {
                            return (
                                <Card key={index}>
                                    {
                                        event.type === 'group' ?
                                            <DatingGroup event={event} action={(event_id) => this.props.action(event_id)} ></DatingGroup>
                                            : <DatingCouple event={event} action={(event_id) => this.props.action(event_id)}></DatingCouple>
                                    }
                                </Card>
                            )
                        })
                    ) : (
                        <Card>
                            Không có cuộc hẹn nào khớp với truy vấn của bạn
                        </Card>
                    )
                }
            </DatingLayout>
        );
    }
}

function mapStateToProps(state) {
    return {
        events: state.event.results
    }
}

function mapDispatchToProps(dispatch) {
    return {
        searchEvent: (filter) => dispatch(searchEvent(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatingSearchResults);