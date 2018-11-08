import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ConnectContainer from './containers/ConnectContainer'

class App extends Component {
  render() {
    return (
      <div className="App">

            <ConnectContainer />
      </div>
    );
  }
}

export default App;
