import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { randomUUID } from "crypto";

import { Message, MessageClass, database } from "../pages/api/db";



const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const db = database;
        const messagingRef = ref(db, "messaging/global/");

        onValue(messagingRef, (snapshot) => {
            const data = snapshot.val();

            const messagesResp: MessageClass[] = Object.values(data);

            messagesResp.forEach((message: Message) => {
                console.log(message);
            });

            //addNewMessage(data);
            setMessages(() => [...messagesResp.filter((message) => message.messageId !== undefined && message.message.length > 0)
                                              .sort((a, b) => a.timestamp - b.timestamp)                  
                              ]);
            //updateStarCount(postElement, data);
        });
    }, []);

    const sendMessage = () => {
        const message: string = (document.getElementById("messageBox") as HTMLInputElement).value;

        // dont send if no message
        if (message.length === 0) {
            return;
        }
        
        let messageObj = new MessageClass(message, Date.now(), "test", "test" + Math.floor(Math.random() * 1000));
        //messageObj.logMessage();

        const db = getDatabase();
        const messagingRef = ref(db, "messaging/global/" + messageObj.messageId);

        console.log("writing message to db: " + messageObj.message)
        set(messagingRef, messageObj);

        // clear the message box
        (document.getElementById("messageBox") as HTMLInputElement).value = "";
    };

    return (
        <div className="chat-box">
            <h1 className="dark:text-white">Messages</h1>
            <div id="messages">
                {messages.map((message) => (
                    <div key={message.messageId} className="dark:text-white dark:border-white border-2 rounded-sm">
                        <p>{message.message}</p>
                        <p>{"Sent on " + (new Date(message.timestamp).toLocaleString() + " by " + message.username)}</p>
                    </div>
                ))}
            </div>
            <div id="addNewMessage">
                <label htmlFor="enterHere" className="dark:text-white">New message</label>
                <input
                    id="messageBox"
                    title="send message"
                    type="text"
                    name="message"
                    defaultValue=""
                    className="border-4 border-blue-400"
                />
                <button type="button" className="border-2 rounded-md border-blue-200 dark:text-white" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;