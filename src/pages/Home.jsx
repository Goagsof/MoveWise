import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/components/Home.css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// Importa las imágenes
import foto1 from '../images/foto1.jpg';
import foto2 from '../images/foto2.jpg';

const Home = () => {
  const [images] = useState([foto1, foto2]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Implementar lógica para cambiar la imagen cada cierto tiempo
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <div className="banner">
        <div className="image-card">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="mySwiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="card">
                  <img src={image} alt={`Imagen ${index + 1}`} className="card-img" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="text-card">
          <div className="card-content">
          <h3>¿Qué ofrecemos?</h3>
                <p>En nuestro emprendimiento de <span className="highlight">mudanzas y transportes</span>, nos dedicamos a simplificar el proceso de cambio. Ya sea que te mudes a una nueva casa, cambies de oficina, estamos aquí para ayudarte.</p>
                <Link to="/reserve">
                  <button>Reservar</button>
                </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
