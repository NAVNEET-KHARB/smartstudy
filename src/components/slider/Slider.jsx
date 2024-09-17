import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import IMG1 from './image.jpg';
import IMG2 from './image5.jpg';
import IMG3 from './image6.jpg';

const slides = [
  { id: 1, src: IMG1, alt: 'First slide', title: 'MORE THAN 1500 ONLINE COURSES', description: 'Own Your Future By Learning New Skills Online' },
  { id: 2, src: IMG2, alt: 'Second slide', title: 'SMART STUDY GIVES YOU OPPORTUNITY', description: 'Some representative placeholder content for the second slide.' },
  { id: 3, src: IMG3, alt: 'Third slide', title: 'GO AHEAD IN YOUR CAREER', description: 'Choose Right Part to Your Carrier' },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex-shrink-0 w-full relative"
          >
            <img
              src={slide.src}
              className="block w-full"
              alt={slide.alt}
              style={{ filter: 'blur(2px)' }}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white bg-black bg-opacity-50 p-4">
              <h1 className="text-3xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        onClick={prevSlide}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
        onClick={nextSlide}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentSlide ? 'bg-white' : 'bg-gray-400'}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
