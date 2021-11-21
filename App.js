import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'

const img = require('./assets/image.jpg')
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={img} style={styles.image}>
      <DateTime/>
      <WeatherScroll/>
      </ImageBackground>
    </View>                                         
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image:{
    flex:1, 
    resizeMode:"cover", 
    justifyContent:"Center"
  }
});
