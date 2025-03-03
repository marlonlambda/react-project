import React, { useEffect } from "react";
import { Button, useDisclosure, addToast } from "@heroui/react";
import { DynamicFormModal } from "../../../ui/DynamicFormModal";
import { useForm } from "../../../hooks/useForm";
import { createCategory, updateCategory } from "../services/category.service";
import { IoIosAdd } from "react-icons/io";


const initialFormData = {
    name: "",
    description: "",
    status: "",
};

export const CategoryForm = ({ selectedCategory, refresh }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { formState, setFormState, onInputChange, onResetForm } = useForm(initialFormData);

    useEffect(() => {
        if (selectedCategory) {
            setFormState(selectedCategory);
            if (!isOpen) onOpen();
        }
    }, [selectedCategory]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formState.id) {
                await updateCategory(formState.id, formState);
                addToast({
                    title: 'Éxito',
                    description: 'Categoría actualizada correctamente',
                    color: 'success',
                });
            } else {
                await createCategory(formState);
                addToast({
                    title: 'Éxito',
                    description: 'Categoría creada correctamente',
                    color: 'success',
                });
            }
            refresh();
            onResetForm();
            onClose();
        } catch (error) {
            addToast({
                title: 'Error',
                description: error.response?.data?.message || 'Ocurrió un error',
                color: 'danger',
            });
            onClose()
        }
    };

    const fields = [
        { type: "text", name: "name", label: "Nombre", required: true, value: formState.name, onChange: onInputChange, className: 'col-span-2' },
        { type: "text", name: "description", label: "Descripción", required: true, value: formState.description, onChange: onInputChange, className: 'col-span-2' },
        {
            type: "select",
            name: "status",
            label: "Estado",
            required: true,
            value: formState.status ? "true" : "false",
            onChange: onInputChange,
            className: 'col-span-2',
            options: [
                { value: true, label: "Activo" },
                { value: "false", label: "Inactivo" }
            ]
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
                title={formState.id ? "Editar Categoria" : "Agregar Categoria"}
                fields={fields}
                onSubmit={handleSubmit}
            />
        </>
    );
};
