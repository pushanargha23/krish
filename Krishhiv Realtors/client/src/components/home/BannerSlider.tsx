import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import banner1 from '../../assets/banner/Bali-banner.jpg';
import banner2 from '../../assets/banner/Crown-Banner-1340X744-3.jpg';
import banner3 from '../../assets/banner/Krisshiv-BT-Road-2-scaled.jpg';
import banner4 from '../../assets/banner/Laketown-Project-banner.jpg';
import banner5 from '../../assets/banner/Rowcasa-Banner-e1783330261901.jpg';
import banner6 from '../../assets/banner/The-Villa-Project-banner-1.jpg';

const BANNER_IMAGES = [
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
];

export const BannerSlider: React.FC = () => {
  return (
    <section className="w-full bg-transparent pt-8 pb-12">
      <div className="container-custom">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            spaceBetween={0}
            slidesPerView={1}
            effect="fade"
            loop={true}
            autoHeight={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={true}
            className="w-full"
          >
            {BANNER_IMAGES.map((img, index) => (
              <SwiperSlide key={index}>
                <img
                  src={img}
                  alt={`Banner ${index + 1}`}
                  className="w-full h-auto block"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};
