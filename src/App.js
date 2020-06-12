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
import Scaffold from "./UI/components/Scaffold";
import store from "./redux/store";
import { Provider } from "react-redux";
import PrivateRoute from "./UI/components/PrivateRoute";
import callAxios from "./utils/callAxios";


async function getData(){
	const response = await callAxios({
   method: "GET",
   url: "/users"
  });
//const data = response.data
console.log("TESTING!!!")
console.log(response)
}


getData();


function App() {
  return (
    <Provider store={store}>
      <Switch>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
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
