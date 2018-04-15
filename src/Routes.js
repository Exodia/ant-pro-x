import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import {AppLayout, UserLayout} from './components/Layout';
import ListRoutes from './biz/list/Routes';
import UserRoutes from './biz/user/Routes';

import {retainSearchPath} from './common/util';

export default function Routes() {
  return (
    <Switch>
      <Route path="/user" render={() => <UserLayout content={<UserRoutes/>}/>}/>
      <Route path="/" render={() => <AppLayout content={<AppRoutes/>}/>}/>
    </Switch>
  );
}

function AppRoutes() {
  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() => <Redirect to={retainSearchPath('/list/card-list?__mock__')}/>}
      />
      <ListRoutes/>
    </Switch>
  );
}
