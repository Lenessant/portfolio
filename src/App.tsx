import { useState } from "react";
import "./App.css";
import LockerScene from "./components/locker";
import TypingText from "./components/TypingText";

function App() {
  return (
    <div className="page">
      <div className="top-text">
        <TypingText
          text={
            "A new case has been assigned to you.\nEvidence is secured in this locker"
          }
          speed={40}
        />
      </div>
      <div className="locker">
        <LockerScene />
      </div>
      <div className="bottom-action">
        <button className="open">[ open locker ]</button>
      </div>
    </div>
  );
}

export default App;
