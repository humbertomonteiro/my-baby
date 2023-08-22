
import './events.css'
import { doc, getDoc, addDoc, collection, query, onSnapshot, where } from 'firebase/firestore'
import { db } from '../../FirebaseConnection'
import { useContext, useState, useEffect } from 'react'
import { UserContext } from '../../Contexts/user'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import CreateEvent from '../../components/CreateEvent'
import AddPresent from '../../components/AddPresent'
import Mimos from '../../components/Mimos'

export default function Events() {

    const { userLink } = useParams()
    const { signed, dataUser } = useContext(UserContext)
    const [ name, setName ] = useState('')
    const [ message, setMessage ] = useState('')
    const [ event, setEvent ] = useState([])
    const [ linkEvent, setLinkEvent ] = useState('')
    const [ dataEvent, setDataEvent ] = useState({})

    useEffect(() => {
        async function getEvents() {

            const docRef = doc(db, 'users', userLink)
            const docSnap = await getDoc(docRef)

            const dataEventLs = {
                uid: userLink,
                children: docSnap.data()?.children,
                name: docSnap.data()?.name,
                theme: docSnap.data()?.theme,
                number: docSnap.data()?.number
            }

            setDataEvent(dataEventLs)

            const events = collection(db, 'events')
            const q = query(events, where('user', '==', userLink))

            onSnapshot(q, snapshot => {
                let list = []

                snapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        img: doc.data().img,
                        title: doc.data().title,
                        caption: doc.data().caption,
                        text1Event: doc.data().text1Event,
                        text2Event: doc.data().text2Event,
                        obsEvent: doc.data().obsEvent,
                        mimos: doc.data().mimos,
                        user: doc.data().user
                    })
                })

                setEvent(list)
            })
        }

        getEvents()
    }, [signed, userLink])  


    async function handleForm(e) {
        e.preventDefault()
        
        if(name !== '') {
            await addDoc(collection(db, 'confimations'), {
                name: name,
                message: message,
                user: userLink
            })
            .then(e => {
                setName('')
                setMessage('')
                toast.success('Confirmação enviada! Obrigado por confirmar.')
            })
            .catch(error => toast.error(error))
        } else {
            toast.error('Preencha todos os campos')
        }
    }

    return (
        
        <div 
        data-aos='fade-up'
        className={`container-events primary-${dataUser?.theme ? dataUser.theme : 'default'}`}>
        {

            event.length > 0 ?   
                
                event.map(e => (
                <div key={e.user} className={`page-event`}>

                    {
                        signed && 

                        <CreateEvent action='update' idEvent={event.map(e => e.id)} />
                    }

                    <h1>{e.title}</h1>

                    <span key={dataEvent?.uid}>
                        {String(dataEvent?.children).split(' ')[0]}
                    </span>

                    <div className="page-event-img">
                        <img src={e.img ? e.img : require('../../assets/imgs/mother/barriga.jpg')} alt={e.title} />
                    </div>

                    <div 
                    data-aos='fade-up'
                    className="page-event-text">
                        <h2>{e.caption}</h2>
                        <p>{e.text1Event}</p>
                        <p>{e.text2Event}</p>
                        <strong>{e.obsEvent}</strong>
                    </div>

                    <div 
                    data-aos='fade-up'
                    className="page-event-text">
                        <h2>Confirmar presença</h2>

                        <form>
                            <label>
                                Nome e sobrenome
                                <input type="text"
                                value={name} 
                                onChange={(e) => setName(e.target.value)}
                                className={`border-${dataUser?.theme ? dataUser.theme : 'default'}`}
                                />
                            </label>

                            <label>
                                Deixe um recadinho para o Cauê
                                <textarea 
                                value={message}
                                onChange={e => setMessage(e.target.value)}
                                className={`border-${dataUser?.theme ? dataUser.theme : 'default'}`}
                                ></textarea>
                            </label>

                            <button 
                            type='submit' 
                            onClick={handleForm}
                            className={`btn-event bg-primary-${dataUser?.theme ? dataUser.theme : 'default'}`}>Enviar</button>
                        </form>
                    </div>

                    <Mimos mimos={(event.map(e => e.mimos)[0])} />
                    <AddPresent dataEvent={dataEvent} />
                    
                </div>
                ))
                
            :

            <CreateEvent action='create' />

        }

        {
            userLink === 'no-user' && 

            <div className='page-event-text'>
                <h2>Evento não encontrado</h2>

                <label>
                    <p>Cole aqui o link do evento</p>
                    <input 
                    className={`border-${dataUser?.theme ? dataUser.theme : 'default'}`} 
                    type="text" 
                    value={linkEvent}
                    onChange={e => setLinkEvent(e.target.value)}/>
                </label>
                <a href={linkEvent} 
                className={`bg-primary-${dataUser?.theme ? dataUser.theme : 'default'}`} 
                type='submit'>Buscar</a>
            </div>
        }

        </div>
    )
}