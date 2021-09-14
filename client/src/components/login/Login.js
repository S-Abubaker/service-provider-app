import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import useStyles from "./Styles";

import { auth } from "../../fire";
import { signInWithEmailAndPassword, onAuthStateChanged } from "@firebase/auth";

const Login = ({ setCurrentUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage('')

    if (email === "") {
      setError(true);
      setErrorMessage("'Please add a valid email address'")
    } else if (password === "") {
      setError(true);
      setErrorMessage("'Please add a secure password'")
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setError(false)
          setPassword("");
          setEmail("");
        })
        .catch((error) => {
          setError(true);
        });
    }
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
      history.push("/dashboard");
    } else {
      setUser(null);
      history.push("/");
    }
  });

  return (
    <Container maxWidth="sm" className={classes.root} elevation={4}>
      {!user && (
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Paper>
            <Typography align="center">
              <img src="logo.png" alt="logo" />
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              align="center"
              className={classes.about}
            >
              Manage all your employees data in one place
            </Typography>
            <Container>
              {error && (
                <div style={{ width: "100%", height: 30 }}>
                  <Typography variant='body2' color="secondary" gutterBottom>
                    {errorMessage ? errorMessage : "'User Not Found'"}
                  </Typography>
                </div>
              )}
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
                Log In
              </Button>
              <Typography variant="body2" color="textSecondary">
                Have no account? <a href="/register">Register now</a>
              </Typography>
            </Container>
          </Paper>
        </form>
      )}
    </Container>
  );
};

export default Login;
