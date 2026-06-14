import { useState, useEffect } from "react";

export default function TypingText({ text, speed = 50 }: { text: string; speed?: number }) { //TypingText takes in a text and speed set to 50 as default. these have a type, text is a string, speed is a number
  const [displayed, setDisplayed] = useState("");  //React Hook called useState. creating sa variable that can change.

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span style={{ whiteSpace: "pre-line" }}>{displayed}</span>;
}

