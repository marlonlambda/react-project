import React, { useState } from "react";
import { CustomTable } from "../../ui/Table";
import { useFetch } from "../../hooks/useFetch";
import { HeaderList } from "../../ui/HeaderList";
import { UserForm } from "./components/UsersForm";
import { deleteUser } from "./services/users.service";

const headers = [
    { key: "first_name", label: "Nombre" },
    { key: "last_name", label: "Apellido" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Teléfono" },
    { key: "is_active", label: "Estado" },
    { key: "actions", label: "Acciones" },
];

export const UserPage = () => {
    const { data: users, refresh } = useFetch("users/");
    const { data: roles } = useFetch("roles/");
    const [selectedUser, setSelectedUser] = useState(null);

    const handleEdit = (user) => {
        setSelectedUser(null);
        setTimeout(() => setSelectedUser(user), 0);
        refresh()

    };

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
            await deleteUser(id);
            refresh();
        }
    };

    return (
        <div className="h-screen">
            <HeaderList>
                <UserForm selectedUser={selectedUser} roles={roles || []} refresh={refresh} />
            </HeaderList>
            <CustomTable headers={headers} data={users || []} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};
