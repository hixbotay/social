import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ImageCard extends Component {
    render() {
        return (
            <div className="image-card">
                <div>
                    <img src={this.props.img}/>
                    <div className="image-card-btn">
                        {/* <div>
                            {this.props.children}
                        </div> */}
                    </div>
                </div>
                <div className="row image-card-content">
                    <div className="container">
                        <h5>
                            {this.props.heading}
                        </h5>
                        <small>
                            {this.props.subHeading}
                        </small>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

ImageCard.propTypes = {
    img: PropTypes.string,
    heading: PropTypes.string,
    subHeading: PropTypes.string,
}

ImageCard.defaultProps = {
    img: 'http://www.marcetme.com/public/attachments/product-cat-imgs/nopic.png',
}

export {ImageCard};