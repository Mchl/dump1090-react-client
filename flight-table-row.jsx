'use strict';

let React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <tr>
                <td>{this.props.data.icao}</td>
                <td>{this.props.data.flight}</td>
                <td>{this.props.data.squawk}</td>
                <td>{this.props.data.altitude}</td>
                <td>{this.props.data.speed}</td>
                <td>{this.props.data.distance}</td>
                <td>{this.props.data.track}</td>
                <td>{this.props.data.msgs}</td>
                <td>{this.props.data.age}</td>
            </tr>
        );
    }
});