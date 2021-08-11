
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContentPage } from './components/contentPage';
import { LoginPage } from './components/loginPage';


// TODO: backend needed to keep track of user set pin?
const App = () => {
  const Stack = createStackNavigator();
  const startScreenName = 'login' // can be used to decide whether the app opens up on the login page if pin is setup or open in the content page when not


  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={startScreenName}>
          <Stack.Screen name="login" component={LoginPage} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="content" component={ContentPage} options={{ title: 'Content' }}/>
        </Stack.Navigator>
    </NavigationContainer>
   );
 };

 export default App;
