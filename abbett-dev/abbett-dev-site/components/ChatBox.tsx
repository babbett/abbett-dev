import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { randomUUID } from "crypto";

import { MessageClass as Message, database, getDateForDB } from "../pages/api/db";



const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>("");

    useEffect(() => {
        // get current day for folder structure
        const date = new Date(Date.now());

        const db = database;
        const messagingRef = ref(db, `messaging/global/${getDateForDB(date)}`);

        onValue(messagingRef, (snapshot) => {
            const data = snapshot.val();

            if (data === null) {
                return;
            }

            const messagesResp: Message[] = Object.values(data);

            messagesResp.forEach((message: Message) => {
                console.log(message);
            });

            setMessages(() => [...messagesResp.filter((message) => message.messageId !== undefined && message.message.length > 0)
                                              .sort((a, b) => a.timestamp - b.timestamp)                  
                              ]);
        });
    }, []);

    const sendMessage = () => {
        const message: string = (document.getElementById("messageBox") as HTMLInputElement).value;
        if (message.length === 0) {
            return;
        }

        let messageObj = new Message({ message, username });

        try {
            messageObj.send("global");
            
            // clear the message box
            (document.getElementById("messageBox") as HTMLInputElement).value = "";
        }
        catch (e) {
            console.log(e);
        }
    };

    const addUsername = () => {
        const username: string = (document.getElementById("usernameBox") as HTMLInputElement).value;
        if (username.length === 0) {
            return;
        }

        setUsername(() => username);
    };

    if (username === "") {
        return (
            <div className="w-fit chat-box no-username mx-auto mt-2 mb-2">
                {/*enter a username*/}
                <label htmlFor="usernameBox" className="dark:text-white text-3xl">Please enter a username: </label>
                <div className="flex py-2 px-1">
                        <input
                            id="usernameBox"
                            title="set username"
                            type="text"
                            name="username"
                            defaultValue=""
                            className="flex-auto"
                            maxLength={20}
                            onKeyDown = {(e) => {
                                if (e.key === "Enter") {
                                    addUsername();
                                }
                                // animate button?
                            }}
                        />
                        <button type="button" className="flex-none ml-2 px-2 border-2 rounded-md dark:text-white" onClick={addUsername}>
                            Set
                        </button>
                    </div>
            </div>
        )
    } else {
        return (
            <div className="flex-row chat-box">
                <h1 className="flex-none dark:text-white text-center text-3xl">Messages</h1>
                <div className="flex-auto row-span-4 overflow-y-auto px-2" id="messages">
                    {messages.map((message) => (
                        <SingleMessage message={message} key={message.messageId} />
                    ))}
                </div>
                <div className="flex-none h-10" id="addNewMessage">
                    <hr className="my-2"/>
                    <div className="flex">
                        <input
                            id="messageBox"
                            title="send message"
                            type="text"
                            name="message"
                            defaultValue=""
                            className="flex-auto"
                            maxLength={1000}
                            onKeyDown = {(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                                // animate button?
                            }}
                        />
                        <button type="button" className="flex-none border-2 rounded-md dark:text-white" onClick={sendMessage}>
                            Send
                        </button>
                    </div>
                </div>
            </div>
        );
    }
};

const SingleMessage = (props: { message: Message }) => {
    const UserName = (props: { className: string, children: Message }) => {
        return <span className={props.className}>{props.children.username}</span>;
    };

    return (
        <div className="dark:text-white mb-2 w-fit">
            <div className="flex">
                <UserName className="flex-none px-2 py-1 border-2 rounded-l-lg dark:border-sky-300">
                    {props.message}
                </UserName>
                <p className="flex-auto break-words w-fit dark:border-white border-r-2 border-y-2 rounded-r-lg px-2 py-1">
                    {props.message.message}
                </p>
            </div>
            <p className="w-fit mr-2">{new Date(props.message.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default ChatBox;
