import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";

import "./App.css";

import HomePage from "./containers/HomePage";
import Login from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import PrivateRoute from './components/PrivateRoute'

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  },
};



function App() {
  return (
    <Router>
      <div className="App">
        <PrivateRoute path="/" exact component={HomePage}/>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={RegisterPage} />
        {/* <Route path="/HomePage/:nameUser" component={HomePage} /> */}
      </div>
    </Router>
  );
}

export default App;
