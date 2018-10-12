import React, { Component } from 'react';

// var geocoder = new window.google.maps.Geocoder();

class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            coordinates: []
        }
    }

    componentDidMount() {
        const component = this;

        var latlng = new google.maps.LatLng(21.028511, 105.804817);
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: latlng
        });
        var geocoder = new google.maps.Geocoder();
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
        });
        google.maps.event.addListener(map, 'click', function (event) {
            placeMarker(event.latLng);
        });

        function placeMarker(location) {
            marker.setMap(map);
            marker.setPosition(location);

            component.setState({
                coordinates: [location.lat(), location.lng()]
            }, () => {
                component.props.onChangeAddress(component.state.address, component.state.coordinates);
            });
        }

        document.getElementById('pac-input').addEventListener('keyup', function (event) {
            if (event.key == 'Enter') {
                geocodeAddress(geocoder, map, marker);
            }
        });

        function geocodeAddress(geocoder, resultsMap, marker) {
            var address = document.getElementById('pac-input').value;
            geocoder.geocode({ 'address': address }, function (results, status) {
                if (status === 'OK') {
                    resultsMap.setCenter(results[0].geometry.location);
                    marker.setMap(resultsMap);
                    marker.setPosition(results[0].geometry.location);
                    
                    component.setState({
                        address: address,
                        coordinates: [marker.getPosition().lat(), marker.getPosition().lng()]
                    }, () => {
                        component.props.onChangeAddress(component.state.address, component.state.coordinates);
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        }
    }

    render() {

        return (
            <div>
                <label>Nhập địa chỉ vào ô bên dưới, bạn có thể điều chỉnh marker cho phù hợp:</label>
                <input id="pac-input" className="controls" type="text" placeholder="Nhập địa chỉ và nhấn Enter" />
                <div id="map"></div>
            </div>

        );
    }
}

export default Map;