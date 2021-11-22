import React from 'react'
import {View, Text, Image, StyleSheet} from 'react-native'


const FutureForecast = () => {
return (
    <View>
         <FutureForecast/>
    </View>

)

}

const FutureForecastItem = () => {
    const img = {uri: "http://openweathermap.org/img/wn/10d@2x.png"}
    return (
        <View>
            <Text>Mon </Text>
            <Image source={img}/>
            <Text>Night - 28&#176;C</Text>
            <Text>Day - 36&#176;C</Text>
        </View>
    
        )
    
    }
    
    export default FutureForecast
