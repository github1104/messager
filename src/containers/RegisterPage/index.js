import React, { useState } from "react";
import {TextField,Input} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";
import {signup} from '../../actions';

import "./style.css";
import Layout from '../../components/Layout'
import {useDispatch} from 'react-redux';

export default function RegisterPage(props) {
    const [nameUser, setNameUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const ColorButton = withStyles((theme) => ({
        root: {
            color: theme.palette.getContrastText("#508ac9"),
            backgroundColor: "#508ac9",
            "&:hover": {
                backgroundColor: "#508ac9",
            },
        },
    }))(Button);

    const registerUser = (event) => {
        event.preventDefault();
        console.log(nameUser);
        const user = {
            nameUser, email, password
        }
        dispatch(signup(user));
        email && props.history.push(`/HomePage/${nameUser}`) ;
    };

    return (
        <Layout>
            <Router>
                <div className="LoginBox">
                    <form className="LoginForm" autoComplete="off">
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
                            placeholder="Email"
                            variant="outlined"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            style={{ marginBottom: "30px" }}
                            type="email"
                            required
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
                            onClick={registerUser}
                            type="submit"
                        >
                            Resgister
                        </ColorButton>
                        {/* <Link to="/dialogbox">Users</Link> */}
                    </form>
                </div>
            </Router>
        </Layout>

    )
}
