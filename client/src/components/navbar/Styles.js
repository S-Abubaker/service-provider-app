import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolRoot: {
    backgroundColor: "white",
    color: "black",
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    height: 60,
  },
  dialogRoot: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

export default useStyles;
