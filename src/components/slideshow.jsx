import { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./slideshow.scss";
import PropTypes from "prop-types";

function Slideshow({ logos }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? logos.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === logos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const currentImage = logos[currentIndex];

  return (
    <div className="chevron">
      <div className="chevron_left" onClick={previousSlide}>
        {<BsChevronLeft />}
      </div>
      <img
        className="chevron_logo"
        src={currentImage}
        alt={`Picture ${currentIndex}`}
      />
      <div className="chevron_right" onClick={nextSlide}>
        {<BsChevronRight />}
      </div>
    </div>
  );
}

Slideshow.propTypes = {
  logos: PropTypes.array.isRequired,
};

export default Slideshow;
