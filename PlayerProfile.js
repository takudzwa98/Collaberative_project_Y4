import React from 'react'; 
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native'; 
function ProfileScreen()
{
    return (
        <View style={styles.containerImage}>
            <Image style={styles.bgImages} source={{uri:""}} />
            <view style={styles.bottomContainer}>
                <Image style={styles.profile} source={{
                    uri:""}}
                    />
                    <Text style={}>Oluwatomisin Akingba</Text>
            </view>
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

    },
    profile:{

    }
})
export default ProfileScreen;  