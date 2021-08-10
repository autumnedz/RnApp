
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ContentPage } from './components/contentPage';
import { LoginPage } from './components/loginPage';


// TODO: backend needed to keep track of user set pin?
const App = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="login" component={LoginPage} options={{ title: 'Welcome' }}/>
          <Stack.Screen name="content" component={ContentPage} options={{ title: 'Awesome Content' }}/>
        </Stack.Navigator>
    </NavigationContainer>
   );
 };

 export default App;
