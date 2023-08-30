import './footer.css'
import { Link } from 'react-router-dom'

import { LuBaby } from 'react-icons/lu'
import { useContext } from 'react'
import { UserContext } from '../../Contexts/user'

export default function Footer() {

    const { dataUser } = useContext(UserContext)
    return (
       <footer>
            <Link className={`logo primary-${dataUser?.theme ? dataUser.theme : 'dafault'}`} 
            to={`/home/${dataUser?.uid ? dataUser.uid : 'no-user'}`}
            onClick={window.scroll(0,0)}>
                <LuBaby /> Bookbaby
            </Link>
            <div>
                Criado por: 
                <a href="https://portfolio-amwcdeqzz-humbertomonteiro.vercel.app/" 
                target='_blank' 
                rel='noreferrer'
                className={`primary-${dataUser?.theme}`}> Humberto</a> - 
                todos os direitos reservados - 2023
            </div>

       </footer>
    )
}