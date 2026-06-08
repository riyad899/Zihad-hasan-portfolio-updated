"use client";

import React, { useState } from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";

interface Skill {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

const getIcon = (iconName: string): React.ComponentType<any> | null => {
  if (!iconName) return null;
  if (iconName.startsWith("Si")) return (SiIcons as any)[iconName] || null;
  if (iconName.startsWith("Fa")) return (FaIcons as any)[iconName] || null;
  if (iconName.startsWith("Bs")) return (BsIcons as any)[iconName] || null;
  if (iconName.startsWith("Md")) return (MdIcons as any)[iconName] || null;
  if (iconName.startsWith("Tb")) return (TbIcons as any)[iconName] || null;
  return null;
};

const groupSkills = (flatSkills: any[]): SkillCategory[] => {
  const categoriesMap: { [key: string]: Skill[] } = {};

  flatSkills.forEach((skill) => {
    const IconComponent = getIcon(skill.iconName) || FaIcons.FaCode;
    const mappedSkill: Skill = {
      name: skill.name,
      icon: <IconComponent />,
      color: skill.color || "#ffffff",
    };

    const cat = skill.category || "General";
    if (!categoriesMap[cat]) {
      categoriesMap[cat] = [];
    }
    categoriesMap[cat].push(mappedSkill);
  });

  return Object.entries(categoriesMap).map(([category, skills]) => ({
    category,
    skills,
  }));
};

const skillsData: SkillCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "C", icon: <SiIcons.SiC />, color: "#A8B9CC" },
      { name: "C++", icon: <SiIcons.SiCplusplus />, color: "#00599C" },
      { name: "Java", icon: <FaIcons.FaJava />, color: "#ED8B00" },
      { name: "JavaScript", icon: <SiIcons.SiJavascript />, color: "#F7DF1E" },
      { name: "PHP", icon: <SiIcons.SiPhp />, color: "#777BB4" },
      { name: "SQL", icon: <FaIcons.FaDatabase />, color: "#336791" },
      { name: "Python", icon: <SiIcons.SiPython />, color: "#3776AB" },
    ],
  },
  {
    category: "Web Technologies",
    skills: [
      { name: "HTML", icon: <SiIcons.SiHtml5 />, color: "#E34F26" },
      { name: "CSS", icon: <SiIcons.SiCss />, color: "#1572B6" },
    ],
  },
  {
    category: "Data Science & ML",
    skills: [
      { name: "NumPy", icon: <SiIcons.SiNumpy />, color: "#013243" },
      { name: "Pandas", icon: <SiIcons.SiPandas />, color: "#150458" },
      { name: "Scikit-learn", icon: <SiIcons.SiScikitlearn />, color: "#F7931E" },
      { name: "Seaborn", icon: <BsIcons.BsBarChartFill />, color: "#4C72B0" },
      { name: "Matplotlib", icon: <MdIcons.MdShowChart />, color: "#11557C" },
      { name: "PyTorch", icon: <SiIcons.SiPytorch />, color: "#EE4C2C" },
      { name: "TensorFlow", icon: <SiIcons.SiTensorflow />, color: "#FF6F00" },
    ],
  },
  {
    category: "Design & Multimedia",
    skills: [
      { name: "Adobe Photoshop", icon: <MdIcons.MdPhotoLibrary />, color: "#31A8FF" },
      { name: "Adobe Illustrator", icon: <MdIcons.MdBrush />, color: "#FF9A00" },
      { name: "Canva", icon: <SiIcons.SiCanva />, color: "#00C4CC" },
      { name: "DaVinci Resolve", icon: <MdIcons.MdVideoLibrary />, color: "#FF5722" },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Shell", icon: <SiIcons.SiGnubash />, color: "#4EAA25" },
      { name: "Power BI", icon: <TbIcons.TbChartHistogram />, color: "#F2C811" },
      { name: "Anaconda Navigator", icon: <SiIcons.SiAnaconda />, color: "#44A833" },
      { name: "Arduino", icon: <SiIcons.SiArduino />, color: "#00979D" },
      {
        name: "Cisco Packet Tracer",
        icon: <FaIcons.FaNetworkWired />,
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
        gap: "12px",
        padding: "12px 16px",
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
        // Allow wrapping on small screens to avoid horizontal scroll
        whiteSpace: "normal",
        maxWidth: "100%",
      }}
    >
      <span
        style={{
          fontSize: "20px",
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
          fontSize: "14px",
          fontWeight: 500,
          fontFamily: "'Geist Mono', 'Fira Code', 'Courier New', monospace",
          color: hovered ? "#ffffff" : "rgba(255,255,255,0.8)",
          letterSpacing: "0.02em",
          transition: "color 0.25s ease",
          lineHeight: 1.1,
          wordBreak: "break-word",
        }}
      >
        {skill.name}
      </span>
    </div>
  );
};

const FeaturedSkills: React.FC<{ skills?: any[] }> = ({ skills }) => {
  return (
    <section
      id="skills"
      className="px-4 sm:px-6 md:px-8 lg:px-10"
      style={{
        minHeight: "100vh",
        background: "#000000",
        padding: "56px 16px",
        fontFamily: "'Geist', 'Inter', sans-serif",
      }}
    >
      {/* Ambient background blobs */}
      <div
        className="hidden sm:block"
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
        className="hidden sm:block"
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
            fontSize: "clamp(2rem, 5vw, 5rem)",
            fontWeight: 900,
            marginBottom: "36px",
            letterSpacing: "-0.02em",
            fontFamily: "'Bebas Neue', sans-serif",
            background: "linear-gradient(90deg, #555 0%, #fff 40%, #aaa 60%, #555 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "shimmer 3s linear infinite"
          }}
        >
          Featured Skills
        </h1>

        {/* Categories */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {(skills && skills.length > 0 ? groupSkills(skills) : skillsData).map((section) => (
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