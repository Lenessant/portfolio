import { useState } from "react";
import "./App.css";
import LockerScene from "./components/locker";
import TypingText from "./components/TypingText";
import CaseFile from "./components/CaseFile";

function App() {
  const [stage, setStage] = useState<"idle" | "zooming" | "black" | "file">(
    "idle",
  );

  const handleOpen = () => {
    setStage("zooming");
    setTimeout(() => setStage("black"), 200); // black starts while zoom is still mid-way
    setTimeout(() => setStage("file"), 900);
  };
  return (
    <div className="page">
      {stage === "idle" && (
        <div className="top-text">
          <TypingText
            text={
              "A new case has been assigned to you.\nEvidence is secured in this locker"
            }
            speed={40}
          />
        </div>
      )}

      {(stage === "idle" || stage === "zooming" || stage === "black") && (
        <div
          className={`locker ${stage !== "idle" ? "locker-fullscreen" : ""}`}
        >
          <LockerScene zooming={stage === "zooming" || stage === "black"} />
        </div>
      )}
      {(stage === "black" || stage === "file") && (
        <div className="black-screen" />
      )}

      {stage === "file" && (
        <div className="file-reveal">
          {stage === "file" && (
            <div className="file-reveal">
              <CaseFile />
            </div>
          )}
        </div>
      )}

      {stage === "idle" && (
        <div className="bottom-action">
          <button className="open" onClick={handleOpen}>
            [ open locker ]
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
