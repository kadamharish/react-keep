import React from "react";
import "./App.css";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./services/private-route"
function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute component={Dashboard} isLogin={false} path="/" ></PrivateRoute>
        </Switch>
      </Router>
    </div>

  );
}

export default App;
