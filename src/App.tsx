import { useState } from "react";
import "./App.css";
import LockerScene from "./components/locker";

function App() {
  return (
    <div className="page">
      <div className="top-text">
        A new case has been assigned to you. <br />
        Evidence is secured in this locker.
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
