import './home.css'
import { BsInstagram } from 'react-icons/bs'
import { useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import Texts from '../Texts'
import { Link } from 'react-router-dom'

export default function Home() {

    const { user, dataUser } = useContext(UserContext)

    return (
        <main className={`container-home primary-${dataUser?.theme ? dataUser.theme : 'default'}`}>
            
            <div className='main'>

                <section key={user?.name} className='home-text'>
                    <span data-aos='fade-down' >Todas as lembranças</span>
                    <h1 data-aos='fade-right'>{ user ? user?.children : 'Nome do seu filho'}</h1>
                    <p data-aos='fade-right'>
                        Nós prometemos ser seus guias, seus protetores e
                        seus maiores fãs. Estaremos aqui para segurar sua
                        mão enquanto você dá os primeiros passos,
                        para ouvir suas histórias e sonhos, e para
                        oferecer nosso apoio em cada desafio que você
                        enfrentar. - Mamãe e Papai
                    </p>
                    <a href={user?.link}
                    data-aos='fade-up'
                    target='_blank'
                    rel='noreferrer'
                    className={`instagram bg-primary-${dataUser?.theme ? dataUser?.theme : 'default'}`}>
                        <BsInstagram /> <span>{dataUser?.children ? dataUser?.children : 'Instagram do(a) nenem'}</span>
                    </a>
                </section>

                <section 
                data-aos='fade-left'
                className='home-imgs'>
                    <img src={require('../../assets/imgs/mother/barriga.jpg')} alt="img-mother" />
                </section>
            </div>

            <section
             data-aos='fade-down'
            className={`home-event bg-tertiary-${dataUser?.theme ? dataUser.theme : 'default'}`}>
                <div className="div-img">
                    <img src={require('../../assets/imgs/dinossaur/dino-croche-green.png')} alt="" />
                </div>
                <div className="div-text">
                    <h2>Evento</h2>
                    <p>
                        Você encontrará informações e detalhes sobre os momentos especiais que envolvem 
                        o seu filho.
                        Enquanto nosso filho(a) cresce e se desenvolve, vamos compartilhe alegria e 
                        orgulho nas suas jornadas únicas.
                    </p>
                    <Link to={`/events/${dataUser?.uid ? dataUser.uid : 'no-user' }`}
                    className={`primary-${dataUser?.theme ? dataUser.theme : 'default'}`}>
                        Confira o Evento!
                    </Link>
                </div>
                
            </section>

            <Texts />

            {/* <article>
                <h2>segunda parte</h2>
                <button onClick={logOut}>sair</button>
            </article> */}
        </main>
    )
}