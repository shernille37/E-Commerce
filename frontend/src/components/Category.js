import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { Image, Card } from 'react-bootstrap';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Category = () => {
  const categories = [
    {
      link: '?category=laptop',
      src: '/images/icon-1.png',
      alt: 'Laptop',
    },
    {
      link: '?category=photography',
      src: '/images/icon-3.png',
      alt: 'Photography',
    },
    {
      link: '?category=mouse',
      src: '/images/icon-4.png',
      alt: 'Mouse',
    },
    {
      link: '?category=mobile',
      src: '/images/icon-7.png',
      alt: 'Mobile',
    },
    {
      link: '?category=wearables',
      src: '/images/icon-8.png',
      alt: 'Wearables',
    },
  ];

  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={10}
      navigation={{
        nextEl: '.slideNext',
        prevEl: '.slidePrev',
      }}
      pagination={{ clickable: true }}
      loop={true}
      breakpoints={{
        500: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      {categories.map((c, i) => (
        <SwiperSlide key={i}>
          <Card className='pt-3 rounded'>
            <Link to={c.link}>
              <Card.Img src={c.src} alt={c.alt} variant='top' />
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
