import React, { Component } from 'react';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import {Card, CardWithTitle} from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import {Redirect} from 'react-router-dom';

class CafeLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {name: ""}
        }
    }

    componentDidMount() {
        this.props.getAllProvinces();
    }

    onChangeProvince(event) {
        var province_id = event.target.value;
        if(province_id) {
            this.props.getAllDistricts(province_id);
            this.setState({
                filter: {
                    ...this.state.filter,
                    province_id: province_id
                }
            })
        } else {
            this.setState({
                filter: {
                    ...this.state.filter,
                    province_id: ''
                }
            })
        }
    }

    onChangeFilter(event) {
        this.setState({
            filter: {
                ...this.state.filter,
                [event.target.name]: event.target.value
            }
        })
    }

    onSearch(e) {
        e.preventDefault();
        var filter = this.state.filter;
        var filter_string = '';
        Object.keys(filter).map(key => {
            if(filter[key]) {
                filter_string = filter_string.concat(`&${key}=${filter[key]}`);
            }
        });
        window.location = `${baseUrl}/cafe/search?${filter_string}`;
    }

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
                        <form onSubmit={(e) => this.onSearch(e)}>
                            <div className="form-group is-empty">
                                <input type="text" name="name" className="form-control" placeholder="Nhập tên quán..." onChange={(e) => this.onChangeFilter(e)} required/>
                            </div>

                            <div className="row">
                                <div className="col-md-2">
                                    <i className="fas fa-map-marker-alt" id='cafe-address-icon'></i>
                                </div>
                                <div className="col-md-5">
                                    <select className="custom-select" name="province_id" onChange={(e) => this.onChangeProvince(e)}>
                                        <option value="">Tỉnh</option>
                                        {
                                            this.props.provinces.map((item, index) => {
                                                return (
                                                    <option value={item.matp} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-5">
                                    <select className="custom-select" name="district_id" onChange={(e) => this.onChangeFilter(e)}>
                                        <option value="">Huyện</option>
                                        {
                                            this.props.districts.map((item, index) => {
                                                return (
                                                    <option value={item.maqh} key={index}>{item.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>

                            <hr />

                            <div className="row text-center">
                                <button className="btn btn-primary waves-effect waves-light" type="submit">
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
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

function mapStateToProps(state) {
    return {
        provinces: state.address.provinces,
        districts: state.address.districts,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CafeLayout);