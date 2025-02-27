import React, { useEffect, useState } from "react";
import { CustomTable } from "../../ui/Table";
import { useFetch } from "../../hooks/useFetch";
import { HeaderList } from "../../ui/HeaderList";
import { CustomersForm } from "./components/CustomersForm";
import { deleteCustomer } from "./services/customers.service";

const headers = [
    { key: "name", label: "Nombre" },
    { key: "email", label: "Correo" },
    { key: "phone", label: "Teléfono" },
    { key: "address", label: "Dirección" },
    { key: "actions", label: "Acciones" },
];

export const CustomersPage = () => {
    const { data, refresh } = useFetch("customers/");
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleEdit = (customer) => {
        setSelectedCustomer(null); // Forzar actualización
        setTimeout(() => setSelectedCustomer(customer), 0); // React detectará el cambio
    };

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            await deleteCustomer(id);
            refresh();
        }
    };

    return (
        <div className="h-screen">
            <HeaderList>
                <CustomersForm selectedCustomer={selectedCustomer} />
            </HeaderList>
            <CustomTable headers={headers} data={data || []} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};
