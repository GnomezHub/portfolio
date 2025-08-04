import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
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

export default function MainContent({ animationTypes, onNavLinkClick }) {
  return (
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
          className="bg-black/40 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-3xl border-2  border-white/10"
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
            onClick={() => onNavLinkClick("projects")}
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

        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16 text-amber-500 " //text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
            data-animation="subtle-fade-in-up"
          >
            Om Mig
          </h2>
          <div className="flex flex-col md:flex-row items-center md:space-x-12">
            <div className="md:w-1/3 mb-8 md:mb-0" data-animation="fadeInLeft">
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
        className="py-24 px-4 md:px-10 bg-gray-900/85" // backdrop-blur-xs"
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16 text-lime-500" //text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500"
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
              "Adobe Photoshop",
              "Adobe Illustrator",
              "Adobe After Effects",
              "Adobe Animator",
              "Actionscript 3",
              "SQL server",
              "Entity Framework",
              "MVC",
              "React",
              "JavaScript (ES6+)",
              "P5.js",
              "HTML5",
              "CSS3",
              "Tailwind CSS",
              "Bootstrap",
              "PHP",
              "MySQL",
              "ASP",
              "Access", 
              "JSP",
              "Arduino",
              "Engelska",
              "Svenska",
              "Spanska",
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
        {/* Justerad opacitet */}
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl font-bold text-center mb-16 text-fuchsia-600" //text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500"
            data-animation="subtle-fade-in-up"
          >
            Mina Projekt
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ProjectCard
              title="Munamii Cakery"
              description="Ett bageri"
              technologies={["React", "Tailwind CSS"]}
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
              title="Crabby Weather"
              description="En modern väderapp som hämtar data från ett externt API och visar prognoser med snygg grafik."
              technologies={["React", "Tailwind CSS"]}
              githubLink="https://github.com/GnomezHub/crabby-weather"
              liveLink="https://Gnomezhub.github.io/crabby-weather"
              image="assets/crabby-weather.png"
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
            className="text-4xl font-bold mb-8 text-indigo-600" //text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-animation="subtle-fade-in-up"
          >
            Kontakta Mig
          </h2>
          <p
            className="text-lg text-gray-300 mb-8"
            data-animation="subtle-fade-in-up"
            data-stagger-index="1"
          >
            Har du ett spännande projekt eller vill du bara säga hej? Tveka inte
            att höra av dig!
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
  );
}

// Kort för färdigheter
// Använder Lucide-ikonen "Code" för att representera färdigheter
// Animationer tilldelas slumpmässigt från animationTypes-arrayen
const SkillCard = ({ skill, index, animationType }) => (
  <div
    className="bg-gray-800/30 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center text-center transform hover:-translate-y-2 transition-transform duration-300 ease-in-out border border-white/10 hover:border-emerald-500"
    data-animation={animationType}
    data-stagger-index={index}
  >
    <Code size={32} className="text-emerald-400 mb-2" />
    <h3 className="text-lg font-semibold text-white">{skill}</h3>
  </div>
);