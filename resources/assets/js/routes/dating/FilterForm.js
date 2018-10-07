import React, { Component } from 'react';

class FilterForm extends Component {
    render() {
        return (
            <div>
                <h5>LỌC THEO</h5>
                <form>
                    {/* {{ csrf_field() }} */}
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-users"></i>
                        </div>
                        <div className="col-5">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                        <div className="col-5">
                            <select className="custom-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="far fa-heart"></i>
                        </div>
                        <div className="col-10">
                            <select className="custom-select">
                                <option>Tình trạng hôn nhân</option>
                                <option>Độc thân</option>
                                <option>Đã kết hôn</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-suitcase"></i>
                        </div>
                        <div className="col-10">
                            <select className="custom-select">
                                <option>Chọn nghề nghiệp</option>
                            </select>
                        </div>
                    </div>
                    <div className="row form-group">
                        <div className="col-2">
                            <i className="fas fa-map-marker"></i>
                        </div>
                        <div className="col-5">
                            <select className="custom-select">
                                <option>Tỉnh</option>
                            </select>
                        </div>
                        <div className="col-5">
                            <select className="custom-select">
                                <option>Huyện</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-center">
                        <button className="btn btn-primary">Áp dụng</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default FilterForm;