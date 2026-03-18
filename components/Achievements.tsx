"use client";
import { useState, useEffect } from "react";

const certificates = [
  {
    certificateId: "CERT-001",
    title: "Data Science & Machine Learning",
    issuedBy: "Skill Jobs",
    issueDate: "2025-09-25",
    skills: ["Data Analysis & Machine Learning", "python"],
    certificateURL: "https://example.com/cert1.pdf",
    credentialID: "250260102",
    bg: "#000000",
    image: "https://i.ibb.co.com/CKx4x2fC/Screenshot-2026-03-11-000118.png", // Add your certificate image here
  },
  {
    certificateId: "CERT-002",
    title: "AI+ Prompt Engineering",
    issuedBy: "AI CERT",
    issueDate: "2025-07-09",
    skills: ["How use AI Agent with proper Promt"],
    certificateURL: "https://i.ibb.co.com/HLpDyHJX/Certificate-IEB.jpg",
    credentialID: "315bd74f3fb0",
    bg: "#000000",
    image: "https://i.ibb.co.com/hRNTBVNm/1752081620619.jpg", // Add your certificate image here
  },
  {
    certificateId: "CERT-003",
    title: "Campus Ambassador",
    issuedBy: "Netcom Learning",
    issueDate: "2025-07-23",
    skills: ["Effective Communication and Program Arranging"],
    certificateURL: "https://example.com/cert3.pdf",
    credentialID: "0000",
    bg: "#000000",
    image: "https://i.ibb.co.com/C5Gk0c2f/1753862755308.jpg", // Add your certificate image here
  },
  {
    certificateId: "CERT-004",
    title: "Poster Presentation",
    issuedBy: "IEB",
    issueDate: "2025-12-15",
    skills: ["IOT"],
    certificateURL: "https://example.com/cert4.pdf",
    credentialID: "0000",
    bg: "#000000",
    image: "https://i.ibb.co.com/9mJTDnPG/1765722444057.jpg", // Add your certificate image here
  }, {
    certificateId: "CERT-005",
    title: "project Showcase",
    issuedBy: "Daffodil International University",
    issueDate: "2025-11-24",
    skills: ["IOT"],
    certificateURL: "https://example.com/cert4.pdf",
    credentialID: "000",
    bg: "#000000",
    image: "https://i.ibb.co.com/cSp2589S/Whats-App-Image-2026-03-10-at-11-45-16-PM.jpg", // Add your certificate image here
  }, {
    certificateId: "CERT-006",
    title: "Volunteering",
    issuedBy: "CDC & HR,DIU",
    issueDate: "2025-07-12",
    skills: ["Event Management"],
    certificateURL: "https://example.com/cert4.pdf",
    credentialID: "0000",
    bg: "#000000",
    image: "https://i.ibb.co.com/JhGJXqg/Whats-App-Image-2026-03-10-at-11-47-15-PM.jpg", // Add your certificate image here
  }, {
    certificateId: "CERT-007",
    title: "15th Rover Mate",
    issuedBy: "Bangladesh Scout",
    issueDate: "2026-01-07",
    skills: ["Survive any critical Situation"],
    certificateURL: "https://example.com/cert4.pdf",
    credentialID: "022/2026",
    bg: "#000000",
    image: "https://i.ibb.co.com/NdyQLv7w/Whats-App-Image-2026-03-10-at-11-48-56-PM.jpg", // Add your certificate image here
  }, {
    certificateId: "CERT-008",
    title: "20th investiture camp",
    issuedBy: "Bangladesh Scout",
    issueDate: "2026-01-07",
    skills: ["Survive any critical Situation"],
    certificateURL: "https://example.com/cert4.pdf",
    credentialID: "DIUARSG-022/2026",
    bg: "#000000",
    image: "https://i.ibb.co.com/yFY2dxVL/Whats-App-Image-2026-03-10-at-11-49-38-PM.jpg", // Add your certificate image here
  },
];

// Shimmer text implemented inline (no external dependency)
function ShimmerText({ text, className }: { text: string; className?: string }) {
  return (
    <span
      className={className}
      style={{
        background: "linear-gradient(90deg, #555 0%, #fff 40%, #aaa 60%, #555 100%)",
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        animation: "shimmer 3s linear infinite",
      }}
    >
      {text}
    </span>
  );
}

