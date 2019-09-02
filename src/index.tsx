import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import flyd from "flyd";
import './index.css';
import App from './App';
import { appState } from "./state/appState";

// Meiosis Global State Pattern: http://meiosis.js.org
const update = flyd.stream();
const states = flyd.scan((state: any, patch: any) => patch(state), appState.initialState(), update);
const actions = appState.actions(update);

ReactDOM.render(<App states={states} actions={actions} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
