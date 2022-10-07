import React, {useEffect, useState,useRef} from 'react';
import { StyleSheet, Platform, View, Text, Image, StatusBar, Animated, TouchableOpacity, Alert, SafeAreaView, TouchableHighlight} from 'react-native';
import { Button, IconButton, Card, Colors } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import { Picker } from '@react-native-picker/picker';
import { auth, db } from "../firebase/firebase-config";
import moment from 'moment';
import WeekSelector from 'react-native-week-selector';
import CheckBox from '@react-native-community/checkbox';
import _ from "lodash";
import Swipeout from 'react-native-swipeout';
import { DatabaseConnection } from '../components/database-connection';
import { colors } from 'react-native-elements';
import AsyncStorage from "@react-native-async-storage/async-storage";
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import profile from '../assets/profile.png';
// Tab ICons...
import home from '../assets/home.png';
import search from '../assets/clock.png';
import notifications from '../assets/calendar.png';
import settings from '../assets/settings.png';
import logout from '../assets/logout.png';
// Menu
import menu from '../assets/menu.png';
import close from '../assets/close.png';

// Photo
import photo from '../assets/photo.jpg';

const logo = require("../assets/SidelineLTRS.png");


export default function ScheduleScreen ({ navigation, route }) {

  const selectDate = new Date();                                           //var to get date
  const [flatListItems, setFlatListItems] = React.useState([]);            //variable for storing entries into the FlatList
  const [modalVisible, setModalVisible] = React.useState(false);           //Flag Variable for Modal Pop-Up   
  const [Hours, setHours] = React.useState('');                            //Variable for Hours from TimePicker
  const [Minutes, setMinutes] = React.useState('');                        //Variable for Minutes from TimePicker
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)        //Flag Variable for Lunch for week CheckBox  
  const [dayoftheWeek, setDayoftheWeek] = React.useState('');              //variable for DOW
  const [Week, setWeek] = React.useState(moment().day(5).format("L"));     //variable for EOW
  const [finishvisible, setfinishVisible] = React.useState(false);         //Flag variable for Finish Time TimePicker
  const [finishHours, setfinishHours] = React.useState(selectDate.getHours());              //Variable for Finish Hours from TimePicker
  const [finishMinutes, setfinishMinutes] = React.useState(selectDate.getMinutes());        //Variable for Finish Minutes from TimePicker
  const [currentDate, setCurrentDate] = React.useState(selectDate);               //variable for current Date
  const [visible, setVisible] = React.useState(false);                                      //Flag variable for Start Time TimePicker
  const [showAlert, setshowAlert] = React.useState(false);                                  //Flag variable for Alert 
  const [IDtimesheet, setIDtimesheet] = React.useState('');                                 //variable for id_timesheet
  const [frTimes, setfrTimes] = React.useState('');                                         //variabe to store formatted Start Times
  const [frFinTimes, setfrFinTimes] = React.useState('');                                   //variabe to store formatted Finish Times
  const [totalHrsforday, settotalHrsforday] = React.useState([]);                           //variable to store total Hours for a given day
  const [selectedWeek, setselectedWeek] = React.useState(moment().day(5).format("L"));      //variable to store EOW ["moment().day(5).format("L")"] ---> finding friday using moment library
  const [Thrs, setThrs] = React.useState('');                                               //variable to set Total Hours
  const [selectedItem, setSelectedItem] = React.useState('');
  const [currentTab, setCurrentTab] = useState("Home");              //variable to set current Tab status in side Drawer
  const [showMenu, setShowMenu] = useState(false);                   //variable to get the curretn Status of menu ...
  const [eventData, setEventData] = useState([])
  // Animated Properties...
  const offsetValue = useRef(new Animated.Value(0)).current;
  // Scale Intially must be One...
  const scaleValue = useRef(new Animated.Value(1)).current;
  const closeButtonOffset = useRef(new Animated.Value(0)).current;


  //Usefull For creating multiple Buttons at once instead of declaring them one by one..........
  const TabButton = (currentTab, setCurrentTab, title, image) => {  //Function to create custom Styled Buttons for Side Drawer
  return (
    <TouchableOpacity onPress={() => {
      if (title == "LogOut") {        //If Logout Button is selected in the side Drawer, navigate the user to Login Screen
        navigation.navigate("Login")
      } if (title == "Hour") {        //If Hour Button is selected, navigate the user to Add Entry Screen
        navigation.navigate("Hour")
      } if (title == "Home") {        //If Home Button is selected, navigate the user to Home Screen
        navigation.navigate("Home")
      } if (title == "TS Review") {   //If TS Review Button is selected, navigate the user to TS Review Screen
        navigation.navigate("Test")
      } 
      else {
        setCurrentTab(title)
      }
    }}>
      <View style={{
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: currentTab == title ? 'white' : 'transparent', //If the current Tab is the same as the title in the side drawer, set the BG color to white, else to Transparent 
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
      }}>

        <Image source={image} style={{
          width: 25, height: 25,
          tintColor: currentTab == title ? "#5359D1" : "white"
        }}></Image>

        <Text style={{
          fontSize: 15,
          fontWeight: 'bold',
          paddingLeft: 15,
          color: currentTab == title ? "#5359D1" : "white"
        }}>{title}</Text>

      </View>
    </TouchableOpacity>
  );
}
  

      const onDismiss = React.useCallback(() => {    // function for closing Start TimePicker
        setVisible(false)
      }, [setVisible])
    
      const onFinishDismiss = React.useCallback(() => {   // function for closing Finish TimePicker
        setfinishVisible(false)
      }, [setfinishVisible])
    
    
      const onConfirm = React.useCallback(      // function to display Start TimePicker
        ({ hours, minutes }) => {
          setVisible(false);
          console.log({ hours, minutes });
          var FrHours = moment(hours, 'HH');
          var FrMinutes = moment(minutes, 'mm');
          hours = setHours(FrHours.format('HH'));
          minutes = setMinutes(FrMinutes.format('mm'));
          var times = FrHours.format('HH') + ':' + FrMinutes.format('mm');
          console.log('time: ' + times);
          setfrTimes(times);
        },
        [setVisible]
      );
    
      const onFinishConfirm = React.useCallback(   // function to display Finish TimePicker
        ({ hours, minutes }) => {
          setfinishVisible(false);
          console.log({ hours, minutes });
          var FinHrs = moment(hours, 'HH');
          var FinMnts = moment(minutes, 'mm');
          hours = setfinishHours(FinHrs.format('HH'));
          minutes = setfinishMinutes(FinMnts.format('mm'));
          var Fintimes = FinHrs.format('HH') + ':' + FinMnts.format('mm'); //var to combine Hours and Minute into HH:mm format
          console.log('Finish Times: ' + Fintimes);
          setfrFinTimes(Fintimes);
          
        },
        [setfinishVisible]
      );

      const saveStartingWeek = (value) => {   // function to save Week Selected by User
            moment.locale('en')
            console.log("saveStartingWeek - value:", moment(value).add(5, "days").format("L"));
            setselectedWeek(moment(value).add(5, "days").format("L"));
            }
      
    
      const getTimefromMins = (mins) => {  // Function to help convert Minutes in 0-100 to Minutes in 0-60 
        if (mins >= 24 * 60 || mins < 0) {
          Alert.alert("Valid input should be greater than or equal to 0 and less than 1440.");
        }
        var h = mins / 60 | 0;
        var m = mins % 60 | 0;
    
        return moment.utc().hours(h).minutes(m).format("HH:mm");
      }
       
       const calcTotalHrs = () => {   // function to calculate total Hours given a start time and End Time
         var StrtTime = moment(frTimes, "HH:mm");
         var endTime = moment(frFinTimes, "HH:mm");
    
         var duration = moment.duration(StrtTime.diff(endTime));
         var DHrs = parseInt(duration.asHours());
         var Dmins = parseInt(duration.asMinutes())-DHrs* 60;
         var Tot  = endTime.diff(StrtTime, 'minutes'); //calculating the difference between endTime and startTime
         var timetomins = getTimefromMins(Tot);

         setThrs(timetomins);
         console.log("CalcTot: " + timetomins);
     }
      
      //Dimensions for styling the FlatList
      const SPACING = 20;
      const AVATAR_SIZE = 30;
      const ITEM_SIZE = AVATAR_SIZE + SPACING *3;
      const scrollY = React.useRef(new Animated.Value(0)).current;         


      const colors = {
        themeColor: "#4263ec",
        white: "#fff",
        background: "#f4f6fc",
        greyish: "#a4a4a4",
        tint: "#2b49c3",
      }
     
    const pressHandler = () => //Add Entry Button: Onclicking will call this function which will take the user to Add Entry Screen
    {
      navigation.navigate('Hour') //Takes the user to Add Entry Screen
    };   

    const pressHandler2 = () => //Add Entry Button: Onclicking will call this function which will take the user to Add Entry Screen
    {
      navigation.navigate('ManagerTester') //Takes the user to Add Entry Screen
    };   

    const deleteHandler = () => //Submit Button: Onclicking this will Submit entries only when it "Friday" or "Monday"
    {
      if (moment(Week).day("Monday").format('MMM Do') == moment().format('MMM Do') || moment(Week).day("Friday").format('MMM Do') == moment().format('MMM Do')) {
        navigation.navigate('ViewEntry');
      } else {
        alert('Its not Friday or Monday Yet!');
      }
    }

    const saveDayofWeek = (itemValue, itemIndex) => { //Function to save Day of the Week selected from the Picker
      setDayoftheWeek(itemValue);
  
      var next = getNextDay(itemValue);
      //console.log(next.getTime());
      console.log(moment(next.getTime()).format('L'));
      setCurrentDate(moment(next.getTime()).format('L'));
      calcTotalHrs();//Function call to calculate Total Hours for the selected day
    }
  
    const getNextDay = (dayName) => { //Function to find next day given current Day and return it DATE Format
      var todayDate = new Date(Week);
      var now = todayDate.getDay();
  
      // Days of the week
    var daysoftheweek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  
    // The index for the day you want
    var Indexofday = daysoftheweek.indexOf(dayName.toLowerCase());
  
    // Find the difference between the current day and the one you want
    // If it's the same day as today (or a negative number), jump to the next week
    var diff = Indexofday - now;
    diff = diff < 1 ? diff : diff;
  
    // Get the timestamp for the desired day
    var nextDayTimestamp = todayDate.getTime() + (1000 * 60 * 60 * 24 * diff);
  
    // Get the next day
    return new Date(nextDayTimestamp);
  
    }

    const saveWEEK = (value) => { //function for saving selected EOW
      moment.locale('en');
      console.log("saveStartingWeek - value:", moment(value).add(5, "days").format('L'));
        setWeek(moment(value).add(5, "days").format('L'));
    }


    const filterTimeFormat = (time) => { //function to return minutes in HH:mm format ex: 120 mins = 2:00 hrs, and to help convert Minutes in 0-100 to Minutes in 0-60 
      var decimal_places = 2;

      // Maximum number of hours before we should assume minutes were intended. Set to 0 to remove the maximum.
      var maximum_hours = 15;
    
      // 3
      var int_format = time.match(/^\d+$/);
      
      // 1:15
      var time_format = time.match(/([\d]*):([\d]+)/);
      console.log('time_format: ' + time_format);
      // 10m
      var minute_string_format = time.toLowerCase().match(/([\d]+)m/);
    
      // 2h
      var hour_string_format = time.toLowerCase().match(/([\d]+)h/);
    
      if (time_format != null) {
        var hours = parseInt(time_format[1]);
        var minutes = parseFloat(time_format[2]/60);
         if (minutes >= 0) {
           console.log('greater!!!!');
         }
          var time = hours + minutes;
        
        
      } else if (minute_string_format != null || hour_string_format != null) {
        if (hour_string_format != null) {
          hours = parseInt(hour_string_format[1]);
        } else {
          hours = 0;
        }
        if (minute_string_format != null) {
          minutes = parseFloat(minute_string_format[1]/60);
          
        } else {
          minutes = 0;
        }
        time = hours + minutes;
      } else if (int_format != null) {
        // Entries over 15 hours are likely intended to be minutes.
        time = parseInt(time);
        if (maximum_hours > 0 && time > maximum_hours) {
          time = (time/60).toFixed(decimal_places);
        }
      }
    
      // make sure what ever we return is a 2 digit float
      time = parseFloat(time).toFixed(decimal_places);
      console.log('time' + time);
      return time;  
    }
   
    
