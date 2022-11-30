import { SetStateAction, useEffect, useState } from "react";
import {writeUserData, getUserData} from "../api/db";
import { getDatabase, ref, onValue} from "firebase/database";

const Websockets = () => {

    useEffect(() => {
        const db = getDatabase();
        const testRef = ref(db, 'test/' + 0 + '/message');
        
        onValue(testRef, (snapshot) => {
            const data = snapshot.val();
            console.log('response: ' + data);
            addNewMessage(data);
            //updateStarCount(postElement, data);
        });
        
    }, []);

    return (
        <>
            <div className="">
                <h1>Websockets</h1>
                <div>
                    <label htmlFor="enterHere"></label>
                    <input  id='enterHere' 
                            title='send message'
                            type="text" 
                            name='message' 
                            defaultValue='' 
                            className='border-4 border-blue-400'/>
                </div>
                <button type='button' onClick={saveMessage} className='border-4 border-blue-400'>Send</button>
            </div>
            <div>
                <h1>Messages</h1>
                <div id='messages'></div>
            </div>
        </>
    );
}

function saveMessage() {
    const message: string = document.getElementById('enterHere')!.value;
    console.log('writing message: ' + message);
    writeUserData(message);

    const messages = document.getElementById('messages');

    // var a = getUserData();
    // console.log(a);
    // .then((data) => {
    //     console.log(data)
    //     //messages!.innerHTML += data;
    // }, (error) => {
    //     console.log("error!!!");
    // });
}

function addNewMessage(message: string) {
    const messages = document.getElementById('messages');
    messages!.innerHTML += message + '<br>';
}

export default Websockets;