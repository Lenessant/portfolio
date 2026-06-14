import { useState } from "react";
import "./CaseFile.css";
import coverIMG from "../assets/front-cover.png"

export default function CaseFile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="book-scene">
      <div className={`book ${open ? "book-open" : ""}`}>
        <div className="book-spine" />
          <div className="book-back-cover" />

        <div className={`book-page-right ${open ? "page-visible" : "page-hidden"}`}>
          <div className="page-content">
            <div className="page-header">
              <div className="page-stamp">CLASSIFIED</div>
              <div className="page-title">OPERATIVE PROFILE</div>
              <div className="page-divider" />
            </div>

            <div className="page-section">
              <div className="page-label">[ CODE NAME ]</div>
              <div className="page-value big">LENESSANT</div>
            </div>

            <div className="page-section">
              <div className="page-label">[ REAL NAME ]</div>
              <div className="page-value">Rolly</div>
            </div>

            <div className="page-section">
              <div className="page-label">[ PROFILE ]</div>
              <p className="page-bio">
                Full-stack developer with a strong design eye and a growing
                interest in AI systems — LLMs, Machine Learning, and Deep
                Learning. Thinks in flows, hierarchies, spacing, and emotion,
                then brings it to life in code.
                <br /><br />
                Builds impactful end-to-end products where the frontend,
                backend, and underlying logic work together as one coherent
                experience.
              </p>
            </div>

            <div className="page-section">
              <div className="page-label">[ SPECIALIZATIONS ]</div>
              <div className="page-value">Full-Stack · AI/ML · UI/UX</div>
            </div>

            <div className="page-footer">
              <span>STATUS: ACTIVE</span>
              <span>CLEARANCE: L5</span>
              <span>FILE #042</span>
            </div>

          </div>
        </div>

        {/* LEFT COVER (flips open) */}
        <div
          className={`book-cover-left ${open ? "cover-open" : ""}`}
          onClick={() => setOpen(true)}
        >
          {/* FRONT face */}
          <div className="cover-inner-front">
            <div className="cover-stamp">CONFIDENTIAL</div>
            <div className="cover-file-num">FILE #042</div>
            <div className="cover-name">LENESSANT</div>
            <div className="cover-sub">CLASSIFIED OPERATIVE DOSSIER</div>
            {!open && <div className="cover-hint">[ click to open ]</div>}
          </div>

          {/* BACK face (revealed once the cover flips open) */}
          <div className="cover-inner-back">
            <div>
              <div className="cb-label">[ CLEARANCE ]</div>
              <div className="cb-value">LEVEL 5 — TOP SECRET</div>
            </div>
            <div className="cb-divider" />
            <div>
              <div className="cb-label">[ DIVISION ]</div>
              <div className="cb-value">DEPT. OF DIGITAL OPS</div>
            </div>
            <div className="cb-divider" />
            <div>
              <div className="cb-label">[ ISSUED ]</div>
              <div className="cb-value">2024 · CYCLE 04</div>
            </div>
            <div className="cb-divider" />
            <div>
              <div className="cb-label">[ NOTES ]</div>
              <p className="cb-bio">
                Subject demonstrates exceptional skill in full-stack
                operations. Handle with discretion. Not to be reproduced
                without authorization from command.
              </p>
            </div>
            <div className="cb-footer">AUTHORIZED PERSONNEL ONLY</div>
          </div>
        </div>

      </div>
    </div>
  );
}


CSS.book-scene {
  width: 100%;
  min-height: 760px;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 2500px;
  perspective-origin: 50% 50%;
  padding: 2rem 0;
}

.book {
  position: relative;
  width: 510px;
  height: 627px;
  transform-style: preserve-3d;
  transform:  rotateY(-20deg) rotateX(10deg);
  transition: transform 1s cubic-bezier(0.645, 0.045, 0.355, 1.000);
}
.book-open {
  transform:  rotateY(0deg) rotateX(3deg);
}

/* SPINE */
.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  width: 32px;
  height: 100%;
  background: linear-gradient(to right, #5c3d06, #9a6c12, #6b4a08);
  border-radius: 3px 0 0 3px;
  transform-origin: right center;
  transform: rotateY(-90deg) translateZ(-16px);
  box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.6);
  z-index: 2;
}

/* LEFT COVER */
.book-cover-left {
  position: absolute;
  left: 28px;
  top: 0;
  width: 510px;
  height: 100%;
  transform-origin: left center;
  transform-style: preserve-3d;
  transition: transform 1.1s cubic-bezier(0.645, 0.045, 0.355, 1.000);
  cursor: pointer;
  z-index: 5;
}

.book-cover-left.cover-open {
  transform: rotateY(-180deg);
  cursor: default;
}

