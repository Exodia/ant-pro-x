import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import createStore from './createStore';
import {BrowserRouter} from 'react-router-dom';
import Routes from './Routes';
import registerServiceWorker from './registerServiceWorker';

import './index.less';

ReactDOM.render(
  <Provider store={createStore()}>
    <BrowserRouter>
      <Routes/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
