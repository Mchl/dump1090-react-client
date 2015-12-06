'use strict';

let dateFormat = require('dateformat');

let React = require('react');

module.exports = React.createClass({
    displayName: 'FlightTableRow',
    render: function () {
        let dateGenerated = '';
        if (this.props.data.dateGenerated !== undefined) {
            dateGenerated = dateFormat(this.props.data.dateGenerated, 'yyyy-mm-dd HH:MM:ss.l');
        }
        return (
            <tr>
                <td>{this.props.data.icao}</td>
                <td>{this.props.data.flight}</td>
                <td>{this.props.data.squawk}</td>
                <td>{this.props.data.altitude}</td>
                <td>{this.props.data.verticalRate}</td>
                <td>{this.props.data.speed}</td>
                <td>{this.props.data.distance}</td>
                <td>{this.props.data.track}</td>
                <td>{this.props.data.msgs}</td>
                <td>{dateGenerated}</td>
            </tr>
        );
    }
});