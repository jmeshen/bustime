import React, { Component } from 'react';
import './App.css';
import { getAllBusesForStop } from './utils/bustimeHelpers';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      buses: []
    };
  }
  componentDidMount() {
    // TODO: pass stops and buses
    // const stopsAndBuses = {
    //   '501138': ['Q20A', 'Q20B', encodeURIComponent('Q44+')]
    // }
    getAllBusesForStop().then((buses) => {
      this.setState({buses})}
    );
  }

  render() {
    let buses = this.state.buses.map((bus, index) => {
      // bus.arrival ? bus.arrival = Date(bus.arrival) : '';
      return (
        <li key={index}>
         <h3>{bus.name} — {bus.destination}</h3>
         <p>{bus.distance}</p>
         <p>{bus.stopsAway} stops away</p>
        </li>
      );
    });
    return (
      <div className="App">
        <div className="App-header">
          <h2>🚌 What bus should I take? 🚌</h2>
          <p>🚧 work in progress 🚧</p>
        </div>
        <ul>
          {buses}
        </ul>
      </div>
    );
  }
}

export default App;