/* FRONT of left cover */
.cover-inner-front {
  position: absolute;
  inset: 0;
   clip-path: polygon(0% 15%, 0 0, 10% 0, 85% 0%, 86% 37%, 100% 37%, 100% 85%, 100% 100%, 85% 100%, 15% 100%, 0 100%, 0% 85%);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background: #c8962a;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.025) 3px,
    rgba(0, 0, 0, 0.025) 4px
  );
  border-left: 4px solid #a07015;
  border-right: 2px solid #a87820;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: inset -10px 0 24px rgba(0, 0, 0, 0.2), inset 4px 0 8px rgba(255, 255, 255, 0.05);
}

/* BACK of left cover */
.cover-inner-back {
  position: absolute;
  transform-style: preserve-3d;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  transform: rotateY(180deg);
  background: #c8962a;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(0, 0, 0, 0.025) 3px,
    rgba(0, 0, 0, 0.025) 4px
  );
  box-shadow: inset -6px 0 16px rgba(0, 0, 0, 0.15), inset 6px 0 16px rgba(0, 0, 0, 0.1);
  padding: 32px 26px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cover-stamp {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.78rem;
  font-weight: 700;
  color: #8b0000;
  border: 2.5px solid #8b0000;
  padding: 4px 16px;
  letter-spacing: 5px;
  transform: rotate(-12deg);
  opacity: 0.85;
}

.cover-file-num {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.62rem;
  color: #4a2e04;
  letter-spacing: 4px;
  margin-top: 8px;
}

.cover-name {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1e1000;
  letter-spacing: 7px;
}

.cover-sub {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.47rem;
  color: #5a3c08;
  letter-spacing: 3px;
  text-align: center;
}

.cover-hint {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.58rem;
  color: #4a2e04;
  position: absolute;
  bottom: 22px;
  letter-spacing: 2px;
  animation: blink 2s ease-in-out infinite;
}

@keyframes blink {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.7; }
}

/* Cover back (file insert) content */
.cb-label {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.52rem;
  color: #4a2e04;
  letter-spacing: 2px;
  margin-bottom: 2px;
}

.cb-value {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.72rem;
  color: #1a0e00;
  font-weight: 700;
  letter-spacing: 2px;
}

.cb-divider {
  height: 1px;
  background: rgba(0, 0, 0, 0.2);
}

.cb-bio {
  font-family: "JetBrains Mono", monospace;
  font-size: 0.6rem;
  color: #2a1400;
  line-height: 1.85;
  margin: 0;
}

.cb-footer {
  margin-top: auto;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  padding-top: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.5rem;
  color: #4a2e04;
  letter-spacing: 2px;
}

/* RIGHT PAGE */
.book-page-right {
  position: absolute;
  left: 28px;
  top: 0;
  width: 336px;
  height: 100%;
  background: #f5f0e3;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 26px,
    rgba(180, 160, 120, 0.25) 26px,
    rgba(180, 160, 120, 0.25) 27px
  );
  border-radius: 0 4px 4px 0;
  box-shadow: inset -3px 0 10px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  z-index: 1;
}

.page-hidden {
  visibility: hidden;
  opacity: 0;
}

.page-visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.4s ease 0.3s;
}

.page-content {
  padding: 32px 26px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: "JetBrains Mono", monospace;
  overflow: hidden;
}

.page-header {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.page-stamp {
  font-size: 0.55rem;
  font-weight: 700;
  color: #8b0000;
  border: 1.5px solid #8b0000;
  padding: 2px 8px;
  letter-spacing: 4px;
  width: fit-content;
  transform: rotate(-2deg);
  opacity: 0.8;
}

.page-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #2a1800;
  letter-spacing: 4px;
  margin-top: 2px;
}

.page-divider {
  width: 100%;
  height: 1px;
  background: #c8b080;
  margin-top: 6px;
}

.page-section {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.page-label {
  font-size: 0.52rem;
  color: #9a7830;
  letter-spacing: 2px;
  margin-bottom: 2px;
}

.page-value {
  font-size: 0.78rem;
  color: #2a1800;
  font-weight: 500;
}

.page-value.big {
  font-size: 1.2rem;
  letter-spacing: 4px;
  font-weight: 700;
}

.page-bio {
  font-size: 0.62rem;
  color: #3a2800;
  line-height: 1.85;
  margin: 0;
}

.page-footer {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  border-top: 1px solid #c8b080;
  padding-top: 8px;
  font-size: 0.5rem;
  color: #9a7830;
  letter-spacing: 2px;
}

.book-back-cover {
  position: absolute;
  left: 28px;
  top: 0;
  width: 336px;
  height: 100%;
  background: #c8962a;
  z-index: 0;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.2);
}