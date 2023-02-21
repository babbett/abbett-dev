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
        <div className="grid grid-rows-6 gap-1 chat-box h-80">
            <h1 className="dark:text-white text-center text-3xl">Messages</h1>
            <div className="row-span-4 overflow-y-auto px-2" id="messages">
                {messages.map((message) => (
                    <SingleMessage message={message} key={message.messageId} />
                ))}
            </div>
            <div className="" id="addNewMessage">
                <input
                    id="messageBox"
                    title="send message"
                    type="text"
                    name="message"
                    defaultValue=""
                    className="border-4 border-blue-400"
                    maxLength={1000}
                />
                <button type="button" className="border-2 rounded-md border-blue-200 dark:text-white" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

const SingleMessage = (props: { message: Message }) => {
    return (
        <div className="dark:text-white mb-2 w-fit">
            <p className="w-fit dark:border-white border-2 rounded-lg px-2 py-1">{props.message.username + ": " + props.message.message}</p>
            <p className="w-fit mr-2">{new Date(props.message.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default ChatBox;