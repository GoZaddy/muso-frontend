import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useRouteMatch,
} from "react-router-dom";
import Login from "./UI/routes/AdminLogin";
import Dashboard from "./UI/routes/Dashboard/Dashboard";
import store from "./redux/store";
import { Provider } from "react-redux";
import PrivateRoute from "./UI/components/PrivateRoute";




function App() {
  return (
    <Provider store={store}>
      <Switch>
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <Route exact path="/">
          
            <Login />
         
        </Route>
       
      </Switch>
    </Provider>
  );
}

export default App;
