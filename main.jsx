/**
 * Created by Mchl on 2015-12-07.
 */

'use strict';

let React = require('react');
let FlightTable = require('./flight-table');
let FlightMap = require('./flight-map');


module.exports = React.createClass({
    displayName: 'Main',
    getInitialState: function () {
        return {
            planes: {},
            planesTable: {}
        };
    },
    render: function () {
        const position = [52.3, 21];
        const zoom = 8;
        return (
            <div>
                <FlightMap
                    centre={position}
                    zoom={zoom}
                    planes={this.state.planes}
                />
                <FlightTable
                    planes={this.state.planes}
                    onHeaderClick={this.props.onTableHeaderClick}
                    sortColumn={this.state.planesTable.sortColumn}
                    sortOrder={this.state.planesTable.sortOrder}
                />

            </div>
        );
    }
});