//     let SearchEntry = () => { // function to search entry from DB in device storage
//       save();
//       db.transaction((tx) => {
//      tx.executeSql(
//        //SQL Statement to search all Entries for a given date
//       'SELECT * FROM Timesheet WHERE date = ? ORDER BY arrival',
//       [currentDate],
//        (tx, results) => {  //----------------------> getting results back from querying the SQL Statement
//          var temp = [];                   //declaring an empty array
//          var len = results.rows.length;   //var to get length of result from the SQL Statement

//          console.log('len', len);
//          if(len >= 0 ) {                   //if length of result >= 0
          
//            for (let i = 0; i < results.rows.length; ++i) {
//              temp.push(results.rows.item(i)); //populate Temp array with values we get from results varaible(i.e  result from the SQL Statement)
//            }
//            setFlatListItems(temp);        //Update the state value
//             console.log(temp)
//          } else {
//            alert('Cannot Search Entry!');
//          }
//                        }
//      );
//                      });

//           db.transaction((tx) => {
//           tx.executeSql(
//             //SQL Statement to get Total Hours for a given date
//           'SELECT totalHrs FROM Timesheet WHERE date = ?',
//           [currentDate],
//           (tx, results) => { //----------------------> getting results back from querying the SQL Statement
//           var temp = [];     //declaring an empty array to hold the entries from the result
//           let sum = 0 ;       //var to intialise sum
//           var tot = [];       //declaring an empty array to hold Hours from each entry for the given date

