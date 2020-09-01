import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

import "./style.css";

export default function Login(props) {
  const [nameUser, setNameUser] = useState("");

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#508ac9"),
      backgroundColor: "#508ac9",
      "&:hover": {
        backgroundColor: "#508ac9",
      },
    },
  }))(Button);

  const login = () => {
    console.log(nameUser);
    // return <Redirect to="/dialogbox" />;
    props.history.push(`/dialogbox/${nameUser}`);
  };

  return (
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
          <ColorButton
            variant="contained"
            color="primary"
            className="customButton"
            onClick={login}
          >
            Login
          </ColorButton>
          {/* <Link to="/dialogbox">Users</Link> */}
        </form>
      </div>
    </Router>
  );
}
