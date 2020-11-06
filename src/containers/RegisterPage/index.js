import React, { useState } from "react";
import { TextField, Input } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";
import { signup } from "../../actions";

import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";

export default function RegisterPage(props) {
  const [nameUser, setNameUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { register, handleSubmit, errors, control } = useForm();

  const onSubmit = (data) => {
    console.log(22, data);
    const user = {
      nameUser,
      email,
      password,
    };
    dispatch(signup(user));
  };

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#508ac9"),
      backgroundColor: "#508ac9",
      "&:hover": {
        backgroundColor: "#508ac9",
      },
    },
  }))(Button);

  // const registerUser = (event) => {
  //     event.preventDefault();
  //     console.log(nameUser);
  //     const user = {
  //         nameUser, email, password
  //     }
  //     dispatch(signup(user));

  // };

  if (auth.authenticated) {
    console.log(46, auth);
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Router>
        <div className="LoginBox">
          <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              id="outlined-basic"
              label="Username"
              name="username"
              inputRef={register({ required: true })}
              variant="outlined"
              value={nameUser}
              onChange={(event) => setNameUser(event.target.value)}
            />
            {errors.username ? (
              <p className="error">User name is required.</p>
            ) : (
              <p></p>
            )}

            <TextField
              id="outlined-basic"
              placeholder="Email"
              name="email"
              inputRef={register({
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="text"
            />
            {errors.email ? (
              <p className="error" style={{ color: "red" }}>
                {errors.email.message}
              </p>
            ) : (
              <p></p>
            )}

            <TextField
              id="outlined-basic"
              label="Password"
              inputRef={register({ required: true, minLength: 6 })}
              variant="outlined"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
            {errors.password ? (
              <p className="error" style={{ color: "red" }}>
                Password should be at least 6 characters
              </p>
            ) : (
              <p></p>
            )}
            <p className="error">
              {auth.error === "2" && "The email address is already exist"}
            </p>
            <ColorButton
              variant="contained"
              color="primary"
              className="customButton"
              type="submit"
            >
              Resgister
            </ColorButton>
            {/* <Link to="/dialogbox">Users</Link> */}
          </form>
        </div>
      </Router>
    </Layout>
  );
}
