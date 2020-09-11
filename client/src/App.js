import React from 'react';
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import Landing from "./components/Landing/Landing.container";
import Signup from "./components/Signup/signup.container";
import Signin from "./components/SignIn/signin.container";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard.container";
import store from "./store/store";
import './App.css';



if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000; // milliseconds
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends React.Component {



  render() {
    return (
        <Router>
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Signup} />
            <Route exact path="/login" component={Signin} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>

        
    );
  }
}
export default App;