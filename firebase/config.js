import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCFctObqvqLcQGr9NXUbCw14HSoNF5lzgw",
    authDomain: "fir-ujian-1736b.firebaseapp.com",
    databaseURL: "https://fir-ujian-1736b-default-rtdb.firebaseio.com",
    projectId: "fir-ujian-1736b",
    storageBucket: "fir-ujian-1736b.appspot.com",
    messagingSenderId: "849855445359",
    appId: "1:849855445359:web:cb154c80e00e8ce335109a"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };