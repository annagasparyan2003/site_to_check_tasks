import React from 'react'
import { auth } from '@/auth'
import UserButton from './auth/user-button'

import Link from 'next/link'
import "./Navbar.css"
import { Lora } from "next/font/google";
const lora = Lora({ subsets: ["latin"] });

const Navbar = async () => {
  const session = await auth();
  return (
    <header className={lora.className + ' main_header h-10 w-screen flex justify-between'}>
      {session?.user ? (
        <>
          <Link href="/"> Publication report </Link>
          <Link href="/"> Главная </Link>
          <Link href="/publications"> Публикации </Link>
          <Link href="/send_work"> Отправить работу </Link>
          <UserButton />
        </>
      ) : (
        <Link id='signIn' className="sigin inline-flex md:ml-auto items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          href="/api/auth/signin">
          Войти
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      )
      }
     
    </header>
  )
}

export default Navbar