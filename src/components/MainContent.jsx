import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
import Eye from "./Eye";

import {
  Home,
  User,
  Code,
  Brain,
  Briefcase,
  Mail,
  Github,
  FileText,
  ExternalLink,
} from "lucide-react";

export default function MainContent() {
  // Array med tillgängliga animationstyper för slumpmässig tilldelning
  const animationTypes = [
    "subtle-fade-in-up",
    "fadeInLeft",
    "fadeInRight",
    "zoomIn",
    "softZoomInUp",
  ];

  return (
    <main className="relative z-20 md:pl-0 pb-16 md:pb-0 scroll-smooth">
      {" "}
      {/* z-20 för att innehållet ska ligga ovanför parallax-bakgrunden */}
      {/* Hem-sektion */}
      <section
        id="home"
        className=" px-6 md:pl-26 h-screen flex flex-col items-center justify-center text-center"
      >
        {/* Innehåll i hem-sektionen */}
        <div
          className="bg-black/50 backdrop-bluur-xs p-8 rounded-xl shadow-2xl max-w-3xl border-2  border-white/10"
          data-animation="zoomIn"
        >
          <h1 className="text-4xl font-heading md:text-6xl font-extrabold text-lime-600 ">
            {/*text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-4"> */}
            Hej, jag är Danny Gomez
          </h1>
          <img
            src="assets/skulptur_matt.png"
            alt="sculpture"
            className="w-30 mx-auto py-6"
            data-animation="softZoomInUp"
            data-stagger-index={0}
          />

          <p
            data-animation="fadeInRight"
            data-stagger-index={2}
            className="text-xl md:text-2xl font-heading text-gray-200 mb-8"
          >
            En skogstokig fullstack-utvecklare med konstnärliga drag
          </p>
          {/* <button
            onClick={() => onNavLinkClick("projects")}
            //className="bg-emerald-600  hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
            className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            Mina Projekt
          </button> */}
        </div>
      </section>
      {/* Om Mig-sektion med semi-transparent bakgrund */}
      <section
        id="about"
        className="py-24 px-6 md:pl-26 bg-gray-900/80 border-t-2 border-amber-100/10"
      >
        <div className="relative max-w-4xl mx-auto">
          {/* <img
            src="assets/djungelbubs.png"
            alt="En placeholder-bild som överlappar den svarta rutan."
            class="absolute top-[-270px] left-1/2 transform -translate-x-1/2 
         shadow-lg z-10"
          /> */}
          <h2
            className="text-4xl font-heading font-bold text-center mb-16 text-amber-500 " //text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500"
            data-animation="subtle-fade-in-up"
          >
            Om Mig
          </h2>
          <div className="mb-16 flex flex-col md:flex-row items-center md:space-x-8">
            {/* */}
            <div className="md:w-1/3 mb-8 md:mb-0" data-animation="fadeInLeft">
              <img
                src="assets/dannyleaves_smaller.jpg"
                alt="Danny Gomez"
                className="rounded-full w-64 h-64 object-cover mx-auto shadow-2xl border-4 border-emerald-500/50 transform hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div
              className="md:w-2/3 text-lg leading-relaxed text-gray-300"
              data-animation="fadeInRight"
              data-stagger-index="1"
            >
              <h4 className="text-xl font-body italic mb-3">
                Vem är Danny Gomez?
              </h4>
              <p className="font-body space-y-6">
                En utvecklare som inte är rädd för inveckling. Har funnits med
                sedan Macromedia Flash tiden och har genomgått en intensiv
                modernisering av sina kunskaper.
              </p>
              <p className="font-body space-y-6">
                Kan uppskatta enkelheten i det minimalistiska, men har förmågan
                att go bananas bortom gränser du inte visste fanns.
              </p>
              <p className="font-body space-y-6">
                Jag har målat litegrann och skulpterat lite mindre. Jag tycker
                om det.
              </p>
            </div>
          </div>
          <Eye className="w-20 h-20" />
          {/* <img src="assets/skulptur_glansig.png" alt="sculpture" className="w-50 mx-auto py-6" /> */}
        </div>
      </section>
      {/* Färdigheter-sektion med semi-transparent bakgrund */}
      <section
        id="skills"
        className="py-24 px-4 md:pl-24 border-t border-white/10 bg-gray-900/60 backdrop-blur-xs"
      >
        <div className="max-w-6xl mx-auto">
          <Brain size="60" className="mx-auto mb-8 text-lime-600 " />
          <h2
            className="text-4xl text-center font-heading font-bold mb-22 text-lime-500" //text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-500"
            data-animation="subtle-fade-in-up"
          >
            Mina Skills
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              "C#",
              "Java",
              "VB Script",
              "Python",
              "3D Studio Max",
              "Adobe Photoshop",
              "Adobe Illustrator",
              "Adobe After Effects",
              "Adobe Animator",
              "Actionscript",
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
          <Brain size="60" className="mx-auto mt-22 text-lime-600 " />
        </div>
      </section>
      {/* Projekt-sektion med semi-transparent bakgrund */}
      <section
        id="projects"
        className="py-24 px-6 md:pl-26 bg-gray-800/70 backdrop-blur-xs border-t border-t-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <Briefcase size="60" className="mx-auto mb-8 text-fuchsia-700 " />

          <h2
            className="text-4xl font-bold text-center font-heading mb-22 text-fuchsia-600" //text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-purple-500"
            //  data-animation="subtle-fade-in-up"
          >
            Mina Projekt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
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
              title="Filmdatabas"
              description="En .net online databas för långfilmer där registrerade användare kan påverka innehållet, administrator lägga till och ta bort och besökare kan ta del av film biblioteket."
              technologies={["MVC", "C#", "SQL", "Bootstrap"]}
              githubLink="https://github.com/GnomezHub/MVC-HollyView"
              liveLink=""
              image="assets/movies_list.png"
              index={1}
              animationType="zoomIn"
            />
            <ProjectCard
              title="Crabby Weather"
              description="En modern väderapp som hämtar data från ett externt API och visar prognoser live genom web API. Stilren design i både mörkt och ljust tema."
              technologies={["React", "Tailwind CSS", "Web API"]}
              githubLink="https://github.com/GnomezHub/crabby-weather"
              liveLink="https://crabby-weather.netlify.app"
              image="assets/crabby-weather.png"
              index={2}
              animationType="fadeInRight"
            />
            <ProjectCard
              title="Track Your ASSets"
              description="En konsol-applikation med Entity Framework för databas lagring. Applikationen är till för att hålla koll på sina tillgångar och dess värdet baserat på dagens valutaväxel."
              technologies={["C#", "Entity Framework", "SQL server"]}
              githubLink="https://github.com/GnomezHub/TrackYourASSetsEntityFramework"
              liveLink=""
              image="assets/trackYourASSets.png"
              index={5}
              animationType="zoomIn"
            />
            <ProjectCard
              title="Mandaleido"
              description="Ett program för visual jockeys som skapar kaleidoskopiska animationer i realtid av bilder man väljer. De olika effekterna justeras men scrolling. Kontrollerna har separata fönster så att man kan ha effekterna i fullskärm genom exempelvis projektor."
              technologies={["Adobe AIR", "AS3", "Adobe Animator"]}
              githubLink=""
              liveLink="https://youtu.be/V7Cxf1Wduok"
              image="assets/mandaleido.jpg"
              index={6}
              animationType="fadeInLeft"
            />

            <ProjectCard
              title="Catquest"
              description="Ett plattformsspel för Android som jag skapade för att föreviga en av mina tidigare katter. RIP. Rest In Play."
              technologies={[
                "Adobe AIR",
                "AS3",
                "Adobe Animator",
                "Adobe Photoshop",
              ]}
              githubLink="https://drive.google.com/file/d/1x4KYAYfpvtpRSwuOviNQVUSS7WKm8lMn/view?usp=drive_link"
              liveLink="https://youtu.be/VLAaweiRSUk"
              image="assets/Platformercat.jpg"
              index={7}
              animationType="fadeInRight"
            />
          </div>
        </div>
      </section>
      {/* Kontakt-sektion med semi-transparent bakgrund */}
      <section
        id="contact"
        className="py-24 px-6 md:pl-26 bg-gray-900 border-t-2 border-white/20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <Mail size="60" className="mx-auto mb-8 text-indigo-700 " />
          <h2
            className="text-4xl font-bold mb-8 font-heading text-indigo-600" //text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
            data-animation="subtle-fade-in-up"
          >
            Kontakta Mig
          </h2>
          <p
            className="text-lg text-gray-300 mb-8"
            data-animation="subtle-fade-in-up"
            data-stagger-index="1"
          >
            Vill du involvera mig i något, fråga ut mig eller ge mig smicker,
            tveka då inte att höra av dig med hjälp av formuläret nedan!
          </p>
          <ContactForm />
          <div
            className="space-y-6 mt-12"
            data-animation="subtle-fade-in-up"
            data-stagger-index="2"
          >
            <p className="text-lg text-gray-300 mb-8">
              Fler kontaktuppgifter och annan information finner du i mitt CV
              nedan
            </p>
            <a
              href="https://dannygomez-cv.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-teal-700 hover:bg-emerald-600
               text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FileText size={20} className="mr-3" /> Curriculum Vitae
            </a>

            <div className="flex justify-center space-x-6 pt-4">
              <a
                href="https://gnomezhub.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300"
              >
                <Github size={32} />
              </a>
              <a
                href="mailto:danny.gomez.mail@gmail.com"
                target="_blank"
                className="text-gray-400 hover:text-white transform hover:scale-110 transition-all duration-300"
              >
                <Mail size={32} />
              </a>
            </div>
          </div>
        </div>
        <img
          src="assets/skulptur_sidan_edit.png"
          alt="dude"
          className="w-42 mr-10 absolute bottom-9 right-1"
        />
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
    className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col 
    items-center justify-center text-center transition-all duration-300 ease-in-out border-2 border-white/10 hover:border-emerald-500"
    data-animation={animationType}
    data-stagger-index={index}
  >
    <Brain size={32} className="text-emerald-400 mb-2" />
    <h3 className="text-lg font-semibold text-white">{skill}</h3>
  </div>
);