function getCardStyle(offset: number, isMobile = false, isTablet = false) {
  const absOffset = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;

  // Mobile sizes
  if (isMobile) {
    if (absOffset === 0) {
      return { zIndex: 10, transform: "translateX(0px) scale(1) rotateY(0deg)", opacity: 1, width: "280px" };
    } else if (absOffset === 1) {
      return {
        zIndex: 7,
        transform: `translateX(${sign * 200}px) scale(0.75) rotateY(${sign * -15}deg)`,
        opacity: 0.6,
        width: "240px",
      };
    } else {
      return {
        zIndex: 1,
        transform: `translateX(${sign * 350}px) scale(0.5) rotateY(${sign * -30}deg)`,
        opacity: 0,
        width: "200px",
        pointerEvents: "none" as const,
      };
    }
  }

  // Tablet sizes
  if (isTablet) {
    if (absOffset === 0) {
      return { zIndex: 10, transform: "translateX(0px) scale(1) rotateY(0deg)", opacity: 1, width: "320px" };
    } else if (absOffset === 1) {
      return {
        zIndex: 7,
        transform: `translateX(${sign * 300}px) scale(0.8) rotateY(${sign * -18}deg)`,
        opacity: 0.8,
        width: "280px",
      };
    } else if (absOffset === 2) {
      return {
        zIndex: 4,
        transform: `translateX(${sign * 520}px) scale(0.65) rotateY(${sign * -28}deg)`,
        opacity: 0.4,
        width: "240px",
      };
    } else {
      return {
        zIndex: 1,
        transform: `translateX(${sign * 680}px) scale(0.5) rotateY(${sign * -35}deg)`,
        opacity: 0,
        width: "220px",
        pointerEvents: "none" as const,
      };
    }
  }

  // Desktop sizes (original)
  if (absOffset === 0) {
    return { zIndex: 10, transform: "translateX(0px) scale(1) rotateY(0deg)", opacity: 1, width: "380px" };
  } else if (absOffset === 1) {
    return {
      zIndex: 7,
      transform: `translateX(${sign * 380}px) scale(0.85) rotateY(${sign * -20}deg)`,
      opacity: 0.9,
      width: "340px",
    };
  } else if (absOffset === 2) {
    return {
      zIndex: 4,
      transform: `translateX(${sign * 640}px) scale(0.68) rotateY(${sign * -32}deg)`,
      opacity: 0.55,
      width: "300px",
    };
  } else {
    return {
      zIndex: 1,
      transform: `translateX(${sign * 820}px) scale(0.5) rotateY(${sign * -40}deg)`,
      opacity: 0,
      width: "280px",
      pointerEvents: "none" as const,
    };
  }
}

