import './header.css'
import { useState } from 'react'
import { Link, NavLink, useParams } from "react-router-dom"
import { LuBaby } from 'react-icons/lu'
import { HiBars3 } from 'react-icons/hi2'
import { useContext } from 'react'
import { UserContext } from '../../Contexts/user'

export default function Header() {

    const { userLink } = useParams()

    const { signed, user, dataUser } = useContext(UserContext)
    const [ navbarMobile, setNavbarMobile ] = useState(false)

    function handleNavbarMobile() {
        setNavbarMobile(!navbarMobile)
    }

    return (
        <header>

            <Link  data-aos='fade-down' 
            to={`/home/${dataUser?.uid ? dataUser.uid : 'no-user'}`}
            className={`logo primary-${dataUser?.uid ? dataUser.theme : 'default'}`}>
                <LuBaby /> Bookbaby
            </Link>

            <nav 
            data-aos='fade-down' 
            className={navbarMobile ? `navbar navbar-mobile bg-tertiary-${dataUser?.theme ? dataUser.theme : 'default'}` : 'navbar'}>

                <NavLink to={`/home/${dataUser?.uid ? dataUser.uid : 'no-user' }`}
                onClick={handleNavbarMobile}
                className={({isActive}) => isActive ? `bg-secundary-${dataUser?.theme ? dataUser.theme : 'default'}` : `bg-primary-${user ? user.theme : 'default'}`}>
                    Home
                </NavLink>

                <NavLink to={`/texts/${dataUser?.uid ? dataUser.uid : 'no-user' }`}
                onClick={handleNavbarMobile}
                className={({isActive}) => isActive ? `bg-secundary-${dataUser?.theme ? dataUser.theme : 'default'}` : `bg-primary-${user ? user.theme : 'default'}`}>
                    Histórias
                </NavLink>
                
                <NavLink to={`/events/${dataUser?.uid ? dataUser.uid : 'no-user' }`}
                onClick={handleNavbarMobile}
                className={({isActive}) => isActive ? `bg-secundary-${dataUser?.theme ? dataUser.theme : 'default'}` : `bg-primary-${user ? user.theme : 'default'}`}>
                    Evento
                </NavLink>

                {
                    signed ? 

                    <NavLink to={`/admin/${dataUser?.uid ? dataUser.uid : userLink }`}
                    onClick={handleNavbarMobile}
                    className={({isActive}) => isActive ? `bg-secundary-${dataUser?.theme ? dataUser.theme : 'default'}` : `bg-primary-${user ? user.theme : 'default'}`}>
                        Conta
                    </NavLink>
                     :  
                     <NavLink to='/login'
                     onClick={handleNavbarMobile}
                     className={({isActive}) => isActive ? `bg-secundary-${dataUser?.theme ? dataUser.theme : 'default'}` : `bg-primary-${user ? user.theme : 'default'}`}>
                        Login
                    </NavLink>
                }
            </nav>

            <div className={`bars primary-${dataUser?.theme ? dataUser.theme : 'default'}`} onClick={handleNavbarMobile}>
                <HiBars3 />
            </div>

            <div className={`ball-header-1 bg-primary-${dataUser?.theme ? dataUser.theme : 'default'}`}></div>
        
        </header>
    )
}