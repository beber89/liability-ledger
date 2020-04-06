import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from './App';
import './index.css';
import {workersReducer} from "./store/workers";


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  workers: workersReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
