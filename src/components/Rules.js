export default function RulesButton(props) {
  function rules() {
    return (
      <ul className="rules-list">
        <li>
          In this game each black cell corresponds to cell being dead. It is the
          initial state of board
        </li>
        <li>
          Once you click on a cell, it turns green, making that particular cell
          "alive"
        </li>
        <li>
          In this game the user has to just set the initial state of the board
          by clicking on the cells of his choice
        </li>
        <li>
          Once the initial state is set, the user has to click the{" "}
          <strong>Run</strong> button for the game to start
        </li>
        <li>
          The game requires no further intervention from the user since it
          evolves on its own by following three simple rules
        </li>
        <li>
          The Rules are
          <ol>
            <li>
              If a alive cell has fewer than 2 neighbours or more than 3
              neighbours, the cell becomes dead in the next generation
            </li>
            <li>
              If a dead cell has exactly neighbours, it becomes alive in next
              generation
            </li>
            <li>
              In all other cases, the state of cells doesn't change in the next
              generation
            </li>
          </ol>
        </li>
        <li>
          The game can be stopped by clicking on <strong>Stop</strong> button
          and the board can be cleared by clicking on the <strong>clear</strong>{" "}
          button
        </li>
        <li>
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            target={"_blank"}
          >
            click here
          </a>{" "}
          to learn more about the game
        </li>
      </ul>
    );
  }

  return <div className="rules--div">{props.show && rules()}</div>;
}
