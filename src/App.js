import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import HomePage from "./UI/routes/HomePage";
import Login from "./UI/routes/AdminLogin";
import Dashboard from "./UI/routes/Dashboard/Dashboard";
import Scaffold from "./UI/Scaffold";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Switch>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/login">
          <Scaffold>
            <Login />
          </Scaffold>
        </Route>
        <Route exact path="/">
          <Scaffold>
            <HomePage />
          </Scaffold>
        </Route>
      </Switch>
    </Provider>
  );
}

export default App;
