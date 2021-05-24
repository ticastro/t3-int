import React, {useEffect, useState} from 'react';

import 'leaflet/dist/leaflet.css';
import {io} from 'socket.io-client';
import  Pasajeros from './Pasajeros';



function FlightsView() {   

  const socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/', {
    path: "/flights"
  });

    const [vuelos, setVuelos] = useState([]);
    

    useEffect(() => {

      socket.emit('FLIGHTS');
  
      socket.on('FLIGHTS', (data) => {
          setVuelos(data);
          console.log(vuelos);
      });
  
      return () => socket.disconnect();

    }, []);

      return (
        <div className="scroll-info">
            {Object.keys(vuelos).map((key)=> (
                <div className="vuelo">
                    <h1 className="h1vuelos">{vuelos[key].code}</h1>
                        <li>Aerolinea: {vuelos[key].airline}</li>
                        <li>Coordenadas origen: {vuelos[key].origin[0]}, {vuelos[key].origin[1]}</li>
                        <li>Coordenadas destino: {vuelos[key].destination[0]}, {vuelos[key].destination[1]}</li>
                        <li>Avion: {vuelos[key].plane}</li>
                        <li>Asientos: {vuelos[key].seats}</li>
                        <Pasajeros lista={vuelos[key].passengers}/>
                </div>
            ))}
        </div>
      );
  };
  
  
  export default FlightsView;