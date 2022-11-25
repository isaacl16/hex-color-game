import { useEffect, useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";

function App() {
  const [answer, setAnswer] = useState("#ffffff");
  const [colors, setColors] = useState([]);
  const [currentStatus, setCurrentStatus] = useState("");
  const status = {
    correct: "Correct! Good job!!",
    wrong: "Wrong answer! Try again",
  };

  const generateRandomColors = () => {
    const chars = "0123456789ABCDEF";
    const colorsArray = [];
    const answerIndex = Math.floor(Math.random() * 3);
    console.log(answerIndex);
    for (let i = 0; i < 4; i++) {
      const color =
        "#" +
        new Array(6)
          .fill("")
          .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
          .join("");
      colorsArray.push(color);
      if (i === answerIndex) setAnswer(color);
    }
    // for (let i = 0; i < 3; i++) {
    //   let hexColor = "#";
    //   for (let j = 0; j < 6; j++) {
    //     hexColor =
    //       hexColor + chars.charAt(Math.floor(Math.random() * chars.length));
    //   }
    //   colorsArray.push(hexColor);
    //   if (i === 0) setAnswer(hexColor);
    // }
    setColors(colorsArray);
  };

  const onClickOption = (color) => {
    console.log(color);
    console.log(answer);
    if (color === answer) {
      console.log("in here");
      setCurrentStatus("correct");
    } else {
      setCurrentStatus("wrong");
    }
  };

  const onClickPlayAgain = () => {
    setCurrentStatus("");
    setColors([]);
    setAnswer("");
    generateRandomColors();
  };

  const renderOptions = () => {
    return (
      <div className="button-group">
        {colors.map((color) => (
          <button
            onClick={() => onClickOption(color)}
            disabled={currentStatus === "correct"}
          >
            {color}
          </button>
        ))}
      </div>
    );
  };

  const renderStatus = () => {
    return (
      <p
        styles={
          currentStatus === "correct"
            ? { backgroundColor: "green" }
            : { backgroundColor: "red" }
        }
      >
        {status[currentStatus]}
      </p>
    );
  };

  const renderPlayAgain = () => {
    return currentStatus === "correct" ? (
      <button className="button-replay" onClick={onClickPlayAgain}>
        Play Again?
      </button>
    ) : (
      <></>
    );
  };

  useEffect(() => {
    generateRandomColors();
  }, []);
  return (
    <div className="App">
      <h1>Hex Color Game</h1>
      <div className="box" style={{ backgroundColor: answer }} />
      {currentStatus ? renderStatus() : <></>}
      {renderOptions()}
      {renderPlayAgain()}
    </div>
  );
}

export default App;
