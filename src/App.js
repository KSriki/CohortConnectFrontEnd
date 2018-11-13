import React, { Component } from "react";
import "./App.css";
import ConnectContainer from "./containers/ConnectContainer";

class App extends Component {
  render() {
    return (
      <div className="App
      ">
        <ConnectContainer />
        <div className="ui footer">
          <div>Cohort Connect | "Puts Rspec on My Name" | 2018 // Srikant Kalaputapu // Dru Edmondson</div>
        </div>
      </div>
    );
  }
}

export default App;
