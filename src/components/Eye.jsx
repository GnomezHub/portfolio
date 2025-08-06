import React, { useState, useEffect } from "react";

const EyeOpenSVG = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M22 18C22 14.69 19.31 12 16 12C12.69 12 10 14.69 10 18C10 21.31 12.69 24 16 24C19.31 24 22 21.31 22 18ZM29 14.09C28.98 17.08 28 21 28 21C27 24 24 29 16 29C8 29 5 24 4 21C4 21 3.02 17.08 3 14.09C5.17 10.73 9.28 7 16 7C22.72 7 26.83 10.73 29 14.09Z"
      fill="#FFE6EA"
    />
    <path
      d="M16 12C19.31 12 22 14.69 22 18C22 21.31 19.31 24 16 24C12.69 24 10 21.31 10 18C10 14.69 12.69 12 16 12Z"
      fill="#668077"
    />
    <path
      d="M16 16C17.11 16 18 16.9 18 18C18 19.1 17.11 20 16 20C14.9 20 14 19.1 14 18C14 16.9 14.9 16 16 16Z"
      fill="#FFC44D"
    />
    <path
      d="M4.001 21C5.001 24 8.001 29 16.001 29C24.001 29 27.001 24 28.001 21M31 19C31 17 27.001 7 16 7M16 7C5.001 7 1 17 1 19M16 7V3M21.1758 3.6816L20.1758 7.4106M26 5.6797L23.999 9.1427M30.1416 8.8574L27.3136 11.6844M10.8223 3.6816L11.8213 7.4106M5.999 5.6797L7.999 9.1437M1.8574 8.8574L4.6854 11.6854M16.001 12C12.688 12 10.001 14.687 10.001 18C10.001 21.313 12.688 24 16.001 24C19.314 24 22.001 21.313 22.001 18M21.2441 15.0869C20.7001 14.1089 19.8911 13.3009 18.9141 12.7569M18.001 18C18.001 16.896 17.105 16 16.001 16C14.897 16 14.001 16.896 14.001 18C14.001 19.104 14.897 20 16.001 20C17.105 20 18.001 19.104 18.001 18Z"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EyeClosedSVG = ({ className }) => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 32 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16 3C26 3 31 12 31 14C31 16 26 25 16 25C6 25 1 16 1 14C1 12 6 3 16 3Z"
      fill="#FFC44D"
    />
    <path
      d="M16.001 29V25M10.8232 28.3184L11.8592 24.4554M5.999 26.3203L8 22.8573M1.8574 23.1426L4.6854 20.3156M21.1768 28.3184L20.1418 24.4554M26 26.3203L24 22.8563M30.1416 23.1426L27.3136 20.3146M31 14C31 16 26 25 16 25C6 25 1 16 1 14C1 12 6 3 16 3C26 3 31 12 31 14Z"
      stroke="#000000"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

// Komponenten för det blinkande ögat
export default function Eye({ className = "" }) {
  // Skapar ett state för att hålla reda på om ögat blinkar (är stängt)
  const [isBlinking, setIsBlinking] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  useEffect(() => {
    const handleBlink = () => {
      setIsBlinking(true);
      const closedTime = Math.random() * 700 + 50;
      setTimeout(() => {
        setIsBlinking(false);
      }, closedTime);
    };

    const scheduleNextBlink = () => {
      const opendTime = Math.random() * 3000 + 3000;
      const timeout = setTimeout(() => {
        handleBlink();
        scheduleNextBlink();
      }, opendTime);
      return timeout;
    };

    const initialBlinkTimeout = scheduleNextBlink();

    return () => clearTimeout(initialBlinkTimeout);
  }, []);

  return (
    <div
      className="z-50 overflow-clip mx-auto flex flex-col items-center hover:scale-190 transition-all ease-in-out duration-500"
      onMouseDown={() => setIsMouseDown(true)}
      onMouseUp={() => setIsMouseDown(false)}
    >
      {/* Renderar antingen det öppna eller det stängda ögat baserat på state (eller mustryck)*/}

      {isBlinking || isMouseDown ? (
        <EyeClosedSVG className={className} />
      ) : (
        <EyeOpenSVG className={className} />
      )}
    </div>
  );
}

//