//           var len = results.rows.length;  //var to get length of result from the SQL Statement

//           console.log('len', len);
//           if(len >= 0 ) {     //if length of result >= 0

//           for (let i = 0; i < results.rows.length; ++i) 
      
//           temp.push(results.rows.item(i)); //populate Temp array with values we get from results varaible(i.e  result from the SQL Statement)
        
//            temp.forEach((item) => {  //For each entry in Temp array
            
//              tot.push(filterTimeFormat(item.totalHrs)); //populate ToT array with values we get from results varaible(i.e TotalHrs for each entry from the SQL Statement)
//           })
//            tot.forEach(function (i){
//              sum = sum + parseFloat(i); //add all Hrs in Tot arr
//            }) 
          
//           var n = new Date(0,0);
//           n.setSeconds(+sum * 60 * 60);
//           settotalHrsforday(n.toTimeString().slice(0,5));
//           console.log('sum: ' + sum + ' TOT: ' + tot + 'time: ' + n.toTimeString().slice(0,5));
//           } 
//           else {
//           alert('Cannot Search Entry!');
//           }
//         }
            
//           );
//           });
// };


// let deleteEntry = (IDtimesheet) => { //function to delete an entry from DB
//   db.transaction((tx) => {
//     console.log("Sample " + IDtimesheet); 
//     tx.executeSql(
//       //SQL Command to delete an entry from DB
//       'DELETE FROM Timesheet WHERE id_timesheet = ?',
//       [IDtimesheet],
//       (tx, results) => {
//         console.log('Results', results.rowsAffected);
//         if (results.rowsAffected > 0) {
//           Alert.alert(
//             'Sucess',
//             'Entry removed from Dataase',
//             [
//               {
//                 text: 'Ok',
//                 onPress: SearchEntry()
//               }
//             ],
//             { cancelable: false }
//           );
//         } else {
//           alert('Entry could not be deleted');
//         }
//       }
//     );
//   });
// };

