import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, Image, Button, SafeAreaView} from 'react-native';
import Login from '../app/index';
import { authentication } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";


const backImage = require("../assets/bg1.png");

export default function login ({ navigation }) {

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [emailError, setEmailError] = React.useState("")
  const [isSignedIn, setisSignedIn] = React.useState(false)
  
  const [showPass, setShowPass] = React.useState(false)
  const [saveMe, setSaveMe] = React.useState(false)

  global.Myemail = email;


  function isEnableSignIn() {
      return email != "" && password != "" && emailError == ""
  }

  const SignInUser = () => {
      signInWithEmailAndPassword(authentication, email, password)
      .then((re)=>{
          console.log(re);
          const createdAt = re.user;
          console.log("creadted At" + JSON.stringify(createdAt));
          //console.log('User Details:' + userDetails);
          //SetUserData();
          navigation.navigate("Home", {
              paramKey: email
          });
          setisSignedIn(true);
      })
      .catch((re)=>{
          console.log(re);
          errorCode = re.code;
          errorMessage = re.message;
        if (errorCode === 'auth/wrong-password') {
          console.log("Wrong password");
          alert('Wrong password.');
        } else {
          console.log("Navigate to Home");
          navigation.navigate("Home");
          setisSignedIn(false);
        }
      })
  } 

  function getDocumentID(){
      const user = authentication.currentUser;
      var uid = '';
      if (user !== null) {
          const displayName = user.displayName;
          const email = user.email;
          uid = user.uid;
          console.log('UID: ' + uid + ' Name: ' + displayName);
      }       
      return uid;
  }

  const SetUserData = async () => {
      await setDoc(doc(db, "users", getDocumentID()),{
          address: "Not Updated",
          dob: "Not Updated",
          email: email,
          gender: "Not Updated",
          name: "Not Updated",
          number: "Not Updated"
      });
      //GetData();
      //console.log(path)
  }

  function isEnableSignUp() {
    return email != "" && username != "" && password != "" && emailError == "" && passwordError == ""
}


const RegisterUser = () => {
    createUserWithEmailAndPassword(authentication, email, password)
    .then((re)=>{
        console.log(re);
        //navigation.navigate("Home");
    })
    .catch((re)=>{
        console.log(re);
    })
    //navigation.navigate("Otp")}
} 
  
  return(
    
    <View style={styles.container}>
    <Image source={backImage} style={styles.backImage}></Image>
      <SafeAreaView style={styles.form}>
      <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                  <TextInput 
                    style={styles.input}
                    placeholder="Enter Password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
        <Button style = {styles.button}
         title='Send'
         onPress={SignInUser}
        >
        </Button>
        <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
                  Dont have an account? 
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>
                      Sign Up
                    </Text>
                </TouchableOpacity>
            </View>
      </SafeAreaView>
     

    </View>
    
   )
}

const styles = StyleSheet.create({
  email: {
    height: 40,
    marginTop: 152,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  password: {
    height: 40,
    marginTop: 12,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
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
whiteSheet: {
    width: '100%',
    height: '75%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60
},
backImage: {
    width: '100%',
    height: 340,
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
title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 24
},
container: {
    flex: 1,
    backgroundColor: '#fff'
}

});

