import { getDatabase, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { getDateForDB, IUser } from '../pages/api/db';

export default class User implements IUser {
    id: string;
    username: string;
    icon: string;

    constructor({ username }: { username: string; }) {
        if (username.length === 0) {
            throw new Error("Username cannot be empty");
        }
        
        this.username = username;
        this.id = uuidv4();
        this.icon = '';
    }

    logUser() {
        console.log("The user: " + this.username + ", has id " + this.id);
    }

    addIcon(icon: string) {
        this.icon = icon;
    }

    addUsername(username: string): void {
        this.username = username;
    }

    addToDB() {
        // Send the message
        try {
            const db = getDatabase();
            const messagingRef = ref(db, `users/${this.id}`);

            console.log("writing user: " + this.username + " to " + `users/${this.id}`);
            set(messagingRef, this);
        }
        catch (error) {
            console.error(`Failed to add user with ID: ${this.id} to users/${this.id}`);
            throw new Error("Failed to add user");
        }
    }
}