import React, {useEffect, useState} from 'react';

import 'leaflet/dist/leaflet.css';
import {io} from 'socket.io-client';


function ChatView() {   
  // if (flag === 0){
  //   var resp = prompt("Ingrese su username");
  //   flag = 1;
  // }  
  // var resp = document.getElementById("nickname").value;
  
  const socket = io('wss://tarea-3-websocket.2021-1.tallerdeintegracion.cl/', {
    path: "/flights"
  });

    const [mensajes, setMensajes] = useState([]);
    
    function prueba_envio(){
      var para_enviar = {};
      para_enviar["name"] = document.getElementById("nickname").value;
      para_enviar["message"] = document.getElementById("mensaje_envio").value;
      socket.emit("CHAT", para_enviar);
    }

    useEffect(() => {

      socket.emit('CHAT');
  
      socket.on('CHAT', (data) => {
        const mensaje_aux = mensajes;
        var fecha = new Date(data["date"]).toString();
        fecha = fecha.slice(15,25);
        data["date"] = fecha;
        mensaje_aux.push(data); 
        setMensajes((prev) => [...prev, data]);
        document.getElementById("soyscroll").scrollTo(100000,100000);
        console.log(mensajes);
      });
  
      return () => socket.disconnect();

    }, []);

      return (
        <div>
            <div className="scroll" id="soyscroll">
            <h1>¡Hola! Chatea aqui:</h1>

            {Object.keys(mensajes).map((key)=> (
                <div className="container dark"> 
                  {/* arreglar para que se vean distintos los containers */}
                  <b>{mensajes[key].name}</b>
                  <p>{mensajes[key].message}</p>
                  <span className="time-right">{mensajes[key].date}</span>
                </div>
            
            ))}
            </div>
            <b>Nickname:</b>
            <input
                classname="nick"
                type="text"
                id = "nickname"
                />
              <div className="envio">
              <b>Mensaje:    </b>
              <input 
                type="text"
                id = "mensaje_envio"
                />

              <button onClick={() =>prueba_envio()}>Enviar</button>
            </div>
          </div>
      );
  };
  
  
  export default ChatView;