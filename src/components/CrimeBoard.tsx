import { useState, useRef, useEffect } from "react";
import "./CrimeBoard.css";
import { motion } from "motion/react";

interface Project {
  id: number;
  name: string;
  desc: string;
  stack: string[];
  image?: string;
  x: number;
  y: number;
  rotate: number;
  flyIn: boolean;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: "Screenly",
    desc: "AI resume/CV screening tool",
    stack: ["REACT", "NODEJS"],
    image: "/public/pictures/screenly.png",
    x: 5,
    y: 8,
    rotate: -5,
    flyIn: true,
  },
  {
    id: 2,
    name: "Dengueng",
    desc: "Dengue tracking dashboard",
    stack: ["REACT", "POSTGRESQL"],
    image: "/public/pictures/dengueng.png",
    x: 50,
    y: 5,
    rotate: 3,
    flyIn: true,
  },
  {
    id: 3,
    name: "Project Alpha",
    desc: "Deep learning image classifier",
    stack: ["PYTORCH", "PYTHON"],
    x: 70,
    y: 45,
    rotate: -3,
    flyIn: true,
  },
  {
    id: 4,
    name: "Project Beta",
    desc: "Real-time chat application",
    stack: ["NODEJS", "TYPESCRIPT"],
    x: 8,
    y: 55,
    rotate: 6,
    flyIn: false,
  },
  {
    id: 5,
    name: "Project Gamma",
    desc: "E-commerce platform",
    stack: ["REACT", "MYSQL", "EXPRESS"],
    x: 35,
    y: 65,
    rotate: -4,
    flyIn: false,
  },
];

function droopyPath(x1: number, y1: number, x2: number, y2: number): string {
  const mx = (x1 + x2) / 2;
  const dist = Math.hypot(x2 - x1, y2 - y1);
  const sag = Math.min(dist * 0.25, 80);
  return `M ${x1} ${y1} Q ${mx} ${(y1 + y2) / 2 + sag} ${x2} ${y2}`;
}

