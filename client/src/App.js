import React from 'react';
import { BrowserRouter as Router, Route ,Switch} from "react-router-dom";
import Landing from "./components/Landing/Landing.container";
import Signup from "./components/Signup/signup.container";
import Signin from "./components/SignIn/signin.container";
import PrivateRoute from "./components/private-route/PrivateRoute.container";
import Dashboard from "./components/Dashboard/Dashboard.container";
import './App.css';


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