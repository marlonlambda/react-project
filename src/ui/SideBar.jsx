import { NavLink } from "react-router-dom";
import { HiShoppingCart, HiUsers, HiUserGroup, HiClipboardList, HiChevronLeft, HiChevronRight, HiCog } from "react-icons/hi";

export const Sidebar = ({ open, setOpen }) => {
    const Menus = [
        { title: "Productos", icon: <HiShoppingCart className="text-xl" />, path: "/productos" },
        { title: "Usuarios", icon: <HiUsers className="text-xl" />, path: "/usuarios" },
        { title: "Clientes", icon: <HiUserGroup className="text-xl" />, path: "/clientes" },
        { title: "Pedidos", icon: <HiClipboardList className="text-xl" />, path: "/pedidos" }
    ];

    return (
        <div className={`transition-all duration-300 ${open ? "w-72" : "w-20"} bg-white h-screen p-5 pt-8 relative border border-black/15 shadow-md`}>
            <button 
                className="absolute -right-4 top-9 w-8 h-8 flex items-center justify-center bg-gray-800 text-white rounded-full border-2 cursor-pointer"
                onClick={() => setOpen(!open)}
            >
                {open ? <HiChevronLeft /> : <HiChevronRight />}
            </button>
            <div className="flex gap-x-4 items-center border-b-2 pb-2 border-blue-500">
                <img src="https://images.vexels.com/media/users/3/224152/isolated/preview/d9a2feba586aae6b5fc657676d143a06-logotipo-moderno-abstracto-azul-by-vexels.png" className={`w-10 cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                <h1 className={`text-black/80 origin-left font-medium text-xl duration-200 ${!open && "scale-0"}`}>Proyect</h1>
            </div>
            <ul className="pt-10">
                {Menus.map((Menu, index) => (
                    <NavLink
                        to={Menu.path}
                        key={index}
                        className={({ isActive }) => `flex mt-2 rounded-md p-2 font-semibold cursor-pointer text-black/75 text-sm transition items-center gap-x-4 
               ${isActive ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/10" : "hover:bg-gray-100"}`}
                    >
                        {Menu.icon}
                        <span className={`${!open && "hidden"} origin-left duration-100`}>
                            {Menu.title}
                        </span>
                    </NavLink>
                ))}
            </ul>
            <div className="absolute bottom-5">
                <NavLink
                    to="/configuracion"
                    className={"flex mt-2 rounded-md p-2 font-semibold cursor-pointer text-black/75 text-sm items-center gap-x-4"}      
                >
                    <HiCog className="text-xl" />
                    <span className={`${!open && "hidden"} origin-left duration-100`}>Configuración</span>
                </NavLink>
            </div>
        </div>
    );
};
