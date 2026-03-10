"use client";

import React, { useState } from "react";
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPhp,
  SiPython,
  SiHtml5,
  SiCss,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiPytorch,
  SiTensorflow,
  SiGnubash,
  SiCanva,
  SiAnaconda,
  SiArduino,
} from "react-icons/si";
import { FaJava, FaDatabase, FaNetworkWired, FaChartBar } from "react-icons/fa";
import { BsBarChartFill } from "react-icons/bs";
import { MdShowChart, MdVideoLibrary, MdPhotoLibrary, MdBrush } from "react-icons/md";
import { TbChartHistogram } from "react-icons/tb";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "C", icon: <SiC />, color: "#A8B9CC" },
      { name: "C++", icon: <SiCplusplus />, color: "#00599C" },
      { name: "Java", icon: <FaJava />, color: "#ED8B00" },
      { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
      { name: "PHP", icon: <SiPhp />, color: "#777BB4" },
      { name: "SQL", icon: <FaDatabase />, color: "#336791" },
      { name: "Python", icon: <SiPython />, color: "#3776AB" },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML", icon: <SiHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <SiCss />, color: "#1572B6" },
    ],
  },
  {
    category: "Data Science & ML",
    skills: [
      { name: "NumPy", icon: <SiNumpy />, color: "#013243" },
      { name: "Pandas", icon: <SiPandas />, color: "#150458" },
      { name: "Scikit-learn", icon: <SiScikitlearn />, color: "#F7931E" },
      { name: "Seaborn", icon: <BsBarChartFill />, color: "#4C72B0" },
      { name: "Matplotlib", icon: <MdShowChart />, color: "#11557C" },
      { name: "PyTorch", icon: <SiPytorch />, color: "#EE4C2C" },
      { name: "TensorFlow", icon: <SiTensorflow />, color: "#FF6F00" },
    ],
  },
  {
    category: "Design & Multimedia",
    skills: [
      { name: "Adobe Photoshop", icon: <MdPhotoLibrary />, color: "#31A8FF" },
      { name: "Adobe Illustrator", icon: <MdBrush />, color: "#FF9A00" },
      { name: "Canva", icon: <SiCanva />, color: "#00C4CC" },
      { name: "DaVinci Resolve", icon: <MdVideoLibrary />, color: "#FF5722" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Shell", icon: <SiGnubash />, color: "#4EAA25" },
      { name: "Power BI", icon: <TbChartHistogram />, color: "#F2C811" },
      { name: "Anaconda Navigator", icon: <SiAnaconda />, color: "#44A833" },
      { name: "Arduino", icon: <SiArduino />, color: "#00979D" },
      {
        name: "Cisco Packet Tracer",
        icon: <FaNetworkWired />,
        color: "#1BA0D7",
      },
    ],
  },
];

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "14px",
        padding: "14px 24px",
        borderRadius: "12px",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
        background: hovered
          ? "linear-gradient(90deg, rgba(255,107,107,0.1), rgba(255,217,61,0.1))"
          : "rgba(255,255,255,0.05)",
        cursor: "default",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        boxShadow: hovered ? "0 4px 20px rgba(255,107,107,0.3)" : "none",
        backdropFilter: "blur(4px)",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}
    >
      <span
        style={{
          fontSize: "22px",
          color: hovered ? skill.color : `${skill.color}cc`,
          transition: "color 0.25s ease",
          display: "flex",
          alignItems: "center",
        }}
      >
        {skill.icon}
      </span>
      <span
        style={{
          fontSize: "15px",
          fontWeight: 500,
          fontFamily: "'Geist Mono', 'Fira Code', 'Courier New', monospace",
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.8)",
          letterSpacing: "0.02em",
          transition: "color 0.25s ease",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
};

const FeaturedSkills: React.FC = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        background: "#000000",
        padding: "80px 40px",
        fontFamily: "'Geist', 'Inter', sans-serif",
      }}
    >
      {/* Ambient background blobs */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          left: "5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "15%",
          right: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Title */}
        <h1
          style={{
            textAlign: "center",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 700,
            marginBottom: "64px",
            letterSpacing: "-0.02em",
            color: "#ffffff",
          }}
        >
          Featured Skills
        </h1>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
          {skillsData.map((section) => (
            <div key={section.category}>
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginBottom: "20px",
                }}
              >
                <h2
                  style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    margin: 0,
                    fontFamily:
                      "'Geist Mono', 'Fira Code', monospace",
                  }}
                >
                  {section.category}
                </h2>
                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0.2), transparent)",
                  }}
                />
              </div>

              {/* Skills badges */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {section.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkills;