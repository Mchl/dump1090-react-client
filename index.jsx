'use strict'

let ReactDOM = require('react-dom');
let React = require('react');
let FlightTable = require('./flight-table');

let data = [
    {
        icao: "471f7f",
        flight: "WZZ7HP",
        squawk: "6212",
        altitude: "3200",
        speed: "175",
        distance: "11.6",
        track: "48",
        msgs: "768",
        age: "0"
    },
    {
        icao: "3c6752",
        flight: "EWG7Y",
        squawk: "0460",
        altitude: "39025",
        speed: "399",
        distance: "96.2",
        track: "49",
        msgs: "868",
        age: "0"
    }
];

ReactDOM.render(
    <FlightTable data={data} />, 
    document.getElementById('content')
);

