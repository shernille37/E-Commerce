import React, { useEffect, useRef } from 'react';
import { Image } from 'react-bootstrap';

const ZoomImage = ({ img, alt }) => {
  const imageContainer = useRef(null);
  const image = useRef(null);
  const lens = useRef(null);

  let ratio = 2;

  const imageZoom = () => {
    const imageWidth = image.current.clientWidth;
    const imageHeight = image.current.clientHeight;

    lens.current.style.display = 'block';
    lens.current.style.backgroundImage = `url(${img})`;

    lens.current.style.backgroundSize = `${imageWidth * ratio}px ${
      imageHeight * ratio
    }px`;
  };

  const moveLens = () => {
    let pos = getCursor();

    let positionLeft = pos.x - lens.current.offsetWidth / 2;
    let positionTop = pos.y - lens.current.offsetHeight / 2;

    if (positionLeft < 0) {
      positionLeft = 0;
    }

    if (positionTop < 0) {
      positionTop = 0;
    }

    if (
      positionLeft >
      image.current.clientWidth - lens.current.offsetWidth / 2
    ) {
      positionLeft = image.current.clientWidth - lens.current.offsetWidth / 2;
    }

    if (positionTop > image.current.height - lens.current.offsetHeight / 2) {
      positionTop = image.current.height - lens.current.offsetHeight / 2;
    }

    lens.current.style.left = `${positionLeft}px`;
    lens.current.style.top = `${positionTop}px`;

    lens.current.style.backgroundPosition = `-${pos.x * ratio}px -${
      pos.y * ratio
    }px`;
  };

  const removeLens = () => {
    lens.current.style.display = 'none';
  };

  const getCursor = () => {
    let e = window.event;
    let bounds = image.current.getBoundingClientRect();

    let x = e.pageX - bounds.left;
    let y = e.pageY - bounds.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;

    return { x, y };
  };

  return (
    <div
      className='zoom-img-container'
      ref={imageContainer}
      onMouseOver={imageZoom}
      onMouseLeave={removeLens}
    >
      <div
        className='zoom-lens'
        onMouseMove={moveLens}
        ref={lens}
        style={{ display: 'none' }}
      ></div>
      <Image ref={image} src={img} alt={alt} fluid onMouseMove={moveLens} />
    </div>
  );
};

export default ZoomImage;
