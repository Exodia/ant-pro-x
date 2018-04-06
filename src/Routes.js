import React, {Fragment} from 'react';
import {Route, Redirect} from 'react-router-dom';
import Welcome from './biz/start/components/Welcome';
import UserList from './biz/user/components/UserList';
import {retainSearchPath} from './common/util';

export default function Routes() {
  return (
    <Fragment>
      <Route
        exact
        path="/"
        component={() => <Redirect to={retainSearchPath('/dashboard/analysis')}/>}
      />
      <Route path="/dashboard/analysis" component={Welcome}/>
      <Route path="/list/table-list" component={UserList}/>
    </Fragment>
  );
}
