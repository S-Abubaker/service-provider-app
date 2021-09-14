import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DashBoard from "./components/dashboard/DashBoard";
import FabButton from "./components/fab/Fab";
import Login from "./components/login/Login";
import NavBar from "./components/navbar/Navbar";
import Register from "./components/register/Register";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getProviders } from "./redux/actions/providers";

function App() {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Router>
          <Switch>
            <Route exact path="/">
              <Login/>
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/dashboard">
              <NavBar />
              <DashBoard
                setCurrentId={setCurrentId}
                handleClickOpen={handleClickOpen}
              />
              <FabButton
                currentId={currentId}
                setCurrentId={setCurrentId}
                open={open}
                setOpen={setOpen}
              />
            </Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
