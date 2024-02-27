import React, { useState } from "react";
import { VStack, HStack, Box, Grid, useToast } from "@chakra-ui/react";

const boardSize = 8;
const initialBoard = () =>
  Array(boardSize)
    .fill(null)
    .map(() => Array(boardSize).fill(null));

const Index = () => {
  const [board, setBoard] = useState(initialBoard());
  const toast = useToast();

  const placePiece = (row, col) => {
    if (board[row][col] !== null) {
      toast({
        title: "Invalid move",
        description: "You can't place a piece here.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    // For simplification, we'll alternate placing black (B) and white (W) pieces without any game logic
    const newBoard = [...board];
    const totalPieces = board.flat().filter((cell) => cell !== null).length;
    newBoard[row][col] = totalPieces % 2 === 0 ? "B" : "W";
    setBoard(newBoard);
  };

  const renderSquare = (piece, row, col) => <Box w="40px" h="40px" bg={piece ? (piece === "B" ? "black" : "white") : "green.300"} border="1px" borderColor="gray.500" onClick={() => placePiece(row, col)} />;

  const renderBoard = () => (
    <Grid templateColumns={`repeat(${boardSize}, 1fr)`} gap={1}>
      {board.map((row, rowIndex) => row.map((piece, colIndex) => renderSquare(piece, rowIndex, colIndex)))}
    </Grid>
  );

  return (
    <VStack spacing={8} align="center" justify="center" height="100vh">
      <HStack>{renderBoard()}</HStack>
    </VStack>
  );
};

export default Index;
