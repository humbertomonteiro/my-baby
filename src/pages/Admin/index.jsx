import './admin.css'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import { useParams } from 'react-router-dom'
import { db, storage } from '../../FirebaseConnection'
import { collection, query, where, onSnapshot, doc, deleteDoc, addDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { HiLockClosed } from 'react-icons/hi'

import { toast } from 'react-toastify'

const themes = ['gray', 'green', 'pink', 'blue', 'yellow']

export default function Admin() {

    const { userLink } = useParams()

    const [ confirmation, setConfirmation ] = useState([])
    const [ showMessages, setShowMessages ] = useState(false)
    const [ name, setName ] = useState('')
    const [ children, setChildren ] = useState('')
    const [ link, setLink ] = useState('')
    const [ theme, setTheme ] = useState('')
    const [ img, setImg ] = useState(null)
    const { signed, user, logOut } = useContext(UserContext)
    const [ imgUrl, setImgUrl ] = useState(user?.avatarUrl ? user.avatarUrl : require('../../assets/imgs/dinossaur/dino-blue.jpg'))


    useEffect(() => {
        function handleData() {
            
            const userLs = localStorage.getItem('@userMyBaby')
            const user = JSON.parse(userLs)
            const confirmation = collection(db, 'confimations')
            const q = query(confirmation, where('user', '==', user?.uid))
            
            onSnapshot(q, snapshot => {
                let listConfirmations = []

                snapshot.forEach(doc => {

                    listConfirmations.push({
                        id: doc.id,
                        name: doc.data().name,
                        message: doc.data().message
                    })
                })

                setConfirmation(listConfirmations)
            })
        }

        handleData()
    }, [signed])

    function handleShowMessage() {
        setShowMessages(!showMessages)
    }

    async function handleDelete(id) {
        const docRef = doc(db, 'confimations', id)

        await deleteDoc(docRef)
            .then(() => {
                toast.success('Deletado com sucesso')
            })
            .catch(error => {
                toast.error('Erro ao apagar')
            })

    }

    async function handleEditUser(e) {
        e.preventDefault()
        
        const uploadRef = ref(storage, `images/${user.uid}/${img?.name}`)
        await uploadBytes(uploadRef, img)
        .then(snapshot => {
            getDownloadURL(snapshot.ref).then( url => {
                addDoc(collection(db, 'events'), {
                    name: name,
                    children: children,
                    link: link,
                    theme: theme,
                    avatarUrl: url,
                    user: userLink
                })
            })
        })
        .then(() => {
            // const dataUser = {}
            toast.success('Dados atualizado com sucesso!')
        })
        .catch(error => toast.error('Erro ao ataulizar dados, tente novamente.'))
    }

    function handleFileUser(e) {
        const image = e.target?.files[0]

        if( image?.type === 'image/jpeg' || image?.type === 'image/png') {
            setImg(image)
            setImgUrl(URL.createObjectURL(image))
        }
    }

    return (
        <main className={`container-admin primary-${user?.theme}`}>

            <div 
            data-aos='fade-up'
            className={`title-admin border-${user?.theme}`}>
                <h2
                key={user.name}>
                    
                    {user.name}!
                </h2>
                <button className={`show-btn bg-primary-${user?.theme}`} onClick={logOut}>Sair</button>
            </div>

            <div 
            data-aos='fade-up'
            className={`box-admin border-${user?.theme}`}>
                <h2>Dados</h2>
                <form onSubmit={handleEditUser}>

                    <div>
                        <labael>
                            <p>Nome filho(a)</p>
                            <input type="text"
                            placeholder={user?.children}
                            value={children}
                            className={`primary-${user?.theme}`}
                            onChange={e => setChildren(e.target.value)} />
                        </labael>
                        <labael>
                            <p>Nome da mãe ou do pai</p>
                            <input type="text"
                            placeholder={user?.name}
                            value={name}
                            className={`primary-${user?.theme}`}
                            onChange={e => setName(e.target.value)} />
                        </labael>
                        <labael>
                            <p>Link do instagram</p>
                            <input type="text"
                            placeholder={user?.link}
                            value={link}
                            className={`primary-${user?.theme}`}
                            onChange={e => setLink(e.target.value)} />
                        </labael>
                        <labael>
                            <p>Tema</p>
                            <select
                            className={`primary-${user?.theme}`}
                            onChange={e => setTheme(e.target.value)}>
                                <option value={user?.theme}>Tema atual ({user?.theme})</option>
                                {
                                    themes.filter(e => e !== user?.theme).map(e => (
                                        <>
                                            <option value={e}>{e}</option>
                                        </>
                                    ))
                                }
                            </select>
                        </labael>
                        <label>
                            <p>Email {< HiLockClosed />}</p>
                            <input type="text"
                            placeholder={user?.email}
                            disabled
                            value={user?.email}
                            className={`primary-${user?.theme}`}
                                />
                        </label>
                    </div>

                    <div>
                        <label className='label-file-user'>
                            <p>Toque na imagem para alterar</p>
                            <input
                            className='input-file-user'
                            type="file"
                            accept='image/*'
                            onChange={handleFileUser}
                            />
                            <img id='img-event' src={imgUrl} alt="img-event" />
                        </label>
                    </div>
                    <button className={`border-${user?.theme} bg-primary-${user?.theme}`}>
                        Editar dados
                    </button>

                </form>
            </div>

            <div className={`box-admin primary-${user?.theme}`}>
                
                <button 
                className={`show-btn bg-primary-${user?.theme}`}
                onClick={handleShowMessage} >Ver menssagens</button>

                {
                showMessages && 
                
                <div className='confirmations'>

                    {
                    confirmation.length <= 0 ? 

                    <div className={`confirmation`}>
                        
                        <h2>Ainda não há confirmações</h2>
                    </div>

                    :
                    
                    confirmation.map(e => (
                        <div className={`confirmation border-${user?.theme}`} key={e.name}>
                            
                            <h2>{e.name}</h2>

                            <p>{e.message}</p>

                            <button 
                            className={`bg-primary-${user?.theme}`}
                            onClick={() => handleDelete(e.id)}
                            >Apagar</button>
                        </div>
                    ))
                    
                }

                </div>
                }

            </div>

        </main>
    )
}