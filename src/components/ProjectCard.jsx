import { Github, ExternalLink } from "lucide-react";

// Kort för projekt
// Innehåller titel, beskrivning, teknologier, länkar och bild
// Använder Lucide-ikoner "Github" och "ExternalLink" för länkar
// Animationer tilldelas slumpmässigt från animationTypes-arrayen
export default function ProjectCard({
  title,
  description,
  technologies,
  githubLink,
  liveLink,
  image,
  index,
  animationType,
}) {
  return (
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
}
