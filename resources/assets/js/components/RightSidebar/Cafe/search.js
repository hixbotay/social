import React, { Component } from 'react';

class CafeSearch extends Component {

    constructor(props){
        super(props);
        this.state={
            province: 1,
            district: 1,
        }
    }

    render() {


        var province = this.props.province;
        var district = this.props.district;

        return (
            <div className="col-md-12">
                <div className="ui-block">
                    <div className="ui-block-title">
                        <h6 className="title">Tìm quán cafe</h6>
                    </div>
                    <div className="ui-block-content">
                        <div className="form-group is-empty">
                            <input className="form-control" type="tel" placeholder="Nhập tên quán ..." required="" />
                                <span className="material-input"></span>
                        </div>

                        <div className="row">
                            <div className="col-md-2">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="col-md-5">
                                <select>

                                    <option>Tỉnh</option>
                                    {Object.values(province).map((data, index) => {
                                        return(
                                            <option value={data.matp} key={index}>{data.name}</option>
                                        );
                                    })}

                                </select>
                            </div>
                            <div className="col-md-5">
                                <select>

                                    <option>Huyện</option>
                                    {Object.values(district).map((data, index) => {
                                        return(
                                            <option value={data.maqh} key={index}>{data.name}</option>
                                        );
                                    })}

                                </select>
                            </div>

                        </div>

                        <hr />

                        <div className="row text-center">
                            <button className="btn btn-primary waves-effect waves-light" type="submit">
                                Tìm kiếm
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default CafeSearch;