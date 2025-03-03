import React from 'react'
import { FaBox, FaShoppingCart, FaSitemap  } from "react-icons/fa";

export const LoginInfo = () => {
    return (
        <div className="w-1/2 bg-blue-800 text-white flex flex-col justify-center items-center p-10">
            <div className="flex flex-col max-w-md text-center gap-y-6">
                <div className="bg-gray-300 w-16 h-22 flex justify-center items-center mb-4 rounded-full ">
                    <img className='p-1' src="https://images.vexels.com/media/users/3/224152/isolated/preview/d9a2feba586aae6b5fc657676d143a06-logotipo-moderno-abstracto-azul-by-vexels.png" />
                </div>
                <h1 className="text-start text-3xl font-bold mb-2">
                    Gestiona productos y crea pedidos con facilidad
                </h1>
                <p className=" text-start mb-6">
                    ProductPro simplifica la gestión de tu inventario y agiliza el proceso de creación de pedidos.
                    Optimiza tu negocio y mejora la eficiencia de tus operaciones diarias.
                </p>
                <ul className="text-left space-y-2">
                    <li className="flex items-center gap-2">
                        <div className='bg-blue-50 rounded-md p-1'>
                            <FaBox className=' text-blue-500' />
                        </div>
                        <span>Control de inventario en tiempo real</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className='bg-blue-50 rounded-md p-1'>
                            <FaShoppingCart className=' text-blue-500' />
                        </div><span>Creación rápida de pedidos</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <div className='bg-blue-50 rounded-md p-1'>
                            <FaSitemap  className=' text-blue-500' />
                        </div><span> Gestión de catálogo de productos</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
