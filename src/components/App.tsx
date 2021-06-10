import { useState, useRef } from "react";
import { words } from "../utils/words";
import useKeyPress from "../hooks/useKeyPress";
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

  useKeyPress((key: any) => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      if (!timeToWrite) {
        setTimeToWrite(Date.now());
        setMistakes(0);
      }
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
      setCurrentChar(incomingChars.charAt(0));
      updatedIncomingChars = incomingChars.substring(1);
      setIncomingChars(updatedIncomingChars);
      if (incomingChars.length === 0) {
        setTimeToWrite(
          Math.round(((Date.now() - timeToWrite) / 1000) * 100) / 100
        );
      }
    } else {
      setMistakes(mistakes + 1);
    }
  });

  return (
    <div className="app">
      <div className="app__title">Typr</div>
      <div className="app__middle">
        <p>
          {Math.floor(
            (typingTest.current.length /
              (typingTest.current.length + mistakes)) *
              100
          )}
          %
        </p>
        <p>{timeToWrite}</p>
        <div className="app__middle__text">
          <p className="Character">
            <span className="Character-out">{outgoingChars}</span>
            <span className="Character-current">{currentChar}</span>
            <span>{incomingChars}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
