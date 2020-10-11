import React from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
const w = Dimensions.get('window').width * 1.2;
const Oval = ({style}) => {
  return <View style={[styles.container, style]} />;
};

export default Oval;

const styles = StyleSheet.create({
  container: {
    width: w,
    aspectRatio: 1,
    backgroundColor: '#E2231A',
    position: 'absolute',
    borderRadius: w,
    left: 100,
    top: -80,
  },
});