// let DOWEntry = () => { //function to delete an entry from DB 
//   db.transaction((tx) => {
//     tx.executeSql(
//       //SQL Insert Statement to insert a Lunch entry into Timesheet Table 5 times for 5 different days of the week
//       'SELECT dayoftheweek FROM Timesheet WHERE eow = ? AND projNum !="Lunch"',
//       [Week],
//       (tx, results) => {  // ----------------------------------------> getting results back from querying the SQL Statement
//         console.log('Results', results.rows.length);
//         var temp = [];
//         var len = results.rows.length; 
//          if (len >= 0) {  //If length to results returned is greater than 0, then the entry is added succesfully
//           for (let i = 0; i < results.rows.length; ++i) 
//           {
//             temp.push(results.rows.item(i)); //populate Temp array with values we get from results varaible(i.e  result from the SQL Statement)
//           }
//           var finalTemp = temp.map(function (obj)
//           {
//             return obj.dayoftheweek
//           }); 
//           console.log(finalTemp); 
//           var arr = ['monday','tuesday','wednesday','thursday','friday'];//declaring an empty array
//             var diff  = arr_diff(finalTemp, arr);
//             console.log(diff)
            
//             if (diff != '')
//             {
//                alert('You have not entered entries for this date ' + diff )
//                console.log('Diff ' + diff);
//             } else {
//               console.log('All days have DOW Entry')
//             }

//               db.transaction((tx) => {
//                 tx.executeSql(
//                    //SQL Insert Statement to insert a Lunch entry into Timesheet Table 5 times for 5 different days of the week
//                    'SELECT dayoftheweek FROM Timesheet WHERE projNum = "Lunch" AND eow = ?',
//                    [Week],
//                    (tx, results) => {  // ----------------------------------------> getting results back from querying the SQL Statement
//                      console.log('Results', results.rows.length);
//                      var temp = [];
//                      var len = results.rows.length; 
//                       if (len >= 0) {  //If length to results returned is greater than 0, then the entry is added succesfully
//                        for (let i = 0; i < results.rows.length; ++i) {
//                          temp.push(results.rows.item(i)); //populate Temp array with values we get from results varaible(i.e  result from the SQL Statement)
//                        }
//                        var finalTemp = temp.map(function (obj){
//                          return obj.dayoftheweek
//                        }); 
//                        console.log(finalTemp); 
//                        var arr = ['monday','tuesday','wednesday','thursday','friday'];//declaring an empty array
//                        var diff  = arr_diff(finalTemp, arr);
//                        console.log(diff)
//                        if (diff != '')
//                        {
//                           alert('There Is no Lunch listed for these days ' + diff );
//                           console.log('Diff ' + diff);
//                        }
                      
//                        else
//                        {
//                          Alert.alert(
//                            'Sucess',
//                            'You have submitted your timesheet for the week',
//                            [
//                              {
//                                text: 'Ok',
//                                onPress: deleteHandler()
//                              }
//                            ],
//                          );
//                        }
                     
//                      }
                
//                }
//                 )});
              
        
//     }})
//   })};


// const LOWEntry = () => {
//   db.transaction((tx) => {
//     tx.executeSql(
//        //SQL Insert Statement to insert a Lunch entry into Timesheet Table 5 times for 5 different days of the week
//        'SELECT dayoftheweek FROM Timesheet WHERE projNum = "Lunch" AND eow = ?',
//        [Week],
//        (tx, results) => {  // ----------------------------------------> getting results back from querying the SQL Statement
//          console.log('Results', results.rows.length);
//          var temp = [];
//          var len = results.rows.length; 
//           if (len >= 0) {  //If length to results returned is greater than 0, then the entry is added succesfully
//            for (let i = 0; i < results.rows.length; ++i) {
//              temp.push(results.rows.item(i)); //populate Temp array with values we get from results varaible(i.e  result from the SQL Statement)
//            }
//            var finalTemp = temp.map(function (obj){
//              return obj.dayoftheweek
//            }); 
//            console.log(finalTemp); 
//            var arr = ['monday','tuesday','wednesday','thursday','friday'];//declaring an empty array
//            var diff  = arr_diff(finalTemp, arr);
//            console.log(diff)
//            if (diff != '')
//            {
//               alert('There Is no Lunch listed for these days ' + diff );
//               console.log('Diff ' + diff);
//            }
          
