import { useState, useEffect } from "react";
import { motion } from "motion/react";
import "./CaseFile.css";
import CaseFileShape from "./CaseFileShape";
import coverImg from "../assets/front-cover.png";

const PHOTOS = [
  { id: 1, cls: "img1", tilt: -15 },
  { id: 2, cls: "img2", tilt: 12 },
  { id: 3, cls: "img3", tilt: -8 },
];

export default function CaseFile({
  onEvidenceClick,
}: {
  onEvidenceClick?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(false);
  const [falling, setFalling] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [hovering, SetHovering] = useState(false);
  const [gone, setGone] = useState(false);

  // Track scroll position
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEvidenceClick = () => {
    setFalling(true);
    setTimeout(() => setGone(true), 800);
    onEvidenceClick?.();
  };


  return (
    <>
      <CaseFileShape />

      <div className="section-header">
        <div className="section-pill">OPERATIVE FILE // CASE #304</div>
        <h2 className="section-title">The Case File</h2>
        <p className="section-desc">
          Review the operative's profile. <strong>Open the file</strong> to begin.
        </p>
      </div>

      <div className="book-scene">
          <div className={`book ${open ? "book-open" : ""}`}>
            <div className="cover" onClick={() => setOpen(true)}>
              <div
                className="cover-front"
                style={{ backgroundImage: `url(${coverImg})` }}
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
                  <div className="floating-instruction">CLICK TO PULL ASIDE</div>
                  <span>STATUS: ACTIVE</span>
              
                  <span>FILE #304</span>
                </div>
              </div>
            </div>

            {/* Evidence envelope */}
            <div 
            className="evidence" 
            onMouseEnter={() => SetHovering(true)}
            onMouseLeave={() => SetHovering(false)}
            onClick={handleEvidenceClick}>
              <div className="evidence-content">
                <div className="e-label">EVIDENCE</div>
                <div className="sub-label">MY PROJECTS</div>
              </div>
            </div>

            {/* Framer Motion falling photos */}
            <div className="evidence-pictures">
              {PHOTOS.map((photo, index) => (
                !gone && (
                  <motion.div
                  key={photo.id}
                  layoutId={`project-photo-${photo.id}`}
                  className={`photo ph${index + 1}`}
                  initial = {{y: 0, opacity: 1, rotate: 90}}
                  animate={
                    falling
                      ? {
                          y: 700 + scrollY,
                          opacity: 0,
                          rotate: 90 + photo.tilt,
                      }
                      : hovering
                      ? {y: 30, opacity: 1, rotate: 87 }
                      : {y: 0, opacity: 1, rotate: 90}
                  }
                  transition={
                    falling
                      ? {
                          type: "spring",
                          stiffness: 75,
                          damping: 12,
                          mass: 1.5,
                          delay: index * 0.09,
                        }
                      : { type: "spring", stiffness: 200, damping: 20 }
                  }
                >
                  <div className={`image-cont ${photo.cls}`}></div>
                </motion.div>
                )
              ))}
                
            </div>

            <div className="evidence-back"></div>
            <div className="back-cover"></div>
          </div>
        </div>
    </>
  );
}