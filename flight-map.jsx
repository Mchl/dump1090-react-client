'use strict';

let Leaflet = require('react-leaflet');
let React = require('react');

module.exports = React.createClass({
    displayName: 'FlightMap',
    fao: function () {'nooosssp'},
    render: function () {
        let markers = [];

        if (this.props.planes !== undefined) {
            markers = Object.keys(this.props.planes)
                .filter(icao => {
                    return this.props.planes[icao].lat !== undefined
                        && this.props.planes[icao].lon !== undefined;
                })
                .map(icao => {
                let data = this.props.planes[icao];
                let position = [data.lat, data.lon];

                return (<Leaflet.Marker position={position} key={icao} iconAngle="90">
                    <Leaflet.Popup>
                        <span>
                            <h1>{icao}</h1>
                            Latitude: {data.lat}<br/>
                            Longitude: {data.lon}
                        </span>
                    </Leaflet.Popup>
                </Leaflet.Marker>);
            });
        }


        return (<Leaflet.Map center={this.props.centre} zoom={this.props.zoom}>
            <Leaflet.TileLayer
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers}
        </Leaflet.Map>);
    }
});