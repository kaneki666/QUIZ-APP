import React, {useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Animated, {Easing, spring} from 'react-native-reanimated';
import {timing} from 'react-native-redash';
import {Provider} from 'react-redux';
import * as eva from '@eva-design/eva';
import {ApplicationProvider} from '@ui-kitten/components';

import CircularProgress from './src/Components/ProgressBar/CircularProgress';
import ArcProgress from './src/Components/ProgressBar/ArcProgress';
import Login from './src/Screens/Login/Login';
import store from './src/Store/store';
import RootStackNavigation from './src/Navigation/RootStackNavigation';
const {Clock} = Animated;

const App = () => {
  const clock = new Clock();
  const config = {
    duration: 3 * 1000,
    toValue: 1,
    easing: Easing.back(2),
  };
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Provider store={store}>
        <RootStackNavigation />
      </Provider>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
