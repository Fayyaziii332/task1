import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import './index.css';
import 'antd/dist/antd.css';
import store from './store/store';
import App from './App.container';

ReactDOM.render(
   <Provider store={store}>
      <App />
      ,
   </Provider>,
   document.getElementById('root'),
);

serviceWorker.unregister();
