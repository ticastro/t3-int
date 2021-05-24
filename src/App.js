import './App.css';
import MapView from './components/MapView';
import ChatView from './components/ChatView'
import FlightsView from './components/FlightsView';



function App() {
  return (
    
    <div>
      <div className="mapa">
        <MapView/>
      </div>
      <div className="chat">
        <ChatView/>
      </div>
      <div className="informacion">
        <FlightsView/>
      </div>
    </div>
  );
}

export default App;
