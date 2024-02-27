import React, { useState } from "react";
import { VStack, HStack, Box, Grid, useToast } from "@chakra-ui/react";

const boardSize = 8;
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const initialBoard = () => {};

const isValidMove = (board, row, col, player) => {
  if (board[row][col] !== null) return false;

  let valid = false;
  directions.forEach(([dx, dy]) => {
    let x = row + dx;
    let y = col + dy;
    let count = 0;

    while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] && board[x][y] !== player) {
      x += dx;
      y += dy;
      count++;
    }

    if (count > 0 && x >= 0 && x < boardSize && y >= 0 && y < boardSize && board[x][y] === player) {
      valid = true;
    }
  });

  return valid;
};

const flipPieces = (newBoard, row, col, player) => {
  directions.forEach(([dx, dy]) => {
    let x = row + dx;
    let y = col + dy;
    let toFlip = [];

    while (x >= 0 && x < boardSize && y >= 0 && y < boardSize && newBoard[x][y] && newBoard[x][y] !== player) {
      toFlip.push([x, y]);
      x += dx;
      y += dy;
    }

    if (x >= 0 && x < boardSize && y >= 0 && y < boardSize && newBoard[x][y] === player) {
      toFlip.forEach(([fx, fy]) => {
        newBoard[fx][fy] = player;
      });
    }
  });
};

const Index = () => {
  const toast = useToast();
  const [board, setBoard] = useState(initialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("B");

  const placePiece = (row, col) => {
    if (!isValidMove(board, row, col, currentPlayer)) {
      toast({
        title: "Invalid move",
        description: "This move is not allowed.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const newBoard = [...board.map((row) => [...row])];
    newBoard[row][col] = currentPlayer;
    flipPieces(newBoard, row, col, currentPlayer);
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "B" ? "W" : "B");
  };
};

export default Index;
