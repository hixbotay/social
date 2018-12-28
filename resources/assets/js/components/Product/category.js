import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CategoryItem extends Component {

    render() {

        const {categories} = this.props;

        return(
            <div className={"row"}>
                {categories.map((content, i) => {
                    return (
                        <div className={"col-md-6"} key={i}>
                            <div className={"text-center categoryBox"}>
                                <div>
                                    <img src={'https://www.veseys.com/media/catalog/product/cache/small_image/320x/925f46717e92fbc24a8e2d03b22927e1/8/8/88073-88073-image-88073%20peppermint%20candy.jpg'} />
                                </div>
                                <h6>{content.name}</h6>
                            </div>
                        </div>

                    );
                })}
            </div>
        );
    }
}

CategoryItem.propTypes = {
    title: PropTypes.string,
};

export default CategoryItem;