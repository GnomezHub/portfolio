export default function NavLink({
  icon,
  label,
  sectionId,
  activeSection,
  onClick,
  isMobile = false,
}) {
  const isActive = activeSection === sectionId;

  // Klasser för Desktop (vänster sida)
  const desktopBase =
    "flex items-center justify-center rounded-full transition-all duration-300 ease-in-out group"; //" focus:outline focus:border-dotted focus:border-yellow-400";
  const desktopActive = "p-2 m-1 bg-emerald-600 text-white shadow-lg";
  const desktopInactive =
    " p-3 text-gray-400 hover:bg-gray-700 hover:text-white";

  // Klasser för Mobil (botten)
  const mobileBase =
    "flex flex-col items-center justify-center gap-1 transition-all duration-200 ease-in-out transform";
  const mobileActive = "p-2 text-emerald-400 scale-110";
  const mobileInactive = "p-1 text-gray-400 hover:text-white text-shadow-sm";

  var dottedDiv = isActive
    ? " m-1 rounded-full border-6 border-dotted border-yellow-400 p-0"
    : "m-2";

  if (isMobile) {
    return (
      <div className={dottedDiv}>
        <button
          onClick={() => onClick(sectionId)}
          className={`${mobileBase} ${
            isActive ? mobileActive : mobileInactive
          }`}
          aria-label={label}
        >
          {icon}
        </button>
      </div>
    );
  }

  return (
    <div className={dottedDiv}>
      <button
        onClick={() => onClick(sectionId)}
        className={`${desktopBase} ${
          isActive ? desktopActive : desktopInactive
        }`}
        aria-label={label}
      >
        {" "}
        {/* Fixade inactiveClasses här */}
        {icon}
        <span
          className={`absolute left-full ml-4 whitespace-nowrap bg-gray-700 text-white text-sm px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none`}
        >
          {label}
        </span>
      </button>
    </div>
  );
}
