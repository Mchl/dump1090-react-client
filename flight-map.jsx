'use strict';

let RLeaflet = require('react-leaflet');
let Leaflet = require('leaflet');
let React = require('react');

module.exports = React.createClass({
    displayName: 'FlightMap',
    ssssfao: function () {'noosssosssp'},
    render: function () {
        let markers = [];
        let iconOptions = {
            iconUrl: 'airplane.svg',
            iconSize: [32, 32]
        }

        if (this.props.planes !== undefined) {
            markers = Object.keys(this.props.planes)
                .filter(icao => {
                    return this.props.planes[icao].lat !== undefined
                        && this.props.planes[icao].lon !== undefined;
                })
                .map(icao => {
                let data = this.props.planes[icao];
                let position = [data.lat, data.lon];

                return (<RLeaflet.Marker position={position} key={icao} icon={Leaflet.icon(iconOptions)}>
                    <RLeaflet.Popup>
                        <span>
                            <h1>{icao}</h1>
                            Latitude: {data.lat}<br/>
                            Longitude: {data.lon}
                        </span>
                    </RLeaflet.Popup>
                </RLeaflet.Marker>);
            });
        }


        return (<RLeaflet.Map center={this.props.centre} zoom={this.props.zoom}>
            <RLeaflet.TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers}
        </RLeaflet.Map>);
    }
});