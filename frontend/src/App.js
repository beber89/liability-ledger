import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "semantic-ui-css/semantic.min.css";
import {authCheckState, loadContract} from "./store/auth";
import {handleEvent, handleError} from "./store/workers";


import { connect } from "react-redux";




class App extends Component {
  componentDidMount() {
    this.props.checkAuth();
    this.props.loadContract(this.props.handleEvent(), this.props.handleError());
  }
  render() {
    return (
      <Router>
        <BaseRouter />
      </Router>
    );
  }
}


const mapDispatchToProps = dispatch => {
  return {
    checkAuth: () => dispatch(authCheckState()),
    loadContract: (eventHandler, errorHandler) => dispatch(loadContract(eventHandler, errorHandler)),
    handleEvent: () => dispatch(handleEvent()),
    handleError: () => dispatch(handleError())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
