// import Swiper core and required modules
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import banner from '../../Asset/images/banner.png';
import banner1 from '../../Asset/images/banner1.jpg';
import banner2 from '../../Asset/images/banner2.png';
import banner3 from '../../Asset/images/banner3.jpg';
import banner4 from '../../Asset/images/banner4.jpg';
import banner5 from '../../Asset/images/banner5.jpg';
import { Pagination } from "swiper";

const SwiperComponent = () => {
  return (
    <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
    <SwiperSlide><img src={banner} alt="" /></SwiperSlide>
    <SwiperSlide><img src={banner1} alt="" /></SwiperSlide>
    <SwiperSlide><img src={banner2} alt="" /></SwiperSlide>
    <SwiperSlide><img src={banner3} alt="" /></SwiperSlide>
    <SwiperSlide><img src={banner4} alt="" /></SwiperSlide>
    <SwiperSlide><img src={banner5} alt="" /></SwiperSlide>
  </Swiper>
  );
};
export default SwiperComponent;
