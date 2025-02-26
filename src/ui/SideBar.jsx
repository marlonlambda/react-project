"use client";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiShoppingCart, HiUsers, HiUserGroup, HiClipboardList, HiChevronLeft, HiChevronRight } from "react-icons/hi";

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
      { title: "Productos", icon: <HiShoppingCart className="text-lg" />, path: "/productos" },
      { title: "Usuarios", icon: <HiUsers className="text-lg"/>, path: "/usuarios" },
      { title: "Clientes", icon: <HiUserGroup className="text-lg"/>, gap: true, path: "/clientes" },
      { title: "Pedidos", icon: <HiClipboardList className="text-lg"/>, path: "/pedidos" }
    ];
  return (
        <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-white h-screen p-5  pt-8 relative duration-300 border border-black/15 shadow-md`}
      >
        <button
          className="absolute -right-4 top-9 w-8 h-8 flex items-center justify-center bg-gray-800 text-black/80 rounded-full border-2 border-dark-purple cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          {open ? <HiChevronLeft /> : <HiChevronRight />}
        </button>
        <div className="flex gap-x-4 items-center">
          <img
            src="/assets/smiley.svg"
            className={`cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-black/80 origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            Proyect
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <NavLink
              to={Menu.path}
              key={index}
              className={({ isActive }) => `flex rounded-md p-2 hover:bg-black/10 cursor-pointer hover:bg-light-white text-black/80 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${isActive ? "bg-blue-800/80 text-gray-200 hover:bg-blue-800/80" : ""}`}
            >
              {Menu.icon}
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Sidebar;
