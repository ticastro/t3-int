import logo from './logo.svg';
import './App.css';
import MapView from './components/MapView';
import socket from './components/Sockets';

let aviones = [];


// revisar si efectivamente funciona pero creo que si
// tengo que agregar que se actualicen los markers, y tengo que ver como se relaciona con ellos la funcion

function editar_aviones(array, avion) {
  var contador = 0;
  for(const revisando of array){
    if (revisando["code"] === avion["code"]){
      array.splice(contador, 1);
      array.push(avion)      
      return array;
    }
    contador += 1;
  }  
  array.push(avion);
  return array;
};

function App() {
  socket.emit('FLIGHTS');

  socket.on('POSITION', function(data){
    aviones = editar_aviones(aviones, data)
    // console.log(aviones);
  });
  
  socket.on('FLIGHTS', function(data){
    console.log(data);
  });
  
  return (

    <MapView/>
  );
}

export default App;
