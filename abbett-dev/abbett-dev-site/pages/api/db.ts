// Manage the firebase database
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { randomUUID } from "crypto";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZzredbejF41qWTY9Zk3ok3IS3cQaDGpA",
  authDomain: "abbett-dev.firebaseapp.com",
  projectId: "abbett-dev",
  storageBucket: "abbett-dev.appspot.com",
  messagingSenderId: "98785100936",
  appId: "1:98785100936:web:7154af8ffc51f93cd78b3d",
  measurementId: "G-TGC6051LNF",
  databaseUrl: "https://abbett-dev-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export function writeUserData(message: string): void {
    //const id = Math.random().toString().replace('.', '');;

    const db = getDatabase();
    
    set(ref(db, 'test/' + 0), {
        message: message
    });
}

export function getUserData() {

    const dbRef = ref(getDatabase());
    
    get(child(dbRef, 'test/' + 0)).then((snapshot) => {
        if (snapshot.exists()) {
            // return the value
            snapshot.val();
        } else {
            console.log("No data available");
            return '';
        }
    }).catch((error) => {
        console.error(error);
        return '';
    });
}