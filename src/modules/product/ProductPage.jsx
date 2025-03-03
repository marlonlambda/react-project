import React, { useState } from "react";
import { CustomTable } from "../../ui/Table";
import { useFetch } from "../../hooks/useFetch";
import { HeaderList } from "../../ui/HeaderList";
import { ProductForm } from "./components/ProductsForm";
import { deleteProduct } from "./services/product.service";

const headers = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripción" },
    { key: "price", label: "Precio" },
    { key: "stock", label: "Stock" },
    { key: "categoryName", label: "Categoría" },
    { key: "actions", label: "Acciones" },
];

export const ProductPage = () => {
    const { data: products, refresh } = useFetch("products/");
    const { data: categories = [] } = useFetch("categories/");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const getCategoryName = (categoryId) => {
        const category = categories?.find((c) => c.id === categoryId);
        return category ? category.name : "Desconocido";
    };

    const handleEdit = (product) => {
        setSelectedProduct(products.find(p => p.id === product.id));
        refresh();

    };
    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de eliminar este producto?")) {
            await deleteProduct(id);
            refresh();
        }
    };

    const formattedData = products?.map((product) => ({
        ...product,
        categoryName: getCategoryName(product.category),
        category: product.category
    })) || [];

    return (
        <div className="h-screen">
            <HeaderList>
                <ProductForm selectedProduct={selectedProduct} categories={categories} refresh={refresh} />
            </HeaderList>
            <CustomTable headers={headers} data={formattedData} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};
