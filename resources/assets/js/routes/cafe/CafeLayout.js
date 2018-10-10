import React, { Component } from 'react';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import {Card, CardWithTitle} from '../../components/Card';

class CafeLayout extends Component {
    render() {
        var data = [
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
        ];

        return (
            <div className="row">
                <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-1 col-md-8 col-sm-12 col-12">
                    {this.props.children}
                </div>
                <div className="col col-xl-4 order-xl-2 col-lg-4 order-lg-1 col-md-4 col-sm-12 col-12">
                    <Card>
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
                                </select>
                            </div>
                            <div className="col-md-5">
                                <select>
                                    <option>Huyện</option>
                                </select>
                            </div>
                        </div>

                        <hr />

                        <div className="row text-center">
                            <button className="btn btn-primary waves-effect waves-light" type="submit">
                                Tìm kiếm
                            </button>
                        </div>
                    </Card>
                    <CardWithTitle title="SĂN DEAL GIẢM GIÁ" hasLine={true}>
                        <SimpleSlider images={data}></SimpleSlider>
                    </CardWithTitle>
                    <CardWithTitle title="ĐƯỢC ĐỀ XUẤT VỚI BẠN" hasLine={true}>
                        <SimpleSlider images={data}></SimpleSlider>
                    </CardWithTitle>
                </div>
            </div>
        );
    }
}

export default CafeLayout;