/* eslint-disable */
import React from 'react';
import {Provider} from 'react-redux';
import store from './src/storages/store';
import 'tailwind-react-native-classnames';
import Router from './src/router';

function App() {
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

export default App;
