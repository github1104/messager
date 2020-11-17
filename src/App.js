import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import "./App.css";

import HomePage from "./containers/HomePage";
import Login from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import Info from "./containers/Info";
import PrivateRoute from "./components/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedInUser } from "./actions/auth.actions";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {

    if (!auth.authenticated) {
      console.log(19)
      dispatch(isLoggedInUser());
    }

  }, []);

  return (
    <Router>
      <div className="App">
        <ReactNotification />
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={RegisterPage} />
        <PrivateRoute path="/Info" component={Info} />
        {/* <Route path="/HomePage/:nameUser" component={HomePage} /> */}
      </div>
    </Router>
  );
}

export default App;
