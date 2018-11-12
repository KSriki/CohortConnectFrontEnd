import React, { Component } from "react";
import "./App.css";
import ConnectContainer from "./containers/ConnectContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ConnectContainer />
        <div className="ui footer">
          <div>Cohort Connect | 2018 | "Puts Rspec on My Name"</div>
        </div>
      </div>
    );
  }
}

export default App;
