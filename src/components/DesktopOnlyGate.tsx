import React, { useEffect, useState } from 'react';
import './DesktopOnlyGate.css';

const MIN_WIDTH = 1024; // anything narrower than this gets blocked

export default function DesktopOnlyGate({ children }: { children: React.ReactNode }) {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setWidth(window.innerWidth);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);


  if (width === null) return null;

  if (width < MIN_WIDTH) {
    return (
      <div className="csf-gate" role="alert">
        <div className="csf-gate__pin" aria-hidden="true" />
        <div className="csf-gate__note">
          <p className="csf-gate__message">
            This profile is best experienced on desktop. Come back on a bigger screen?
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
