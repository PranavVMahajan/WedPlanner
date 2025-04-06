import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const weddingImages = [
  "https://images.unsplash.com/photo-1726068449701-4e11c5d64b11?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://image.wedmegood.com/resized/1900X/uploads/city_bg_image/1/delhi_bg.jpeg",
  "https://images.unsplash.com/photo-1683912832586-1e3f5bae855f?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1634992449982-2ca553fa118a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

const Hero = () => {
  return (
    <section className="min-h-[80vh] w-full relative">
      {/* Swiper Slider */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation
        className="h-[80vh] w-full"
      >
        {weddingImages.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-[80vh] w-full bg-center bg-cover"
              style={{ backgroundImage: `url(${src})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