//            else
//            {
//              Alert.alert(
//                'Sucess',
//                'You have submitted your timesheet for the week',
//                [
//                  {
//                    text: 'Ok',
//                    onPress: deleteHandler()
//                  }
//                ],
//              );
//            }
         
//          }
    
//    }
//     )});
// }

//   const combiner = () => {
//    // LOWEntry();
//     DOWEntry();
//   }
  

//   const arr_diff = (a1, a2) => {

//     var a = [], diff = [];

//     for (var i = 0; i < a1.length; i++) {
//         a[a1[i]] = true;
//     }

//     for (var i = 0; i < a2.length; i++) {
//         if (a[a2[i]]) {
//             delete a[a2[i]];
//         } else {
//             a[a2[i]] = true;
//         }
//     }

//     for (var k in a) {
//         diff.push(k);
//     }

//     return diff;
// }


// const searchnDestroy  = () => 
// {
//   hide_LModal();
//   SearchEntry();
  
// }


// const setCheckBox = (newValue) => {
//   setToggleCheckBox(newValue);
//   calcTotalHrs();
// }

// const sow_lunch = () => {
//   if (moment(Week).day("Monday").format('MMM Do') == moment().format('MMM Do') || moment(Week).day("Tuesday").format('MMM Do') == moment().format('MMM Do') || moment(Week).day("Wednesday").format('MMM Do') == moment().format('MMM Do') || moment(Week).day("Thursday").format('MMM Do') == moment().format('MMM Do') || moment(Week).day("Friday").format('MMM Do') == moment().format('MMM Do')) {
//     setModalVisible(true);
//   } else {
//     setModalVisible(false);
//   }
// }

// const find_lunch = () => {
//   db.transaction(function (tx) {
//     tx.executeSql(
//       'SELECT * FROM Timesheet WHERE projNum = "Lunch"',
//       [],
//       (tx, results) => {
//         var temp = [];
//        var len = results.rows.length;
//        console.log('len', len);
//        if(len > 0 ) {
//          for (let i = 0; i < results.rows.length; ++i) 
//          temp.push(results.rows.item(i));
//          if(len <= 0)
//          {
//             console.log('Lunch check!')
//          }
//          else{
//             console.log("There is a Lunch already");
//          }
//        } 
//        else {
//         sow_lunch();
//        }
//       }
//     );
//   });
// }

// const time_clash = () => {
//   db.transaction(function (tx) {
//     tx.executeSql(
//       'SELECT * FROM Timesheet WHERE ? < depart AND ? > arrival AND date=?',
//       [frTimes, frFinTimes ,currentDate],
//       (tx, results) => {
//         var temp = [];
//        var len = results.rows.length;
//        console.log('len', len);
//        if(len >= 0 ) {
//          for (let i = 0; i < results.rows.length; ++i) 
//          temp.push(results.rows.item(i));
//          if(len <= 0)
//          {
//             console.log("Time Slot Available " + temp);
//             add_lunch();
//          }
//          else{
//             console.log("Error")
//             alert('There is a timesheet conflict, select a different time');
//          }
//        } 
//        else {
//          alert('Cannot Search Entry!');
//        }
//       }
//     );
//   });
// }

// const hide_LModal = () => {
//   SearchEntry();
//   setModalVisible(false);
// }



// const add_lunch = () => {
//   console.log( 1, selectedWeek, currentDate, 'Lunch', 'Lunch', frTimes, frFinTimes, Thrs, 'Lunch', dayoftheWeek);

//   if(toggleCheckBox == false)
// {

//   db.transaction(function (tx) {
//     tx.executeSql(
//       'INSERT INTO Timesheet(user_id, eow, date, projNum, comment , arrival, depart, siteID, totalHrs, dayoftheweek) VALUES (?,?,?,?,?,?,?,?,?,?)',
//       [1, selectedWeek, currentDate, 'Lunch', 'Lunch', frTimes, frFinTimes, 'Lunch', Thrs, dayoftheWeek],
//       (tx, results) => {
//         console.log('Results', results.rowsAffected);
//         if (results.rowsAffected > 0) {
//           Alert.alert(
//             'Sucess',
//             'Entry added succesfully to DB !!!',
//             [
//               {
//                 text: 'Ok',
//                 onPress: searchnDestroy(),
//               },
//             ],
//             { cancelable: false }
//           );
//         } else alert('Error Entry unsuccesfull !!!');
//       }
//     );
//     //save()
//   });
// }

