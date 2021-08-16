

import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContentPage } from './components/contentPage';
import { LoginPage } from './components/loginPage';
import { SetupAuthPage } from './components/setupAuthPage';
import { SplashScreen } from './components/splashScreen';
import { useEffect, useState } from 'react';


export const RootModule = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={ScreenName.SplashScreen}>
          <Stack.Screen name={ScreenName.SplashScreen} component={SplashScreen} options={{ title: 'Loading' }}/>
          <Stack.Screen name={ScreenName.SetupAuth} component={SetupAuthPage} options={{ title: 'Setup your authentification method' }}/>
          <Stack.Screen name={ScreenName.Login} component={LoginPage} options={{ title: 'Welcome' }}/>
          <Stack.Screen name={ScreenName.Content} component={ContentPage} options={{ title: 'Content' }}/>
        </Stack.Navigator>
    </NavigationContainer>
   );
 };

export enum ScreenName {
  SplashScreen = 'splashScreen',
  SetupAuth = 'setupAuth',
  Login = 'login',
  Content = 'content'
}

//  export default RootModule;