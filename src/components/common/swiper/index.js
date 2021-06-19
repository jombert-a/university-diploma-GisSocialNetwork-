// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const GSwiper = (props) => {
    return (
        <Swiper
            spaceBetween={24}
            slidesPerView={props.spv}
        >
            {props.array.map( (el, index) =>  <SwiperSlide key={index}>{el}</SwiperSlide>)}
        </Swiper>
    );
};