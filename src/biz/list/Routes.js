import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CardList from './containers/CardList';

export default function Routes() {
  return (
    <Switch>
      <Route path="/list/card-list" component={CardList}/>
    </Switch>
  );
}
