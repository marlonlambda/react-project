import React, { useEffect, useState } from "react";
import { CustomTable } from "../../ui/Table";
import { useFetch } from "../../hooks/useFetch";
import { HeaderList } from "../../ui/HeaderList";
import { CategoryForm } from "./components/CategoryForm";
import { deleteCategory } from "./services/category.service";

const headers = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripcion" },
    { key: "status", label: "Estado" },
    { key: "actions", label: "Acciones" },
];

export const CategoryPage = () => {
    const { data, refresh } = useFetch("categories/");
    const [selectedCategory, setselectedCategory] = useState(null);

    const handleEdit = (customer) => {
        setselectedCategory(null); 
        setTimeout(() => setselectedCategory(customer), 0); 
        refresh()

    };

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de eliminar este cliente?")) {
            await deleteCategory(id);
            refresh();
        }
    };

    return (
        <div className="h-screen">
            <HeaderList>
                <CategoryForm selectedCategory={selectedCategory} refresh={refresh}/>
            </HeaderList>
            <CustomTable headers={headers} data={data || []} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};
