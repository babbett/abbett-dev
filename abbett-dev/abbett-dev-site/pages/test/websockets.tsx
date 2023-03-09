import { SetStateAction, useEffect, useState } from "react";
import {writeUserData, getUserData} from "../api/db";
import { getDatabase, ref, onValue} from "firebase/database";
import ChatBox from "../../components/ChatBox";

const Websockets = () => {
    return (
        <div>
            <h1 className="dark:text-white">NEW Messages component test</h1>
            <div className="w-1/2 h-96">
                <ChatBox />
            </div>
        </div>
    );
}

export default Websockets;