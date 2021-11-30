import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import DateTime from './components/DateTime'
import WeatherScroll from './components/WeatherScroll'


const img = require('./assets/image.jpg')
export default function App() {
  const [data, setData] = useState({});

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition((sucess) => {
      let {latitude, longitude} = success.coords;

      fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

      })
    }, [])


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
    justifyContent:"center"
  }
});
