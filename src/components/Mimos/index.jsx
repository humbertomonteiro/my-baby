import './mimos.css'
import { useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import { mimos } from '../../Data'

export default function Mimos(props) {

    const { theme, dataUser } = useContext(UserContext)

    return (
        <section 
        data-aos='fade-up'
        className="page-event-text">
            {
                props.mimos === 'true' && 
                <div className="container-mimos">
                    <h2>Sugestões de Mimos</h2>

                    <div className="box-mimos">
                        {
                            mimos.map(e => (
                                <div key={e.id} className={`box-mimo border-${dataUser?.theme}`}>
                                    <div className={`box-mimo-img border-${dataUser?.theme}`}>
                                        <img src={e.img} alt={e.title} />
                                    </div>
                                    <h3>{e.title}</h3>
                                </div>
                            ))
                        }
                    </div>
                </div>
            }
        </section>
    )
}