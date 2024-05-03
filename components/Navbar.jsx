import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className='h-10 w-screen flex justify-between'>
     <Link href=""> Publication report </Link> 
     <Link href=""> Главная </Link>
     <Link href="/publications"> Публикации </Link>
     <Link href="/send_work"> Отправить работу </Link>
     <Link href=""> <FontAwesomeIcon className='h-5 pr-2' icon={faCircleUser} /> </Link>
    </header>
  )
}

export default Navbar