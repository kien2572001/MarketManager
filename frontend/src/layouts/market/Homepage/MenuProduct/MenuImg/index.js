import "./style.scss"
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';



const MenuImg = () => {


    return (
        <div className="menu-img-container">
            <div className="menu-top">
                <div className="slide">
                    <Swiper
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        // navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="https://chonoicairang.net/wp-content/uploads/2020/04/cncrtest@0.5x.png" alt="slide-1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://chonoicairang.net/wp-content/uploads/2020/04/srr6@0.5x.png" alt="slide-2" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="https://chonoicairang.net/wp-content/uploads/2020/04/cam-xoan.png" alt="slide-3" />
                        </SwiperSlide>
                    </Swiper>
                </div>
                <div className="imgs-top-right">
                    <div className="img-top-right">
                        <img src="https://chonoicairang.net/wp-content/uploads/2020/04/nong-san-sach@0.5x.png" alt="img-1" />
                    </div>
                    <div className="img-top-right">
                        <img src="https://chonoicairang.net/wp-content/uploads/2020/04/nong-san-che-bien.png" alt="img-2" />
                    </div>
                </div>
            </div>
            <div className="menu-bottom">
                <div className="img-bottom">
                    <img src="https://chonoicairang.net/wp-content/uploads/2020/04/cho-noi-online.png" alt="img-1" />
                </div>
                <div className="img-bottom">
                    <img src="https://chonoicairang.net/wp-content/uploads/2020/04/mat-hang-khac-1.png" alt="img-2" />
                </div>
                <div className="img-bottom">
                    <img src="https://chonoicairang.net/wp-content/uploads/2020/04/thu-cong-my-nghe@0.5x.png" alt="img-3" />
                </div>
            </div>
        </div>
    )
}

export default MenuImg