import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import Constants from "expo-constants";


const firebaseconfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    databaseURL: Constants.manifest.extra.databaseURL,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId
    //measurementId: "G-SB5K0TMJNZ"
};

const app = firebase.initializeApp(firebaseconfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
