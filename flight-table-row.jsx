'use strict';

let dateFormat = require('dateformat');
let geolib = require('geolib');

let React = require('react');

module.exports = React.createClass({
    displayName: 'FlightTableRow',
    render: function () {
        
        let dateGenerated = '';
        if (this.props.data.dateGenerated !== undefined) {
            dateGenerated = dateFormat(this.props.data.dateGenerated, 'yyyy-mm-dd HH:MM:ss.l');
        }
        
        let lat = '';
        if (this.props.data.lat !== undefined) {
            lat = geolib.decimal2sexagesimal(this.props.data.lat);
            if (this.props.data.lat > 0) {
                lat += ' N';
            } else {
                lat += ' S';
            }
        }
        
        let lon = '';
        if (this.props.data.lon !== undefined) {
            lon = geolib.decimal2sexagesimal(this.props.data.lon);
             if (this.props.data.lon > 0) {
                lon += ' E';
            } else {
                lon += ' W';
            }
        }

        let altitude = this.props.data.isOnGround ? 'GROUND' : this.props.data.altitude;

        return (
            <tr>
                <td>{this.props.data.icao}</td>
                <td>{this.props.data.flight}</td>
                <td className="numeric">{this.props.data.squawk}</td>
                <td className="numeric">{altitude}</td>
                <td className="numeric">{this.props.data.verticalRate}</td>
                <td className="numeric">{this.props.data.speed}</td>
                <td className="numeric">{lat}</td>
                <td className="numeric">{lon}</td>
                <td className="numeric">{this.props.data.track}</td>
                <td className="numeric">{this.props.data.msgs}</td>
                <td>{dateGenerated}</td>
            </tr>
        );
    }
});