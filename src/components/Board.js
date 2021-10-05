import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, winPath, selectedSquare }) => {

  const gameBoard = [];

  for (let i = 0; i < 20; i++) {
    let list = [];

    for (let k = 0; k < 20; k++) {
      
        list.push(renderSquare(20 * i + k,squares, onClick, winPath, selectedSquare));
  
    }

    gameBoard.push(
      <div className="board-row" key={i}>
        {list}
      </div>
    );
  }

  return <div>{gameBoard}</div>;
};

const renderSquare =(i,squares, onClick, winPath, selectedSquare)=>{
  let isWin=false;
    let selected=selectedSquare===i?true:false;
    if(winPath){
      const check = winPath.find(item=>item===i);
     if(check||check===0){
       isWin=true;
     }
    }

    return (
      <Square key={i} isWin={isWin} selectedSquare={selected} value={squares[i]} onClick={onClick.bind(null, i)} />
    );
}

export default Board;
