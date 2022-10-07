import React from 'react'
import { StyleSheet,Platform, Text, View,StatusBar,Image } from 'react-native'

const backImage = require("./assets/Splash11.png");

const Splash = ({navigation}) => {

    setTimeout(()=>{
        navigation.replace('Onboarding')
    },5000)

    return (
        <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}} >
            <View>
            <Image source={backImage} style={styles.backImage}/>  
            </View>
            
            <Image source={require('./assets/Sideline2.png')} style={{width:150,height: Platform.os === 'ios'? 150 : 180}}  />    
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({

    backImage: {
        width: '130%',
        height: 950,
        marginTop: -360,
        marginLeft: -260,
        position: "absolute",
        top: 0,
        resizeMode: 'cover'
    },

})