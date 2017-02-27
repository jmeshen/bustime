import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {getBusesForStop} from './utils/bustimeHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      buses: []
    };
  }
  componentDidMount() {
    getBusesForStop().then((buses) => {
      this.setState({buses})
    })
  }

  render() {
    let buses = this.state.buses.map((bus, index) => {
      bus.arrival ? bus.arrival = Date(bus.arrival) : '';
      return (
        <li key={index}>
         <h3>{bus.name} — {bus.destination}</h3>
         {bus.arrival ? <p>Arriving: {bus.arrival}</p>: ''}
         <p>{bus.distance}</p>
         <p>{bus.stopsAway} stops away</p>
        </li>
      );
    });
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <ul>
          {buses}
        </ul>
      </div>
    );
  }
}

export default App;
