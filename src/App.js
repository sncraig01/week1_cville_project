import React from 'react';
import './App.css';
import axios from 'axios';
import L from 'leaflet';
import Restaurants from './Restaurants.js'


class App extends React.Component {

  render(){
    return (
      <div className="App">
          <Restaurants/>
      </div>
    );
  }

}

export default App;