function CertificateCard({ certificate, offset, onClick }: { certificate: typeof certificates[0]; offset: number; onClick: () => void }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const style = getCardStyle(offset, isMobile, isTablet);
  const isCenter = offset === 0;
  const cardW = parseInt(style.width);

  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: 0,
        // Center anchor: left 50% then shift left by half card width
        left: `calc(50% - ${cardW / 2}px)`,
        width: style.width,
        zIndex: style.zIndex,
        opacity: style.opacity,
        transform: style.transform,
        transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        transformOrigin: offset < 0 ? "right center" : offset > 0 ? "left center" : "center center",
        cursor: offset === 0 ? "default" : "pointer",
        pointerEvents: (style.pointerEvents || "auto") as React.CSSProperties['pointerEvents'],
      }}
    >
      <div
        className="rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        style={{
          backgroundColor: certificate.bg,
          width: style.width,
          height: isCenter ? "460px" : "420px",
          transition: "height 0.6s ease, box-shadow 0.6s ease",
          boxShadow: isCenter
            ? "0 30px 80px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.1)"
            : "0 10px 40px rgba(0,0,0,0.5)",
        }}
      >
        {/* Certificate Image */}
        <div
          className="relative overflow-hidden"
          style={{
            height: "60%",
            background: "#000000",
          }}
        >
          {certificate.image ? (
            <img
              src={certificate.image}
              alt={certificate.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl mb-1">🏆</div>
                <span
                  className="text-xs font-semibold tracking-widest uppercase"
                  style={{ color: "rgba(255,255,255,0.9)", fontFamily: "'DM Sans', sans-serif" }}
                >
                  CERTIFICATE
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Card Info */}
        <div
          className="flex flex-col justify-between p-4 flex-1"
          style={{ background: "#000000" }}
        >
          <div>
            <h2
              className="font-black leading-tight mb-1"
              style={{
                fontSize: isCenter ? "1.6rem" : "1.3rem",
                color: "#fff",
                fontFamily: "'DM Sans', sans-serif",
                lineHeight: 1.2,
                transition: "font-size 0.6s ease",
              }}
            >
              {certificate.title}
            </h2>
            <p
              className="text-xs font-semibold mb-1"
              style={{ color: "rgba(255,255,255,0.7)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {certificate.issuedBy}
            </p>
            <p
              className="text-xs mb-2"
              style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'DM Sans', sans-serif" }}
            >
              {new Date(certificate.issueDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </p>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-1">
            {certificate.skills.slice(0, 3).map((skill: string, idx: number) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded"
                style={{
                  background: "linear-gradient(90deg, #ff6b6b, #ffd93d)",
                  color: "#000",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  fontSize: "0.65rem",
                }}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Credential ID — only on center card */}
          {isCenter && (
            <p
              className="text-xs mt-2 font-mono"
              style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.65rem" }}
            >
              ID: {certificate.credentialID}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CertificatesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + certificates.length) % certificates.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % certificates.length);

  // Fixed auto-slide: no activeIndex in deps → interval never resets mid-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((i) => (i + 1) % certificates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []); // ✅ empty deps — stable interval

  const visibleRange = [-2, -1, 0, 1, 2];

  return (
    <div
      id="achievements"
      className="min-h-screen flex flex-col items-center justify-center relative py-20"
      style={{
        background: "#030203",
        isolation: "isolate",       // creates stacking context — navbar stays outside
        overflow: "hidden",         // prevents horizontal scroll from side cards
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700;900&display=swap');

        @keyframes shimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .carousel-container {
          position: relative;
          width: 100%;
          max-width: 1400px;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1200px;
          overflow: hidden;
          padding-top: 20px;
        }

        @media (max-width: 640px) {
          .carousel-container {
            height: 360px;
            perspective: 800px;
            padding-top: 10px;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .carousel-container {
            height: 420px;
            perspective: 1000px;
            padding-top: 15px;
          }
        }
      `}</style>

      {/* Title */}
      <div style={{ marginBottom: "85px", fontFamily: "'Bebas Neue', sans-serif" }} className="px-4">
        <ShimmerText
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-center tracking-tight"
          text="Certificates & Achievements"
        />
      </div>

      {/* Carousel — perspective enables 3D depth; overflow hidden clips cards that go outside */}
      <div className="carousel-container">
        {visibleRange.map((offset) => {
          const certIndex =
            (activeIndex + offset + certificates.length) % certificates.length;
          return (
            <CertificateCard
              key={`${offset}-${certificates[certIndex].certificateId}`}
              certificate={certificates[certIndex]}
              offset={offset}
              onClick={() => {
                if (offset < 0) prev();
                else if (offset > 0) next();
              }}
            />
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-10">
        {certificates.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            style={{
              width: activeIndex === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: activeIndex === idx ? "linear-gradient(90deg, #ff6b6b, #ffd93d)" : "rgba(255,255,255,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Nav buttons */}
      <div className="flex gap-4 sm:gap-6 mt-6">
        <button
          onClick={prev}
          className="nav-button w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]"
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ffd93d)",
            border: "none",
            color: "#000",
            borderRadius: "50%",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "opacity 0.3s",
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ‹
        </button>
        <button
          onClick={next}
          className="nav-button w-[36px] h-[36px] sm:w-[44px] sm:h-[44px]"
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ffd93d)",
            border: "none",
            color: "#000",
            borderRadius: "50%",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "opacity 0.3s",
            fontWeight: "bold",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
        >
          ›
        </button>
      </div>
    </div>
  );
}