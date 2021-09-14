import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../fire";
import { createUserWithEmailAndPassword, updateProfile } from "@firebase/auth";

import useStyles from "./Styles";

const Register = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(false);
    setErrorMessage("");

    if (userName === "") {
      setError(true);
      setErrorMessage("'Please add a username'");
    } else if (email === "") {
      setError(true);
      setErrorMessage("'Please add a valid email address'");
    } else if (password === "") {
      setError(true);
      setErrorMessage("'Please add a secure password'");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: userName,
          }).then(() => {
            history.push("/");
            setEmail("");
            setPassword("");
            setUserName("");
          });
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root} elevation={4}>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Paper>
          <Typography align="center">
            <img src="logo.png" alt="logo" />
          </Typography>
          <Container>
            <Typography variant="h5">Register</Typography>
            {error && (
              <div style={{ width: "100%", height: 30 }}>
                <Typography variant="body2" color="secondary" gutterBottom>
                  {errorMessage
                    ? errorMessage
                    : "'User with this email already exists'"}
                </Typography>
              </div>
            )}
            <TextField
              variant="outlined"
              label="username"
              fullWidth
              className={classes.textField}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="e-mail"
              fullWidth
              className={classes.textField}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              label="password"
              type="Password"
              fullWidth
              className={classes.textField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              className={classes.button}
            >
              Sign Up
            </Button>
          </Container>
        </Paper>
      </form>
    </Container>
  );
};

export default Register;
