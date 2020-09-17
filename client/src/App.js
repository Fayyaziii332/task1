import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Signup from './components/Signup/signup.container';
import Signin from './components/SignIn/signin.container';
import PrivateRoute from './components/private-route/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard.container';
import './App.css';

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Signup} />
      <Route exact path="/login" component={Signin} />
      <PrivateRoute path="/table" component={Dashboard} />
      <PrivateRoute path="/form" component={Dashboard} />
    </Router>
  );
}
export default App;
