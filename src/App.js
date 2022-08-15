import React from "react";
import Board from "./components/Board";
import RulesButton from "./components/Rules";
import "./styles.css";

export default function App() {
  const [isRunning, setIsRunning] = React.useState(false);
  const [updateInterval, setUpdateInterval] = React.useState(100);
  const [clearScreen, setClearScreen] = React.useState(false);
  const [showRules, setShowRules] = React.useState(false);
  const boardEncloseRef = React.useRef();

  function handleChange(e) {
    setUpdateInterval(e.target.value);
  }

  function handleRunGame() {
    setIsRunning(!isRunning);
  }

  function handleClear() {
    setClearScreen(!clearScreen);
    setIsRunning(false);
  }

  React.useEffect(() => {
    boardEncloseRef.current.scrollTop = 4000;
    boardEncloseRef.current.scrollLeft = 4000;
  }, []);

  return (
    <div className="app">
      <div className="top-section">
        <h2 className="title">Game of Life</h2>
        <button className="show-rules" onClick={() => setShowRules(!showRules)}>
          {!showRules && "rules"}
          {showRules && "close"}
        </button>
      </div>
      <div className="pop-up">
        <RulesButton show={showRules}></RulesButton>
      </div>
      <div ref={boardEncloseRef} className="board-enclose">
        <Board
          isRunning={isRunning}
          updateInterval={updateInterval}
          clearScreen={clearScreen}
        ></Board>
      </div>
      <div className="buttons-inputs">
        <div className="update">
          update every{" "}
          <input
            type="text"
            name="updateInterval"
            value={updateInterval}
            onChange={(e) => handleChange(e)}
          ></input>{" "}
          msec
        </div>
        <button className="run" onClick={handleRunGame}>
          {isRunning ? "Stop" : "Run"}
        </button>
        <button className="clear" onClick={handleClear}>
          clear
        </button>
      </div>
    </div>
  );
}