export default function CrimeBoard({ triggered }: { triggered: boolean }) {


  const boardRef = useRef<HTMLDivElement>(null);

  // Photo positions
  const [positions, setPositions] = useState(
    PROJECTS.map((p) => ({ x: p.x, y: p.y })),
  );
  const [landed, setLanded] = useState(PROJECTS.map((p) => !p.flyIn));
  const [stringsVisible, setStringsVisible] = useState(false);
  const draggingPhoto = useRef<number | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const dragMoved = useRef(false);

  // Photo modal state
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  // Fly-in animation
  useEffect(() => {
    if (!triggered) return;
    PROJECTS.forEach((p, i) => {
      if (!p.flyIn) return;
      setTimeout(
        () => {
          setLanded((prev) => {
            const n = [...prev];
            n[i] = true;
            return n;
          });
        },
        100 + i * 100,
      );
    });
    setTimeout(() => setStringsVisible(true), 1400);
  }, [triggered]);

  // Lamp drag

  // Photo drag
  const onPhotoMouseDown = (e: React.MouseEvent, i: number) => {
    if (!landed[i]) return;
    draggingPhoto.current = i;
    dragMoved.current = false;
    const board = boardRef.current!.getBoundingClientRect();
    dragOffset.current = {
      x: e.clientX - (positions[i].x / 100) * board.width,
      y: e.clientY - (positions[i].y / 100) * board.height,
    };
    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (draggingPhoto.current !== null && boardRef.current) {
        dragMoved.current = true;
        const board = boardRef.current.getBoundingClientRect();
        const i = draggingPhoto.current;
        setPositions((prev) => {
          const n = [...prev];
          n[i] = {
            x: Math.max(
              0,
              Math.min(
                85,
                ((e.clientX - dragOffset.current.x) / board.width) * 100,
              ),
            ),
            y: Math.max(
              0,
              Math.min(
                85,
                ((e.clientY - dragOffset.current.y) / board.height) * 100,
              ),
            ),
          };
          return n;
        });
      }
    };

    const onUp = () => {
      // If photo was clicked without dragging, open modal
      if (draggingPhoto.current !== null && !dragMoved.current) {
        setSelectedPhoto(draggingPhoto.current);
      }
      draggingPhoto.current = null;
      dragMoved.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  // Center pin position (percent) — fixed at center
  const CENTER = { x: 50, y: 42 };

  return (
    <div className={`crime-board ${triggered ? "board-visible" : ""}`}>
      {/* ── Section Header ── */}
      <div className="section-header">
        <div className="section-pill">INTERACTIVE DECISION BOARD // CLUES</div>
        <h2 className="section-title">The Projects Corkboard</h2>
        <p className="section-desc">
          Pins indicate compiled case evidence. Photos are{" "}
          <strong>fully draggable</strong>. Click to zoom and dissect the system
          architecture.
        </p>
      </div>

      {/* ── Board ── */}
      <div className="board-inner" ref={boardRef}>
        {/* SVG strings */}
        <svg
          className="string-svg"
          viewBox="0 0 1000 600"
          preserveAspectRatio="none"
        >
          {PROJECTS.map((_, i) => {
            if (!stringsVisible || !landed[i]) return null;
            const cx = (CENTER.x / 100) * 1000;
            const cy = (CENTER.y / 100) * 600;
            const px = (positions[i].x / 100) * 1000 + 110;
            const py = (positions[i].y / 100) * 600 + 75;
            return (
              <path
                key={i}
                d={droopyPath(cx, cy, px, py)}
                className="string string-draw"
              />
            );
          })}
        </svg>

        {/* Center pin */}
        <div
          className="center-pin"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
        >
          <div className="tack" />
          <div className="center-paper">
            <div className="center-stamp">SUBJECT</div>
            <div className="center-name">LENESSANT</div>
            <div className="center-aka">a.k.a. ROLLYLENE</div>
            <div className="center-divider" />
            <div className="center-status">STATUS: ACTIVE</div>
          </div>
        </div>

        {/* Project photos */}
        {PROJECTS.map((p, i) => {
          const content = (
            <>
              <div
                className="tack"
                style={{
                  backgroundColor: [
                    "#c0392b",
                    "#8b0000",
                    "#922b21",
                    "#cb4335",
                    "#a93226",
                  ][i % 5],
                }}
              />
              <div
                className="board-photo-img"
                style={p.image ? { backgroundImage: `url(${p.image})` } : {}}
              />
              <div className="board-photo-name">{p.name}</div>
              <div className="board-photo-desc">{p.desc}</div>
              <div className="board-photo-tags">
                {p.stack.map((t) => (
                  <span key={t} className="board-tag">
                    {t}
                  </span>
                ))}
              </div>
            </>
          );
          const cls = `board-photo ${landed[i] ? "landed" : "fly-in"} ${draggingPhoto.current === i ? "dragging" : ""}`;
          const isDragging = draggingPhoto.current === i;
          const sty = {
            left: `${positions[i].x}%`,
            top: `${positions[i].y}%`,
            transform: `rotate(${p.rotate}deg)`,
            transitionDelay: p.flyIn ? `${i * 0.2}s` : "0s",
            cursor: landed[i] ? "grab" : "default",
            willChange: isDragging ? "transform" : "auto",
          };
          return p.flyIn ? (
            <motion.div
              key={p.id}
              layoutId={`project-photo-${p.id}`}
              className={cls}
              style={sty}
              initial={{ rotate: 90 + [-15, 12, -8][i] }}
              animate={{ rotate: p.rotate }}
              transition={isDragging ? { duration: 0 } : { type: "spring", stiffness: 80, damping: 14 }}
              onMouseDown={(e) => onPhotoMouseDown(e, i)}
            >
              {content}
            </motion.div>
          ) : (
            <div
              key={p.id}
              className={cls}
              style={sty}
              onMouseDown={(e) => onPhotoMouseDown(e, i)}
            >
              {content}
            </div>
          );
        })}
        {/* Sticky notes */}
        <div className="sticky sticky-1">
          <p>
            check github
            <br />
            for source
          </p>
        </div>
        <div className="sticky sticky-2">
          <p>
            all projects
            <br />
            built solo
          </p>
        </div>
        <div className="sticky sticky-3">
          <p>
            more coming
            <br />
            soon...
          </p>
        </div>
        <div className="sticky sticky-4">
          <p>
            ask about
            <br />
            the process
          </p>
        </div>

        {/* Redacted doc */}
        <div className="redacted-doc">
          <div className="redact-line" />
          <div className="redact-line short" />
          <div className="redact-bar" />
          <div className="redact-line" />
          <div className="redact-line short" />
          <div className="redact-stamp">CLASSIFIED</div>
        </div>

        <div className="board-label">EVIDENCE BOARD // CASE #304</div>
      </div>

      {/* Photo Modal */}
      {selectedPhoto !== null && (
        <div
          className="photo-modal-overlay"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="photo-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕
            </button>
            <div
              className="modal-image"
              style={
                PROJECTS[selectedPhoto].image
                  ? { backgroundImage: `url(${PROJECTS[selectedPhoto].image})` }
                  : {}
              }
            />
            <div className="modal-content">
              <h2>{PROJECTS[selectedPhoto].name}</h2>
              <p className="modal-desc">{PROJECTS[selectedPhoto].desc}</p>
              <div className="modal-stack">
                {PROJECTS[selectedPhoto].stack.map((t) => (
                  <span key={t} className="modal-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
