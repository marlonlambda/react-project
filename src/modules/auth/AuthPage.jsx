import React from 'react'
import { CustomTable } from '../../ui/Table';
import { useFetch } from '../../hooks/useFetch';
import { HeaderList } from '../../ui/HeaderList';

const headers = [
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "first_name", label: "First Name" },
    { key: "last_name", label: "Last Name" },
    { key: "is_active", label: "Active" },
    { key: "role", label: "Role" },
];


export const AuthPage = () => {
    const { data } = useFetch('users/')
    return (
        <div className="h-screen">
            <HeaderList />
            <CustomTable headers={headers} data={data || []} />
        </div>
    )
}
