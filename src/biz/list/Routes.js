import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CardList from './containers/CardList';
import TableList from './containers/TableList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/list/table-list" component={TableList}/>
      <Route path="/list/card-list" component={CardList}/>
    </Switch>
  );
}
