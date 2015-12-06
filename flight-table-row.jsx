'use strict';

let React = require('react');

module.exports = React.createClass({
    displayName: 'FlightTableRow',
    render: function () {
        let dateGenerated = '';
        if (this.props.data.dateGenerated !== undefined) {
            dateGenerated =  this.props.data.dateGenerated.getFullYear() + '-' +
                             (this.props.data.dateGenerated.getMonth() + 1) + '-' +
                             this.props.data.dateGenerated.getDate() + ' ' +
                             this.props.data.dateGenerated.getHours() + ':' + 
                             this.props.data.dateGenerated.getMinutes() + ':' + 
                             this.props.data.dateGenerated.getSeconds() + '.' + 
                             this.props.data.dateGenerated.getMilliseconds(); 
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