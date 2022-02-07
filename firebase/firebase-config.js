import * as firebase from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore, doc} from "firebase/firestore";
import * as storage from "firebase/storage";


const firebaseconfig = {
 apiKey: "AIzaSyC1X6ohI9NeEtmDhPLg10bfXJTCgy_v-WQ",
  authDomain: "sideline-d5964.firebaseapp.com",
  projectId: "sideline-d5964",
  storageBucket: "sideline-d5964.appspot.com",
  messagingSenderId: "648917085347",
  appId: "1:648917085347:web:7427c41fe2ae7bc156a316"
};

const app = firebase.initializeApp(firebaseconfig);
export const auth = getAuth(app);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const referenceSupport = doc(db, 'users/21-01-2022');
export const filestorage = storage.getStorage(app);
// Create a storage reference from firebase storage service
export const storageRef = storage.ref(filestorage);