import './login.css'
import { useState, useContext } from 'react'
import { UserContext } from '../../Contexts/user'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login() {

    const { signIn, loadingAuth } = useContext(UserContext)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    async function handleLogin(e) {
        e.preventDefault()
        if(email !== '' && password !== '') {
            await signIn(email, password)
        } else {
            toast.error('Preencha todos os campos!')
        }
    }

    return (
        <main 
        data-aos='fade-up'
        className='container-login'>
            <h1 className='primary-default'>Bookbaby</h1>

            <form onSubmit={handleLogin}>
                <label>
                    <p>Email</p>
                    <input
                    value={email}
                    className='primary-default'
                    onChange={e => setEmail(e.target.value)}
                    type="text" />
                </label>
                <label>
                    <p>Senha</p>
                    <input 
                    value={password}
                    className='primary-default'
                    onChange={e => setPassword(e.target.value)}
                    type="password" />
                </label>
                <button type='submit'
                className='bg-primary-default border-default'>
                    {
                        loadingAuth ? 'Carregando...' : 'Entrar'
                    }
                </button>
            </form>
            <Link to='/register'
            className='primary-default'>Ainda não tem uma conta? Cadastre-se!</Link>

        </main>
    )
}