import './createEvent.css'
import { useState, useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import { db, storage } from '../../FirebaseConnection'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { doc, addDoc, collection, deleteDoc  } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import { BiSolidImageAdd } from 'react-icons/bi'

export default function CreateEvent(props) {

    const navigate = useNavigate()
    const { userLink } = useParams()

    const { user, signed } = useContext(UserContext)

    const [ text1Event, setText1Event ] = useState(`Olá queridos amigos e familiares! Este é um 
    espaço criado com todo carinho para convidá-los para o evento que irá reunir todas as pessoas 
    importantes para o papai e a mamãe.`)
    const [ text2Event, setText2Event ] = useState(`Aguardamos todos vocês no chá! Ah, não se 
    esqueçam de confirmar a presença e deixar um recadinho! 😉`)
    const [ obsEvent, setObsEvent ] = useState(`Obs: O tamanho da fralda está especificado no convite.`)
    const [ titleEvent, setTitleEvent ] = useState(`Chá de fraldas`)
    const [ caption, setCaption ] = useState(`Olá! seja bem-vindo!`)
    const [ imgEvent, setImgEvent ] = useState(null)
    const [ imgEventUrl, setImgEventUrl ] = useState(require('../../assets/imgs/mother/barriga.jpg'))
    const [ showForm, setShowForm ] = useState(false)

    async function handleCreateEvent(e) {
        e.preventDefault()

        if(imgEvent !== null) {
            const uploadRef = ref(storage, `images/${user.uid}/${imgEvent.name}`)
            await uploadBytes(uploadRef, imgEvent)
            .then(snapshot => {
                getDownloadURL(snapshot.ref).then( url => {
                    addDoc(collection(db, 'events'), {
                        title: titleEvent,
                        caption: caption,
                        text1Event: text1Event,
                        text2Event: text2Event,
                        obsEvent: obsEvent,
                        img: url,
                        user: userLink
                    })
                })
            })
            .then(() => {
                toast.success('Evento criado')
                navigate(`/events/${user.uid}`)
            })
        } else {
            toast.error('Selecione uma imagem para seu evento!')
        }

    }

    async function handleUpdateEvent(e) {
        e.preventDefault()
        handleCreateEvent(e)
        handleDeleteEvent()
    }

    function handleFile(e) {
        const image = e.target?.files[0]

        if( image?.type === 'image/jpeg' || image?.type === 'image/png') {
            setImgEvent(image)
            setImgEventUrl(URL.createObjectURL(image))
        }
    }

    async function handleDeleteEvent() {
        const idEvent = props.idEvent
        const id = idEvent[0]
        const docRef = doc(db, 'events', id)

        await deleteDoc(docRef)
            .then(() => {
                toast.success('Evente encerrado!')
            })
    }

    function handleShowForm() {
        setShowForm(!showForm)
    }

    return (
        <div className='create-new-event'>

            <div className="btns-events">
                {
                    signed &&
                    <button 
                    className={`btn-event bg-primary-${user?.theme}`}
                    onClick={handleShowForm}
                    >
                    Criar novo evento
                    </button>
                }
                {
                    props.action === 'update' &&
                    <button 
                    className={`btn-event bg-primary-${user?.theme}`}
                    onClick={handleDeleteEvent}
                    >
                    Encerrar evento
                    </button> 
                }

            </div>

            {
                showForm && 
                <form onSubmit={ props.action === 'create' ? handleCreateEvent : handleUpdateEvent } 
                className={`page-event`}>
                    {
                        props.action === 'update' &&
                        <p><strong>Obs:</strong> Ao criar um novo evento o antigo será apagado!</p>
                    }
                    <input 
                    className='event-h1'
                    type="text" 
                    placeholder='Escreva o evento'
                    value={titleEvent}
                    onChange={e => setTitleEvent(e.target.value)}
                    />
                    
                    <label className='page-event-img'>
                        <BiSolidImageAdd/>
                        <input
                        type="file"
                        accept='image/*'
                        onChange={handleFile}
                        className='input-file'
                        />
                        <img id='img-event' src={imgEventUrl} alt="img-event" />
                    </label>

                    <div className="page-event-text">
                        
                        <input
                        className='subtitle'
                        type="text"
                        placeholder='Escreva o subtítulo'
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        />

                        <textarea
                        className='text'
                        placeholder='Escreva o primeiro parágrafo'
                        value={text1Event}
                        onChange={e => setText1Event(e.target.value)}
                        />

                        <textarea
                        className='text'
                        placeholder='Escreva o segundo parágrafo'
                        value={text2Event}
                        onChange={e => setText2Event(e.target.value)}
                        />

                        <textarea
                        className='obs'
                        placeholder='Escreva uma observação'
                        value={obsEvent}
                        onChange={e => setObsEvent(e.target.value)}
                        />

                        <button 
                        type='submit' 
                        className={`button btn-event bg-primary-${user?.theme}`}>
                            {props.action === 'create' ? 'Criar evento' : 'Criar novo evento'}
                        </button>

                    </div>
                </form>
            }

            
        </div>
    )
}