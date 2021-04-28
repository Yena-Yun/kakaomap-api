import React from 'react';
import './App.css';
// import Map from './Map';
import MapContainer from './MapContainer';
import SearchPlace from './SearchPlace';

function App() {
  return (
    <div className="App">
      <SearchPlace />
      <MapContainer />
    </div>
  );
}

export default App;
