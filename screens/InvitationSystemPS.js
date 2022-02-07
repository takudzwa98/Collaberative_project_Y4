import React from 'react'; 
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native'; 
import { DataTable } from 'react-native-paper';
function ProfileScreen()
{
    return (
        <View style={}>
            <Text>Thursday Training Session</Text>
            <Text>Venue: DkIT Sports Indoor Facility</Text>
            <Text>Streght and Conditioning</Text> 
            <Text>Time: 7:30pm</Text>
            
        
        <View style={{ flexDirection:"row" }}>
        <View style={styles.buttonStyle}>
            <Button>Will Attend!</Button>
        </View>
        <View style={styles.buttonStyle}>
            <Button>Can't Go!</Button>
        </View>
    </View>
    </View>
    );
}
const styles = StyleSheet.create({
    buttonDeny: {
        marginHorizontal: 20,
        marginTop: 5,
        color:'red'
      },
      buttonAccept: {
        marginHorizontal: 20,
        marginTop: 5,
        color:'green'
      }
})
export default ProfileScreen;  