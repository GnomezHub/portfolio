import React, { useState, useEffect } from 'react';

// Huvudkomponenten för bildgalleriet
function ImageGallery() { // Ändrat namn från App till ImageGallery
  // Exempelbilder. Byt ut dessa mot dina egna bild-URL:er.
  const [images] = useState([
    { id: 1, src: 'assets/paintings/couplepop.jpg', alt: 'Ett par i popkonststil', title: 'Pop-par' },
    { id: 2, src: 'assets/paintings/deepdive.jpg', alt: 'En färgglad marulk i djuphavet', title: 'Djuphavsfisk' },
    { id: 3, src: 'assets/paintings/elephantman.jpg', alt: 'En surrealistisk scen med djur och en elefantmänniska', title: 'Elefantmannen' },
    { id: 4, src: 'assets/paintings/femmeforbidden.jpg', alt: 'En stiliserad kvinnofigur i underkläder med ett lås', title: 'Förbjuden Kvinna' },
    { id: 5, src: 'assets/paintings/fetuslotus.jpg', alt: 'En surrealistisk figur med många ögon som sitter i lotusställning', title: 'Lotusfoster' },
    { id: 6, src: 'assets/paintings/fishybongbong.jpg', alt: 'En abstrakt målning av en fisk med bubblor', title: 'Fiskbubblor' },
    { id: 7, src: 'assets/paintings/girltangled.jpg', alt: 'En naken kvinnofigur omgiven av abstrakta former', title: 'Flicka i Virveln' },
    { id: 8, src: 'assets/paintings/lycoigruff.jpg', alt: 'En katt med gröna ögon under en fullmåne', title: 'Månkatt' },
    { id: 9, src: 'assets/paintings/mariemaid.jpg', alt: 'En surrealistisk målning med en sjöjungfru och fantasifigurer', title: 'Sjöjungfruns Dröm' },
    { id: 10, src: 'assets/paintings/trappedfantasy.jpg', alt: 'Ett ansikte med blått hår som tittar fram genom persienner', title: 'Fångad Fantasi' },
  ]);

  // State för att hålla reda på vilken bild som är vald för att visas i större format
  const [selectedImage, setSelectedImage] = useState(null);
  // State för att kontrollera zoom-animationen för modalen (när modalen öppnas/stängs)
  const [isModalZoomed, setIsModalZoomed] = useState(false);

  // Funktion för att öppna modalen med en specifik bild
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalZoomed(false); // Återställ modal zoom för att trigga animationen
  };

  // Funktion för att stänga modalen
  const closeModal = () => {
    setIsModalZoomed(false); // Starta zoom-ut animation för modalen
    // Ge lite tid för zoom-ut-animationen innan modalen stängs helt
    setTimeout(() => {
      setSelectedImage(null);
    }, 300); // Matchar transition-duration i CSS
  };

  // Använd useEffect för att trigga modalens zoom-in animation när den öppnas
  useEffect(() => {
    if (selectedImage) {
      // En liten fördröjning för att säkerställa att modalen är renderad innan zoomen triggas
      const timer = setTimeout(() => {
        setIsModalZoomed(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans antialiased flex flex-col items-center">


      {/* Bildgalleriet med miniatyrer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 group"
            onClick={() => openModal(image)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover object-center rounded-t-lg" // Rundade hörn upptill
              // Fallback för bilder som inte laddas
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x400/CCCCCC/666666?text=Laddningsfel`;
              }}
            />
            {/* Titel under bilden */}
            <div className="p-3 bg-white rounded-b-lg text-center"> {/* Rundade hörn nedtill */}
              <p className="text-gray-800 text-base font-semibold">{image.title}</p>
            </div>
            {/* Alt-text på hover (overlay) 
            <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
              <p className="text-white text-lg font-semibold">{image.alt}</p>
            </div>*/}
          </div>
        ))}
      </div>

      {/* Modal för större bild */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/25 flex items-center justify-center z-50 p-4 transition-opacity duration-300"
          onClick={closeModal} // Stäng modalen när man klickar utanför bilden
        >
          <div
            className={`relative bg-white rounded-lg shadow-2xl p-4 max-w-3xl w-full max-h-[90vh] transform transition-all duration-300 ease-out
              ${isModalZoomed ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}
            onClick={(e) => e.stopPropagation()} // Förhindra att klick inuti modalen stänger den
          >
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-3xl font-bold transition-colors duration-200"
              onClick={closeModal}
              aria-label="Stäng"
            >
              &times;
            </button>
            {/* Bildcontainer */}
            <div className="flex justify-center items-center h-full max-h-[calc(90vh-8rem)]"> {/* Justerad max-höjd för att rymma titel */}
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className={`block w-full h-auto object-contain rounded-md`}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/600x400/CCCCCC/666666?text=Laddningsfel`;
                }}
              />
            </div>
            <p className="text-center text-gray-700 mt-4 text-lg font-medium">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery; // Ändrat export från App till ImageGallery
