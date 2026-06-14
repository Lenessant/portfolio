import { useState } from "react";
import "./CaseFile.css";
import CaseFileShape from "./CaseFileShape";
import coverImg from "../assets/front-cover.png";

export default function CaseFile() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CaseFileShape />

      <div className="book-scene">
        <div className={`book ${open ? "book-open" : ""}`}>
          <div className="cover" onClick={() => setOpen(true)}>
            <div
            className="cover-front"
            style={{ backgroundImage: `url(${coverImg}` }}
          ></div>
          <div className="cover-back"></div>
          </div>
          
          <div className="book-page"></div>
          <div className="back-cover"></div>
        </div>
      </div>
    </>
  );
}
