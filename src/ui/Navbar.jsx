import React from 'react'
import { Bienvenidad } from '../modules/auth/components/Bienvenidad';
import { useSelector } from 'react-redux';

export const Navbar = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <div className='px-5'>
            <div className="flex justify-between items-center bg-blue-950 rounded-b-xl px-4 h-16">
                <Bienvenidad nombre={user.first_name}/>
            </div>
        </div>
    )
}
