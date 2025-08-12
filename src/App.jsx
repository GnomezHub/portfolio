import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Brain,
  Github,
  ExternalLink,
  Brush,
} from "lucide-react";

import Eye from "./components/Eye";
import NavLink from "./components/NavLink";

import MainContent from "./components/MainContent";

// Huvudkomponenten för portfolion
const App = () => {
  // State för att hantera aktiv sektion för navigering
  const [activeSection, setActiveSection] = useState("home");
  // State för att hantera parallax-offset för bakgrunden
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // --- EFFEKT FÖR PARALLAX ---
  // Hanterar den "långsammare skrollningen" av bakgrunden.
  useEffect(() => {
    const handleScroll = () => {
      // Justera värdet (t.ex. 0.3 eller 0.7) för att ändra parallax-hastigheten.
      // Ett högre värde (närmare 1) gör att bakgrunden rör sig mer med skrollen.
      // Ett lägre värde (närmare 0) gör att bakgrunden rör sig mindre (mer "fixed").
      setParallaxOffset(window.scrollY * -0.2); // Justerat till 0.4 för en märkbar men inte för snabb effekt
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hanterar klick på navigeringslänkar
  const handleNavLinkClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Effekt för att uppdatera aktiv sektion och trigga animationer vid skroll
  useEffect(() => {
    const sections = [
      "home",
      "about",
      "skills",
      "projects",
      "paintings",
      "contact",
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);

            // Hitta och animera element med 'data-animation' attributet inuti den synliga sektionen
            const animatableElements =
              entry.target.querySelectorAll("[data-animation]");
            animatableElements.forEach((el) => {
              const animationType = el.dataset.animation;
              el.classList.add(`animate-${animationType}`);
              // Om det är ett "staggered" element, applicera fördröjning
              if (el.dataset.staggerIndex !== undefined) {
                el.style.animationDelay = `${
                  parseInt(el.dataset.staggerIndex) * 200
                }ms`;
              }
            });
          }
          // Animationen spelas bara en gång när elementet kommer in i vyn,
          // och förblir i sitt animerade (synliga) tillstånd.
        });
      },
      { threshold: 0.2 } // Lägre tröskel för att trigga animationer tidigare
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-full bg-transparent text-gray-100 font-sans">
      {/* Global Parallax Bakgrunds-div */}
      {/* Denna div är fixerad och täcker hela skärmen, så den syns bakom alla sektioner */}
      <div
        className="fixed top-0 left-0 w-2000 h-2626 bg-center z-0"
        style={{
          backgroundImage: "url(assets/foresty_2000_2626.webp)",
          //  backgroundSize: "2000px 2626px", // Exempel på fast storlek
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      {/* Överlagring för bakgrunden för att göra texten mer läsbar */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"></div>

      <nav
        className="fixed top-0 left-0 h-full w-20 bg-gray-900/40 
       backdrop-blur-xs border-r border-white/10 shadow-lg z-50 hidden md:flex flex-col items-center justify-center py-8"
      >
        <ul className="space-y-8">
          <li>
            <Eye />
          </li>

          <li>
            <NavLink
              icon={<Home size={24} />}
              label="Hem"
              sectionId="home"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
          <li>
            <NavLink
              icon={<User size={24} />}
              label="Om Mig"
              sectionId="about"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
          <li>
            <NavLink
              icon={<Brain size={24} />}
              label="Färdigheter"
              sectionId="skills"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
          <li>
            <NavLink
              icon={<Briefcase size={24} />}
              label="Projekt"
              sectionId="projects"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
          <li>
            <NavLink
              icon={<Brush size={24} />}
              label="Målningar"
              sectionId="paintings"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
          <li>
            <NavLink
              icon={<Mail size={24} />}
              label="Kontakt"
              sectionId="contact"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
        </ul>
      </nav>
      {/*Mobilmeny (Horisontell, fixerad längst ner) */}
      <nav
        className="md:hidden fixed bottom-0 left-0 w-full h-16
       bg-gray-900/60 backdrop-blur-xs border-t-2 border-white/10 z-50"
      >
        <ul className="flex justify-around items-center h-full mx-0">
          <li>
            <NavLink
              icon={<Home size={26} />}
              label="Hem"
              sectionId="home"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
              isMobile={true}
            />
          </li>
          <li>
            <NavLink
              icon={<User size={26} />}
              label="Om Mig"
              sectionId="about"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
              isMobile={true}
            />
          </li>
          <li>
            <NavLink
              icon={<Brain size={26} />}
              label="Färdigheter"
              sectionId="skills"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
              isMobile={true}
            />
          </li>
          <li>
            <NavLink
              icon={<Briefcase size={26} />}
              label="Projekt"
              sectionId="projects"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
              isMobile={true}
            />
          </li>
          <li>
            <NavLink
              icon={<Brush size={26} />}
              label="Målningar"
              sectionId="paintings"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
          <li>
            <NavLink
              icon={<Mail size={26} />}
              label="Kontakt"
              sectionId="contact"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
              isMobile={true}
            />
          </li>
        </ul>
      </nav>
      {/* Huvudinnehåll - med padding i botten för mobilmenyn */}
      <MainContent />
    </div>
  );
};

export default App;
