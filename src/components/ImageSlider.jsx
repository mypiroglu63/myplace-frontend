import React from "react";
import Slider from "react-slick";
import header4 from "../assets/header4.jpg";
import header7 from "../assets/header7.jpg";
import header8 from "../assets/header8.jpg";
import header9 from "../assets/header9.jpg";
import header10 from "../assets/header10.jpg";
import header11 from "../assets/header11.jpg";
import "../css/ImageSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  const slides = [
    { src: header4, text: "", button: false },
    { src: header7, text: "Muhteşem Lezzetler", button: true },
    { src: header8, text: "Ferah Ortam", button: true },
    { src: header9, text: "", button: true },
    { src: header10, text: "", button: true },
    { src: header11, text: "", button: true },
  ];

  return (
    <div className="image-slider">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            <img
              src={slide.src}
              alt={`Slide ${index + 1}`}
              className="slide-image"
            />
            {slide.button && (
              <div className={`slide-content ${slide.text ? "with-text" : ""}`}>
                {slide.text && <h2>{slide.text}</h2>}
                <button>İncele</button>
              </div>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