// else if (toggleCheckBox == true)
// {
// db.transaction(function (tx) {
//   tx.executeSql(
//     'INSERT INTO Timesheet(user_id, eow, date, projNum, comment , arrival, depart, totalHrs, siteID, dayoftheweek) VALUES (?,?,?,?,?,?,?,?,?,?), (?,?,?,?,?,?,?,?,?,?), (?,?,?,?,?,?,?,?,?,?), (?,?,?,?,?,?,?,?,?,?), (?,?,?,?,?,?,?,?,?,?)',
//     [1, selectedWeek, moment(selectedWeek).day("Monday").format('L'), "Lunch", 'Lunch', frTimes, frFinTimes, Thrs, 'Lunch', dayoftheWeek , 
//     1, selectedWeek, moment(selectedWeek).day("Tuesday").format('L'), 'Lunch', 'Lunch', frTimes, frFinTimes,  Thrs, 'Lunch', dayoftheWeek , 
//     1, selectedWeek, moment(selectedWeek).day("Wednesday").format('L'), 'Lunch', 'Lunch', frTimes, frFinTimes,  Thrs, 'Lunch', dayoftheWeek ,
//     1, selectedWeek, moment(selectedWeek).day("Thursday").format('L'), 'Lunch', 'Lunch', frTimes, frFinTimes, Thrs, 'Lunch', dayoftheWeek ,
//     1, selectedWeek, moment(selectedWeek).day("Friday").format('L'), 'Lunch', 'Lunch', frTimes, frFinTimes, Thrs, 'Lunch', dayoftheWeek ],
//     (tx, results) => {
//       console.log('Results', results.rowsAffected);
//       if (results.rowsAffected > 0) {
//         Alert.alert(
//           'Sucess',
//           'Entry added succesfully to DB !!!',
//           [
//             {
//               text: 'Ok',
//               onPress: searchnDestroy(),
//             },
//           ],
//           { cancelable: false }
//         );
//       } else alert('Error Entry unsuccesfull !!!');
//     }
//   ); 
//   //save()
// });

// }
// };


//  const save = async () => {
//     try{
//       await AsyncStorage.setItem("MyWeekEnding", Week)
//       await AsyncStorage.setItem("MyDays", dayoftheWeek)
//     }
//     catch (err)
//     {
//       alert(err)
//     }
//   };

//   const load = async () => {
//     try{
//      let Week = await AsyncStorage.getItem("MyWeekEnding")
    
//      if(Week !== null)
//      {
//       setWeek(Week)
//      }
     
   

//     }
//     catch (err){
//       alert(err)
//     }
//   };

//   React.useEffect(() => {
//     load();
//   },[])

   const onDelete = (IDtimesheet) => {
    deleteEntry(IDtimesheet);
  }
