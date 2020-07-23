import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import Dashboard from './components/Dashboard';

function Root() {
  return(
    <Router>
      <Route path="/">
        <Redirect to="/page"  />
        <Route exact path="/page" component={Dashboard} />
      </Route>
    </Router>
  )
}

export default Root;
