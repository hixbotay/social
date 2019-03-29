import React, { Component } from 'react';
import Slider from "react-slick";
import Select from 'react-select';
import { getAllProvinces, getAllDistricts } from '../../actions/AddressActions';
import {updateInvitation} from '../../actions/EventActions';
import { getAllCafe } from '../../actions/CafeActions';
import connect from 'react-redux/es/connect/connect';

class DatingCoupleDetailForm extends Component {
    constructor() {
        super();
        this.state = {
            themes: []
        }
    }

    componentDidMount() {
        this.props.getAllProvinces();
    }
    
    onChangeCafeFilter(selectedOption, filterType) {
        this.setState({
            [filterType]: selectedOption.value
        });

        switch (filterType) {
            case 'province': {
                this.props.getAllDistricts(selectedOption.value);
                this.props.getAllCafe({ province_id: selectedOption.value });
                this.setState({
                    event_data: {
                        ...this.state.event_data,
                        agency_id: null
                    },
                    district: null
                });
                break;
            }
            case 'district': {
                this.props.getAllCafe({ province_id: this.state.province, district_id: selectedOption.value });
                this.setState({
                    event_data: {
                        ...this.state.event_data,
                        agency_id: null
                    }
                });

                break;
            }
            case 'type': {
                this.props.getAllCafe({
                    province_id: this.state.province,
                    district_id: this.state.district,
                    type: selectedOption.value
                });
                break;
            }
        }
    }

    selectAddress(selectedOption) {
        this.setState({
            // selectedAddress: index,
            selectedTheme: -1,
            event_data: {
                ...this.state.event_data,
                agency_id: selectedOption.value,
                name: selectedOption.label,
                image: ""
            },
            themes: selectedOption.images,
            fee: selectedOption.fee
        })
    }

    selectTheme(item, index) {
        this.setState({
            selectedTheme: index,
            event_data: {
                ...this.state.event_data,
                image: item
            }
        });
    }

    join(event_id) {
        if(confirm("Bạn chắc chắn đồng ý lời mời này chứ?")) {
            this.props.updateInvitation(
                event_id,
                {
                    type: 'accept',
                    ...this.state.event_data
                }
            );
        }
    }

    render() {
        var { event, provinces, districts, cafes } = this.props;

        var provinceOptions = provinces.map(province => {
            return { value: province.matp, label: province.name }
        });

        var districtOptions = districts.map(district => {
            return { value: district.maqh, label: district.name }
        });

        var cafeOptions = cafes.map(cafe => {
            return { value: cafe.id, label: cafe.name, images: cafe.images, fee: cafe.organizing_fee }
        });

        var typeOptions = [
            { value: 1, label: "Cafe" },
            { value: 2, label: "Quán ăn" }
        ];

        //setting for slider
        var settings = {
            accessibility: true,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: true
        };

        return (
            <React.Fragment>

                <form>
                    <div className="row">
                        <div className="col-12 col-md-4 mb-2">
                            <Select
                                placeholder="Chọn tỉnh/thành"
                                options={provinceOptions}
                                onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "province")}
                            />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <Select
                                placeholder="Chọn huyện"
                                options={districtOptions}
                                onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "district")}
                            />
                        </div>
                        <div className="col-12 col-md-4 mb-2">
                            <Select
                                placeholder="Loại quán"
                                options={typeOptions}
                                onChange={(selectedOption) => this.onChangeCafeFilter(selectedOption, "type")}
                            />
                        </div>
                        <div className="col-12 col-md-12 mb-4">
                            <Select
                                placeholder={`Danh sách các quán (${cafes.length} quán)`}
                                options={cafeOptions}
                                onChange={(selectedOption) => this.selectAddress(selectedOption)}
                            />
                        </div>
                    </div>

                    <h5>Chọn ảnh nhận diện cho cuộc hẹn của bạn</h5>
                    {
                        (this.state.themes.length) ? (
                            <Slider {...settings}>
                                {
                                        this.state.themes.map((item, index) => {
                                            return (
                                                <div className="event-theme" key={index}>
                                                    <img
                                                        src={item}
                                                        className={this.state.selectedTheme == index ? `selected-image` : ``}
                                                        onClick={() => this.selectTheme(item, index)}
                                                    />
                                                </div>
                                            )
                                        })
                                }
                            </Slider>
                        ) : (
                            <div>Chưa có ảnh nào được chọn</div>
                        )
                    }
                    <div>
                        <button type="button" className="btn btn-danger" onClick={() => { this.props.onReject() }}>Từ chối lời mời</button>
                        <button type="button" className="btn btn-success" onClick={() => this.join(event.id)}>Xác nhận</button>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}

function mapStateToProps(state) {
    return {
        price: state.payment.price,
        provinces: state.address.provinces,
        districts: state.address.districts,
        cafes: state.cafe.cafes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // joinDating: (event_id) => dispatch(joinDating(event_id)),
        updateInvitation: (id, data) => dispatch(updateInvitation(id, data)),
        getAllProvinces: () => dispatch(getAllProvinces()),
        getAllDistricts: (province_id) => dispatch(getAllDistricts(province_id)),
        getAllCafe: (filter) => dispatch(getAllCafe(filter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatingCoupleDetailForm);