import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  FAB: {
    position: "fixed",
    right: 50,
    bottom: 30,
  },
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: 10,
    flex: 1,
  },
  imageInput: {
    marginBottom: 20,
    marginTop: 20
  },
  dialogInput: {
    marginBottom: 20,
  },
  root: {
    flexGrow: 1,
  },
}));

export default useStyles