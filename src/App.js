import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./UI/routes/HomePage";
import Login from "./UI/routes/AdminLogin";
import Dashboard from "./UI/routes/Dashboard/Dashboard";
import Scaffold from "./UI/Scaffold";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store = {store}>
    <Router>
      <Switch>
        <Scaffold>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Scaffold>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
    </Provider>
  );
}

export default App;
