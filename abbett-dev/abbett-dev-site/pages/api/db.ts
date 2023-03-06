// Manage the firebase database
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set } from "firebase/database";
import { parse, v4 as uuidv4 } from 'uuid';


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
export const database = getDatabase(app);

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

/**
 * The database stores the messages in a folder structure based on the date, 
 * this function converts a date to the format used by the database (month-day-year)
 * @param date The date to convert
 * @returns An object containing the day, month, and year
 */
export function getDateForDB(date: Date) {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();
    return `${month}-${day}-${year}`;
}

export interface Message {
    message: string;
    timestamp: number;
    username: string;
    messageId: string;

    logMessage(): void;
    send(destination: string): void;
}

export class MessageClass implements Message {
    message: string;
    timestamp: number;
    username: string;
    messageId: string;

    constructor({ message, username }: { message: string; username: string; }) {
        if (message.length === 0) {
            throw new Error("Message cannot be empty");
        } else if (username.length === 0) {
            throw new Error("Username cannot be empty");
        }
        
        this.username = username;
        this.message = message;
        this.timestamp = Date.now();
        this.messageId = uuidv4();
        console.log(this.messageId)
    }


    logMessage() {
        console.log("The message: " + this.message + ", was sent at " + this.timestamp + " by " + this.username + " with id " + this.messageId);
    }

    // TODO: destination should probably be a enum or something, better than just a ambiguous string
    // TODO: Maybe this should be a static method?
    /** Sends the message to the destination
     * @param destination The destination of the message
     * @throws Error if the message fails to send
     * 
     * TODO: destination should probably be a enum or something, better than just a ambiguous string
     */
    send(destination: string) {
        // Make sure it isn't empty
        if (this.message.length === 0) {
            return;
        }

        // Send the message
        try {
            // Day and is used to create a folder structure for the messages
            const date = new Date(this.timestamp);

            const db = getDatabase();
            const messagingRef = ref(db, `messaging/${destination}/${getDateForDB(date)}/${this.messageId.toString()}`);
    
            console.log("writing message: " + this.message + " to " + destination);
            set(messagingRef, this);
        }
        catch (error) {
            console.error(`Failed to send message with ID: ${this.messageId} to ${destination}`);
            throw new Error("Failed to send message");
        }
    }

    /** Allows for a message to be sent without having to create a new instance of the class 
     * 
     * @param message The message to send
     * @param username The username of the sender
     * @param destination The destination of the message
     * @throws Error if the message fails to send
     */
    static send(message: string, username: string, destination: string) {
        // Create the message
        const messageObj = new MessageClass({ message, username });

        // Send it
        try {
            messageObj.send(destination);
        }
        catch (error) {
            console.error(`Failed to send message with ID: ${messageObj.messageId} to ${destination}`);
            throw new Error("Failed to send message");
        }
    }
}