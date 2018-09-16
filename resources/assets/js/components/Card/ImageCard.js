import React, { Component } from 'react';
import CircleButton from '../Button/CircleButton';

class ImageCard extends Component {
    render() {
        return (
            <div className="col-3 col-md-3 image-card">
                <div className="row">
                    <img src={this.props.src}/>
                    <div className="image-card-btn">
                        <div>
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className="row image-card-content">
                    <div className="container">
                        <h5>
                            {this.props.heading}
                        </h5>
                        <div>
                            {this.props.subHeading}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageCard;