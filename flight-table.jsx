'use strict';

let React = require('react');
let FlightTableRow = require('./flight-table-row');

module.exports = React.createClass({
    displayName: 'FlightTable',
    render: function () {
        let rows = [];

        if (this.props.planes !== undefined) {
            rows = Object.keys(this.props.planes).map(icao => {
                return <FlightTableRow data={this.props.planes[icao]} key={icao} />
            });
        }

        return (
            <table>
                <thead>
                    <tr>
                        <th>ICAO</th>
                        <th>Flight</th>
                        <th>Squawk</th>
                        <th>Altitude</th>
                        <th>Vertical rate</th>
                        <th>Speed</th>
                        <th colSpan="2">Position</th>
                        <th>Track</th>
                        <th>Msgs</th>
                        <th>Last message</th>
                    </tr>
                </thead>
                <tbody>
                     {rows}
                </tbody>
            </table>
        );
    }
});