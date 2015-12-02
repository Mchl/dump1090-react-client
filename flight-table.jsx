'use strict';

let React = require('react');
let FlightTableRow = require('./flight-table-row');

module.exports = React.createClass({
    displayName: 'FlightTable',
    getInitialState: function () {
        return {
            data: []
        };
    },
    render: function () {
        let rows = this.state.data.map((flightData) => {
            return <FlightTableRow data={flightData} key={flightData.icao} />
        });

        return (
            <table>
                <thead>
                    <tr>
                        <th>ICAO</th>
                        <th>Flight</th>
                        <th>Squawk</th>
                        <th>Altitude</th>
                        <th>Speed</th>
                        <th>Distance</th>
                        <th>Track</th>
                        <th>Msgs</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                     {rows}
                </tbody>
            </table>
        );
    }
});