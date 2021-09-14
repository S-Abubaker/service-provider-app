import React, { useState, useEffect } from "react";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./Styles";
import FileBase from "react-file-base64";
import CloseIcon from "@material-ui/icons/Close";
import {
  AppBar,
  Button,
  Container,
  Dialog,
  IconButton,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { auth } from "../../fire";
import { useDispatch, useSelector } from "react-redux";
import { addProvider, updateProvider } from "../../redux/actions/providers";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FabButton = ({ currentId, setCurrentId, open, setOpen }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const provider = useSelector((state) =>
    currentId
      ? state.providers.find((provider) => provider._id === currentId)
      : null
  );

  const user = auth.currentUser;

  const [providerData, setProviderData] = useState({
    providerName: "",
    providerService: "",
    providerSalary: "",
    providerContact: "",
    shortDesc: "",
    selectedFile: "",
    userId: "",
  });

  useEffect(() => {
    if (provider) {
      setProviderData(provider);
    }
  }, [provider]);

  const clear = () => {
    setCurrentId(0);
    setProviderData({
      providerName: "",
      providerService: "",
      providerSalary: "",
      providerContact: "",
      shortDesc: "",
      selectedFile: "",
      userId: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    clear();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      await dispatch(addProvider({ ...providerData, userId: user.uid }))
        .then(() => {
          handleClose();
          clear();
        })
        .catch((error) => console.log(error.message));
    } else {
      await dispatch(
        updateProvider(currentId, { ...providerData, userId: user.uid })
      ).then(() => {
        handleClose();
        clear();
      });
    }
  };

  const openFab = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <Fab
        size="large"
        color="primary"
        className={classes.FAB}
        onClick={openFab}
      >
        <AddIcon />
      </Fab>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar position="sticky" className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              {currentId
                ? `Updating '${provider.providerName}'`
                : "Add a Provider"}
            </Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div className={classes.imageInput}>
              <FileBase
                type="file"
                multiple={false}
                onDone={({ base64 }) =>
                  setProviderData({ ...providerData, selectedFile: base64 })
                }
              />
            </div>
            <TextField
              fullWidth
              required
              label="Provider's Name"
              value={providerData.providerName}
              onChange={(e) =>
                setProviderData({
                  ...providerData,
                  providerName: e.target.value,
                })
              }
              className={classes.dialogInput}
            />
            <TextField
              fullWidth
              required
              label="Service"
              value={providerData.providerService}
              onChange={(e) =>
                setProviderData({
                  ...providerData,
                  providerService: e.target.value,
                })
              }
              className={classes.dialogInput}
            />
            <TextField
              fullWidth
              required
              label="Contact"
              value={providerData.providerContact}
              onChange={(e) =>
                setProviderData({
                  ...providerData,
                  providerContact: e.target.value,
                })
              }
              className={classes.dialogInput}
            />
            <TextField
              type="number"
              fullWidth
              required
              label="Salary per month"
              value={providerData.providerSalary}
              onChange={(e) =>
                setProviderData({
                  ...providerData,
                  providerSalary: e.target.value,
                })
              }
              className={classes.dialogInput}
            />
            <TextField
              fullWidth
              required
              variant="outlined"
              label="Short Description"
              multiline={true}
              minRows={5}
              value={providerData.shortDesc}
              onChange={(e) =>
                setProviderData({ ...providerData, shortDesc: e.target.value })
              }
              className={classes.dialogInput}
            />
            <Typography align="right">
              <Button
                type="submit"
                autoFocus
                color="secondary"
                variant="outlined"
              >
                submit
              </Button>
            </Typography>
          </form>
        </Container>
      </Dialog>
    </div>
  );
};

export default FabButton;

