import React, { useState, useEffect } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Github,
  Linkedin,
  X,
  ExternalLink,
} from "lucide-react";

import ContactForm from "./components/ContactForm";
import Eye from "./components/Eye";
import NavLink from "./components/NavLink";

// Huvudkomponenten för portfolion
const Otherapp = () => {
  // State för att hantera aktiv sektion för navigering
  const [activeSection, setActiveSection] = useState("home");
  // State för att hantera synlighet av mobilnavigering
  // const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  // State för att hantera parallax-offset för bakgrunden
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // --- EFFEKT FÖR PARALLAX ---
  // Hanterar den "långsammare skrollningen" av bakgrunden.
  useEffect(() => {
    const handleScroll = () => {
      // Justera värdet (t.ex. 0.3 eller 0.7) för att ändra parallax-hastigheten.
      // Ett högre värde (närmare 1) gör att bakgrunden rör sig mer med skrollen.
      // Ett lägre värde (närmare 0) gör att bakgrunden rör sig mindre (mer "fixed").
      setParallaxOffset(window.scrollY * -0.1); // Justerat till 0.4 för en märkbar men inte för snabb effekt
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
    const sections = ["home", "about", "skills", "projects", "contact"];
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
                  parseInt(el.dataset.staggerIndex) * 150
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

  // Array med tillgängliga animationstyper för slumpmässig tilldelning
  const animationTypes = [
    "subtle-fade-in-up",
    "fadeInLeft",
    "fadeInRight",
    "zoomIn",
    "softZoomInUp",
  ];

  return (
    <div className="min-h-full bg-transparent text-gray-100 font-sans">
      {/* Global Parallax Bakgrunds-div */}
      {/* Denna div är fixerad och täcker hela skärmen, så den syns bakom alla sektioner */}
      <div
        className="fixed top-0 left-0 w-2000 h-2626 bg-center z-0"
        style={{
          backgroundImage: "url(assets/foresty_2000_2626.jpg)",
          //  backgroundSize: "2000px 2626px", // Exempel på fast storlek
          transform: `translateY(${parallaxOffset}px)`,
        }}
      />
      {/* Överlagring för bakgrunden för att göra texten mer läsbar */}
      <div className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"></div>
      {/* Sidonavigering (Desktop)
      yellow-400
      */}
      <nav className="fixed top-0 left-0 h-full w-20 bg-gray-900/40 backdrop-blur-lg border-r border-white/10 shadow-lg z-50 hidden md:flex flex-col items-center justify-center py-8">
        <ul className="space-y-8">
          <Eye />

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
              icon={<Code size={24} />}
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
              icon={<Mail size={24} />}
              label="Kontakt"
              sectionId="contact"
              activeSection={activeSection}
              onClick={handleNavLinkClick}
            />
          </li>
        </ul>
      </nav>
      {/* NY Mobilmeny (Horisontell, fixerad längst ner) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full h-16 bg-gray-900/40 backdrop-blur-lg border-t border-white/10 z-50">
        <ul className="flex justify-around items-center h-full">
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
              icon={<Code size={26} />}
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
      <main className="relative z-20 md:ml-20 pb-16 md:pb-0">
        {" "}
        {/* z-20 för att innehållet ska ligga ovanför parallax-bakgrunden */}
        {/* Hem-sektion */}
        <section
          id="home"
          className="h-screen flex flex-col items-center justify-center text-center px-4"
        >
          {/* Innehåll i hem-sektionen */}
          <div
            className="bg-black/40 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-3xl"
            data-animation="zoomIn"
          >
            {" "}
            {/* Justerad opacitet */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-4">
              Hej, jag är Danny Gomez
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              En passionerad fullstack utvecklare som med en passion för
              inveckling
            </p>
            <button
              onClick={() => handleNavLinkClick("projects")}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              Se Mina Projekt
            </button>
          </div>
        </section>
        {/* Om Mig-sektion med semi-transparent bakgrund */}
        <section
          id="about"
          className="py-24 px-4 backdrop-blur-sm md:px-10 bg-black/50"
        >
          {" "}
          {/* Justerad opacitet */}
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
              data-animation="subtle-fade-in-up"
            >
              Om Mig
            </h2>
            <div className="flex flex-col md:flex-row items-center md:space-x-12">
              <div
                className="md:w-1/3 mb-8 md:mb-0"
                data-animation="fadeInLeft"
              >
                <img
                  src="assets/danny300.jpg"
                  alt="Danny Gomez"
                  className="rounded-full w-64 h-64 object-cover mx-auto shadow-2xl border-4 border-emerald-500/50 transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div
                className="md:w-2/3 text-lg leading-relaxed text-gray-300"
                data-animation="fadeInRight"
                data-stagger-index="1"
              >
                <p className="mb-4">
                  Jag är en fullstack utvecklare med 20 års erfarenhet av att
                  utveckla responsiva och användarvänliga webbapplikationer. Min
                  passion ligger i att omvandla komplexa idéer till eleganta och
                  effektiva lösningar.
                </p>
                <p>
                  Utöver kodning tycker jag om att cykla, måla tavlor och klappa
                  djur av alla slag.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Färdigheter-sektion med semi-transparent bakgrund */}
        <section
          id="skills"
          className="py-24 px-4 md:px-10 bg-gray-900/80 backdrop-blur-xs"
        >
          {" "}
          {/* Justerad opacitet */}
          <div className="max-w-4xl mx-auto">
            <h2
              className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500"
              data-animation="subtle-fade-in-up"
            >
              Mina Färdigheter
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
              {[
                "C#",
                "Java",
                "Actionscript",
                "Python",
                "Photoshop",
                "Illustrator",
                "SQL",
                "Entity Framework",
                "MVC",
                "React",
                "JavaScript (ES6+)",
                "HTML5",
                "CSS3",
                "Tailwind CSS",
                "Bootstrap",
                "Arduino",
                "ESP 32",
              ].map((skill, index) => {
                const randomAnimation =
                  animationTypes[
                    Math.floor(Math.random() * animationTypes.length)
                  ];
                return (
                  <SkillCard
                    key={index}
                    skill={skill}
                    index={index}
                    animationType={randomAnimation}
                  />
                );
              })}
            </div>
          </div>
        </section>
        {/* Projekt-sektion med semi-transparent bakgrund */}
        <section
          id="projects"
          className="py-24 px-4 md:px-10 bg-gray-800/70 backdrop-blur-sm"
        >
          {" "}
          {/* Justerad opacitet */}
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500"
              data-animation="subtle-fade-in-up"
            >
              Mina Projekt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <ProjectCard
                title="Munamii Cakery"
                description="Ett bageri"
                technologies={["React", "Tailwind css"]}
                githubLink="https://github.com/GnomezHub/munamii"
                liveLink="https://munamiii.netlify.app"
                image="assets/munamii.png"
                index={0}
                animationType="fadeInLeft"
              />
              <ProjectCard
                title="Uppgiftshanterare"
                description="En intuitiv uppgiftshanterare med drag-and-drop och realtidsuppdateringar via Firebase."
                technologies={["React", "Firebase", "Redux", "dnd-kit"]}
                githubLink="https://github.com/GnomezHub/uppgiftshanterare"
                liveLink="#"
                image="https://images.unsplash.com/photo-1547480053-7d174f67b557?q=80&w=2070&auto=format&fit=crop"
                index={1}
                animationType="zoomIn"
              />
              <ProjectCard
                title="Väderapplikation"
                description="En modern väderapp som hämtar data från ett externt API och visar prognoser med snygg grafik."
                technologies={["React", "API", "Axios", "Recharts"]}
                githubLink="https://github.com/GnomezHub/vaderapp"
                liveLink="#"
                image="https://images.unsplash.com/photo-1592210454359-9043f067919b?q=80&w=2070&auto=format&fit=crop"
                index={2}
                animationType="fadeInRight"
              />
            </div>
          </div>
        </section>
        {/* Kontakt-sektion med semi-transparent bakgrund */}
        <section id="contact" className="py-24 px-4 md:px-10 bg-gray-900">
          {" "}
          {/* Justerad opacitet */}
          <div className="max-w-xl mx-auto text-center">
            <h2
              className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
              data-animation="subtle-fade-in-up"
            >
              Kontakta Mig
            </h2>
            <p
              className="text-lg text-gray-300 mb-8"
              data-animation="subtle-fade-in-up"
              data-stagger-index="1"
            >
              Har du ett spännande projekt eller vill du bara säga hej? Tveka
              inte att höra av dig!
            </p>

            <ContactForm />

            <div
              className="space-y-6 mt-6"
              data-animation="subtle-fade-in-up"
              data-stagger-index="2"
            >
              <p>...Eller på mail</p>
              <a
                href="mailto:danny.gomez.mail@gmail.com"
                className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Mail size={20} className="mr-3" /> danny.gomez.mail@gmail.com
              </a>
              <div className="flex justify-center space-x-6 pt-4">
                <a
                  href="https://github.com/GnomezHub/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <Github size={32} />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300"
                >
                  <Linkedin size={32} />
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* Sidfot */}
        <footer className="py-8 text-center text-gray-500 text-sm bg-gray-900 border-t border-white/10">
          &copy; {new Date().getFullYear()} Danny Gomez. Alla rättigheter
          reserverade.
        </footer>
      </main>
    </div>
  );
};


// --- Underkomponenter för Färdigheter och Projekt ---

// Kort för färdigheter
// Använder Lucide-ikonen "Code" för att representera färdigheter
// Animationer tilldelas slumpmässigt från animationTypes-arrayen
const SkillCard = ({ skill, index, animationType }) => (
  <div
    className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-white/10 hover:border-emerald-500"
    data-animation={animationType}
    data-stagger-index={index}
  >
    <Code size={32} className="text-emerald-400 mb-4" />
    <h3 className="text-lg font-semibold text-white">{skill}</h3>
  </div>
);

// Kort för projekt
// Innehåller titel, beskrivning, teknologier, länkar och bild
// Använder Lucide-ikoner "Github" och "ExternalLink" för länkar
// Animationer tilldelas slumpmässigt från animationTypes-arrayen
const ProjectCard = ({
  title,
  description,
  technologies,
  githubLink,
  liveLink,
  image,
  index,
  animationType,
}) => (
  <div
    className="bg-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col transform hover:scale-[1.03] transition-transform duration-300 ease-in-out border border-white/10 hover:border-teal-500"
    data-animation={animationType}
    data-stagger-index={index}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-48 object-cover"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src =
          "https://placehold.co/400x250/1a202c/e2e8f0?text=Bild+saknas";
      }}
    />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-base mb-4 flex-grow">{description}</p>
      <div className="flex flex-wrap gap-2 mb-5">
        {technologies.map((tech, idx) => (
          <span
            key={idx}
            className="bg-gray-600 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center mt-auto pt-4 border-t border-white/10">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-emerald-400 hover:text-emerald-300 font-semibold transition-colors duration-200"
        >
          <Github size={20} className="mr-2" /> GitHub
        </a>
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-teal-400 hover:text-teal-300 font-semibold transition-colors duration-200"
        >
          Live Demo <ExternalLink size={16} className="ml-2" />
        </a>
      </div>
    </div>
  </div>
);

export default Otherapp;
