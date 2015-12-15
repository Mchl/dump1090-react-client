/**
 * Created by Mchl on 2015-12-07.
 */

'use strict';

let React = require('react');
let FlightTable = require('./flight-table');

module.exports = React.createClass({
    displayName: 'Main',
    getInitialState: function () {
        return {
            planes: {},
            planesTable: {}
        };
    },
    render: function () {
        return (
            <div>
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