const displayResp = (item) => {
  navigation.navigate("PlayerResponse", item.id);
}
//   const onEdit = (item) => {
//     navigation.navigate('EditEvent', {Date: item.currentDate, Days:item.dayoftheWeek, Week:item.Week, StartTime:item.frTimes, EndTime:item.frFinTimes, TotalHrs:item.Thrs, selectedWeek:item.selectedWeek, Project:item.projNum, Site:item.siteID, Desc:item.comment})
//   }
const RemoveTBL = (item) => {
  var coll = db.collection('attendance').doc(item.id).collection('responses');

  
  coll.get().then((querySnapshot)=> {
    Promise.all(querySnapshot.docs.map((d)=> d.ref.delete()))
  })
  .then(() => {
    console.log(item.id,'Table deleted!');
  });
}
const deleteUser = async (item) => {
  const dbRef = db.collection('events').doc(item.id);
  await dbRef.delete();
}

  let swipeBtns = (item) => [
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
      onPress: () => {deleteUser(item),RemoveTBL(item)}
   },
   {
    text: 'Responses',
    backgroundColor: 'green',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
    onPress: () => {displayResp(item.id)}
 }
  ];

  useEffect(() => {

    db.collection('events').onSnapshot(querySnapshot => {
  
      const eventList = [];
  
  
  
      querySnapshot.docs.forEach( doc => {
  
        const {name, selectedWeek, currentDate,projNum, description, frTimes,frFinTimes,Thrs,siteID,dayoftheWeek} = doc.data()
  
        eventList.push({
          id: doc.id,
          name,
          selectedWeek,
          currentDate,
          projNum,
          description,
          frTimes,
          frFinTimes,
          Thrs,
          siteID,
          dayoftheWeek
  
        })
  
      });
  
      setEventData(eventList)
      console.log(eventData)
    });
    
    }, [navigation, route]);
  
   
    return (
      <SafeAreaView style={styles.container1}>
         <View style={{ justifyContent: 'flex-start', padding: 15 }}>
        <Image source={profile} style={{
          width: 60,
          height: 60,
          borderRadius: 10,
          marginTop: 12
        }}></Image>

        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'white',
          marginTop: 20
        }}>John Doe</Text>

        <TouchableOpacity>
          <Text style={{
            marginTop: 6,
            color: 'white'
          }}>View Profile</Text>
        </TouchableOpacity>

        <View style={{ flexGrow: 1, marginTop: 50 }}>
          {
            // Tab Bar Buttons....
          }

          {TabButton(currentTab, setCurrentTab, "Home", home)}
          {TabButton(currentTab, setCurrentTab, "Hour", search)}
          {TabButton(currentTab, setCurrentTab, "TS Review", notifications)}
          {TabButton(currentTab, setCurrentTab, "Settings", settings)}

        </View>

        <View>
          {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
        </View>

      </View>
      {
        // Over lay View...
      }

      <Animated.View style={{
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal:  Platform.os === 'ios'? 15: 0 ,
        paddingVertical: 20,
        borderRadius: showMenu ? 15 : 0,
        // Transforming View...
        transform: [
          { scale: scaleValue },
          { translateX: offsetValue }
        ]
      }}>

        {
          // Menu Button...
        }

        <Animated.View style={{
          transform: [{
            translateY: closeButtonOffset
          }]
        }}>
  <View style={styles.top}>
        <View>
        <Image source={logo} style={styles.avatar}></Image>
        </View>

 </View>
      
<Text style={{marginLeft: 8, marginTop: -10, fontSize: 20, color: 'black', fontWeight: 'bold'}}>Week Ending</Text>


      <View style={{
        marginTop: 10,
        height: 100,
        width:400,
        marginLeft: -10,
        backgroundColor: '#FFBE70',
        borderRadius: 20, 
        marginLeft:  Platform.os === 'ios'? 0: 7.5 ,       
      }}>
      
        <WeekSelector
        whitelistRange={[new Date(2018, 7, 13), new Date()]}
        weekStartsOn={1}
        onWeekChanged={saveWEEK}
      />

      </View>
      
        <Text style={styles.line}>   Swipe the event left to Delete</Text>
          <Animated.FlatList 
    data={eventData}
    onScroll={
        Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            { useNativeDriver: true}
        )
    }
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={{
      padding:  Platform.os === 'ios'? SPACING : 0 ,
        paddingTop: Platform.os === 'ios'? StatusBar.currentHeight : 50 
    }}
     
    renderItem={({item, index}) => {
      
      const isSelected = (selectedItem === item.id_timesheet);
        const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2)
        ]
        const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1)
        ]

        const scale = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0]
        })

        const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0]
        })

        return  <Swipeout right={swipeBtns(item)}
            autoClose= {true}
            backgroundColor= 'transparent'>
            <Animated.View style={{
            flexDirection: 'row', 
            padding: SPACING, 
            marginBottom: SPACING, 
            backgroundColor: 'rgba(255,255,255,0.8)', 
            borderRadius: 12,
            shadowColor: 'black',
            shadowOffset: {
                width: 10,
                height: 10
            },
            shadowOpacity: 3,
            shadowRadius: 10,
            opacity,
            transform: [{scale}],
            marginTop : Platform.os === 'ios'? null: 30 
            
        }}
        >
           <View>

           </View>
            <View>
            <Text style={{backgroundColor: "#FFBE70", paddingHorizontal: 25, paddingTop: 5, borderRadius: 10, height: 40, fontSize: 20, fontWeight: 'bold', color: 'black' ,width: 300, marginTop: 5, marginLeft: -20}}>Day of The Week: {item.dayoftheWeek}</Text>
            <Text style={{fontWeight: '700', fontSize: 24, color: '#091629'}}>{item.projNum}  </Text> 
            <Text style={{color: '#091629', fontSize: 15}}>  {item.projNum} - {item.siteID}</Text>
            <Text style={{fontWeight: '700', fontSize: 14, color: '#091629'}}>  {item.frTimes} - {item.frFinTimes}     Duration : {item.Thrs}</Text>  
        </View>        
        </Animated.View>   
        </Swipeout>
    }}
    
    />
    <View>
    
   
  </View>  
   
  
      </Animated.View>
      <ActionButton  buttonColor="#FFBE70">
          <ActionButton.Item buttonColor='#1abc9c' title="Add Event" onPress={pressHandler}>
            <Icon name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </Animated.View>
      </SafeAreaView>
);
            
   }
    /*
    <View style={{marginLeft: -200, marginTop: -550}}>
              
          
            </View>
           
    */
   
   const styles = StyleSheet.create({
       container:{
         backgroundColor: colors.themeColor,
         alignItems: 'center',
           justifyContent: 'center',
           flex: 1,
           paddingBottom: 150
           },

           top: {
            padding:2,
            marginLeft:-20,
            marginTop:-70,
            marginBottom: 20,
            width: '110%',
            height: 125,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#FF8C00',
            },

            avatar: {
              alignSelf:'center',
              marginTop:85,
              marginLeft:-260,
              width: 200,
              height: 18,
            },

           container1:{
            flex: 1,
            backgroundColor: '#091629',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
              },
           actionButtonIcon: {
            fontSize: 20,
            height: 22,
            color: 'white',
          },
          
          modst: {
            justifyContent: 'flex-end',
            margin: 0,
          },
         text:{
           alignItems: 'center',
           marginTop:20,
           justifyContent: 'center'
           },
           listItem: {
            flexDirection: 'row',
            marginTop: 5,
        },
    
        SelectedlistItem: {
            flexDirection: 'row',
            marginTop: 5,
            backgroundColor:"grey",
        },
   
       icons:{
           alignItems: 'center',
           color:'white',
           marginBottom:200,
           justifyContent: 'center'
           },
           date: {
            flex: 1,
            fontWeight: 'bold',
            justifyContent: 'center',
          },
          weekstyle: {
            marginTop: -400
          },
   
           text1:{
             alignItems: 'center',
             marginTop: -50,
             marginBottom: 75,
             justifyContent: 'center'
             },
             textheader: {
              color: '#111',
              fontSize: 12,
              fontWeight: '700',
          
            },
            textbottom: {
              color: '#111',
              fontSize: 18,
            },
            accordion:{
              width: '90%',
              backgroundColor: '#F2F2F7',
              borderRadius: 10,
              padding:20,
              justifyContent: 'center'
            },
            accordionHeader: {
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              marginVertical: 10,
              backgroundColor: 'white',
              borderRadius: 5,
              padding:10,    
          
            },
            accordionTitle: {
              fontSize: 20, 
              fontWeight:'bold',
              marginBottom: 20,
              color: '#62625A'
            },
            accordionItems: {
              borderRadius: 5,
              backgroundColor:'white',
          
            },
            accordionItemValue:{
              flexDirection: 'row',
              justifyContent:"space-between",
              padding: 10,
          
            },
            accordionItemValueBadge: {
              color: '#42C382',
              padding: 5,
              fontWeight: 'bold'
            },
            accordionItemValueName: {
              color: '#62625A'
            },
            onePickerItems: {
              height: 44,
              color: 'blue',
            },
            tableHeader: {
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
              backgroundColor: "#09253a",
              borderTopEndRadius: 10,
              borderTopStartRadius: 10,
              height: 50,
              width: 350
            },
            tableRow: {
              flexDirection: "row",
              height: 50,
              alignItems:"center",
            },
            columnHeader: {
              width: "20%",
              justifyContent: "center",
              alignItems:"center"
            },
            columnHeaderTxt: {
              color: "white",
              fontWeight: "bold",
            },
            columnRowTxt: {
              width:"20%",
              textAlign:"center",
            },
            startTime:{
              marginLeft: -200,
              width: 140
             },
  
             endTime:{
              marginLeft: 200,
              marginTop: -38,
              width: 140
             },

            modalView: {
              margin: 20,
              backgroundColor: "white",
              borderRadius: 20,
              padding: 35,
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5
            },
            button: {
              backgroundColor: '#091629',
              borderRadius: 20,
              padding: 10,
              elevation: 2
              
            },
            buttonOpen: {
              backgroundColor: "#091629",
            },
            buttonClose: {
              backgroundColor: "#2196F3",
            },
            sameWeek: {
              marginTop: -25,
              marginLeft: 20,
              marginBottom: 20,
              color: 'black'
            },
      
            check: {
              marginLeft: -150,
               marginTop: 15,
              color: 'black'
            },
      
            textStyle: {
              backgroundColor: '#091629',
              color: "white",
              fontWeight: "bold",
              textAlign: "center"
            },
            modalText: {
              marginBottom: 15,
              textAlign: "center"
            },

            Weekarrow:{
              height: 100,
              width:353,
              marginTop:-37,
              marginBottom: 10,
              backgroundColor: '#87CEEB',
              fontWeight: 'bold',
              borderWidth: 0,
              borderColor: 'white',
             },
             delstyle:{
               backgroundColor: '#037272',
               padding: 10,
               borderRadius: 8,
               fontWeight: 'bold',
               color: '#fff'
             },
             edtbtn:{
               flexDirection: 'column',
               
              backgroundColor: '#eb864b',
              padding: 10,
              borderRadius: 8,
              fontWeight: 'bold'
             },
             head: {
              padding:0,
              marginLeft:-15.5,
              marginTop: -20,
              width: 450,
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#091629',
              borderTopLeftRadius: 10
              },
              
              headText: {
              fontWeight: 'bold',
              fontSize: 20,
              color: 'whitesmoke',
              letterSpacing: 1,
              marginBottom:-18,
              marginLeft: -20
              },

              line: {
                fontWeight: 'bold',
                fontSize: 18,
                marginLeft:32,
                marginTop: 20,
                color: 'black',
                letterSpacing: 0.5,
                marginBottom:-48
                },
              
     });