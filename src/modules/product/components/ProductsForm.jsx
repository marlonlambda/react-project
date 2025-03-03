import React, { useEffect } from "react";
import { Button, useDisclosure, addToast } from "@heroui/react";
import { DynamicFormModal } from "../../../ui/DynamicFormModal";
import { useForm } from "../../../hooks/useForm";
import { createProduct, updateProduct } from "../services/product.service";
import { IoIosAdd } from "react-icons/io";

const initialFormData = {
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
};

export const ProductForm = ({ selectedProduct, categories, refresh }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { formState, setFormState, onInputChange, onResetForm } = useForm(initialFormData);

    useEffect(() => {
        if (selectedProduct) {
            setFormState({
                ...selectedProduct,
                category: selectedProduct.category
            });
            if (!isOpen) onOpen();
        }
    }, [selectedProduct]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formState.id) {
                await updateProduct(formState.id, formState);
                addToast({
                    title: "Éxito",
                    description: "Producto actualizado correctamente",
                    color: "success",
                });
            } else {
                await createProduct(formState);
                addToast({
                    title: "Éxito",
                    description: "Producto creado correctamente",
                    color: "success",
                });
            }
            
            refresh(); 
            onResetForm();
            onClose();
        } catch (error) {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "Ocurrió un error al guardar el producto",
                color: "danger",
            });
        }
    };

    const fields = [
        { type: "text", name: "name", label: "Nombre", required: true, value: formState.name, onChange: onInputChange, className: "col-span-2" },
        { type: "text", name: "description", label: "Descripción", required: true, value: formState.description, onChange: onInputChange, className: "col-span-2" },
        { type: "number", name: "price", label: "Precio", required: true, value: formState.price, onChange: onInputChange, className: "col-span-1" },
        { type: "number", name: "stock", label: "Stock", required: true, value: formState.stock, onChange: onInputChange, className: "col-span-1" },
        {
            type: "select",
            name: "category",
            label: "Categoría",
            required: true,
            selectedKeys: formState.category ? new Set([formState.category.toString()]) : new Set(),
            onSelectionChange: (keys) => {
                const selectedValue = Array.from(keys)[0];
                onInputChange({ target: { name: 'category', value: parseInt(selectedValue, 10) } });
            },
            className: "col-span-2",
            options: categories?.map(cat => ({ value: cat.id.toString(), label: cat.name }))
        }
    ];

    return (
        <>
            <Button color="primary" size="sm" endContent={<IoIosAdd className="text-4xl" />} onPress={onOpen}>
                Agregar
            </Button>
            <DynamicFormModal
                isOpen={isOpen}
                onClose={() => {
                    onResetForm();
                    onClose();
                }}
                title={formState.id ? "Editar Producto" : "Agregar Producto"}
                fields={fields}
                onSubmit={handleSubmit}
            />
        </>
    );
};
