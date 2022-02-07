import { StatusBar } from 'expo-status-bar';
import React, {  useState,
  useEffect,
  useLayoutEffect,
  useCallback } from 'react';
import { Animated, Dimensions, FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import 'react-native-gesture-handler';
import { DataTable } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GiftedChat } from "react-native-gifted-chat";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
// Plus...
import plus from '../assets/plus.png'

// Font Awesome Icons...
import { FontAwesome5 } from '@expo/vector-icons'
import { useRef } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import PostCard from '../components/PostCard';

import {
  Container,
} from '../styles/FeedStyles';


const Posts = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../assets/users/user-3.jpg'),
    postTime: '4 mins ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-3.jpg'),
    liked: true,
    likes: '14',
    comments: '5'
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../assets/users/user-1.jpg'),
    postTime: '2 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '8',
    comments: '0'
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../assets/users/user-4.jpg'),
    postTime: '1 hours ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-2.jpg'),
    liked: true,
    likes: '1',
    comments: '0'
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../assets/users/user-6.jpg'),
    postTime: '1 day ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: require('../assets/posts/post-img-4.jpg'),
    liked: true,
    likes: '22',
    comments: '4'
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../assets/users/user-7.jpg'),
    postTime: '2 days ago',
    post: 'Hey there, this is my test for a post of my social app in React Native.',
    postImg: 'none',
    liked: false,
    likes: '0',
    comments: '0'
  },
];

const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function Home ({navigation}) {
   
const [messages, setMessages] = useState([]);
const onsignOut = () => {
  signOut(auth).catch(error => console.log(error));
};

useLayoutEffect(() => {
  navigation.setOptions({
      headerRight: () => (
          <TouchableOpacity
           style={{marginRight: 10}}
           onPress={onsignOut}
          >
              <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
          </TouchableOpacity>
      )
  });
}, [navigation]);

useLayoutEffect(() => {
  const collectionRef = collection(db, 'chats');
  const q = query(collectionRef, orderBy('createdAt', 'desc'));

  const unsubscribe = onSnapshot(q, snapshot => {
      console.log('snapshot');
      setMessages(
          snapshot.docs.map(doc => ({
              _id: doc.id,
              createdAt: doc.data().createdAt,
              text: doc.data().text,
              user: doc.data().user
          }))
      )
  });
  return () => unsubscribe
}, []);

const onSend = useCallback((messages = []) => {
  setMessages(previousMessages => GiftedChat.append(previousMessages, messages));

  const { _id, createdAt, text, user } = messages[0];
  addDoc(collection(db, 'chats'), {
      _id,
      createdAt,
      text,
      user
  });
}, []);

  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={{
        showLabel: false,
        // Floating Tab Bar...
        style: {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 0,
          marginHorizontal: 20,
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10
          },
          paddingHorizontal: 20,
        }
      }}>

        {
          // Tab Screens....

          // Tab ICons....
        }
        <Tab.Screen name={"Home"} component={HomeScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              left: 55,
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: 0,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name={"Search"} component={SearchScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              left: 45,
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="search"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>


        {

          // Extra Tab Screen For Action Button..
        }

        <Tab.Screen name={"ActionButton"} component={EmptyScreen} options={{
          tabBarIcon: ({ focused }) => (

            <TouchableOpacity onPress={() => {
                navigation.navigate("AddPost")
            }}>
              <View style={{
                width: 55,
                height: 55,
                backgroundColor: 'red',
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: Platform.OS == "android" ? 50 : 30
              }}>
                <Image source={plus} style={{
                  width: 22,
                  height: 22,
                  tintColor: 'white',
                  
                }}></Image>
              </View>
              
            </TouchableOpacity>
          )
        }}></Tab.Screen>

        <Tab.Screen name={"Notifications"} component={NotificationScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              right:45,
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="bell"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

        <Tab.Screen name={"Profile"} component={SettingsScreen} options={{
          tabBarIcon: ({ focused }) => (
            <View style={{
              // centring Tab Button...
              right:55,
              position: 'absolute',
              top: 20
            }}>
              <FontAwesome5
                name="user-alt"
                size={20}
                color={focused ? 'red' : 'gray'}
              ></FontAwesome5>
            </View>
          )
        }} listeners={({ navigation, route }) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 4,
              useNativeDriver: true
            }).start();
          }
        })}></Tab.Screen>

      </Tab.Navigator>

      <Animated.View style={{
        width: getWidth() - 5,
        height: 3,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 55,
        // Horizontal Padding = 20...
        left: 40,
        borderRadius: 30,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>

      </Animated.View>
    </NavigationContainer>
  );
}

function getWidth() {
  let width = Dimensions.get("window").width

  // Horizontal Padding = 20...
  width = width - 80

  // Total five Tabs...
  return width / 5
}

function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.containerImage}>
            <Image style={styles.bgImage} source={{
                uri:"https://wallpapers.com/images/high/plain-color-wallpaper-6me8mv4y9zvjbdv2.jpg"
                }} />
                <View style={styles.bottomContainer}>
                     <Image style={styles.profile} source={{
                         uri:"https://scontent-dub4-1.xx.fbcdn.net/v/t1.6435-9/129762309_2248948631906378_3378543475299026941_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=2B_hQvCwpmIAX9MugRz&_nc_ht=scontent-dub4-1.xx&oh=00_AT-sH4iXtzbGJRdU7GG5W1uIY-FCG6sVBRCLjzo9zxKJvA&oe=622597FA"
                        }} />
                    <Text style={{color:'gray', marginTop:-25}}>Oluwatomisin Akingba</Text>
                    <Text style={{color:'gray',bottom:"7%", marginTop:10}}>Drogheda ,Ireland</Text> 
                 
                 <DataTable>
                    <DataTable.Row>
                        <DataTable.Cell>Matches played</DataTable.Cell>
                        <DataTable.Cell numeric>5</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Goals</DataTable.Cell>
                        <DataTable.Cell numeric>6</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Assists</DataTable.Cell>
                        <DataTable.Cell numeric>3</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Yellow Cards</DataTable.Cell>
                        <DataTable.Cell numeric>2</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Red Cards</DataTable.Cell>
                        <DataTable.Cell numeric>0</DataTable.Cell>
                    </DataTable.Row>

                    <DataTable.Row>
                        <DataTable.Cell>Trainings</DataTable.Cell>
                        <DataTable.Cell numeric>10</DataTable.Cell>
                    </DataTable.Row>
                 </DataTable>
                 </View>
        </View>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Container>
      <FlatList 
        data={Posts}
        renderItem={({item}) => <PostCard item={item} />}
        keyExtractor={item=>item.id}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  </View>
  );
}

function NotificationScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GiftedChat 
            messages={messages}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                avatar: 'https://www.flaticon.com/premium-icon/man_2202112?term=avatar&page=1&position=1&page=1&position=1&related_id=2202112&origin=tag'
            }}
            messagesContainerStyle={{
                backgroundColor: '#fff'
            }}
        />
    </View>
  );
}

function SearchScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bgImage:{
    flex: 1,
    position:'absolute',
    width:'100%',
    height:'100%'
},
bottomContainer:{marginTop:"50%", height:"90%", width:400, backgroundColor:'white', borderTopStartRadius: 50, borderTopEndRadius:50, alignItems:'center' },
profile:{
    height:180,
    width:120, 
    borderRadius: 25,
    bottom:"10%"
},
head: {  height: 40,  backgroundColor: '#f1f8ff'  },
wrapper: { flexDirection: 'row' },
title: { flex: 1, backgroundColor: '#f6f8fa' },
row: {  height: 28  },
text: { textAlign: 'center' },
});