import firebase from 'firebase';

class Fire {
    constructor() {
        this.init();
        this.checkAuth()
    }

    init = () => {
        if(!firebase.apps.length) {
            firebase.initializeApp({
                apiKey: "AIzaSyCH7XjXqN6jcUZ84AEsO3kv3jk76FW8IPU",
                authDomain: "sideline-3b490.firebaseapp.com",
                databaseURL: "https://sideline-3b490-default-rtdb.europe-west1.firebasedatabase.app",
                projectId: "sideline-3b490",
                storageBucket: "sideline-3b490.appspot.com",
                messagingSenderId: "518347707186",
                appId: "1:518347707186:web:815733cc8e55c9fc83bd2b",
                measurementId: "G-R959D37G2Z"             
            });
        }
    };
    checkAuth = () => {
        firebase.auth().onAuthStateChanged(user => {
            if(!user) {
                firebase.auth().signInAnonymously();
            }
        });
    };
    send = messages => {
        messages.forEach(item => {
            const message = {
                text: item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);
        });
    };

    parse = message => {
        const { user, text, timestamp } = message.val();
        const { key: _id } = message;
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
            user
        };
    };

    get = callback => {
        this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
    };

    off() {
        this.db.off()
    }

    get db() {
        return firebase.database().ref("messages");
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }
}

export default new Fire();