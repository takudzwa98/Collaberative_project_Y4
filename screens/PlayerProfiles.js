import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default class UsersView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
         {id:1, image: "https://bootdey.com/img/Content/avatar/avatar6.png", username:"Tomi"},
         {id:2, image: "https://bootdey.com/img/Content/avatar/avatar2.png", username:"Tak"},
         {id:3, image: "https://bootdey.com/img/Content/avatar/avatar3.png", username:"Amara"},
         {id:4, image: "https://bootdey.com/img/Content/avatar/avatar4.png", username:"Mahaveer"},
         {id:5, image: "https://bootdey.com/img/Content/avatar/avatar1.png", username:"Michal"}
      ],
    };
  }

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.body}>
            <FlatList 
              style={styles.container} 
              enableEmptySections={true}
              data={this.state.data}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.box}>
                      <Image style={styles.image} source={{uri: item.image}}/>
                      <Text style={styles.username}>{item.username}</Text>
                      <View style={styles.iconContent}>
                        <Image style={styles.icon} source={{uri: "https://png.icons8.com/customer/office/40"}}/>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
            }}/>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image:{
    width: 60,
    height: 60,
  },
  body: {
    padding:30,
    backgroundColor :"#E6E6FA",
  },
  box: {
    marginTop:5,
    marginBottom:5,
    borderRadius:10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  },
  iconContent:{
    width: 60,
    height: 60,
    backgroundColor: '#40E0D0',
    marginLeft: 'auto',
    alignItems: 'center'
  },
  icon:{
    width: 40,
    height: 40,
  }
});