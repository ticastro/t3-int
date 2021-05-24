import React, {useEffect, useState} from 'react';

import {Map, TileLayer, Popup, Marker, Polyline} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/avion3.png';
import {io} from 'socket.io-client';



const markerIcon = new L.icon({
    iconUrl: icon,
    iconSize:[65,65],
});


function MapView() {   

  const [trayectorias, setTrayectorias] = useState({});

  const [auxiliar, setAuxiliar] = useState([]);
  const [aviones, setAviones] = useState({});

  useEffect(() => {
    const socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/', {
      path: "/flights"
    });

    // esta parte corresponde a la informacion de los vuelos    
    socket.emit('FLIGHTS');

    socket.on('FLIGHTS', (data) => {
      const tray_com_aux = {}; 

      Object.keys(data).map((key)=> {
        tray_com_aux[data[key].code] = [data[key].origin, data[key].destination];
      });

      setTrayectorias(tray_com_aux);

    });

    //aqui se actualizan las posiciones de cada uno de los aviones
    // revisar en la informacion de flights, para por si es que sale un avion, sacarlo del aviones para borrar el marker

    socket.on('POSITION', (data) => {
      const aviones_aux = aviones;
      aviones_aux[data.code] = data.position;
      const vacio = [];
      setAuxiliar(vacio);
      // setPositions((prev) => [...prev, aviones_aux]);
      setAviones(aviones_aux);
      // agregar todo a la misma, y que los ultimos sean aviones y los anteriores sean puntos para marcar trayectoria
     
    });

    return () => socket.disconnect();

  }, []);
    return (
      <Map center={['-32.829','-70.6727']} zoom={4} >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        
        {Object.keys(aviones).map((key)=> (
          // se recorren los aviones, para actualizar los markers
          <Marker key={key} position={aviones[key]} icon={markerIcon}>
          </Marker>
        ))}
        {Object.keys(trayectorias).map((ruta, key)=>(
          // se agregan las trayectorias que va a seguir cada uno de los aviones
          <Polyline
            key = {key}
            positions = {[trayectorias[ruta][0], trayectorias[ruta][1]]}
            color = "#00008b"
            />
          // <h1>{trayectorias[ruta][0]}</h1>
        ))}
        </Map>
    );
};


export default MapView;