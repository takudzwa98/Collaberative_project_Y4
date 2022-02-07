import React from 'react'; 
import {View, Image, Button, Text, StyleSheet} from 'react-native'; 
function TrainingFixture()
{
    return (   
        <View style={styles.container}>
            <Image style={styles.bgImage} source={{uri:"https://wallpapers.com/images/high/plain-color-wallpaper-6me8mv4y9zvjbdv2.jpg"}} />
            <Text style={styles.textStyle}>Thursday Training Session</Text>
            <Text style={styles.textStyle}>Venue: DkIT Sports Indoor Facility</Text>
            <Text style={styles.textStyle}>Streght and Conditioning</Text> 
            <Text style={styles.textStyle}>Time: 7:30pm</Text>
           
        
            <View style={{ flexDirection:"row" }}>
                <View style={styles.buttonAccept}>
                    <Button title='Will Go!' color="#07e207">"Will Attend!"</Button>
                </View>
                <View style={styles.buttonDeny}>
                    <Button title='Cannot go!' color="#dd0f0f">"Can't Go!"</Button>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    buttonDeny: {
        marginHorizontal: 20,
        marginTop: 5
    },
      bgImage:{
        flex: 1,
        position:'absolute',
        width:'100%',
        height:'100%'
    },
      buttonAccept: {
        marginHorizontal: 20,
        marginTop: 5
    },
      container:{
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle:{
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
})
export default TrainingFixture;