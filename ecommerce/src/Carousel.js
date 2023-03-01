import React, { useState } from "react";
import guitar from "./Images/guitar.jpg";
import drums from "./Images/drums.jpg";
import kidsGuitar from "./Images/kids-guitar.jpg";
import saxophone from "./Images/saxophone.jpg";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import CircleIcon from "@mui/icons-material/Circle";

import "./Carousel.css";

const Carousel = () => {
  const slides = [
    {
      src: guitar,
      caption: (
        <div className="carousel__caption">
          <h1 className="carousel__captionTitle">Find your Passion</h1>
          <h2 className="carousel__captionSubtitle">
            Unleash your inner rockstar with our guitars!
          </h2>
          <button className="carousel__captionButton">See Guitars</button>
        </div>
      ),
    },
    {
      src: drums,
      caption: (
        <div className="carousel__caption">
          <h1 className="carousel__captionTitle">Feel the Beat</h1>
          <h2 className="carousel__captionSubtitle">
            Drum up some excitement with our drums!
          </h2>
          <button className="carousel__captionButton">See Percussion</button>
        </div>
      ),
    },
    {
      src: saxophone,
      caption: (
        <div className="carousel__caption">
          <h1 className="carousel__captionTitle">Relax with Jazz</h1>
          <h2 className="carousel__captionSubtitle">
            Soothe the soul with our saxophones
          </h2>
          <button className="carousel__captionButton">See Saxophones</button>
        </div>
      ),
    },
    {
      src: kidsGuitar,
      caption: (
        <div className="carousel__caption">
          <h1 className="carousel__captionTitle">
            See what works for your little ones
          </h1>
          <h2 className="carousel__captionSubtitle">
            Introduce the magic of music to your child with our instruments
          </h2>
          <button className="carousel__captionButton">
            See Junior Instruments
          </button>
        </div>
      ),
    },
  ];
  const [currIndex, setCurrIndex] = useState(0);

  const decrementIndex = () => {
    if (currIndex == 0) {
      setCurrIndex(slides.length - 1);
    } else {
      setCurrIndex(currIndex - 1);
    }
  };

  const incrementIndex = () => {
    setCurrIndex((currIndex + 1) % slides.length);
  };
  return (
    <div
      className="carousel"
      style={{
        backgroundImage: `url(${slides[currIndex].src})`,
      }}
    >
      <div className="carousel__inner">
        <div className="carousel__left" onClick={decrementIndex}>
          <ArrowBackIosIcon className="backArrow" />
        </div>
        <div className="carousel__center">
          {slides[currIndex].caption}
          <div className="carousel__slideMarkers">
            {slides.map((_, i) => {
              if (i == currIndex) {
                return (
                  <CircleIcon key={i} className="carousel__activeMarker" />
                );
              } else {
                return (
                  <FiberManualRecordOutlinedIcon
                    key={i}
                    className="carousel__inactiveMarker"
                    onClick={() => setCurrIndex(i)}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="carousel__right" onClick={incrementIndex}>
          <ArrowForwardIosIcon className="forwardArrow" />
        </div>
      </div>
    </div>
  );
};

export default Carousel;
