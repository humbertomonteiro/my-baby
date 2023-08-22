import { useState, useEffect, createContext } from "react";
import { auth, db } from "../FirebaseConnection";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

export const UserContext= createContext({})

export default function UserProvider( {children} ) {

    const navigate = useNavigate()
    const { userLink } = useParams()
    const [ loadingAuth, setLoadingAuth ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ dataUser, setDataUser ] = useState(null)

    useEffect(() => {
        async function checkLogin() {
            setLoading(true)
            const dataLs = localStorage.getItem('@userMyBaby')
            const data = JSON.parse(dataLs)

            if(data) {
                setUser(data)
                setDataUser(data)
                setLoading(false)
            } 
            else if(userLink !== 'no-user') {
                setLoading(true)
                const uidUrl = document.URL.split('/').slice(-1)[0]

                if(uidUrl === '') {
                    navigate('/events/no-user')
                    return
                }
                const docRef = doc(db, 'users', uidUrl)
                const docSnap = await getDoc(docRef)
                
                setDataUser(
                    {
                        theme: docSnap.data()?.theme,
                        uid: docSnap.data()?.uid,
                        number: docSnap.data()?.number,
                        children: docSnap.data()?.children
                    }
                )
                setLoading(false)
            }

            setLoading(false)
        }

        checkLogin()
    }, [])

    async function signUp(name, email, password, theme, children, link, number) {

        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
            .then( async (value) => {
                const uid = value.user.uid
                
                await setDoc(doc(db, 'users', uid), {
                    uid: uid, 
                    name: name,
                    email: email,
                    avatarUrl: null, 
                    theme: theme, 
                    children: children,
                    link: link,
                    number: number
                })
                .then(() => {
                    const dataUser = {
                        uid: uid,
                        name: name,
                        email: email,
                        avatarUrl: null,
                        theme: theme,
                        children: children,
                        link: link,
                        number: number
                    }
                    
                    setUser(dataUser)
                    setDataUser(dataUser)
                    storageUser(dataUser)
                    setLoadingAuth(false)
                    toast.success('Seja bem-vindo(a) ao nosso sistema!')
                    navigate(`/home/${uid}`)
                })
                .catch(error => {
                    toast.error(`Erro ao cadastrar! ${error}`)
                    setLoadingAuth(false)
                })
            })

    }

    async function signIn(email, password) {

        setLoadingAuth(true)

        await signInWithEmailAndPassword(auth, email, password)
            .then( async (value) => {
                let uid = value.user.uid
                const docRef = doc(db, 'users', uid)
                
                const docSnap = await getDoc(docRef)
                const currentTheme = docSnap.data().theme

                const dataUser = {
                    uid: uid,
                    name: docSnap.data().name,
                    email: value.user.email,
                    avatarUrl: docSnap.data().avatarUrl,
                    theme: currentTheme,
                    children: docSnap.data().children,
                    link: docSnap.data().link,
                    number: docSnap.data().number
                }
                
                setUser(dataUser)
                setDataUser(dataUser)
                storageUser(dataUser)
                setLoadingAuth(false)
                toast.success('Seja bem-vindo(a) de volta!')
                navigate(`/home/${uid}`)
            })
            .catch(error => {
                toast.error(`Erro ao fazer login! ${error}`)
                setLoadingAuth(false)
            })
    }

    async function logOut() {

        await signOut(auth)
        setUser(null)
        storageUser(null)
        toast.success('Você está deslogado')
        navigate(`/home/no-user`)
        setDataUser({theme: 'default'})
    }

    function storageUser(data) {
        localStorage.setItem('@userMyBaby', JSON.stringify(data))
    }

    return (
        <UserContext.Provider value={{
            user,
            signed: !!user,
            signIn,
            signUp,
            logOut,
            loading,
            setLoading,
            loadingAuth,
            dataUser,
        }}>
            {children}
        </UserContext.Provider>
    )
}