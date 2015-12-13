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
            data: {}
        };
    },
    render: function () {
        return (
            <div>
                <FlightTable planes={this.state.planes} />
            </div>
        );
    }
});