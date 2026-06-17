import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import './ContactPrintout.css';
import { div } from 'motion/react-client';

const SERVICE_ID = 'service_iwenqjq';
const TEMPLATE_ID = 'template_rpnzp1u';
const PUBLIC_KEY = 'EVAoJEsHbkY5gUJoq';
const CASE_NUMBER = '#304';

const CONTACT_LINES = [

  { label: 'EMAIL', value: 'vitug.rollylene@gmail.com', displayValue: 'vitug.rollylene@gmail.com' },
  { label: 'GITHUB', value: 'https://github.com/Lenessant', displayValue: 'github.com/Lenessant' },
  { label: 'LINKEDIN', value: 'https://linkedin.com/in/rollylene-vitug-657685373/', displayValue: 'linkedin.com/in/rollylene-vitug' },
  { label: 'STATUS', value: 'OPEN TO WORK <3', displayValue: 'OPEN TO WORK <3' },
];

type SendState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPrintout() {
  const [isFeeding, setIsFeeding] = useState(false);
  const [sendState, setSendState] = useState<SendState>('idle');
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // Activates the mechanical rollout sequence right as the printer enters viewport frame
  useEffect(() => {
    const observerTarget = sectionRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsFeeding(true);
          observer.unobserve(observerTarget); // Run print layout cycle only once
        }
      },
      { 
        threshold: 0.2 // Triggers execution when 20% of section bounds cross view line
      }
    );

    observer.observe(observerTarget);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setSendState('sending');
    
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        setSendState('sent');
        formRef.current?.reset();
      })
      .catch(() => setSendState('error'));
  };

  const handleSendAgain = () => {
    setSendState('idle');
  };

  return (
    <section ref={sectionRef} id="contact-printout" className="csf-contact" aria-label="Contact Section">
            {/* ── Section Header ── */}
      <div className="section-header">
        <div className="section-pill">SECURE COMMS LINE // TRANSMISSION LOG</div>
        <h2 className="section-title">The Terminal Printer</h2>
        <p className="section-desc">
   Feel free to <strong>reach out</strong> using the form, or take a look 
  at the links below to connect. I'd love to hear from you!
        </p>
      </div>

      <div className="csf-contact__scanlines" aria-hidden="true" />

      <div className="csf-contact__grid">
        {/* LEFT MODULE — Terminal Mechanical Printer */}
        <div className="csf-printer-panel">
          <div className="csf-case-tag">
            <span>CASE {CASE_NUMBER}</span>
            <span>TRANSMISSION LOG</span>
          </div>

          <div className="csf-printer">
            <div className="csf-printer__body">
              <span className={`csf-printer__head ${isFeeding && sendState !== 'sent' ? 'is-scanning' : ''}`} />
              <span className={`csf-printer__led ${isFeeding ? 'is-active' : ''}`} />
              <div className="csf-printer__slot" />
            </div>

            {/* Overflow masking container forces paper to look like it's rolling straight out of the slot */}
            <div className="csf-paper-output-container">
              <div className={`csf-paper ${isFeeding ? 'is-feeding' : ''}`}>
                <div className="csf-paper__holes" aria-hidden="true">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span key={i} />
                  ))}
                </div>
                
                <div className="csf-paper__content">
                  <p className="csf-paper__title">CONTACT — SUBJECT FILE</p>
                  
                  {CONTACT_LINES.map((line) => {
                    const isUrl = line.value.startsWith('http');
                    const isEmail = line.label === 'EMAIL';

                    return (
                      <div key={line.label} className="csf-paper__line">
                        <span className="csf-paper__label">{line.label}:</span>
                        <span className="csf-paper__value">
                          {isUrl ? (
                            <a href={line.value} target="_blank" rel="noopener noreferrer" className="csf-print-link">
                              {line.displayValue}
                            </a>
                          ) : isEmail ? (
                            <a href={`mailto:${line.value}`} className="csf-print-link">
                              {line.displayValue}
                            </a>
                          ) : (
                            line.displayValue
                          )}
                        </span>
                      </div>
                    );
                  })}
                </div>
                

              </div>
            </div>

          </div>
        </div>

        {/* RIGHT MODULE — Secure Input Intake Panel */}
        <div className="csf-intake-panel">
          <div className="csf-intake-clip" aria-hidden="true" />
          <h2 className="csf-intake__title">Contact Me</h2>
          <p className="csf-intake__sub">
            Get in touch with the developer behind the case.
          </p>

          {sendState === 'sent' ? (
            <div className="csf-success-screen">
              <div className="csf-status-icon">✓</div>
              <h3 className="csf-success-title">TRANSMISSION SUCCESSFUL</h3>
              <p className="csf-status csf-status--ok">
                Your statement has been encrypted and successfully routed to data logs.
              </p>
              <button 
                type="button" 
                className="csf-stamp-button is-reset" 
                onClick={handleSendAgain}
              >
                [ TRANSMIT ANOTHER REPORT ]
              </button>
            </div>
          ) : (
            <form ref={formRef} className="csf-intake-form" onSubmit={handleSubmit}>
              <label className="csf-field">
                <span>SUBJECT NAME</span>
                <input type="text" name="from_name" required placeholder="Jane Doe" autoComplete="off" />
              </label>
              <label className="csf-field">
                <span>REPLY-TO EMAIL</span>
                <input type="email" name="reply_to" required placeholder="jane@email.com" autoComplete="off" />
              </label>
              <label className="csf-field">
                <span>STATEMENT</span>
                <textarea name="message" required rows={5} placeholder="State your business..." />
              </label>

              <button
                type="submit"
                className={`csf-stamp-button is-${sendState}`}
                disabled={sendState === 'sending'}
              >
                {sendState === 'idle' && 'TRANSMIT'}
                {sendState === 'sending' && 'SENDING…'}
                {sendState === 'error' && 'RETRY'}
              </button>

              {sendState === 'error' && (
                <p className="csf-status csf-status--bad">
                  Transmission failed — pipeline offline. Try re-submitting.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}