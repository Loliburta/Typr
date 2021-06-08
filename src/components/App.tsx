import { useState } from "react";
import { words } from "../utils/words";
import useKeyPress from "../hooks/useKeyPress";
export const App = () => {
  const [userInput, setUserInput] = useState("");
  const [activeWordIndex, setActiveWordIndex] = useState(0);

  const typingTest = words
    .sort(() => 0.5 - Math.random())
    .slice(0, 26)
    .join(" ");
  const [outgoingChars, setOutgoingChars] = useState("");
  const [currentChar, setCurrentChar] = useState(typingTest.charAt(0));
  const [incomingChars, setIncomingChars] = useState(typingTest.substr(1));

  useKeyPress((key: any) => {
    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;

    if (key === currentChar) {
      updatedOutgoingChars += currentChar;
      setOutgoingChars(updatedOutgoingChars);
      setCurrentChar(incomingChars.charAt(0));
      updatedIncomingChars = incomingChars.substring(1);
      if (updatedIncomingChars.split(" ").length < 10) {
        updatedIncomingChars += " " + typingTest;
      }
      setIncomingChars(updatedIncomingChars);
    }
  });

  return (
    <div className="app">
      <div className="app__title">Typr</div>
      <div className="app__middle">
        <div className="app__middle__text">
          <p className="Character">
            <span className="Character-out">{outgoingChars.slice(-20)}</span>
            <span className="Character-current">{currentChar}</span>
            <span>{incomingChars.substr(0, 20)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
