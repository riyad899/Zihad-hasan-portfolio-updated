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
  "#blogs": {
    name: "Blog",
  },
  "#contact": {
    name: "Contact",
  },
};

export function MorphicNavbar() {
  const [activePath, setActivePath] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ["home", "gallery", "about", "achievements", "skills", "experience", "blogs", "contact"];
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

    // Close mobile menu
    setIsMenuOpen(false);

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

        /* Hamburger Menu Button */
        .hamburger-btn {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1001;
          position: relative;
        }

        .hamburger-line {
          width: 25px;
          height: 2px;
          background: #fff;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .hamburger-btn.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(7px, 7px);
        }

        .hamburger-btn.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .hamburger-btn.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(7px, -7px);
        }

        /* Mobile Menu Overlay */
        .mobile-menu {
          display: none;
        }

        .mobile-menu-close {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .mobile-menu-close .hamburger-line {
          width: 30px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
        }

        .mobile-menu-close .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(8px, 8px);
        }

        .mobile-menu-close .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-close .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(8px, -8px);
        }

        /* Mobile Styles */
        @media (max-width: 640px) {
          .hero__nav {
            padding: 16px 16px;
            flex-direction: row;
            justify-content: space-between;
          }
          .hero__nav.scrolled {
            padding: 12px 16px;
          }
          .hero__logo {
            font-size: 9px;
            letter-spacing: 0.2em;
          }

          .hamburger-btn {
            display: flex;
          }

          .hero__nav-links {
            display: none;
          }

          .cv-download-btn {
            display: none;
          }

          .mobile-menu {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(3, 2, 3, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 24px;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          .mobile-menu.open {
            opacity: 1;
            pointer-events: auto;
          }

          .mobile-menu a {
            font-size: 18px;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            transition: color 0.25s;
            position: relative;
          }

          .mobile-menu a.active {
            color: #fff;
          }

          .mobile-menu a::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #ff6b6b, #ffd93d);
            transition: width 0.3s ease;
          }

          .mobile-menu a.active::after,
          .mobile-menu a:hover::after {
            width: 100%;
          }

          .mobile-menu .cv-download-btn {
            display: inline-block;
            font-size: 12px;
            padding: 12px 24px;
            margin-top: 20px;
          }
        }

        /* Tablet Styles */
        @media (min-width: 641px) and (max-width: 1024px) {
          .hero__nav {
            padding: 20px 32px;
          }
          .hero__nav.scrolled {
            padding: 16px 32px;
          }
          .hero__logo {
            font-size: 10px;
          }

          .hamburger-btn {
            display: flex;
          }

          .hero__nav-links {
            display: none;
          }

          .cv-download-btn {
            display: none;
          }

          .mobile-menu {
            display: flex;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(3, 2, 3, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 28px;
            z-index: 1000;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
          }

          .mobile-menu.open {
            opacity: 1;
            pointer-events: auto;
          }

          .mobile-menu a {
            font-size: 20px;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            color: rgba(255,255,255,0.7);
            text-decoration: none;
            transition: color 0.25s;
            position: relative;
          }

          .mobile-menu a.active {
            color: #fff;
          }

          .mobile-menu a::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #ff6b6b, #ffd93d);
            transition: width 0.3s ease;
          }

          .mobile-menu a.active::after,
          .mobile-menu a:hover::after {
            width: 100%;
          }

          .mobile-menu .cv-download-btn {
            display: inline-block;
            font-size: 14px;
            padding: 14px 28px;
            margin-top: 24px;
          }
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

        {/* Desktop Menu */}
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

          {/* Hamburger Button for Mobile/Tablet */}
          <button
            className={`hamburger-btn ${isMenuOpen ? 'open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        {/* Close Button */}
        <button
          className="mobile-menu-close"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {Object.entries(navItems).map(([path, { name }]) => {
          const isActive = isActiveLink(path);
          return (
            <Link
              key={path}
              className={isActive ? "active" : ""}
              href={path}
              onClick={(e) => handleClick(e, path)}
            >
              {name}
            </Link>
          );
        })}
        <a
          href="/Zihad_hasan_Resume%20(3).pdf"
          download="Zihad_Hasan_CV.pdf"
          className="cv-download-btn"
        >
          Download CV
        </a>
      </div>
    </>
  );
}

export default MorphicNavbar;
