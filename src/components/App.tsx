import { useState, useEffect } from "react";
import { words } from "../utils/words";
import useKeyPress from "../hooks/useKeyPress";
import { Summary } from "./summary/Summary";
export const App = () => {
  const [typingTest, setTypingTest] = useState("");
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState("");
  const [incomingChars, setIncomingChars] = useState("");

  const [timeToWrite, setTimeToWrite] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [testLength, setTestLength] = useState(25);
  const reset = () => {
    const test = words
      .sort(() => 0.5 - Math.random())
      .slice(0, testLength)
      .join(" ");
    setTypingTest(test);
    setOutgoingChars("");
    setCurrentChar(test[0]);
    setIncomingChars(test.slice(1));
    setTimeToWrite(0);
    setShowSummary(false);
  };
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testLength]);
  useKeyPress((key: any) => {
    if (key === currentChar) {
      if (!timeToWrite) {
        setTimeToWrite(Date.now());
        setMistakes(0);
      }
      setOutgoingChars(outgoingChars + currentChar);
      setCurrentChar(incomingChars[0]);
      setIncomingChars(incomingChars.slice(1));
      if (!incomingChars) {
        setTimeToWrite(
          Math.round(((Date.now() - timeToWrite) / 1000) * 100) / 100
        );
        setShowSummary(true);
      }
    } else {
      setMistakes(mistakes + 1);
    }
  });

  return (
    <div className="app">
      <div className="app__title">
        <p className="app__title__text" onClick={reset}>
          Typr
        </p>
        <div className="app__options">
          Words{" "}
          <span
            className={
              testLength === 10
                ? "app__options__option--active"
                : "app__options__option"
            }
            onClick={() => setTestLength(10)}
          >
            10
          </span>{" "}
          <span
            className={
              testLength === 25
                ? "app__options__option--active"
                : "app__options__option"
            }
            onClick={() => setTestLength(25)}
          >
            25
          </span>{" "}
          <span
            className={
              testLength === 50
                ? "app__options__option--active"
                : "app__options__option"
            }
            onClick={() => setTestLength(50)}
          >
            50
          </span>
        </div>
      </div>
      <div className="app__middle">
        {showSummary ? (
          <Summary
            wpm={typingTest.length / 5 / (timeToWrite / 60)}
            acc={Math.floor(
              (typingTest.length / (typingTest.length + mistakes)) * 100
            )}
            time={timeToWrite}
          />
        ) : (
          <>
            <div className="app__middle__text">
              <span className="app__middle__text__outgoing">
                {outgoingChars}
              </span>
              <span className="app__middle__text__current">{currentChar}</span>
              <span className="app__middle__text__incoming">
                {incomingChars}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
