import React, {useEffect, useState} from 'react';




function Pasajeros({lista}) {   

      return (
            <div>
            {Object.keys(lista).map((key)=> (
                <li>Pasajero {key}: {lista[key].name}</li>
                
            ))}
            </div>
      );
  };
  
  
  export default Pasajeros;