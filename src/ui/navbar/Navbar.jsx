import React from 'react'
import { ItemsNavbar } from './ItemsNavbar';
import { Link } from 'react-router-dom';
import { Bienvenida } from '../../../modules/Bienvenida/Bienvenida';

const navLinks = [
  { name: "Inicio", path: "/home" },
  { name: "Productos", path: "/products" },
  { name: "Contacto", path: "/contacto" },
];

export const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <Link href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">React</span>
      </Link>
      <div className="flex items-center gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <Bienvenida nombre='marlon@lambda'/>
          </div>
      </div>
        <ItemsNavbar links={navLinks} />
      </div>
    </nav>

  )
}
