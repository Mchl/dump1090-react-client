'use strict';

let React = require('react');
let FlightTableRow = require('./flight-table-row');


module.exports = React.createClass({
    displayName: 'FlightTable',
    render: function () {
        let rows = [];

        if (this.props.planes !== undefined) {
            rows = Object.keys(this.props.planes).sort(this.columnSort).map(icao => {
                return <FlightTableRow data={this.props.planes[icao]} key={icao} />
            });
        }

        return (
            <table className="flight-table">
                <thead>
                    <tr>
                        <th className="icao" onClick={this.props.onHeaderClick}>ICAO</th>
                        <th className="flight" onClick={this.props.onHeaderClick}>Flight</th>
                        <th className="squawk" onClick={this.props.onHeaderClick}>Squawk</th>
                        <th className="altitude" onClick={this.props.onHeaderClick}>Altitude</th>
                        <th className="vertical-rate" onClick={this.props.onHeaderClick}>Vertical rate</th>
                        <th className="speed" onClick={this.props.onHeaderClick}>Speed</th>
                        <th colSpan="2" className="position">Position</th>
                        <th className="track" onClick={this.props.onHeaderClick}>Track</th>
                        <th className="msgs" onClick={this.props.onHeaderClick}>Msgs</th>
                        <th className="last-message" onClick={this.props.onHeaderClick}>Last message</th>
                    </tr>
                </thead>
                <tbody>
                     {rows}
                </tbody>
            </table>
        );
    },
    columnSort: function (key1, key2) {
        let sortField;

        switch (this.props.sortColumn) {
            case 'icao':
            case 'flight':
            case 'squawk':
            case 'altitude':
            case 'speed':
            case 'track':
            case 'msgs':
                sortField = this.props.sortColumn;
                break;
            case 'vertical-rate':
                sortField = 'verticalRate';
                break;
            case 'last-message':
                sortField = 'dateGenerated';
                break;
        }

        if (this.props.planes[key1][sortField] > this.props.planes[key2][sortField]) {
            return 1 * this.props.sortOrder;
        } else if (this.props.planes[key1][sortField] < this.props.planes[key2][sortField]) {
            return -1 * this.props.sortOrder;
        } else {
            return 0;
        }
    }
});