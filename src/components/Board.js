import React from "react";

export default function Board(props) {
  function makeBoard() {
    let board = [];
    for (let i = 0; i < totalCols; i++) {
      board[i] = [];
      for (let j = 0; j < totalRows; j++) {
        board[i][j] = false;
      }
    }
    return board;
  }

  function makeCells() {
    let cells = [];
    for (let i = 0; i < totalCols; i++) {
      for (let j = 0; j < totalRows; j++) {
        if (board[i][j]) {
          cells.push([i, j]);
        }
      }
    }
    return cells;
  }

  function getPos2D(array, item) {
    for (let i = 0; i < array.length; i++) {
      if (array[i][0] === item[0] && array[i][1] === item[1]) {
        return i;
      }
    }
    return -1;
  }

  function returnNeighboursCoordinates(coords) {
    const neighbours = [
      [coords[0], coords[1] + 1],
      [coords[0], coords[1] - 1],
      [coords[0] + 1, coords[1]],
      [coords[0] - 1, coords[1]],
      [coords[0] + 1, coords[1] + 1],
      [coords[0] - 1, coords[1] + 1],
      [coords[0] + 1, coords[1] - 1],
      [coords[0] - 1, coords[1] - 1]
    ];
    return neighbours;
  }

  function countAliveNeighbours(coords, TwoDArray) {
    const neighbours = returnNeighboursCoordinates(coords);
    let aliveCount = 0;
    for (let i = 0; i < neighbours.length; i++) {
      if (getPos2D(TwoDArray, neighbours[i]) != -1) {
        aliveCount += 1;
      }
    }
    return aliveCount;
  }

  function runGame() {
    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((val) => {
        return val.slice();
      });
      for (let i = 0; i < totalCols; i++) {
        for (let j = 0; j < totalCols; j++) {
          if (newBoard[i][j]) {
            const count = countAliveNeighbours([i, j], cells);
            if (count < 2 || count > 3) {
              newBoard[i][j] = false;
            }
          } else {
            const count = countAliveNeighbours([i, j], cells);
            if (count === 3) {
              newBoard[i][j] = true;
            }
          }
        }
      }
      return newBoard;
    });
  }

  function clickedCords(ref, event) {
    const cords = ref.current.getBoundingClientRect();

    const xClickedRelative = event.clientX - cords.x;
    const yClickedRelative = event.clientY - cords.y;

    const x = Math.floor(xClickedRelative / cellSize);
    const y = Math.floor(yClickedRelative / cellSize);

    setBoard((prevBoard) => {
      const newBoard = prevBoard.map((val) => val);
      newBoard[x][y] = !newBoard[x][y];
      return newBoard;
    });
  }

  const cellSize = 20;
  const width = 8000;
  const height = 8000;
  const totalRows = height / cellSize;
  const totalCols = width / cellSize;

  const boardRef = React.useRef();
  const [board, setBoard] = React.useState(makeBoard());
  const cells = makeCells();

  React.useEffect(() => {
    let handle;
    if (props.isRunning === true) {
      handle = setInterval(runGame, props.updateInterval);
    }
    //State won't get updated until the previous useEffect is cleared
    return () => {
      if (props.isRunning) {
        clearInterval(handle);
      }
    };
  }, [props.isRunning, board]);

  React.useEffect(() => {
    setBoard(makeBoard());
  }, [props.clearScreen]);

  const cellDivs = cells.map((val, id) => {
    return (
      <div
        key={id}
        className="cell"
        style={{
          width: `${cellSize - 1}px`,
          height: `${cellSize - 1}px`,
          left: `${cellSize * val[0] + 1}px`,
          top: `${cellSize * val[1] + 1}px`
        }}
      ></div>
    );
  });

  return (
    <div
      ref={boardRef}
      className="board"
      onClick={(e) => clickedCords(boardRef, e)}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundSize: `${cellSize}px ${cellSize}px`
      }}
    >
      {cellDivs}
    </div>
  );
}
