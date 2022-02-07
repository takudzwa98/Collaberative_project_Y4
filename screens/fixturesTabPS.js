import React from 'react'; 
import {View, Text, StyleSheet} from 'react-native'; 
function ProfileScreen()
{
    return (
        <View style={styles.containerImage}>

            <Text>Opponent: DCU Football Club</Text>
            <Text>Venue: DkIT Football Pitch</Text>
            <Text>Date: 12/01/2022</Text>
            <Text>Weather:API? </Text>

        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bgImage:{
        flex: 1,
        position:'absolute',
        width:'100%',
        height:'100%'
    },
    bottomContainer:{marginTop:"50%", height:"90%", width:400, backgroundColor:'white', borderTopStartRadius: 50, borderTopEndRadius:50, alignItems:'center' },
    profile:{
        height:120,
        width:120, 
        borderRadius: 25,
        bottom:"10%"
    },
    head: {  height: 40,  backgroundColor: '#f1f8ff'  },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: {  height: 28  },
    text: { textAlign: 'center' }
})
export default ProfileScreen;  