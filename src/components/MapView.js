import React from 'react';

import {Map, TileLayer, Popup, Marker} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/icon.png';

const markerIcon = new L.icon({
    iconUrl: icon,
    iconSize:[105,105],
});


const MapView = () =>{
    return (
        <Map center={{lat:'-32.828236', lng:'-70.6731647'}} zoom={13} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position= {['-32.828236','-70.6731647']} icon={markerIcon}/>

        </Map>
    );
};


export default MapView;