import { useState, useEffect } from "react";
import "./App.css";
import LockerScene from "./components/Locker";
import CaseFile from "./components/CaseFile";
import CrimeBoard from "./components/CrimeBoard";
import Contract from "./components/ContactPrintout";
import DesktopOnlyGate from "./components/DesktopOnlyGate";
import { LayoutGroup } from "motion/react";

function App() {
  const [stage, setStage] = useState<"idle" | "zooming" | "black" | "file">(
    "idle",
  );
  const [boardTriggered, setBoardTriggered] = useState(false);

  const handleOpen = () => {
    // faster fade sequence for a snappier, game-like door open feel
    setStage("zooming");
    setTimeout(() => setStage("black"), 100);
    setTimeout(() => setStage("file"), 450);
  };

  // Safely scroll down only after the CrimeBoard component actually updates and mounts
  useEffect(() => {
    if (boardTriggered) {
      document
        .querySelector(".crime-board")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  }, [boardTriggered]);

  return (
    <DesktopOnlyGate>
      <div className="page">
        {/* LOCKER STAGE — always exactly 100vh */}
        <div className="locker-stage">
          <div className="section-header">
            <h2 className="section-title">The Profile is in the Locker</h2>
            <p className="section-desc">
              Examine the locker and <strong>unlock the vault</strong> to retrieve
              confidential developer files.
            </p>
          </div>

          {(stage === "idle" || stage === "zooming" || stage === "black") && (
            <div className="locker">
              <LockerScene zooming={stage === "zooming" || stage === "black"} />
            </div>
          )}

          {(stage === "black" || (stage === "file" && !boardTriggered)) && (
            <div className="black-screen" />
          )}

          <LayoutGroup>
            {stage === "file" && (
              <div
                className={`file-reveal ${boardTriggered ? "file-reveal-up" : ""}`}
              >
                <CaseFile
                  onEvidenceClick={() => {
                    setBoardTriggered(true);
                  }}
                />
              </div>
            )}
          </LayoutGroup>

          {stage === "idle" && (
            <div className="bottom-action">
              <button className="open" onClick={handleOpen}>
                [ Unlock ]
              </button>
            </div>
          )}
        </div>

        {/* CRIME BOARD — appears below locker stage */}
        {boardTriggered && <CrimeBoard triggered={boardTriggered} />}

        {/* CONTACT PRINTOUT — appears after crime board */}
        {boardTriggered && <Contract />}
      </div>
    </DesktopOnlyGate>
  );
}

export default App;