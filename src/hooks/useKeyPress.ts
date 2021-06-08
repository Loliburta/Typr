import { useState, useEffect } from "react";

const useKeyPress = (callback: any) => {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  useEffect(() => {
    const downHandler = ({ key }: { key: string }) => {
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    const upHandler = () => {
      setKeyPressed(null);
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
  return keyPressed;
};
export default useKeyPress;
