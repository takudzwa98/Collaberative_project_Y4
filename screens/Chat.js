import React,{
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
} from 'firebase/firestore';
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";


export default function Chat() {
    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();

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

    return(
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
    )
}