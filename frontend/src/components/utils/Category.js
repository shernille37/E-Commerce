import React from 'react';
import { Navigation, Pagination, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Category = () => {
  const categories = [
    {
      link: '?category=laptop',
      icon: 'fa-solid fa-laptop',
      alt: 'Laptop',
    },
    {
      link: '?category=photography',
      icon: 'fa-solid fa-camera',
      alt: 'Photography',
    },
    {
      link: '?category=mouse',
      icon: 'fa-solid fa-computer-mouse',
      alt: 'Mouse',
    },
    {
      link: '?category=mobile',
      icon: 'fa-solid fa-mobile',
      alt: 'Mobile',
    },
    {
      link: '?category=wearables',
      icon: 'fa-solid fa-headphones',
      alt: 'Wearables',
    },
    {
      link: '?category=gaming',
      icon: 'fa-brands fa-playstation',
      alt: 'Gaming',
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={10}
      navigation={{
        nextEl: '.slideNext',
        prevEl: '.slidePrev',
      }}
      pagination={{ clickable: true }}
      breakpoints={{
        500: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 6,
        },
      }}
    >
      {categories.map((c, i) => (
        <SwiperSlide key={i}>
          <Card className='pt-3 rounded'>
            <Link to={c.link}>
              <i className={`category-icon ${c.icon}`}></i>
            </Link>
            <Card.Body>
              <Link to={c.link}>
                <Card.Title>{c.alt}</Card.Title>
              </Link>
            </Card.Body>
          </Card>
        </SwiperSlide>
      ))}

      <div className='slidePrev'>
        <i className='fa-solid fa-arrow-left'></i>
      </div>
      <div className='slideNext'>
        <i className='fa-solid fa-arrow-right'></i>
      </div>
    </Swiper>
  );
};

export default Category;
