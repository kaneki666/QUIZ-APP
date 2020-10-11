import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Login from '../Screens/Login/Login';
import Menu from '../Screens/Menu/Menu.tsx';
import Subjects from '../Screens/Subjects/Subjects';
import Profile from '../Screens/Profile/Profile';
const Stack = createStackNavigator();

const RootStackNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => <Login {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Menu">
          {(props) => <Menu {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Profile">
          {(props) => <Profile {...props} />}
        </Stack.Screen>
        <Stack.Screen name="Subjects">
          {(props) => <Subjects {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackNavigation;
