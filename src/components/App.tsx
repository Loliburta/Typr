import { useState, useRef } from "react";
import { words } from "../utils/words";
import useKeyPress from "../hooks/useKeyPress";
import { Summary } from "./summary/Summary";
export const App = () => {
  const typingTest = useRef(
    words
      .sort(() => 0.5 - Math.random())
      .slice(0, 26)
      .join(" ")
  );

  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(typingTest.current.charAt(0));
  const [incomingChars, setIncomingChars] = useState(
    typingTest.current.slice(1)
  );
  const [timeToWrite, setTimeToWrite] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

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
      <div className="app__title">Typr</div>
      <div className="app__middle">
        {showSummary ? (
          <Summary
            wpm={typingTest.current.length / 5 / (timeToWrite / 60)}
            acc={Math.floor(
              (typingTest.current.length /
                (typingTest.current.length + mistakes)) *
                100
            )}
            time={timeToWrite}
          />
        ) : (
          <>
            <div className="app__middle__text">
              <p className="Character">
                <span className="Character-out">{outgoingChars}</span>
                <span className="Character-current">{currentChar}</span>
                <span>{incomingChars}</span>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
