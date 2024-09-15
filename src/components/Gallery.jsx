import React from "react";
import { Link } from "react-router-dom";
import "../css/Gallery.css";

const Gallery = () => {
  const images = [
    "https://picsum.photos/300?random=1",
    "https://picsum.photos/300?random=2",
    "https://picsum.photos/300?random=3",
    "https://picsum.photos/300?random=4",
    "https://picsum.photos/300?random=5",
    "https://picsum.photos/300?random=6",
    "https://picsum.photos/300?random=7",
    "https://picsum.photos/300?random=8",
    "https://picsum.photos/300?random=9",
  ];

  return (
    <div className="gallery">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Random ${index}`} />
      ))}
      <div className="description">
        <p>Galerimizdeki birbirinden güzel resimleri inceleyin.</p>
        <Link to="/fullgallery">Tümünü Göster</Link>
      </div>
    </div>
  );
};

export default Gallery;
