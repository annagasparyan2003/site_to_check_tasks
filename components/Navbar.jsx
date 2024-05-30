import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import "./Navbar.css"
import { Lora } from "next/font/google";
const lora = Lora({ subsets: ["latin"] });

const Navbar = () => {
  return (
    <header className={lora.className + ' main_header h-10 w-screen flex justify-between'}>
     <Link href="/"> Publication report </Link> 
     <Link href="/"> Главная </Link>
     <Link href="/publications"> Публикации </Link>
     <Link href="/send_work"> Отправить работу </Link>
     <Link href=""> <FontAwesomeIcon className='h-5 pr-2' icon={faCircleUser} /> </Link>
    </header>
  )
}

export default Navbar