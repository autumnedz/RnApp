

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContentPage } from './components/contentPage';
import { LoginPage } from './components/loginPage';
import { PinSetupPage } from './components/pinSetupPage';
import { SplashScreen } from './components/splashScreen';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore';
import { StatusBar } from 'react-native';

export const RootModule = () => {
  const Stack = createStackNavigator();

  const authState = useSelector((state: RootState) => state.auth)
  
  if(authState.isLoading){
    return <SplashScreen />
  }
 
  return (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {authState.userToken === null ? (
              <>
                {authState.isAuthSet ? (
                  <>
                    <Stack.Screen name={ScreenName.LogIn} component={LoginPage}/>
                  </>
                  ) : (
                    <>
                    <Stack.Screen name={ScreenName.PinSetup} component={PinSetupPage} />
                    </>
                  )
                }
              </>
            ) : (
              <>
                <Stack.Screen name={ScreenName.Content} component={ContentPage}/>
              </>
            )
          }
        </Stack.Navigator>
    </NavigationContainer>
   );
 };

export enum ScreenName {
  SplashScreen = 'splashScreen',
  PinSetup = 'pinSetup',
  LogIn = 'logIn',
  FingerprintSetup = 'fingerprintSetup',
  Content = 'content'
}

//  export default RootModule;