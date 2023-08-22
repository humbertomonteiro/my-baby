import './text.css'
import { useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import { Swiper, SwiperSlide } from 'swiper/react'
import { register } from 'swiper/element/bundle'

import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'

register()

export default function Texts() {

    const { dataUser } = useContext(UserContext)
    return (
        <div 
        data-aos='fade-up'
        className='container-texts'>
            <div className='text-img'>
                <Swiper
                pagination={true}
                autoplay>
                    <SwiperSlide>
                        <img src={require('../../assets/imgs/slides/slide-1.png')} alt="img1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={require('../../assets/imgs/slides/slide-2.jpg')} alt="img1" />
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={require('../../assets/imgs/slides/slide-3.jpg')} alt="img1" />
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className={`text-content primary-${dataUser?.theme ? dataUser.theme : 'default'}`}>
                <h1>Nossas histórias!</h1>
                <p>
                    Esse espaço vai servir para que possamos contar
                    histórias para, sobre e com nosso filho.
                </p>
                <p>
                    A ideia é transformar nossas histórias em lembranças
                    escritas e fotografadas, trazendo sentimentos e sensações,
                    para que no futuro possamos rever e termos um sentimento
                    de nostalgia, que particularmente amamos.
                </p>
                <h2>Hitórias em breve...</h2>
            </div>
        </div>
    )
}