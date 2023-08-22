import Img1 from '../assets/imgs/mimos/bodys.jpg'
import Img2 from '../assets/imgs/mimos/creme-assaduras.png'
import Img3 from '../assets/imgs/mimos/fralda-de-pano.jpg'
import Img4 from '../assets/imgs/mimos/lenco-umedecido.jpg'
import Img5 from '../assets/imgs/mimos/meias.jpg'
import Img6 from '../assets/imgs/mimos/sabonete-liquido.jpg'


const themes = {
    themeDefault: {
        primary: 'primary-default',
        secundary: 'secundary-default',
        tertiary: 'tertiary-default',
        bgPrimary: 'bg-primary-default',
        bgSecundary: 'bg-secundary-default',
        bgTertiary: 'bg-tertiary-default',
        border: 'border-default'
    },
    themeGreen: {
        primary: 'primary-green',
        secundary: 'secundary-green',
        tertiary: 'tertiary-green',
        bgPrimary: 'bg-primary-green',
        bgSecundary: 'bg-secundary-green',
        bgTertiary: 'bg-tertiary-green',
        border: 'border-green'
    },
    themePink: {
        primary: 'primary-pink',
        secundary: 'secundary-pink',
        tertiary: 'tertiary-pink',
        bgPrimary: 'bg-primary-pink',
        bgSecundary: 'bg-secundary-pink',
        bgTertiary: 'bg-tertiary-pink',
        border: 'border-pink'
    },
    themeBlue: {
        primary: 'primary-blue',
        secundary: 'secundary-blue',
        tertiary: 'tertiary-blue',
        bgPrimary: 'bg-primary-blue',
        bgSecundary: 'bg-secundary-blue',
        bgTertiary: 'bg-tertiary-blue',
        border: 'border-blue'
    },
    themeYellow: {
        primary: 'primary-yellow',
        secundary: 'secundary-yellow',
        tertiary: 'tertiary-yellow',
        bgPrimary: 'bg-primary-yellow',
        bgSecundary: 'bg-secundary-yellow',
        bgTertiary: 'bg-tertiary-yellow',
        border: 'border-yellow'
    },
}

const mimos = [
    {
        id: 1,
        img: Img1,
        title: 'Bodys'
    },
    {
        id: 2,
        img: Img2,
        title: 'Creme para assaduras'
    },
    {
        id: 3,
        img: Img3,
        title: 'Fraldas de pano'
    },
    {
        id: 4,
        img: Img4,
        title: 'Lenço umidecido'
    },
    {
        id: 5,
        img: Img5,
        title: 'Meias'
    },
    {
        id: 6,
        img: Img6,
        title: 'Sabonete Liquido'
    },
]

export { themes, mimos }