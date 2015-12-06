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
        lat: message.lat,
        lon: message.lon,
        verticalRate: message.vertical_rate,
        distance: '',
        track: message.track,
        dateGenerated: new Date(Date.parse(message.generated_date + " " + message.generated_time + " UTC"))
    }
};

let planes = {};

if (localStorage.getItem('planes') !== null) {
    planes = JSON.parse(localStorage.getItem('planes'));
    Object.keys(planes).forEach(plane => {
        planes[plane].dateGenerated = new Date(planes[plane].dateGenerated);
    })
}

let updatePlane = (plane, message) => {
    if (message.flight !== null) {
        plane.flight = message.flight;
    }

    if (message.squawk !== null) {
        plane.squawk = message.squawk;
    }
    if (message.altitude !== null) {
        plane.altitude = message.altitude;
    }
    if (message.speed !== null) {
        plane.speed = message.speed;
    }
    if (message.verticalRate !== null) {
        plane.verticalRate = message.verticalRate;
    }
    if (message.track !== null) {
        plane.track = message.track;
    }
    if (message.lat !== null) {
        plane.lat = message.lat;
    }
    if (message.lon !== null) {
        plane.lon = message.lon;
    }
    plane.dateGenerated = message.dateGenerated;
    plane.msgs++;
};

let updatePlanes = message => {
    if (planes[message.icao] === undefined) {
        planes[message.icao] = {
            icao: message.icao,
            msgs: 0
        };
    }

    updatePlane(planes[message.icao], message);

    localStorage.setItem('planes',JSON.stringify(planes));

};

webSocket.onmessage = evt => {
    let reader = new FileReader();

    reader.onloadend = () => {
        let messages = reader.result.split('\n');
        messages.slice(0,-1).forEach(
            (message) => {
                let sbsMessage = parseSbs1Message(message);
                let translatedMessage = translateMessage(sbsMessage);
                updatePlanes(translatedMessage);
            }
        );

        let data = [];
        
        Object.keys(planes).forEach(function (key) {
            data.push(planes[key]);
        });
        data.sort(function (a,b) {
            if(a.icao > b.icao) {
                return 1;
            }
            if(a.icao < b.icao) {
                return -1;
            }
            return 0;
        });
            
        flightTableComponent.setState({data: data});
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

