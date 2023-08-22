import { useState, useContext } from "react"
import { UserContext } from "../../Contexts/user"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

export default function Register() {

    const { signUp, loadingAuth } = useContext(UserContext)

    const [ name, setName ] = useState('')
    const [ children, setChildren ] = useState('')
    const [ link, setLink ] = useState('')
    const [ theme, setTheme ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ number, setNumber ] = useState('')

    async function handleRegister(e) {
        e.preventDefault()
        if(name !== '', email !== '', password !== '', theme !== '', children !== '', number !== '') {
            await signUp(name, email, password, theme, children, link, number)
        } else {
            toast.error('Preencha todos os campos')
        }
    }

    return (
        <main 
        data-aos='fade-up'
        className='container-login primary-default'>
            <h1>Bookbaby</h1>

            <form onSubmit={handleRegister}>
                <label>
                    <p>Name da mãe ou do pai</p>
                    <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" />
                </label>
                <label>
                    <p>Name do filho</p>
                    <input
                    value={children}
                    onChange={e => setChildren(e.target.value)}
                    type="text" />
                </label>
                <label>
                    <p>Link do instagran</p>
                    <input
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    type="text" />
                </label>
                <label>
                    <p>Número</p>
                    <input
                    value={number}
                    onChange={e => setNumber(e.target.value)}
                    type="number" />
                </label>
                <label>
                    <p>Escolha o tema</p>
                    <select onChange={e => setTheme(e.target.value)}>
                        <option value="gray">Cinza</option>
                        <option value="blue">Azul</option>
                        <option value="pink">Rosa</option>
                        <option value="green">Verde</option>
                        <option value="yellow">Amarelo</option>
                    </select>
                    {/* <select
                    value={name}
                    onChange={e => setName(e.target.value)}
                    type="text" /> */}
                </label>
                <label>
                    <p>Email</p>
                    <input
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="text" />
                </label>
                <label>
                    <p>Senha</p>
                    <input 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    type="password" />
                </label>
                <button className="bg-primary-default border-default" type='submit'>
                    {
                        loadingAuth ? 'Carregando...' : 'Cadastrar'
                    }
                </button>
            </form>
            <Link className="primary-default" to='/login'>Já tem uma conta? Faça login!</Link>
        </main>
    )
}