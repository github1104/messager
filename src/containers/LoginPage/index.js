import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { signin, isLoggedInUser } from "../../actions";
import { useForm } from "react-hook-form";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const { register, handleSubmit, errors } = useForm();

   const onSubmit = (data) => {

    dispatch(signin({ email, password }))
    console.log(24, auth.error)
  }

  useEffect(() => {
    // if(!auth.authenticated){
    //   dispatch(isLoggedInUser())
    // }
    console.log(31, auth.error);
  }, [])

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText("#508ac9"),
      backgroundColor: "#508ac9",
      "&:hover": {
        backgroundColor: "#508ac9",
      },
    },
  }))(Button);

  // const login = (event) => {
  //   console.log(auth)
  //   event.preventDefault();
  //   dispatch(signin({email,password}));


  //   // props.history.push(`/HomePage/${nameUser}`);
  // };


  if (auth.authenticated) {
    console.log(46, auth)
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <Router>
        <div className="LoginBox" >
          <form className="LoginForm" onSubmit={handleSubmit(onSubmit)}>
            <h2>Chat for fun</h2>
            <TextField
              id="outlined-basic"
              label="Email"
              name="email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              style={{ marginBottom: "30px" }}
            />
            <TextField
              id="outlined-basic"
              name="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              style={{ marginBottom: "30px" }}
              type="password"
            />
            <p class="error" >{auth.error === '1' && 'email or password is invalid'}</p>
            <ColorButton
              variant="contained"
              color="primary"
              className="customButton"
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
