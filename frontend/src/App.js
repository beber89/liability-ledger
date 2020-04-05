import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "semantic-ui-css/semantic.min.css";


class App extends Component {
  render() {
    return (
      <Router>
        <BaseRouter />
      </Router>
    );
  }
}

export default App;
