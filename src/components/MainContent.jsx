import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
import Eye from "./Eye";
import React, { useState, useEffect, useRef } from "react";

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
  Brush,
  // Nya ikoner för zoom-kontroller
  ZoomIn,
  ZoomOut,
  X,
  XSquare,
  XCircleIcon,
  Expand as Maximize, // Använder Expand-ikonen för "originalstorlek"
  Shrink as Minimize, // Använder Shrink-ikonen för "passa till vyn"
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

  const [images] = useState([
    {
      id: 1,
      src: "assets/paintings/fetuslotus.jpg",
      alt: "En surrealistisk figur med många ögon som sitter i lotusställning",
      title: "Lotusfoster",
    },
    {
      id: 2,
      src: "assets/paintings/elephantman.jpg",
      alt: "En surrealistisk scen med djur och en elefantmänniska",
      title: "Elefantmannen",
    },
    {
      id: 3,
      src: "assets/paintings/mariemaid.jpg",
      alt: "En surrealistisk målning med en sjöjungfru och fantasifigurer",
      title: "Mariemaiden",
    },
    {
      id: 4,
      src: "assets/paintings/fishybongbong.jpg",
      alt: "En abstrakt målning av en fisk med bubblor",
      title: "Fishy bongbong",
    },
    {
      id: 5,
      src: "assets/paintings/girltangled.jpg",
      alt: "En naken kvinnofigur omgiven av abstrakta former",
      title: "Flicka Färgtrasslad",
    },
    {
      id: 6,
      src: "assets/paintings/lycoigruff.jpg",
      alt: "En varulvskatt under en fullmåne",
      title: "Månens Väktare",
    },

    {
      id: 7,
      src: "assets/paintings/trappedfantasy.jpg",
      alt: "Ett ansikte med blått hår som tittar fram genom persienner",
      title: "Fängslad Fantasi",
    },
    {
      id: 8,
      src: "assets/paintings/couplepop.jpg",
      alt: "Ett par poppar i en färgglad stil",
      title: "Pop-par",
    },
    {
      id: 9,
      src: "assets/paintings/deepdive.jpg",
      alt: "En färgglad marulk i djuphavet",
      title: "Deep Dive",
    },
    {
      id: 10,
      src: "assets/paintings/femmeforbidden.jpg",
      alt: "En stiliserad kvinnofigur i underkläder med ett lås",
      title: "Femme Forbidden",
    },
    {
      id: 11,
      src: "assets/paintings/zenzloth.jpg",
      alt: "And I was like whatever bitches, and the bitches whatevered",
      title: "And The Bitches Whatevered",
    },
  ]);

  // State för att hålla reda på vilken bild som är vald för att visas i större format
  const [selectedImage, setSelectedImage] = useState(null);

  // --- NYA STATES FÖR ZOOM OCH PANORERING ---
  const [zoom, setZoom] = useState(1);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Referenser
  const imageContainerRef = useRef(null); // Ref till div som innehåller den stora bilden
  const imageRef = useRef(null); // Ref till själva <img>-elementet
  const dragStartRef = useRef({ x: 0, y: 0, transformX: 0, transformY: 0 }); // Ref för att spara startposition vid drag

  // Funktion för att öppna modalen med en specifik bild
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // Funktion för att stänga modalen
  const closeModal = () => {
    setSelectedImage(null);
  };

  // --- UPPDATERAD USEEFFECT FÖR ATT HANTERA INITIAL ZOOM ---
  // Denna effekt körs när en bild väljs. Den beräknar den initiala zoomnivån
  // så att hela bilden passar i vyn ("fit to view").
  useEffect(() => {
    if (selectedImage && imageContainerRef.current) {
      document.body.style.overflow = "hidden";

      const imageElement = new Image();
      imageElement.src = selectedImage.src;

      imageElement.onload = () => {
        const container = imageContainerRef.current;
        if (!container) return;

        const { naturalWidth, naturalHeight } = imageElement;
        const { clientWidth: containerWidth, clientHeight: containerHeight } =
          container;

        // Beräkna "fit"-skalan
        const scaleX = containerWidth / naturalWidth;
        const scaleY = containerHeight / naturalHeight;
        const initialScale = Math.min(scaleX, scaleY, 1); // Se till att inte zooma in om bilden är mindre än vyn

        setZoom(initialScale);
        setTransform({ x: 0, y: 0 }); // Centrera bilden
      };

      return () => {
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [selectedImage]);

  // --- NYA FUNKTIONER FÖR ZOOM-KNAPPARNA ---
  const handleZoomIn = (e) => {
    e.stopPropagation();
    setZoom((z) => Math.min(z * 1.2, 5)); // Max zoom 5x
  };
  const handleZoomOut = (e) => {
    e.stopPropagation();
    setZoom((z) => Math.max(z / 1.2, 0.1)); // Min zoom 0.1x
  };

  const handleZoomToFit = (e) => {
    e.stopPropagation();
    if (imageRef.current && imageContainerRef.current) {
      const { naturalWidth, naturalHeight } = imageRef.current;
      const { clientWidth, clientHeight } = imageContainerRef.current;
      const scaleX = clientWidth / naturalWidth;
      const scaleY = clientHeight / naturalHeight;
      setZoom(Math.min(scaleX, scaleY, 1));
      setTransform({ x: 0, y: 0 });
    }
  };

  const handleZoomToOriginal = (e) => {
    e.stopPropagation();
    setZoom(1);
    setTransform({ x: 0, y: 0 }); // Centrera om vid 100%
  };

  // --- UPPDATERADE FUNKTIONER FÖR PANORERING (DRAG) ---
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      transformX: transform.x,
      transformY: transform.y,
    };
    if (imageRef.current) imageRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.stopPropagation();
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setTransform({
      x: dragStartRef.current.transformX + dx,
      y: dragStartRef.current.transformY + dy,
    });
  };

  const handleMouseUp = (e) => {
    e.stopPropagation();
    setIsDragging(false);
    if (imageRef.current) imageRef.current.style.cursor = "grab";
  };

  const handleMouseLeave = (e) => {
    if (isDragging) {
      handleMouseUp(e);
    }
  };

  return (
    <main className="relative z-20 md:pl-0 mb-16 md:mb-0 scroll-smooth">
      {/* ... (all of your existing sections: home, about, skills, projects) ... */}
      {/* Hem-sektion */}
      <section
        id="home"
        className=" px-6 md:pl-26 h-screen flex flex-col items-center justify-center text-center"
      >
        {/* Innehåll i hem-sektionen */}
        <div
          className="bg-gray-900/50 backdrop-blur-xs p-8 rounded-xl shadow-2xl max-w-3xl border-2  border-white/10"
          data-animation="zoomIn"
        >
          <h1 className="text-4xl mb-4 font-heading md:text-6xl font-extrabold text-lime-600 ">
            {/*text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-sky-500 mb-4"> */}
            Hej, jag är Danny Gomez
          </h1>

          <Eye className="w-24 h-24" />
          <p
            data-animation="fadeInRight"
            data-stagger-index={2}
            className="text-xl md:text-2xl font-heading text-gray-200 mt-8"
          >
            En skogstokig fullstack-utvecklare med konstnärliga drag
          </p>
        </div>
      </section>
      {/* Om Mig-sektion med semi-transparent bakgrund */}
      <section
        id="about"
        className="py-24 px-6 md:pl-26 bg-gray-900/80 border-t-2 border-amber-100/10"
      >
        <div className="relative max-w-4xl mx-auto">
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
                sedan Macromedia Flash -tiden och har genomgått en intensiv
                modernisering av sina kunskaper. Det som började med
                estetiska programmet på gymnasiet, fortsatte med
                interaktionsteknologi på högskolan innan det döks ner i
                programmeringsdjupet i arbetslivet följt av fullstack-utvecklarhästen med Lexicon. I stora drag.
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
          <img
            src="assets/skulptur_andrasidan.png"
            alt="sculpture"
            className="w-30 mx-auto py-6"
            data-animation="softZoomInUp"
            data-stagger-index={1}
          />
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
            className="text-4xl text-center font-heading font-bold mb-22 text-lime-500"
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
              "Katt",
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

          <h2 className="text-4xl font-bold text-center font-heading mb-22 text-fuchsia-600">
            Mina Projekt
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            <ProjectCard
              title="Munamii Cakery"
              description="Ett bageri som erbjuder cupcakes och bröllopstårtor. Responsiv design för datorskärm och telefon."
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
              description="En modern väderapp som hämtar data från ett externt API och visar prognoser live genom web API. Stilren design som lämpar sig bra från mobilen men också på skärm, i både mörkt och ljust tema"
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
              description="Ett program för visual jockeys som skapar kaleidoskopiska animationer i realtid av bilder man väljer. De olika effekterna justeras med scrolling. Kontrollerna har separata fönster så att man kan ha effekterna i fullskärm genom exempelvis projektor."
              technologies={["Adobe AIR", "AS3", "Adobe Animator"]}
              githubLink=""
              youtubeLink="https://youtu.be/V7Cxf1Wduok"
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
              downloadLink="https://drive.google.com/file/d/1x4KYAYfpvtpRSwuOviNQVUSS7WKm8lMn/view?usp=drive_link"
              youtubeLink="https://youtu.be/VLAaweiRSUk"
              image="assets/Platformercat.jpg"
              index={7}
              animationType="fadeInRight"
            />
          </div>
          <Briefcase size="60" className="mx-auto mt-22 text-fuchsia-700 " />
        </div>
      </section>

      {/* --- HELT NY OCH FÖRBÄTTRAD MODAL FÖR BILDVISNING --- */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-65 flex flex-col items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={closeModal} // Stäng modalen när man klickar på bakgrunden
        >
          <div
            className="relative w-full md:pb-16 h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()} // Förhindra att klick inuti stänger den
            onMouseUp={handleMouseUp} // Släpp drag-state även om musen släpps här
            onMouseMove={handleMouseMove} // Låt panorering fungera över hela ytan
            onMouseLeave={handleMouseLeave} // Stoppa drag om musen lämnar
          >
            {/* Stäng-knapp uppe i högra hörnet */}
            <button
              className="absolute cursor-pointer p-2 top-4 right-4 bg-gray-900/50 text-white rounded-full hover:bg-white/20 transition-colors  z-50"
              onClick={closeModal}
              aria-label="Stäng"
            >
              <X size={32} />
            </button>

            {/* Bild-viewport: denna div har overflow: hidden */}
            <div
              ref={imageContainerRef}
              className="w-full h-full flex items-center justify-center overflow-hidden"
            >
              <img
                ref={imageRef}
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-none max-h-none"
                style={{
                  transform: `translate(${transform.x}px, ${transform.y}px) scale(${zoom})`,
                  cursor: isDragging ? "grabbing" : "grab",
                  transition: isDragging ? "none" : "transform 0.2s ease-out", // Mjukare övergång när man inte drar
                }}
                onMouseDown={handleMouseDown}
                onDragStart={(e) => e.preventDefault()} // Förhindra webbläsarens inbyggda bild-drag
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/800x600/CCCCCC/666666?text=Bilden+kunde+inte+laddas`;
                }}
              />
            </div>

            {/* Kontroller för zoom och visning */}
            <div className="absolute bottom-14 md:bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm p-2 rounded-xl flex items-center gap-2 z-40">
              <button
                onClick={handleZoomOut}
                title="Zooma ut"
                className="text-white p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ZoomOut size={24} />
              </button>

              <button
                onClick={handleZoomToFit}
                title="Anpassa till fönstret"
                className="text-white p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Minimize size={24} />
              </button>
              <button
                onClick={handleZoomToOriginal}
                title="Originalstorlek (100%)"
                className="text-white p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <Maximize size={24} />
              </button>
              <button
                onClick={handleZoomIn}
                title="Zooma in"
                className="text-white p-2 rounded-full hover:bg-white/20 transition-colors cursor-pointer"
              >
                <ZoomIn size={24} />
              </button>
            </div>

            {/* Bildtitel */}
            <p className="absolute top-4 left-1/2 -translate-x-1/2 text-white text-lg font-medium bg-black/50 px-4 py-2 rounded-lg">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}

      <section
        id="paintings"
        className="py-24 px-6 md:pl-26 bg-gray-400/60 backdrop-blur-xs border-t border-t-white/10"
      >
        <div className="max-w-7xl mx-auto">
          <Brush size="60" className="mx-auto mb-8 text-rose-950" />

          <h2 className="text-4xl font-bold text-center font-heading mb-16 text-rose-950">
            Mina Målningar
          </h2>
          <div className="min-h-screenp-4 font-sans antialiased flex flex-col items-center">
            {/* Bildgalleriet med miniatyrer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="relative overflow-hidden rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 group"
                  onClick={() => openModal(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="block w-full h-auto object-cover object-center rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/600x400/CCCCCC/666666?text=Laddningsfel`;
                    }}
                  />

                  <div className="p-3 bg-stone-300/50 rounded-b-lg text-center">
                    <p className="text-gray-800 text-base font-semibold">
                      {image.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Brush size="60" className="mx-auto mt-22 text-rose-950" />
        </div>
      </section>
      {/* Kontakt-sektion med semi-transparent bakgrund */}
      <section
        id="contact"
        className="py-24 px-6 md:pl-26 bg-gray-900 pb-18 border-t-2 border-white/20"
      >
        <div className="max-w-2xl mx-auto text-center">
          <Mail size="60" className="mx-auto mb-8 text-indigo-700 " />
          <h2
            className="text-4xl font-bold mb-8 font-heading text-indigo-600"
            //    data-animation="subtle-fade-in-up"
          >
            Kontakta Mig
          </h2>
          <p
            className="text-lg text-gray-300 mb-1"
            //  data-animation="subtle-fade-in-up"
          >
            Vill du involvera mig i något, fråga ut mig eller ge mig smicker?
          </p>{" "}
          <p
            className="text-lg text-gray-300 mb-8"
            //  data-animation="subtle-fade-in-up"
          >
            Tveka då inte att höra av dig med hjälp av formuläret nedan!
          </p>
          <ContactForm />
          <div className="space-y-6 mt-12" data-animation="subtle-fade-in-up">
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
          className="w-30 absolute bottom-9 right-0"
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
