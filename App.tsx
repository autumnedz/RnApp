
import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { RootModule, ScreenName} from './rootModule';
import ReactNativeBiometrics from 'react-native-biometrics';
import { useEffect, useState } from 'react';


// TODO: backend needed to keep track of user set pin?
const App = () => {
  return (
      <RootModule/>
   );
 };

 export default App;
