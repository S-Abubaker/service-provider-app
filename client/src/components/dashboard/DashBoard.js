import {
  Container,
  Grid,
  CircularProgress,
  TextField,
  InputAdornment,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ProviderCard from "../providerCard/ProviderCard";
import { useSelector } from "react-redux";
import useStyles from "./Styles";
import { onAuthStateChanged } from "@firebase/auth";
import { auth } from "../../fire";
import { useHistory } from "react-router";

const DashBoard = ({ setCurrentId, handleClickOpen }) => {
  const providers = useSelector((state) => state.providers);
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const history = useHistory();
  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
      history.push("/");
    }
  });

  return (
    <Container>
      {user && (
        <Grid container>
          <Grid item xs={12}>
            <Typography align="right">
              <TextField
                placeholder="Search Providers"
                size="small"
                className={classes.textField}
                variant="outlined"
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  classes: {
                    root: classes.notchedOutline,
                    focused: classes.notchedOutline,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!providers.length ? (
              <div className="loading-comp">
                <CircularProgress color="primary" size="5rem" />
                <Typography variant='body1' color='textSecondary'style={{ paddingTop: 15 }}>Please add your providers</Typography>
              </div>
            ) : (
              <Grid container spacing={2}>
                {providers
                  .filter((val) => {
                    if (search === "") {
                      return val;
                    } else if (
                      val.providerName
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return val;
                    } else {
                      return null;
                    }
                  })
                  .filter((val) => {
                    if (val.userId === user.uid) {
                      return val;
                    } else {
                      return null;
                    }
                  })
                  .map((provider) => (
                    <ProviderCard
                      provider={provider}
                      setCurrentId={setCurrentId}
                      handleClickOpen={handleClickOpen}
                      key={provider._id}
                    />
                  ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default DashBoard;
