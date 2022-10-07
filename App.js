import React, {useState} from 'react';
import * as Font from 'expo-font';
import { StatusBar, LogBox } from "react-native";
import AppLoading  from 'expo-app-loading';
import { UserProvider } from './firebase/UserContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FirebaseProvider } from './firebase/FirebaseContext';
import { isAndroid } from "@freakycoder/react-native-helpers";
import AnimatedSplash from "react-native-animated-splash-screen";

// Component Imports
import ManagerPlayer from './managerPlayer';
import Splash from './Splash';
import TabNavigator from './routes/TabNavigator';
import ManagerNavigator from "./routes/ManagerNavigator"
import Onboarding from './PlayerScreens/Onboarding'
import LoginScreen from './PlayerScreens/login';
import SignUpScreen from './PlayerScreens/Signup';
import ManagerLoginScreen from './ManagerScreens/managerLogin';
import EditEvent from './ManagerScreens/EditEvent';
import ManagerSignUpScreen from './ManagerScreens/managerSignUp';
import ResetScreen from './PlayerScreens/ResetPass';
import PlayerProf from './ManagerScreens/Players';
import PlayerResp from './ManagerScreens/playerResponses';

const getFonts = () => Font.loadAsync({
'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
'nunito-semi-bold': require('./assets/fonts/Nunito-SemiBold.ttf')
});

LogBox.ignoreAllLogs();
const Stack = createStackNavigator();
export default function App(){
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  React.useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }
    setTimeout(() => {
      setIsLoaded(true);
    }, 2050);
  }, []);


  if(fontsLoaded)
  {
    return (
      <FirebaseProvider>
      <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false, gestureEnabled: false, headerTitleStyle: { color: '#0c1821'} }} >
          <Stack.Screen name="ManagerPlayer" component={ManagerPlayer}></Stack.Screen>
          <Stack.Screen name="Splash" component={Splash}></Stack.Screen>
          <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ header: () => null}}></Stack.Screen>
          <Stack.Screen name="ManagerNavigator" component={ManagerNavigator} options={{ header: () => null}}></Stack.Screen>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen}/>
          <Stack.Screen name="managerLogin" component={ManagerLoginScreen} />
          <Stack.Screen name="managerSignUp" component={ManagerSignUpScreen}/>
          <Stack.Screen name="Onboarding" component={Onboarding} ></Stack.Screen>
          <Stack.Screen name="EditEvent" component={EditEvent} />
          <Stack.Screen name="ResetPass" component={ResetScreen} ></Stack.Screen>
          <Stack.Screen name="PlayerPro" component={PlayerProf} ></Stack.Screen>
          <Stack.Screen name="PlayerResponse" component={PlayerResp} ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      </UserProvider>
      </FirebaseProvider>
    );
  }

 else {
   return(
    
<AppLoading
startAsync={getFonts}
onFinish={()=> setFontsLoaded(true)}
onError={console.warn}
/>
   )

 }
    
}