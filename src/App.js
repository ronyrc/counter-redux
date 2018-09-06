import React, { Component } from 'react';
import './App.css';
import Counter from "./components/Counter";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
            <Counter />
        </div>
      </div>
    );
  }
}

export default App;
