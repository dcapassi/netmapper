import React from "react";
import ReactDOM from "react-dom";
import Routes from "../src/routes";
import { Router } from "react-router-dom";
import history from "../src/API/backend/history";
import { Provider } from "react-redux";
import "./config/ReactotronConfig";

import store from "./store";

ReactDOM.render(
  <>
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  </>,
  document.getElementById("root")
);
