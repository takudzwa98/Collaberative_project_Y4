import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import Ionicons from 'react-native-vector-icons/Ionicons';
import Login from '../screens/login';
import Home from '../screens/Home';
import AddPost from '../screens/AddPost';
import Header from '../components/Header';


const screens = {
  Login: {
    screen: Login,
      navigationOptions:
      {
        title: null,
      header: () => null
      }
},

  Home:
  {
    screen: Home,
    navigationOptions:({ navigation }) => {
      return {
        header: () => null
            }
      }
  },

  AddPost:
  {
      screen: AddPost,
      navigationOptions:({ navigation }) => {
      return {
        title: '',
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#2e64e515',
          shadowColor: '#2e64e515',
          elevation: 0,
            },
            headerBackTitleVisible: false,
            headerBackImage: () => (
              <View style={{marginLeft:15}}>
                <Ionicons name="arrow-back" size={25} color="#2e64e5" />
              </View>
            ),
          }
      }
  }
}


  


const HomeStack = createStackNavigator(screens);




export default HomeStack;
