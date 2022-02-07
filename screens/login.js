import React from 'react';
import { StyleSheet, View, TextInput, Button, SafeAreaView} from 'react-native';
import Login from '../app/index';
import { authentication } from "../firebase/firebase-config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";



const login = ({ navigation }) => {

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
    <SafeAreaView>
    <View>
      <TextInput
      onChangeText={setEmail}
      value = {email}
      style = {styles.email}
      >
      </TextInput>

      <TextInput
      onChangeText={setPassword}
      value = {password}
      style = {styles.password}
      >
      </TextInput>
      <Button style = {styles.button}
         title='Send'
         onPress={SignInUser}
        >
        </Button>
    </View>
    </SafeAreaView>
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


});


export default login;
