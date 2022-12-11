import { SetStateAction, useEffect, useState } from "react";
import {writeUserData, getUserData} from "../api/db";
import { getDatabase, ref, onValue} from "firebase/database";

type CellProps = {
    value: string,
    onClick: () => void,
}

type CellPos = {
    x: number,
    y: number,
}


const TicTacToe = () => {
    // use state
    //const [board, setBoard] = useState<string[][]>([['', '', ''], ['', '', ''], ['', '', '']]);
    //const [turn, setTurn] = useState<string>('X');
    //const [winner, setWinner] = useState<string>('');
    //const [gameOver, setGameOver] = useState<boolean>(false);

    useEffect(() => {
        var board = GetBoard();
        console.log(board);
    }, []);

    return (
        <>
            <div className="flex lg:flex-row-reverse flex-col px-8 py-20 border-4 border-dark dark:border-white rounded-3xl dark:text-white">
                <div className={false ? "flex-auto border-l-2" :  "hidden"}>
                    <h1 className="dark:text-white text-center text-5xl">Tic-Tac-Toe</h1>
                    <hr className="w-8/12 mx-auto my-4"></hr>
                    <div className="w-fit mx-auto grid grid-cols-3 grid-flow-row gap-3 p-5 rounded-3xl bg-gradient-to-tr from-yellow-300 to-emerald-400 via-violet-600 ">
                        {[0, 1, 2].map((i) => {
                            return [0, 1, 2].map((j) => {
                                //return MakeCell(i, j);
                                return MakeSvgCell(i, j);
                            })
                        })}
                    </div>
                </div>
                <div className="lg:w-1/3 lg:flex lg:flex-col
                                mx-auto mt-4 h-96">
                    <button id="btnNewGame" className="border-2 dark:border-white border-black 
                                                        hover:scale-95 hover:dark:bg-gray-600 hover:bg-gray-200
                                                        rounded-md p-2 text-2xl grow-0 w-fit mx-auto"
                                            onClick={NewGame}>New Game</button>
                    <div>Hello</div>
                </div>
            </div>
        </>
    );
}

const MakeCell = (x: number, y: number): React.ReactNode => {
    return (
        // Y is across, X is down. 0,0 is top left
        <div id={ `${x},${y}` } className="border-sky-400 border-4
                        dark:bg-white 
                        rounded-3xl 
                        md:p-16 sm:p-10 p-9 
                        md:h-48 md:w-48 sm:w-32 sm:h-32 h-28 w-28
                        text-center mx-auto my-auto md:text-6xl sm:text-5xl text-4xl
                        font-mono 
                        cell">X            
        </div>
    );
}

const MakeSvgCell = (x: number, y: number): React.ReactNode => {
    return (
        <div id={ `${x},${y}` } 
             className="border-black dark:border-white border-4
                        bg-transparent
                        rounded-3xl 
                        md:p-16 sm:p-10 p-9 
                        md:h-48 md:w-48 sm:w-32 sm:h-32 h-28 w-28
                        text-center mx-auto my-auto md:text-6xl sm:text-5xl text-4xl
                        font-mono drop-shadow-lg
                        cell">X        
        </div>        
    );
}

const NewGame = () => {
    //let btnNewGame = document.getElementById("btnNewGame");
    //document.geteleem
    //btnNewGame!.classList.add("peer-in");
    let a = 10;
    let b = a * 100;
    //console.log("waluigi")
}

const CheckWin = () => {
    // check rows
    //document

    // check columns
    
    // check diagonals
}

const GetCellPos = (id: string): CellPos => {
    var coords = id.split(",");
    return {x: parseInt(coords[0]), y: parseInt(coords[1])};
}

const GetBoard = () => {
    let board = document.getElementsByClassName("cell");

    let boardArr = [['', '', ''], ['', '', ''], ['', '', '']];
    for (let i = 0; i < board.length; i++) {
        let cell = board[i] as HTMLDivElement;
        let pos = GetCellPos(cell.id);
        boardArr[pos.x][pos.y] = cell.innerText;
    }

    return boardArr;
}



export default TicTacToe;