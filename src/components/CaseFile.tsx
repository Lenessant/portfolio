import { useState } from "react";
import "./CaseFile.css";
import CaseFileShape from "./CaseFileShape";
import coverImg from "../assets/front-cover.png";

export default function CaseFile() {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);

  return (
    <>
      <CaseFileShape />

      <div className="book-scene">
        <div className="hit-area">
          <div className={`book ${open ? "book-open" : ""}`}>
            <div className="cover" onClick={() => setOpen(true)}>
              <div
                className="cover-front"
                style={{ backgroundImage: `url(${coverImg}` }}
              ></div>
              <div className="cover-back"></div>
            </div>
            <div
              className={`book-page ${slide ? "slide-left" : ""}`}
              onClick={() => setSlide(true)}
            >
              <div className="page-content">
                <div className="page-header">
                  <div className="page-stamp">CLASSIFIED</div>
                  <div className="page-title">OPERATIVE PROFILE</div>
                  <div className="page-divider" />
                </div>
                <div className="page-names">
                  <div className="page-section">
                    <div className="name-label">[ CODE NAME ]</div>
                    <div className="name-value">Lenessant</div>
                  </div>
                  <div className="page-section">
                    <div className="name-label">[ REAL NAME ]</div>
                    <div className="name-value">Rollylene</div>
                  </div>
                </div>
                <div className="page-divider" />
                <div className="page-about">
                  <div className="name-label">[ ABOUT ]</div>
                  <div className="about-content">
                    {" "}
                    A <span className="encircle">full-stack developer</span> who
                    bridges engineering and design to create products that are
                    both functional and memorable. Experienced in building
                    end-to-end applications, with a strong interest in AI, deep
                    learning, and thoughtful user experiences.
                  </div>
                  <div className="page-divider" />
                </div>
                <div className="about-add">
                  <div className="name-label">[ ADDITIONAL NOTES ]</div>
                  <div className="page-note">
                    {" "}
                    Also builds projects with overkill design, just for the love
                    of the game. (kinda like this portfolio)
                  </div>
                  <div className="page-divider" />
                </div>
                <div className="tech-stack">
                  <div className="name-label">[ TOOLS & TECH ]</div>
                  <div className="page-tags">
                    <div className="tag">REACT</div>
                    <div className="tag">NODEJS</div>
                    <div className="tag">TYPESCRIPT</div>
                    <div className="tag">MYSQL</div>
                    <div className="tag">POSTGRESQL</div>
                    <div className="tag">PYTORCH</div>
                    <div className="tag">TENSORFLOW</div>
                    <div className="tag">FIGMA</div>
                    <div className="tag">EXPRESS</div>
                    <div className="tag">GIT</div>
                    <div className="tag">TAILWIND CSS</div>
                  </div>
                </div>
                <div className="page-footer">
                  <span>STATUS: ACTIVE</span>
                  <span>CLEARANCE: L5</span>
                  <span>FILE #304</span>
                </div>
              </div>
            </div>
            <div className="evidence">
              <div className="evidence-content">
                <div className="e-label">EVIDENCE</div>
                <div className="sub-label">contains Lene's Projects</div>
              </div>
              <div className="evidence-pictures">
                <div className="photo ph1">
                  <div className="image-cont img1"></div>
                  <div className="image-label"></div>
                  <div className="image-tags"></div>
                </div>
                <div className="photo ph2">
                  <div className="image-cont img2"></div>
                  <div className="image-label"></div>
                  <div className="image-tags"></div>
                </div>
                <div className="photo ph3">
                  <div className="image-cont img3"></div>
                  <div className="image-label">Screenly</div>
                  <div className="image-desc">An AI resume/CV screening tool</div>
                  <div className="image-tags"></div>
                </div>
              </div>
            </div>
            <div className="back-cover"></div>
          </div>
        </div>
      </div>
    </>
  );
}
