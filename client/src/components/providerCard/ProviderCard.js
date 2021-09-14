import { Button, Grid, Paper, Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import useStyles from "./Styles";
import { useDispatch } from "react-redux";
import { deleteProvider } from "../../redux/actions/providers";

const ProviderCard = ({ provider, setCurrentId, handleClickOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const update = () => {
    setCurrentId(provider._id);
    handleClickOpen();
  };

  return (
    <Grid item xs={12} md={6} className={classes.root}>
      <img
        src={
          provider.selectedFile
            ? provider.selectedFile
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZdNzWtSA0EZVeNI_hrJzDeNPL_mwrLLwpg&usqp=CAU"
        }
        alt="provider logo"
        className="provider-image"
      />
      <Paper>
        <Typography
          align="right"
          gutterBottom
          variant="h6"
          component="h2"
          className={classes.cardName}
        >
          {provider.providerName}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          gutterBottom
          className={classes.content}
        >
          {provider.shortDesc}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.providerInfo}
        >
          Role: {provider.providerService}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.providerInfo}
        >
          Contact: {provider.providerContact}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.providerInfo}
        >
          Salary: {provider.providerSalary}$
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.providerInfo}
        >
          Joined: {moment(provider.createdAt).format("Do MMMM YYYY")}
        </Typography>
        <Button
          size="small"
          color="primary"
          onClick={update}
          className={classes.btn}
        >
          Update
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(deleteProvider(provider._id))}
        >
          Delete
        </Button>
      </Paper>
    </Grid>
  );
};

export default ProviderCard;
