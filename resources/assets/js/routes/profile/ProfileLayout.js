import React, { Component } from 'react';
import Card from '../../components/Card/Card';
import Avatar from '../../components/Information/Avatar';
import Heading from '../../components/Information/Heading';
import InformationNumber from '../../components/Information/InformationNumber';

class ProfileLayout extends Component {
    render() {
        return (
            <div className="row">
                <div className="col col-xl-5 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    <Card rightIcon="fas fa-cog">
                        <div className="author vcard inline-items profile-heading-info">
                            <Avatar src={this.props.avatar}></Avatar>

                            <div className="author-date">
                                <Heading heading={this.props.heading} subHeading={this.props.subHeading} size='medium'></Heading>
                                <InformationNumber likeNumber="100" viewNumber="200" heartNumber="300"></InformationNumber>
                            </div>
                        </div>

                    </Card>
                </div>
                <div className="col col-xl-7 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default ProfileLayout;