import React, { Component } from 'react';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import {Card, CardWithTitle} from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import Select from 'react-select';
import qs from 'qs';
import {withRouter} from 'react-router-dom';

class CafeLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: {name: ""}
        }
    }

    componentDidMount() {
        this.props.getAllProvinces();
        var filter = qs.parse(this.props.location.search.slice(1));
        if(filter) {
            this.props.getAllDistricts(filter.province_id);
            this.setState({filter});
        }

    }

    onChangeFilter(value, name) {
        if(name === 'province_id') {
            this.props.getAllDistricts(value);
        }

        this.setState({
            filter: {
                ...this.state.filter,
                [name]: value
            }
        })
    }

    onSearch(e) {
        e.preventDefault();
        var {filter} = this.state;
        if(!filter.province_id) {
            delete filter.district_id;
        }

        var filter_string = '';
        Object.keys(filter).map(key => {
            if(filter[key]) {
                filter_string = filter_string.concat(`&${key}=${filter[key]}`);
            }
        });
        window.location.href = `${baseUrl}/cafe/search?${filter_string}`;
    }

    render() {
        var {filter} = this.state;

        var data = [
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
            'https://media.foody.vn/res/g16/152682/s/foody-mia-garden-coffee-nguyen-duy-trinh-947-635891429493754278.jpg',
        ];

        var provinceOptions = this.props.provinces.map((item) => {
            return { value: item.matp, label: item.name };
        });
        provinceOptions.unshift({value: null, label: "Chọn tỉnh"});

        var districtOptions = this.props.districts.map((item) => {
            return { value: item.maqh, label: item.name };
        });
        districtOptions.unshift({value: null, label: "Chọn huyện"});

        var typeOptions = [
            {value: null, label: "Loại quán"},
            {value: 1, label: "Cafe"},
            {value: 2, label: "Quán ăn"}
        ];

        var selectedProvince = null, selectedDistrict = null, selectedType = null;
        
        if(filter) {
            selectedProvince = provinceOptions.find(o => { return o.value == parseInt(filter.province_id) });
            selectedDistrict = districtOptions.find(o => { return o.value == parseInt(filter.district_id) });
            selectedType = typeOptions.find(o => { return o.value == parseInt(filter.type) });
        }

        return (
            <div className="row">
                <div className="col col-xl-8 order-xl-2 col-lg-8 order-lg-1 col-md-8 col-sm-12 col-12">
                    {this.props.children}
                </div>
                <div className="col col-xl-4 order-xl-2 col-lg-4 order-lg-1 col-md-4 col-sm-12 col-12">
                    <Card>
                        <form onSubmit={(e) => this.onSearch(e)}>
                            <div className="form-group is-empty">
                                <input type="text" name="name" 
                                    className="form-control" 
                                    defaultValue={filter.name} 
                                    placeholder="Nhập tên quán..." 
                                    onChange={(e) => this.onChangeFilter(e.target.value, "name")}/>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-2">
                                    <i className="fas fa-map-marker-alt" id='cafe-address-icon'></i>
                                </div>
                                <div className="col-md-10">
                                    <Select
                                        placeholder="Tỉnh"
                                        value={selectedProvince}
                                        options={provinceOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "province_id")}
                                    />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-2"></div>
                                <div className="col-md-10">
                                    <Select
                                        placeholder="Huyện"
                                        value={selectedDistrict}
                                        options={districtOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "district_id")}
                                    />
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-md-12">
                                    <Select
                                        placeholder="Loại quán"
                                        value={selectedType}
                                        options={typeOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "type")}
                                    />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CafeLayout));