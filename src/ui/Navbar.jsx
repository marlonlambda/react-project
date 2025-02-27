import React from 'react'
import { Bienvenidad } from '../modules/auth/components/Bienvenidad';
import { UserInfo } from '../modules/auth/components/UserInfo';

export const Navbar = () => {
    return (
        <div className='px-5'>
            <div className="flex justify-between items-center bg-blue-950 rounded-b-xl px-4 h-16">
                <Bienvenidad nombre={'Marlon Jaramillo'}/>
                <UserInfo />
            </div>
        </div>
    )
}
