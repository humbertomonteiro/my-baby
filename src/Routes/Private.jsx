import { useContext } from 'react'
import { UserContext } from '../Contexts/user'
import { Navigate } from 'react-router-dom'

export default function Private({ children }) {

    const { signed, loading } = useContext(UserContext)

    if(loading) {
        return (
            <div> Carregando </div>
        )
    }

    if(!signed) {
        return <Navigate to='/login' />
    }

    return children
}