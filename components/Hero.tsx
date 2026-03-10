"use client";
"use client";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 10,
        });
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const name = "Zihad Hasan • Zihad Hasan • Zihad Hasan • Zihad Hasan • Zihad Hasan • ";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;600&family=Cormorant+Garamond:ital,wght@0,300;1,300&display=swap');

        /* ── Scoped to .hero — NO global resets ── */

        .hero {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: #030203;
          display: flex;
          flex-direction: column;
          cursor: none;
        }

        .hero__bg {
          position: absolute;
          inset: 0;
          background-image: url('https://i.ibb.co.com/HTXF1bbB/Whats-App-Image-2026-03-03-at-18-22-30.jpg');
          background-size: cover;
          background-position: center top;
          transition: transform 0.15s ease-out;
          filter: brightness(0.75) contrast(1.05);
        }

        .hero__vignette {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 70% at 50% 40%, transparent 40%, rgba(0,0,0,0.4) 100%),
            linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.5) 100%);
          z-index: 1;
        }

        .hero__marquee-wrap {
          position: absolute;
          bottom: 38%;
          left: 0;
          width: 100%;
          overflow: hidden;
          z-index: 5;
          pointer-events: none;
        }

        .hero__marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 18s linear infinite;
          will-change: transform;
        }

        .hero__marquee-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(80px, 13vw, 200px);
          letter-spacing: 0.01em;
          line-height: 0.88;
          white-space: nowrap;
          background: linear-gradient(
            135deg,
            #ffffff 0%,
            #f5f0e8 25%,
            #ffffff 50%,
            #e8ddd0 75%,
            #ffffff 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(255,200,150,0.18));
          padding-right: 0.15em;
        }

        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .hero__center {
          position: absolute;
          bottom: 13%;
          right: 6%;
          z-index: 6;
          text-align: right;
          animation: heroFadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.4s both;
        }

        .hero__title-line {
          display: block;
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(28px, 3.8vw, 58px);
          letter-spacing: 0.04em;
          line-height: 1.05;
          background: linear-gradient(135deg, #ffffff 0%, #e0d5c8 40%, #ffffff 70%, #c8b89a 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero__location {
          position: absolute;
          bottom: 32px;
          left: 48px;
          z-index: 6;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.45);
          animation: heroFadeUp 1s ease 0.9s both;
        }

        .hero__scroll {
          position: absolute;
          bottom: 32px;
          right: 48px;
          z-index: 6;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          animation: heroFadeUp 1s ease 1.1s both;
        }

        .hero__scroll-label {
          font-size: 8px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          writing-mode: vertical-rl;
        }

        .hero__scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.4), transparent);
          animation: heroScrollPulse 2s ease-in-out infinite;
        }

        .hero__dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ff3b3b;
          box-shadow: 0 0 12px #ff3b3b, 0 0 24px rgba(255,59,59,0.4);
          z-index: 7;
          animation: heroDotPulse 2.5s ease-in-out infinite;
          pointer-events: none;
        }

        .hero__cursor {
          position: absolute;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255,255,255,0.9);
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: width 0.2s, height 0.2s, background 0.2s;
          mix-blend-mode: difference;
        }

        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes heroDotPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
          50%       { transform: translate(-50%, -50%) scale(1.6); opacity: 0.6; }
        }

        @keyframes heroScrollPulse {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 1; }
        }

        /* Mobile Responsive Styles */
        @media (max-width: 640px) {
          .hero {
            cursor: default;
          }

          .hero__marquee-wrap {
            bottom: 35%;
          }

          .hero__marquee-text {
            font-size: clamp(40px, 15vw, 80px);
          }

          .hero__center {
            right: 5%;
            bottom: 12%;
          }

          .hero__title-line {
            font-size: clamp(20px, 5vw, 32px);
          }

          .hero__location {
            left: 16px;
            bottom: 20px;
            font-size: 7px;
          }

          .hero__scroll {
            right: 16px;
            bottom: 20px;
          }

          .hero__scroll-label {
            font-size: 6px;
          }

          .hero__scroll-line {
            height: 30px;
          }

          .hero__cursor {
            display: none;
          }

          .hero__dot {
            width: 4px;
            height: 4px;
          }
        }

        /* Tablet Responsive Styles */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero__marquee-wrap {
            bottom: 36%;
          }

          .hero__marquee-text {
            font-size: clamp(60px, 12vw, 140px);
          }

          .hero__center {
            right: 5%;
            bottom: 14%;
          }

          .hero__title-line {
            font-size: clamp(24px, 4vw, 42px);
          }

          .hero__location {
            left: 32px;
            bottom: 24px;
            font-size: 8px;
          }

          .hero__scroll {
            right: 32px;
            bottom: 24px;
          }

          .hero__dot {
            width: 5px;
            height: 5px;
          }
        }

        @media (max-width: 768px) {
          .hero__center   { right: 4%; bottom: 15%; }
          .hero__location { left: 24px; }
          .hero__scroll   { right: 24px; }
        }
      `}</style>

      <section className="hero" ref={heroRef}>
        {/* BG image with parallax */}
        <div
          className="hero__bg"
          style={{
            transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.04)`,
          }}
        />

        <div className="hero__vignette" />

        {/* Custom cursor — inside section so it's clipped to hero bounds */}
        <div
          className="hero__cursor"
          style={{
            left: `calc(50% + ${mousePos.x * 20}px)`,
            top: `calc(50% + ${mousePos.y * 20}px)`,
          }}
        />

        {/* Red accent dot */}
        <div className="hero__dot" />

        {/* Marquee name */}
        <div className="hero__marquee-wrap">
          <div className="hero__marquee-track">
            <span className="hero__marquee-text">{name}</span>
            <span className="hero__marquee-text" aria-hidden="true">{name}</span>
          </div>
        </div>

        {/* Bottom-right tagline */}
        <div className="hero__center">
          <span className="hero__title-line">AI Engineer</span>
          <span className="hero__title-line">and Reseacher</span>
        </div>

        {/* Location */}
        <div className="hero__location">Based in Bangladesh</div>

        {/* Scroll indicator */}
        <div className="hero__scroll">
          <span className="hero__scroll-label">Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>
      <div id="home" style={{ position: 'absolute', top: 0 }} />
    </>
  );
};

export default Hero;

