import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

import "./style.css";
import Layout from "../../components/Layout";

export default function Login(props) {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#508ac9"),
      backgroundColor: "#508ac9",
      "&:hover": {
        backgroundColor: "#508ac9",
      },
    },
  }))(Button);

  const login = (event) => {
    event.preventDefault();
    console.log(nameUser);
    // return <Redirect to="/dialogbox" />;
    props.history.push(`/HomePage/${nameUser}`);
  };

  return (
    <Layout>
      <Router>
        <div className="LoginBox">
          <form className="LoginForm" noValidate autoComplete="off">
            <h2>Kham Thien Arena</h2>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={nameUser}
              onChange={(event) => setNameUser(event.target.value)}
              style={{ marginBottom: "30px" }}
            />
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ marginBottom: "30px" }}
              type="password"
            />

            <ColorButton
              variant="contained"
              color="primary"
              className="customButton"
              onClick={login}
              type="submit"
            >
              Login
          </ColorButton>
            {/* <Link to="/dialogbox">Users</Link> */}
          </form>
        </div>
      </Router>
    </Layout>

  );
}
