import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

import "./style.css";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { signin, isLoggedInUser } from "../../actions";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)


  // useEffect(()=>{
  //   if(!auth.authenticated){
  //     dispatch(isLoggedInUser())
  //   }
  // },[])

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
    console.log(auth)
    event.preventDefault();

    if(email == ""){
      alert("Email is required");
      return;
    }
    if(password == ""){
      alert("Password is required");
      return;
    }

    dispatch(signin({email,password}));

  
    // props.history.push(`/HomePage/${nameUser}`);
  };


  if(auth.authenticated){ 
    console.log(46,auth)
    return <Redirect to="/" />
  }

  return (
    <Layout>
      <Router>
        <div className="LoginBox">
          <form className="LoginForm" noValidate autoComplete="off">
            <h2>Kham Thien Arena</h2>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
