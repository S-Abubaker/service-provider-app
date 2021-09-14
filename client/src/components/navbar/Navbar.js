import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
} from "@material-ui/core";

import useStyles from "./Styles";
import { signOut } from "@firebase/auth";
import { auth } from "../../fire";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const NavBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
      history.push("/");
    }
  });

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        {user && (
          <Toolbar className={classes.toolRoot}>
            <Typography variant="h6" className={classes.title}>
              <img src="logo.png" alt="logo" className={classes.logo} />
            </Typography>
            <div
              onClick={() => setOpen(!open)}
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <Typography variant="h6" color="secondary">
                {user.displayName}
              </Typography>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                className="def-select"
              >
                <MenuItem>
                  <div onClick={handleLogout}>Log out</div>
                </MenuItem>
                <MenuItem>
                  <div onClick={() => setDialogOpen(true)}>My profile</div>
                </MenuItem>
              </Select>
              <label className="select">
                <ArrowDropDownIcon fontSize="small" style={{ paddingTop: 5 }} />
              </label>
            </div>
          </Toolbar>
        )}
      </AppBar>
      {user && (
        <Dialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle>
            <Typography variant="h5">My Profile</Typography>
          </DialogTitle>
          <DialogContent style={{ display: "flex" }}>
            <div style={{ marginRight: 20 }}>
              <Avatar
                alt="avatar"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtwHGbBun5jLcARrAqEug83OeGrSmECj4pEg&usqp=CAU"
                className={classes.large}
              />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography gutterBottom>Email:&nbsp;</Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                  {user.email}
                </Typography>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Typography>Username:&nbsp;</Typography>
                <Typography variant="body1" color="textSecondary">
                  {user.displayName}
                </Typography>
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default NavBar;
