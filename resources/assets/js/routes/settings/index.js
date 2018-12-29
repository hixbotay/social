import React, { Component } from 'react';
import {CardWithTitle} from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
import Modal from 'react-responsive-modal';
import Switch from "react-switch";
// action
import { getUserConfiguration, updateUserConfiguration } from '../../actions/UserActions';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data: {
                notify_receive_message: true,
                notify_profile_visited: true,
                notify_liked: true,
                notify_loved: true,
            }
        };
    }

    componentDidMount() {
        this.props.getUserConfiguration().then(data => {
            if(data) {
                this.setState({
                    data: {
                        notify_receive_message: data.notify_receive_message ? true : false,
                        notify_profile_visited: data.notify_profile_visited ? true : false,
                        notify_liked: data.notify_liked ? true : false,
                        notify_loved: data.notify_loved ? true : false,
                    }
                });
            } else {
                this.setState({ 
                    data: {
                        notify_receive_message: false,
                        notify_profile_visited: false,
                        notify_liked: false,
                        notify_loved: false,
                    }
                });
            }
            
        });
    }

    handleChange(position) {
        console.log(this.props);
        switch(position) {
            case 1: {
                this.setState({
                    data: {
                        ...this.state.data,
                        notify_receive_message: !this.state.data.notify_receive_message
                    }
                });
                break;
            }
            case 2: {
                this.setState({
                    data: {
                        ...this.state.data,
                        notify_profile_visited: !this.state.data.notify_profile_visited
                    }
                });
                break;
            }
            case 3: {
                this.setState({
                    data: {
                        ...this.state.data,
                        notify_liked: !this.state.data.notify_liked
                    }
                });
                break;
            }
            case 4: {
                this.setState({
                    data: {
                        ...this.state.data,
                        notify_loved: !this.state.data.notify_loved
                    }
                });
                break;
            }
        }

        this.props.updateUserConfiguration(this.state.data);
    }

    render() {
        // console.log(this.state.data)
        return (
            <CardWithTitle hasLine={true} title="THÔNG BÁO"> 
                <div className="row">
                    <div className="col-6">Khi có tin nhắn đến</div>
                    <div className="col-6">
                        <Switch
                            onChange={() => this.handleChange(1)}
                            checked={this.state.data.notify_receive_message}
                            className="react-switch align-middle"
                            id="normal-switch"
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">Khi có người xem profile</div>
                    <div className="col-6">
                        <Switch
                            onChange={() => this.handleChange(2)}
                            checked={this.state.data.notify_profile_visited}
                            className="react-switch align-middle"
                            id="normal-switch"
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">Khi có người like</div>
                    <div className="col-6">
                        <Switch
                            onChange={() => this.handleChange(3)}
                            checked={this.state.data.notify_liked}
                            className="react-switch align-middle"
                            id="normal-switch"
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-6">Khi có người love</div>
                    <div className="col-6">
                        <Switch
                            onChange={() => this.handleChange(4)}
                            checked={this.state.data.notify_loved}
                            className="react-switch align-middle"
                            id="normal-switch"
                        />
                    </div>
                </div>
            </CardWithTitle>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user.current_user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUserConfiguration: () => dispatch(getUserConfiguration()),
        updateUserConfiguration: (data) => dispatch(updateUserConfiguration(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(index);