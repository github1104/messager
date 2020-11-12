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

function App() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!auth.authenticated) {
      dispatch(isLoggedInUser());
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <PrivateRoute path="/" exact component={HomePage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={RegisterPage} />
        <Route path="/Info" component={Info} />
        {/* <Route path="/HomePage/:nameUser" component={HomePage} /> */}
      </div>
    </Router>
  );
}

export default App;
