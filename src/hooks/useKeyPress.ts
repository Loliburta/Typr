import { useEffect, useRef } from "react";

const useKeyPress = (callback: any) => {
  const keyPressed = useRef<string | null>(null);
  useEffect(() => {
    const downHandler = ({ key }: { key: string }) => {
      if (keyPressed.current !== key && key.length === 1) {
        keyPressed.current = key;
        callback && callback(key);
      }
    };
    const upHandler = () => {
      keyPressed.current = null;
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
