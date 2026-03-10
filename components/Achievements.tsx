"use client";
import { useState, useEffect, useRef } from "react";

const certificates = [
  {
    certificateId: "CERT-001",
    title: "OOP Mastery",
    issuedBy: "DIU CSE Department",
    issueDate: "2025-12-10",
    skills: ["OOP", "Java", "Design Patterns"],
    certificateURL: "https://example.com/cert1.pdf",
    credentialID: "DIU-OOP-2025",
    bg: "#000000",
    image: "https://i.ibb.co.com/ZzfcH8Qp/Whats-App-Image-2025-12-12-at-23-47-46-73a9f0a1.jpg", // Add your certificate image here
  },
  {
    certificateId: "CERT-002",
    title: "Factory & Singleton Design Patterns",
    issuedBy: "Udemy",
    issueDate: "2025-11-05",
    skills: ["Design Patterns", "Software Architecture"],
    certificateURL: "https://i.ibb.co.com/HLpDyHJX/Certificate-IEB.jpg",
    credentialID: "UDEMY-DP-2025",
    bg: "#000000",
    image: "https://i.ibb.co.com/HLpDyHJX/Certificate-IEB.jpg", // Add your certificate image here
  },
  {
    certificateId: "CERT-003",
    title: "Full Stack Development",
    issuedBy: "Coursera",
    issueDate: "2025-10-20",
    skills: ["React", "Node.js", "MongoDB"],
    certificateURL: "https://example.com/cert3.pdf",
    credentialID: "COURSERA-FS-2025",
    bg: "#000000",
    image: "/certificates/cert3.jpg", // Add your certificate image here
  },
  {
    certificateId: "CERT-004",
    title: "Cloud Architecture",
    issuedBy: "AWS",
    issueDate: "2025-09-15",
    skills: ["AWS", "Cloud Computing", "DevOps"],
    certificateURL: "https://example.com/cert4.pdf",
    credentialID: "AWS-CA-2025",
    bg: "#000000",
    image: "/certificates/cert4.jpg", // Add your certificate image here
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

function getCardStyle(offset: number) {
  const absOffset = Math.abs(offset);
  const sign = offset < 0 ? -1 : 1;

  // Use fixed px offsets so cards never blow outside the container
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
  const style = getCardStyle(offset);
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
  // Use ref so the interval callback always has the latest index without needing to recreate
  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

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
      `}</style>

      {/* Title */}
      <div style={{ marginBottom: "85px", fontFamily: "'Bebas Neue', sans-serif" }}>
        <ShimmerText
          className="text-8xl md:text-8xl font-black text-center tracking-tight"
          text="Certificates & Achievements"
        />
      </div>

      {/* Carousel — perspective enables 3D depth; overflow hidden clips cards that go outside */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1400px",
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px",
          overflow: "hidden",
          paddingTop: "20px",
        }}
      >
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
      <div className="flex gap-6 mt-6">
        <button
          onClick={prev}
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ffd93d)",
            border: "none",
            color: "#000",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            fontSize: "1.2rem",
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
          style={{
            background: "linear-gradient(90deg, #ff6b6b, #ffd93d)",
            border: "none",
            color: "#000",
            borderRadius: "50%",
            width: "44px",
            height: "44px",
            fontSize: "1.2rem",
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