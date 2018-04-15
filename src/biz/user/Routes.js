import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './containers/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/user/login" component={Login}/>
      <Redirect exact from="/user" to="/user/login"/>
    </Switch>
  );
}
