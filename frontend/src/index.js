import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import App from './App';
import './index.css';
import {workersReducer} from "./store/workers";
import {authReducer} from "./store/auth";



const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const combinedReducer = combineReducers({
  workers: workersReducer,
  auth: authReducer
});
function crossSliceReducer(state, action) {
  return {
    // specifically pass state.b as an additional argument
    workers: workersReducer(state.workers, action, state.auth),
    auth: authReducer(state.auth, action)
  }
}
function rootReducer(state, action) {
  const intermediateState = combinedReducer(state, action)
  const finalState = crossSliceReducer(intermediateState, action)
  return finalState
}


const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('root')
);
