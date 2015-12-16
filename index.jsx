'use strict'

let webSocket = new WebSocket(SBS1_WEBSOCKET_URL, ['binary', 'base64']);

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
        dateGenerated: new Date(Date.parse(message.generated_date + " " + message.generated_time + " UTC")),
        isOnGround: message.is_on_ground
    }
};

let state = {
    planesTable: {},
    planes: {}
};

//if (localStorage.getItem('state') !== null) {
//    state = JSON.parse(localStorage.getItem('state'));
//    let planes = state.planes;
//
//    Object.keys(planes).forEach(plane => {
//        planes[plane].dateGenerated = new Date(planes[plane].dateGenerated);
//    })
//}

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
    if (message.isOnGround !== null) {
        plane.isOnGround = message.isOnGround;
    }
    plane.dateGenerated = message.dateGenerated;
    plane.msgs++;
};

let updatePlanes = message => {
    let planes = state.planes;
    if (planes[message.icao] === undefined) {
        planes[message.icao] = {
            icao: message.icao,
            msgs: 0
        };
    }

    updatePlane(planes[message.icao], message);

    //localStorage.setItem('state',JSON.stringify(state));

};

webSocket.onmessage = evt => {
    let reader = new FileReader();
    let planes = state.planes;

    reader.onloadend = () => {
        let messages = reader.result.split('\n');
        messages.slice(0,-1).forEach(
            (message) => {
                let sbsMessage = parseSbs1Message(message);
                let translatedMessage = translateMessage(sbsMessage);
                updatePlanes(translatedMessage);
            }
        );

        mainComponent.setState(state);
    };


    reader.readAsText(evt.data);
}

let ReactDOM = require('react-dom');
let React = require('react');
let Main = require('./main');

let onTableHeaderClick = function (event) {
    if (event.target.className !== state.planesTable.sortColumn) {
        state.planesTable.sortOrder = 1;
    } else {
        state.planesTable.sortOrder = -state.planesTable.sortOrder;
    }
    state.planesTable.sortColumn = event.target.className;

    mainComponent.setState(state);
};

let mainComponent = ReactDOM.render(
    <Main
        onTableHeaderClick={onTableHeaderClick}
    />,
    document.getElementById('content')
);

