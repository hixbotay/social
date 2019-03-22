import React, { Component } from 'react';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import {Card, CardWithTitle} from '../../components/Card';
import connect from 'react-redux/es/connect/connect';
import {getAllProvinces, getAllDistricts} from '../../actions/AddressActions';
import Select from 'react-select';
import qs from 'qs';
import {withRouter} from 'react-router-dom';
import CenterModeSlider from "../../components/Slider/CenterModeSlider";
import Modal from "../../components/Modal";

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
        var settings = {
            centerPadding: '50px',
            speed: 500,
            centerMode: true,
            slidesToShow: 1,
            focusOnSelect: true,
            dots: false,
            infinite: true,
            adaptiveHeight: true
        };
        return (
            <div className="row">
                <div className="col col-xl-8 order-xl-1 col-lg-8 order-lg-1 col-md-8 order-md-1 col-sm-12 order-sm-2 col-12 ">
                    <Card className='cafe-store-box disable-desktop mt-4 search-cafe-store box-shadow-default'>
                        <form  onSubmit={(e) => this.onSearch(e)}>
                            <div className="form-group is-empty">
                                <input type="text" name="name"
                                       className="form-control"
                                       defaultValue={filter.name}
                                       placeholder="Nhập tên quán..."
                                       onChange={(e) => this.onChangeFilter(e.target.value, "name")}/>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-2">
                                    <i className="fas fa-map-marker-alt cafe-address-icon" ></i>
                                </div>
                                <div className='col-md-5'>
                                    <Select
                                        placeholder="Huyện"
                                        value={selectedDistrict}
                                        options={districtOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "district_id")}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <Select
                                        placeholder="Tỉnh"
                                        value={selectedProvince}
                                        options={provinceOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "province_id")}
                                    />
                                </div>
                            </div>

                            <div className="row text-center btn-group-submit">
                                <button className="btn btn-primary waves-effect waves-light" type="submit">
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </Card>
                    <div className='stores-content'>
                        {this.props.children}
                    </div>
                </div>
                <div className="col col-xl-4 order-xl-2 col-lg-4 order-lg-2 col-md-4 order-md-2 col-sm-12 order-sm-1 col-12">
                    <Card className='cafe-store-box disable-mobile'>
                        <form  onSubmit={(e) => this.onSearch(e)}>
                            <div className="form-group is-empty">
                                <input type="text" name="name" 
                                    className="form-control" 
                                    defaultValue={filter.name} 
                                    placeholder="Nhập tên quán..." 
                                    onChange={(e) => this.onChangeFilter(e.target.value, "name")}/>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-2">
                                    <i className="fas fa-map-marker-alt cafe-address-icon"></i>
                                </div>
                                <div className='col-md-5'>
                                    <Select
                                        placeholder="Huyện"
                                        value={selectedDistrict}
                                        options={districtOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "district_id")}
                                    />
                                </div>
                                <div className='col-md-5'>
                                    <Select
                                        placeholder="Tỉnh"
                                        value={selectedProvince}
                                        options={provinceOptions}
                                        onChange={(option) => this.onChangeFilter(option.value, "province_id")}
                                    />
                                </div>
                            </div>

                            <div className="row text-center btn-group-submit">
                                <button className="btn btn-primary waves-effect waves-light" type="submit">
                                    Tìm kiếm
                                </button>
                            </div>
                        </form>
                    </Card>
                    <CardWithTitle className='cafe-store-box' title="SĂN DEAL GIẢM GIÁ" hasLine={true}>
                        <CenterModeSlider settings={settings} images={data}></CenterModeSlider>
                    </CardWithTitle>
                    <CardWithTitle className='cafe-store-box ' title="ĐƯỢC ĐỀ XUẤT VỚI BẠN" hasLine={true}>
                        <CenterModeSlider settings={settings} images={data}></CenterModeSlider>
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