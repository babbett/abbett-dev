import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref, set } from "firebase/database";
import { getDateForDB, IMessage } from '../pages/api/db';
import User from './User';

export class Message implements IMessage {
    id: string;
    message: string;
    timestamp: number;
    userId: string;

    constructor({ message, userId }: { message: string; userId: string }) {
        if (message.length === 0) {
            throw new Error("Message cannot be empty");
        } else if (userId.length === 0) {
            throw new Error("Username cannot be empty");
        }
        
        this.userId = userId;
        this.message = message;
        this.timestamp = Date.now();
        this.id = uuidv4();
        console.log(this.id)
    }


    logMessage() {
        console.log("The message: " + this.message + ", was sent at " + this.timestamp + " by " + this.userId + " with id " + this.id);
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
            const messagingRef = ref(db, `messaging/${destination}/${getDateForDB(date)}/${this.id.toString()}`);
    
            console.log("writing message: " + this.message + " to " + destination);
            set(messagingRef, this);
        }
        catch (error) {
            console.error(`Failed to send message with ID: ${this.id} to ${destination}`);
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
    static send(message: string, userId: string, destination: string) {
        // Create the message
        const messageObj = new Message({ message, userId });

        // Send it
        try {
            messageObj.send(destination);
        }
        catch (error) {
            console.error(`Failed to send message with ID: ${messageObj.id} to ${destination}`);
            throw new Error("Failed to send message");
        }
    }
}