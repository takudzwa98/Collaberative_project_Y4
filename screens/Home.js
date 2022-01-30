import React, {useEffect} from "react";
import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from '../colors';
import { Entypo } from "@expo/vector-icons";
const catImageUrl = "https://www.flaticon.com/premium-icon/cat_2173478?term=cat&page=1&position=17&page=1&position=17&related_id=2173478&origin=tag";

const backImage = require("../assets/bg1.png");

const Home  = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}} />
            ),
            headerRight: () => (
                <Image 
                    source={{uri: catImageUrl}}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={() => navigation.navigate("Chat")}
                style={styles.Chatbutton}
            >
            <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
        </View>
    )
}

export default Home;


const styles = StyleSheet.create({
    Chatbutton: {
        backgroundColor: colors.primary,
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: colors.primary,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .9,
        shadowRadius: 8,
        marginRight: 20,
        marginBottom: 50
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    }
})