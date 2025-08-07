import React, { useState, useEffect } from "react";

// Importera dina bilder. I en verklig React-app skulle du
// använda 'import'-syntax eller placera dem i 'public'-mappen.
// För det här exemplet använder vi filnamnen direkt.
const sculptur_front = "./assets/sculptures/sculptur_front.png";
const sculptur_left_1 = "./assets/sculptures/sculptur_left_1.png";
const sculptur_left_2 = "./assets/sculptures/sculptur_left_2.png";
const sculptur_left_3 = "./assets/sculptures/sculptur_left_3.png";
const sculptur_right_1 = "./assets/sculptures/sculptur_right_1.png";
const sculptur_right_2 = "./assets/sculptures/sculptur_right_2.png";
const sculptur_right_3 = "./assets/sculptures/sculptur_right_3.png";
const sculptur_right_4 = "./assets/sculptures/sculptur_right_4.png";

// Definiera sekvensen för animeringen.
// Genom att upprepa en bild i listan skapar vi en paus i animeringen.
const imageSequence = [
  sculptur_front,
  sculptur_left_1,
  sculptur_left_2,
  sculptur_left_3,
  sculptur_left_3, // Paus
  sculptur_left_3, // Paus
  sculptur_left_3, // Paus
  sculptur_left_2,
  sculptur_left_1,
  sculptur_front,
  sculptur_front,
  sculptur_right_1,
  sculptur_right_2,
  sculptur_right_3,
  sculptur_right_4,
  sculptur_right_4, // Paus
  sculptur_right_4, // Paus
  sculptur_right_4, // Paus
  sculptur_right_3,
  sculptur_right_2,
  sculptur_right_1,
];

function SculptureAnimation() {
  // 'useState' för att hålla reda på vilken bild som visas just nu.
  const [currentIndex, setCurrentIndex] = useState(0);

  // 'useEffect' för att hantera animationsloopen.
  useEffect(() => {
    // Sätt en intervall som byter bild var 120:e millisekund.
    const intervalId = setInterval(() => {
      // Gå till nästa bild i sekvensen.
      // Använder modulo (%) för att loopa tillbaka till början när den når slutet.
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSequence.length);
    }, 120); // Math.random() * 300 + 50); // Justera detta värde för att ändra hastigheten (lägre är snabbare).

    // Städa upp intervallet när komponenten tas bort för att undvika minnesläckor.
    return () => clearInterval(intervalId);
  }, []); // Den tomma arrayen [] ser till att effekten bara körs en gång när komponenten monteras.

  return (
    <div
      className="flex items-center justify-center p-4"
      style={{ height: "200px" }}
    >
      <img
        src={imageSequence[currentIndex]}
        alt="Animerad skulptur"
        className="max-w-full max-h-full object-contain rounded-lg"
        // Felhantering om en bild inte kan laddas
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/400x400/111827/374151?text=Bild+saknas";
        }}
      />
    </div>
  );
}

export default SculptureAnimation;
