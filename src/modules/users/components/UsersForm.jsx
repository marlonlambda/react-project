import React, { useEffect } from "react";
import { addToast, Button, useDisclosure } from "@heroui/react";
import { DynamicFormModal } from "../../../ui/DynamicFormModal";
import { useForm } from "../../../hooks/useForm";
import { createUser, updateUser } from "../services/users.service";
import { IoIosAdd } from "react-icons/io";

const initialFormData = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    is_active: true,
};

export const UserForm = ({ selectedUser, refresh }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { formState, setFormState, onInputChange, onResetForm } = useForm(initialFormData);

    useEffect(() => {
        if (selectedUser) {
            setFormState(selectedUser);
            if (!isOpen) onOpen();
        }
    }, [selectedUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formState.id) {
                await updateUser(formState.id, formState);
                addToast({
                    title: "Éxito",
                    description: "Usuario actualizado correctamente",
                    color: "success",
                });
            } else {
                await createUser(formState);
                addToast({
                    title: "Éxito",
                    description: "Usuario creado correctamente",
                    color: "success",
                });
            }
            refresh()
            onResetForm();
            onClose();
        } catch (error) {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "Ocurrió un error al guardar el usuario",
                color: "danger",
            });
        }
    };

    const fields = [
        { type: "text", name: "first_name", label: "Nombre", required: true, value: formState.first_name, onChange: onInputChange, className: "col-span-1" },
        { type: "text", name: "last_name", label: "Apellido", required: true, value: formState.last_name, onChange: onInputChange, className: "col-span-1" },
        { type: "email", name: "email", label: "Email", required: true, value: formState.email, onChange: onInputChange, className: "col-span-2", autoComplete: "off" },
        { type: "password", name: "password", label: "Contraseña", required: true, value: formState.password, onChange: onInputChange, className: "col-span-2" },
        { type: "text", name: "phone", label: "Teléfono", value: formState.phone, onChange: onInputChange, className: "col-span-1" },
        {
            type: "checkbox",
            name: "is_active",
            label: "Usuario Activo",
            value: formState.is_active,
            onChange: (e) => onInputChange({ target: { name: "is_active", value: e.target.checked } }),
            className: "col-span-1",
        },
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
                title={formState.id ? "Editar Usuario" : "Agregar Usuario"}
                fields={fields}
                onSubmit={handleSubmit}
            />
        </>
    );
};
