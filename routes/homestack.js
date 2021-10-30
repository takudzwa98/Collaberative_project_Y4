import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';

import Login from '../screens/login';
import Home from '../screens/Home';
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
        headerTitle: () => null,
            }
      }
  }




}


  


const HomeStack = createStackNavigator(screens);




export default HomeStack;
