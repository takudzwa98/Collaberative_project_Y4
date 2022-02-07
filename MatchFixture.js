import React from 'react'; 
import {View,Image, Text, StyleSheet} from 'react-native'; 
function MatchFixture()
{
    return (
        <View style={styles.container}>
            <Image style={styles.bgImage} source={{uri:"https://wallpapers.com/images/high/plain-color-wallpaper-6me8mv4y9zvjbdv2.jpg"}} />
            <View style={styles.containerInner}>
                <Text style={styles.textStyle}>Opponent: DCU Football Club</Text>
                <Text style={styles.textStyle}>Venue: DkIT Football Pitch</Text>
                <Text style={styles.textStyle}>Date: 12/01/2022</Text>
                <Text style={styles.textStyle}>Weather:API? </Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerInner:{
        height: '30%',
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'white',
        borderRadius: 50,
    },
    bgImage:{
        flex: 1,
        position:'absolute',
        width:'100%',
        height:'100%',
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
    textStyle:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
})
export default MatchFixture;  