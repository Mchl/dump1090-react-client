'use strict'

let wsUrl = 'ws://192.168.0.12:8888';

let webSocket = new WebSocket(wsUrl, ['binary', 'base64']);

let translateMessage = message => {
    return {
        icao: message.hex_ident,
        flight: message.callsign,
        squawk: message.squawk,
        altitude: message.altitude,
        speed: message.ground_speed,
        distance: '',
        track: message.track
    }
};



webSocket.onmessage = evt => {
    let reader = new FileReader();

    reader.onloadend = () => {
        let messages = reader.result.split('\n');
        messages.slice(0,-1).forEach((message, index) => messages[index] = translateMessage(parseSbs1Message(message)));

        flightTableComponent.setState({data: messages});
    };
    

    reader.readAsText(evt.data);
}

let ReactDOM = require('react-dom');
let React = require('react');
let FlightTable = require('./flight-table');


let flightTableComponent = ReactDOM.render(
    <FlightTable />, 
    document.getElementById('content')
);

