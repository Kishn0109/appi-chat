//For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyDMl54JGgu0EU411JtysNDjJphCqqyf-FA",
  authDomain: "whatts-app-clone-1aef2.firebaseapp.com",
  projectId: "whatts-app-clone-1aef2",
  storageBucket: "whatts-app-clone-1aef2.appspot.com",
  messagingSenderId: "991791830791",
  appId: "1:991791830791:web:fb777054634be525b817a2",
  measurementId: "G-2W6SZSQSYQ"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); 
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;


