

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContentPage } from './components/contentPage';
import { LoginPage } from './components/loginPage';
import { SetupAuthPage } from './components/setupAuthPage';
import { SplashScreen } from './components/splashScreen';
import { useEffect, useState } from 'react';
import * as Keychain from 'react-native-keychain';
import { useSelector } from 'react-redux';
import { RootState } from './store/configureStore';

export const RootModule = () => {
  const Stack = createStackNavigator();

  const authState = useSelector((state: RootState) => state.auth)
  
  if(authState.isLoading){
    return <SplashScreen/>
  }
 
  return (
    <NavigationContainer>
        <Stack.Navigator>
          {
            authState.userToken === null ? (
              <>
                {
                  authState.isAuthSet ? (
                    <Stack.Screen name={ScreenName.LogIn} component={LoginPage} options={{ title: 'Log In' }}/>
                  ) : (
                    <Stack.Screen name={ScreenName.SetupAuth} component={SetupAuthPage} options={{ title: 'Setup a pin code' }}/>
                  )
                }
              </>
            ) : (
              <>
                <Stack.Screen name={ScreenName.Content} component={ContentPage} options={{ title: 'Authentification Successful'}}/>
              </>
            )
          }
        </Stack.Navigator>
    </NavigationContainer>
   );
 };

export enum ScreenName {
  SplashScreen = 'splashScreen',
  SetupAuth = 'setupAuth',
  LogIn = 'logIn',
  Content = 'content'
}

//  export default RootModule;