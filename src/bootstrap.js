import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Link, Route } from "react-router-dom";
import App from "./components/app";
import reducers from "./reducers";
import PhotoReturn from "./components/photoReturn";

const createStoreWithMiddleware = applyMiddleware()(createStore);

import "./style/main.scss";

function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <div className="nav">
            <Link to="/">Home</Link>
            <Link to="/photos">Show Photos</Link>
          </div>
          <div>
            <Route exact path="/" component={App} />
            <Route path="/photos" component={PhotoReturn} />
          </div>
        </div>
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
