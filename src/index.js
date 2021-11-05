import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {App} from "./App";
import {ShowPrankData} from "./showPrankData";
import {Test} from "./test";

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <switch>
              <Route exact path="/"><App /></Route>
              <Route path="/:title/:prankUID"></Route>
              <Route path="/data/:prankUID"><ShowPrankData /></Route>
          </switch>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
