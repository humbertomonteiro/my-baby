import './carousel.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFlip } from 'swiper'

export default function Carousel(props) {
    return (
        <Swiper
            modules={[Pagination, Autoplay]}
            // effect={'flip'}
            grabCursor={true}
            pagination={true}
        >
            {
                props.images.map(e => (
                    <SwiperSlide key={e.id}>
                        <img 
                            src={e.image} 
                            alt="Slider"
                            className='slide-item' 
                        />
                        {
                            e.text && 

                            <p className='carousel-text'>
                                {e.text}
                            </p>
                        }
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}