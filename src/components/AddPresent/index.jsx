import './addPresent.css'
import { useEffect, useState, useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import { db } from '../../FirebaseConnection'
import { collection, query, where, onSnapshot, doc, addDoc, deleteDoc } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function AddPresent(props) {

    const { signed, dataUser, user } = useContext(UserContext)

    const { userLink } = useParams()
    const [ listPresents, setListPresents ] = useState([])
    const [ namePresent, setNamePresent ] = useState('')
    const [ valuePresent, setValuePresent ] = useState('')
    const [ linkPresent, setLinkPresent ] = useState('')

    useEffect(() => {
        function getPresents() {

            const presents = collection(db, 'presents')
            const q = query(presents, where('user', '==', userLink))

            onSnapshot(q, snapshot => {
                let list = []

                snapshot.forEach(doc => {
                    list.push({
                        id: doc.id,
                        namePresent: doc.data().namePresent,
                        valuePresent: doc.data().valuePresent,
                        linkPresent: doc.data().linkPresent,
                        user: doc.data().user
                    })
                })

                setListPresents(list)
            })
        }

        getPresents()
    }, [userLink])  

    async function handleAddPresent(e) {
        e.preventDefault()

        if(namePresent !== '', valuePresent !== '', linkPresent !== '') {
            await addDoc(collection(db, 'presents'), {
                namePresent: namePresent,
                valuePresent: valuePresent,
                linkPresent: linkPresent,
                user: user.uid

            })
            .then(e => {
                setNamePresent('')
                setValuePresent('')
                setLinkPresent('')
                toast.success('Presente cadastrado.')
            })
            .catch(error => toast.error(error))
        } else {
            toast.error('Preencha todos os campos')
        }
    }

    async function hendleDeletePresent(id) {
        const docRef = doc(db, 'presents', id)

        await deleteDoc(docRef)
            .then(() => {
                toast.success('Presente deletado!')
            })
    }

    return (
        <section
        className="page-event-text">
            <div 
            data-aos='fade-up'
            className="container-presents">
                {
                    signed &&
                    <>
                        <h2>Adicionar mais presentes a lista</h2>
                        <form onSubmit={handleAddPresent}>
                        
                            <label>
                                Nome do presente
                                <input type="text" 
                                value={namePresent}
                                className={`border-${user?.theme}`}
                                onChange={e => setNamePresent(e.target.value)}/>
                            </label>
                        
                            <label>
                                Valor do presente
                                <input type="text" 
                                value={valuePresent}
                                className={`border-${user?.theme}`}
                                onChange={e => setValuePresent(e.target.value)}/>
                            </label>
                        
                            <label>
                                Link da imagem do presente
                                <input type="text" 
                                value={linkPresent}
                                className={`border-${user?.theme}`}
                                onChange={e => setLinkPresent(e.target.value)}/>
                            </label>

                            <button 
                            className={`btn-event bg-primary-${user?.theme}`} 
                            type='submit'>Adicionar presente</button>
                        </form>
                    </>
                }
                <h2 data-aos='fade-up'>
                    Caso queira presentear
                    o(a) {String(props.dataEvent.children).split(' ')[0]} com 
                    mais alguma coisa!
                </h2>

                <div 
                data-aos='fade-up'
                className="box-presents">
                    {
                        listPresents.map(e => (
                            <div key={e.id} className={`box-present border-${dataUser?.theme}`}>
                                <div className={`box-present-img border-${dataUser?.theme}`}>
                                    <img src={e.linkPresent} alt={e.namePresent} />
                                </div>
                                <strong>R$ {e.valuePresent}</strong>
                                <h3>{e.namePresent}</h3>
                                <a 
                                href={`https://wa.me/55${dataUser?.number}?
                                text=Olá%20mamãe!%20Quero%20presentear%20o%20
                                ${String(dataUser.children).split(' ')[0]}
                                %20com%20"${e.namePresent}"!`} 
                                target='_blank'
                                rel="noreferrer"
                                className={`bg-primary-${dataUser?.theme}`}>Presentear</a>
                                {
                                    signed &&
                                    <button 
                                    onClick={() => hendleDeletePresent(e.id)}
                                    className={`bg-primary-${dataUser?.theme}`}>Apagar</button>
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}