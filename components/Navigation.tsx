"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = {
  "#home": {
    name: "Home",
  },
  "#gallery": {
    name: "Gallery",
  },
  "#about": {
    name: "About",
  },
  "#achievements": {
    name: "Achievements",
  },
  "#skills": {
    name: "Skills",
  },
  "#experience": {
    name: "Experience",
  },
  "#blog": {
    name: "Blog",
  },
  "#contact": {
    name: "Contact",
  },
};

export function MorphicNavbar() {
  const [activePath, setActivePath] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "gallery", "about", "achievements", "skills", "experience", "blog", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActivePath(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    return activePath === path;
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const sectionId = path.replace("#", "");

    // If clicking home, scroll to top
    if (sectionId === "home") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setActivePath(path);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100;
      const offsetTop = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
      setActivePath(path);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600&display=swap');

        .hero__nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 28px 48px;
          transition: background-color 0.3s ease, backdrop-filter 0.3s ease, padding 0.3s ease;
        }

        .hero__nav.scrolled {
          background-color: rgba(3, 2, 3, 0.85);
          backdrop-filter: blur(10px);
          padding: 20px 48px;
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
        }

        .hero__logo {
          font-family: 'Montserrat', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #fff;
          opacity: 0.9;
        }

        .hero__nav-links {
          display: flex;
          gap: 36px;
          list-style: none;
        }

        .hero__nav-links a {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
          text-decoration: none;
          transition: color 0.25s;
          position: relative;
        }

        .hero__nav-links a::after {
          content: '';
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #ff6b6b, #ffd93d);
          transition: width 0.3s ease;
        }

        .hero__nav-links a:hover {
          color: #fff;
        }

        .hero__nav-links a:hover::after {
          width: 100%;
        }

        .hero__nav-links a.active {
          color: #fff;
        }

        .hero__nav-links a.active::after {
          width: 100%;
        }

        .cv-download-btn {
          font-family: 'Montserrat', sans-serif;
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #fff;
          background: linear-gradient(90deg, #ff6b6b, #ffd93d);
          padding: 10px 20px;
          border-radius: 4px;
          border: none;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .cv-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(255, 107, 107, 0.4);
        }

        @media (max-width: 768px) {
          .hero__nav {
            padding: 20px 24px;
          }
          .hero__nav-links {
            gap: 20px;
          }
          .hero__logo {
            font-size: 9px;
          }
          .hero__nav-links a {
            font-size: 8px;
          }
        }
      `}</style>

      <nav className={`hero__nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="hero__logo">Zihad Hasan</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '36px' }}>
          <ul className="hero__nav-links">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = isActiveLink(path);
              return (
                <li key={path}>
                  <Link
                    className={isActive ? "active" : ""}
                    href={path}
                    onClick={(e) => handleClick(e, path)}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href="/Zihad_hasan_Resume%20(3).pdf"
            download="Zihad_Hasan_CV.pdf"
            className="cv-download-btn"
          >
            Download CV
          </a>
        </div>
      </nav>
    </>
  );
}

export default MorphicNavbar;
