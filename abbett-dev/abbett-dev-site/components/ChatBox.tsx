import { useState, useEffect } from "react";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { parse, v4 as uuidv4 } from 'uuid';

import { MessageClass as Message, database, getDateForDB } from "../pages/api/db";



const ChatBox = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState<string>("");
    var lastMessageId = messages[messages.length - 1]?.messageId;

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
        const messageTxt: string = (document.getElementById("messageBox") as HTMLInputElement).value;
        if (messageTxt.length === 0) {
            return;
        }

        let message = new Message({ message: messageTxt, username });
        lastMessageId = message.messageId;

        try {
            message.send("global");
            (document.getElementById("messageBox") as HTMLInputElement).value = "";
        }
        catch (e) { console.log(e); }
    };

    const addUsername = () => {
        const username: string = (document.getElementById("usernameBox") as HTMLInputElement).value;
        if (username.length === 0) {
            return;
        }

        setUsername(() => username);
        scrollToLastMessage();
    };

    const scrollToLastMessage = () => {
        var lastMessage = document.getElementById(lastMessageId);
        if (lastMessage !== null) {
            lastMessage.scrollIntoView();
        }
    };

    // get the id of the last message

    // focus on the div with the id of the last message
    useEffect(() => {
        console.log(lastMessageId)
        if (lastMessageId !== undefined && username.length > 0) {
            var lastMessage = document.getElementById(lastMessageId);
            if (lastMessage !== null) {
                lastMessage.scrollIntoView();
            }
        }
    }, [lastMessageId, username]);

    if (username === "") {
        const defaultUsername = `User-${uuidv4().slice(0, 7)}`;

        return (
            <div className="w-fit chat-box no-username mx-auto">
                <label htmlFor="usernameBox" className="dark:text-white text-3xl">Please enter a username: </label>
                <div className="flex py-2 px-1">
                    <input
                        id="usernameBox"
                        title="set username"
                        type="text"
                        name="username"
                        defaultValue={defaultUsername}
                        className="flex-auto rounded-md"
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
        <div className="flex flex-col h-full chat-box">
            <h1 className="flex-none dark:text-white text-center text-3xl">Messages</h1>
            <div className="flex-auto max-h-full overflow-y-auto px-2" id="messages">
                {messages.map((message) => (
                    <SingleMessage message={message} key={message.messageId} />
                ))}
            </div>
            <div className="flex-none h-10" id="addNewMessage">
                <div className="flex rounded-xl border-2 bg-white dark:border-white p-2">
                    <input
                        id="messageBox"
                        title="send message"
                        type="text"
                        name="message"
                        defaultValue=""
                        className="flex-auto rounded-md"
                        maxLength={1000}
                        onKeyDown = {(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                            // animate button?
                        }}
                    />
                    <button type="button" className="flex-none ml-1 rounded-md hover:text-sky-500" onClick={sendMessage}>
                        Send <i className="fa fa-paper-plane"></i>
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
        <div id={props.message.messageId} className="dark:text-white mb-2 w-fit">
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

const MessageList = (props: { messages: Message[] }) => {
    return (
        <div className="max-h-full overflow-y-auto px-2" id="messages">
            {props.messages.map((message) => (
                <SingleMessage message={message} key={message.messageId} />
            ))}
        </div>
    );
}

export default ChatBox;
