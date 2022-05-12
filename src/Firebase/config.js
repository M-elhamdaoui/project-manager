import firebase from "firebase";
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCgGn_CWzlr61E3G9iUFDNbUTfKJLaCDHY",
  authDomain: "project-manager-2b843.firebaseapp.com",
  projectId: "project-manager-2b843",
  storageBucket: "project-manager-2b843.appspot.com",
  messagingSenderId: "706616303647",
  appId: "1:706616303647:web:8f414ef92814bccecdf52a",
};

//initialize the app    
firebase.initializeApp(firebaseConfig);

//initialize the firestore

const db =firebase.firestore()

//initialize the auth 

const auth =firebase.auth()

//timestamp

const timestamp =firebase.firestore.Timestamp

export {db,auth,timestamp}
