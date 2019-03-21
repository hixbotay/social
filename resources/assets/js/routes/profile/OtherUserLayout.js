import React, { Component } from 'react';
import {connect} from 'react-redux';
import CircleButton from '../../components/Button/CircleButton';
import { RoundAvatar } from '../../components/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';
import { Card, CardWithIcon, CardWithTitle } from '../../components/Card';
import Modal from 'react-modal';
import VerificationBlock from '../../components/RightSidebar/VerificationBlock';
import {updateRelationship, getOtherUserPhotos} from '../../actions/UserActions';
import {createConversation} from '../../actions/MessageActions';
import {Link, withRouter} from 'react-router-dom';
import socket from '../../helper/socket';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import Gallery from "react-grid-gallery";

class OtherUserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoved: props.relationship ? props.relationship.is_loved : false,
            isLiked: props.relationship ? props.relationship.is_like : false,
            isBlocked: props.relationship ? props.relationship.is_block : false,
            likeNumber: parseInt(props.relationship.likeNumber) ? parseInt(props.relationship.likeNumber) : 0,
            loveNumber: parseInt(props.relationship.loveNumber) ? parseInt(props.relationship.loveNumber) : 0,
            isAlertRelationship: false,
            isAlertDating: false,
            message: "",
            conversation_id: "",
            isOpenImages: false
        }
    }

    updateRelationship(actionType) {
        if(localStorage.getItem('percentage') < 70) {
            this.setState({isAlertRelationship: true});
        } else {
            var data = {};

            if(actionType == 'love') {
                if(this.state.isLoved) {
                    data = {'is_loved': 0};
                    this.setState({isLoved: false, loveNumber: this.state.loveNumber - 1});
                } else {
                    data = {'is_loved': 1, 'is_like': 0};
                    this.setState({isLoved: true, loveNumber: this.state.loveNumber + 1});
                    if(this.state.isLiked) {
                        this.setState({isLiked: false, likeNumber: this.state.likeNumber - 1});
                    }
                }
            } else if(actionType == 'like') {
                if(this.state.isLiked) {
                    data = {'is_like': 0};
                    this.setState({isLiked: false, likeNumber: this.state.likeNumber - 1});
                } else {
                    data = {'is_loved': 0, 'is_like': 1};
                    this.setState({isLiked: true, likeNumber: this.state.likeNumber + 1});
                    if(this.state.isLoved) {
                        this.setState({isLoved: false, loveNumber: this.state.loveNumber - 1});
                    }
                }
            } else if(actionType == 'block') {
                if(this.state.isBlocked) {
                    data = {'is_block': 0};
                    this.setState({isBlocked: false});
                } else {
                    data = {'is_block': 1};
                    this.setState({isBlocked: true});
                }
            }

            this.props.updateRelationship(data, this.props.user.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.relationship != this.props.relationship) {
            this.setState({
                isLoved: nextProps.relationship.is_loved,
                isLiked: nextProps.relationship.is_like,
                isBlocked: nextProps.relationship.is_block,
                likeNumber: parseInt(nextProps.relationship.likeNumber) ? parseInt(nextProps.relationship.likeNumber) : 0,
                loveNumber: parseInt(nextProps.relationship.loveNumber) ? parseInt(nextProps.relationship.loveNumber) : 0
            });
        }
    }

    inviteDating()  {
        var user = this.props.current_user;
        if((user.is_id_card_verified === 'pending' || user.is_id_card_verified === 'verified')
            && user.is_phone_verified 
            && user.credit >= this.props.price.dating.couple_dating_price) {
                this.props.history.push({
                    pathname: '/dating/couple/create',
                    state: {invitee: this.props.user}
                })
        } else {
            this.setState({isAlertDating: true});
        }
    }

    componentDidMount() {
        const {user, current_user} = this.props;
        var subcriber = {room_id: current_user.id, username: current_user.name};
        socket.emit('subscribe', subcriber);
    }

    sendMessage(){
        const {user, current_user} = this.props;
        if (!this.state.conversation_id) {
            this.props.createConversation({
                name: user.id + "_" + current_user.id,
                creator_id: current_user.id,
                user: [current_user.id, user.id]
            })
                .then(response => {
                    const conversation = response.conversation_id;
                    this.setState({
                        conversation_id: response.conversation_id,
                    }, () => {
                        socket.emit('new_message', {
                            username: current_user.name,
                            message : this.state.message,
                            to_id: [user.id],
                            conversation_id: this.state.conversation_id,
                        });
                        this.createNotification('info');
                        this.setState({message: ""});
                    });

                })
                .catch(e => {
                    this.createNotification('error');
                })
        }else{
            socket.emit('new_message', {
                username: current_user.name,
                message : this.state.message,
                to_id: [user.id],
                conversation_id: this.state.conversation_id,
            });
            this.createNotification('info');
        }
    }

    createNotification(type){
        switch (type) {
            case 'info':
                NotificationManager.info('Message sent !');
                break;
            case 'success':
                alert(type);
                NotificationManager.success('Success message', 'Message sent!');
                break;
            case 'warning':
                NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
                break;
            case 'error':
                NotificationManager.error('Error message', 'Click me!', 5000, () => {
                    alert('callback');
                });
                break;
        }
    }

    render() {
        const {user, current_user, other_user_photos} = this.props;

        var images = other_user_photos.map(photo => {
            return {
                id: photo.id,
                src: photo.source,
                thumbnail: photo.source,
                thumbnailWidth: 250,
                thumbnailHeight: 250
            }
        });

        var sliderImg = [];
        if(images.length > 4) {
            for(let i=0; i < 4; i++) {
                sliderImg.push(images[i].src);
            }
        } else {
            sliderImg = images.map(image => {return image.src});
        }

        return (
            <div className="row">
                <div className="col col-xl-7 order-xl-1 col-lg-7 order-lg-1 col-md-7 order-md-2 col-sm-12 order-sm-2 col-12 col-right">
                    {this.props.children}
                </div>
                <div className="col col-xl-5 order-xl-2 col-lg-5 order-lg-2 col-md-5 order-md-1 col-sm-12 order-sm-1 col-12 col-left">
                    <CardWithIcon>
                        <div className="author vcard inline-items profile-heading-info">
                            <RoundAvatar img={user.avatar} size='large'></RoundAvatar>
                            {
                                current_user.id === user.id ? (
                                    <label className="btn-change-avatar">
                                        <input type="file" className="d-none" name="image" onChange={(e) => this.handleImage(e)} />
                                    </label>
                                ) : null
                            }

                            <div className="author-date">
                                <Heading heading={user.name} subHeading={user.hometown_province_name} size='medium'></Heading>
                                <InformationNumber likeNumber={this.state.likeNumber} viewNumber={this.props.user.viewNumber} heartNumber={this.state.loveNumber}></InformationNumber>
                            </div>
                        </div>
                    </CardWithIcon>
                    <Card>
                        <div className="friend-controls">
                            <CircleButton
                                icon="fas fa-heart"
                                name='love'
                                color={this.state.isLoved ? '#e74c3c' : '#34495e'}
                                action={() => this.updateRelationship('love')}
                            ></CircleButton>
                            <CircleButton
                                icon="fas fa-thumbs-up"
                                name='like'
                                color={this.state.isLiked ? '#2980b9' : '#34495e'}
                                action={() => this.updateRelationship('like')}
                            ></CircleButton>
                            <CircleButton
                                icon="fas fa-coffee"
                                color={this.state.isBlocked ? '#d35400' : '#34495e'}
                                action={() => this.inviteDating()}
                            ></CircleButton>
                        </div>
                    </Card>
                    <Card>
                        <div className="row">
                            <div className="col-10 pr-0">
                                <input className="form-control" value={this.state.message} onChange={(e) => {
                                    this.setState({message: e.target.value});
                                }} />
                            </div>
                            <div className="col-2 text-center send-message pl-0">
                                <CircleButton
                                    action={() => {
                                        this.sendMessage();
                                    }}
                                    icon="fab fa-telegram-plane fa-2x"></CircleButton>
                            </div>
                        </div>
                        <div className='mt-1'>Bắt đầu chat với {user.name} ngay!</div>
                    </Card>
                    <div className='disable-mobile'>
                        <VerificationBlock user={user}/>
                    </div>
                    <div className='events mt-4 mb-3 disable-mobile'>
                        <img src="http://file.hstatic.net/1000184601/file/457__1_.jpg" className="vip-upgrade"/>
                    </div>
                </div>

                <Modal isOpen={this.state.isAlertRelationship}>
                    <div className="row">
                        <div className="image">
                            <img src="https://us.123rf.com/450wm/anwarsikumbang/anwarsikumbang1408/anwarsikumbang140800671/31358550-love-couple-romance-cartoon.jpg" id="create-event-alert-img" width='200px' height='200px'/>
                        </div>
                        <div className="content">
                            <div className="text-center">
                                CHƯA XONG!
                            </div>
                            <div className="text-center create-event-alert-content">
                                Bạn cần hoàn thiện hồ sơ đến 70% để có thể thả tim một ai đó!
                            </div>
                            <div className="text-center create-event-alert-content">
                                <button className="btn btn-primary" onClick={() => {this.setState({isAlertRelationship: false})}}>OK</button>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal isOpen={this.state.isAlertDating}>
                    <h5>Lỗi!</h5>
                    <hr/>
                    <div>Bạn chưa thể tạo cuộc hẹn đôi lúc này bởi một trong các lý do sau:</div>
                    <ul>
                        <li>- Bạn chưa xác minh số điện thoại thành công</li>
                        <li>- Bạn chưa xác minh chứng minh thư thành công</li>
                        <li>- Tài khoản của bạn không đủ để tạo cuộc hẹn</li>
                    </ul>
                    <button className="float-right btn btn-primary" onClick={() => {this.setState({isAlertDating: false})}}>
                        Đã hiểu
                    </button>
                </Modal>

                <Modal isOpen={this.state.isOpenImages}>
                    <div className="clearfix">
                        <div className="float-right" onClick={() => {this.setState({isOpenImages: false})}}>
                            <i className="fas fa-times fa-2x"></i>
                        </div>
                    </div>
                    <Gallery
                        images={images}
                        enableLightbox={true}
                        enableImageSelection={false}
                        // currentImageWillChange={this.onCurrentImageChange}
                    />               
                </Modal>

                <NotificationContainer/>

            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        price: state.payment.price,
        chat: state.chat,
        other_user_photos: state.user.other_user_photos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        updateRelationship: (data, user_id) => dispatch(updateRelationship(data, user_id)),
        createConversation: (data) => dispatch(createConversation(data)),
        getOtherUserPhotos: (id) => dispatch(getOtherUserPhotos(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OtherUserLayout));