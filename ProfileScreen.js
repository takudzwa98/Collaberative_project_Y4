import React from 'react'; 
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native'; 
import { DataTable } from 'react-native-paper';
function ProfileScreen()
{
    return (
        <View style={styles.containerImage}>
            <Image style={styles.bgImage} source={{
                uri:"https://wallpapers.com/images/high/plain-color-wallpaper-6me8mv4y9zvjbdv2.jpg"
                }} />
                <View style={styles.bottomContainer}>
                     <Image style={styles.profile} source={{
                         uri:"https://scontent-dub4-1.xx.fbcdn.net/v/t1.6435-9/129762309_2248948631906378_3378543475299026941_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_ohc=XhbphQ6zEb8AX83lUpA&_nc_ht=scontent-dub4-1.xx&oh=bb8eddce558c37542b812c5088ad3ca2&oe=61D67DFA"
                        }} />
                    <Text>Oluwatomisin Akingba</Text>
                    <Text style={{color:'gray',bottom:"7%"}}>Drogheda ,Ireland</Text> 
                 
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
    text: { textAlign: 'center' },
    
})
export default ProfileScreen;  