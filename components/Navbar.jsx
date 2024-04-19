import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <header className='h-10 w-screen flex justify-between'>
     <a href=""> Publication report </a> 
     <a href=""> Главная </a>
     <a href=""> Публикации </a>
     <a href="/send_work"> Отправить работу </a>
     <a href=""> <FontAwesomeIcon className='h-5' icon={faCircleUser} /> </a>
    </header>
  )
}

export default Navbar