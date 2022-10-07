import React, {useState} from "react";
import { StyleSheet,Platform, View, TextInput, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase-config";
import { Button, ButtonGroup, withTheme, Text } from 'react-native-elements';

const backImage = require("./assets/Picture3.png");

export default function login ({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {console.log("Login Success")
                 navigation.navigate("Home")})
                .catch((err) => Alert.alert("Login Error", err.message));
        }
    };

    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage}/>
            <SafeAreaView style={styles.form}>
            <Image
              style={styles.tinyLogo}
              source={require('./assets/Sideline2.png')}
            />
            <Text style={styles.title}>Select Your Profile</Text>
            <Text style={styles.text}>Select a profile you would like to Signup or Login as </Text>
            <Button
                title="MANAGER"
                icon={{
                  name: 'user',
                  type: 'font-awesome',
                  size: 45,
                  color: 'white',
                }}
                iconRight
                iconContainerStyle={{ marginLeft: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                  backgroundColor: '#CC6600',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                  marginTop:5
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 70,
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate("managerLogin")}
              />

<Button
                title="PLAYER"
                icon={{
                  name: 'user',
                  type: 'font-awesome',
                  size: 45,
                  color: 'white',
                }}
                iconRight
                iconContainerStyle={{ marginLeft: 10 }}
                titleStyle={{ fontWeight: '700' }}
                buttonStyle={{
                  backgroundColor: '#3E42AF',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                  marginTop:5
                }}
                containerStyle={{
                  width: 200,
                  marginHorizontal: 70,
                  marginVertical: 10,
                }}
                onPress={() => navigation.navigate("Login")}
              />
            <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'white', fontWeight: '600', fontSize: 14, marginTop: 50}}>
                  If you confused on the profile to create? Select  
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14, marginTop: 50}}>  Help</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#f57c00',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    form: {
        flex: 1,
        justifyContent:'center',
        marginHorizontal: 30
    },
    
    backImage: {
        width: '100%',
        height: Platform.os === 'ios'? 800: 950 ,
        position: "absolute",
        top: 0,
        resizeMode: 'cover'
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12
    },
    tinyLogo: {
      width: 200,
      height: 200,
      alignSelf:"center",
      marginTop:-125,
      marginBottom: -80
    },
    title: {
        fontSize: 28,
        color: "white",
        alignSelf: "center",
        marginTop:120,
        paddingBottom: 24
    },
    text: {
      fontSize: 17,
      color: "white",
      alignSelf: "center",
      paddingBottom: 24
  },
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
})