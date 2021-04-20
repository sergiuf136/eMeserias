import firebase from 'firebase';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCKaKzzd745yidDsZtvNBG20juOTwAu8Pk",
    authDomain: "emeserias-1.firebaseapp.com",
    databaseURL: "https://emeserias-1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "emeserias-1",
    storageBucket: "emeserias-1.appspot.com",
    messagingSenderId: "28416656115",
    appId: "1:28416656115:web:9db8b81f17af77b6496d86"};
  // Initialize firebase

const fire = firebase.initializeApp(firebaseConfig);

export default fire;