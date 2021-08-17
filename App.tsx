
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { RootModule, ScreenName} from './rootModule';
import configureStore from './store/configureStore';
import { useEffect, useState } from 'react';

const store = configureStore()

const App = () => {
  return (
    <Provider store = {store}>
      <RootModule/>
    </Provider>
   );
 };

 export default App;
