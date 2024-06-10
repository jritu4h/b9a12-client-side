
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Pagination } from 'swiper/modules';
import Slide1 from '../../../assets/n7or_2tf4_230522.jpg';
import Slide2 from '../../../assets/3740283.jpg';
import Slide3 from '../../../assets/Screenshot 2024-06-04 114815.png';
import Slide4 from '../../../assets/Screenshot 2024-06-04 114652.png';
import Slide5 from '../../../assets/Screenshot 2024-06-04 114619.png';
import Slide6 from '../../../assets/126458-OR54B9-36.jpg';
import Slide7 from '../../../assets/589.jpg';


const CallToAct = () => {
    return (
        <div className='my-7'>
             <Swiper
        slidesPerView={4}
        spaceBetween={30}
        centeredSlides={true}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide> 
            <img className='h-[200px]' src={Slide1} />
             </SwiperSlide>
             <SwiperSlide> 
            <img className='h-[200px]' src={Slide2} />
             </SwiperSlide>
             <SwiperSlide> 
            <img className='h-[200px]' src={Slide3} />
             </SwiperSlide>
             <SwiperSlide> 
            <img className='h-[200px]' src={Slide4} />
             </SwiperSlide>
             <SwiperSlide> 
            <img className='h-[200px]' src={Slide5} />
             </SwiperSlide>
             <SwiperSlide> 
            <img className='h-[200px]' src={Slide6} />
             </SwiperSlide>
             <SwiperSlide> 
            <img className='h-[200px]' src={Slide7} />
             </SwiperSlide>
          
      
      </Swiper>
        </div>
    );
};

export default CallToAct;