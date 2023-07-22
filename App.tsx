/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import NavigationManager from './components/stacks';
import {Provider} from 'react-redux';
import {store} from './redux/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationManager />
    </Provider>
  );
}

export default App;
