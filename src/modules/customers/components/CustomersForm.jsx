import React, { useEffect } from "react";
import { Button, useDisclosure, addToast } from "@heroui/react";
import { DynamicFormModal } from "../../../ui/DynamicFormModal";
import { useForm } from "../../../hooks/useForm";
import { createCustomer, updateCustomer } from "../services/customers.service";
import { IoIosAdd } from "react-icons/io";

const initialFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
};

export const CustomersForm = ({ selectedCustomer, refresh }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { formState, setFormState, onInputChange, onResetForm } = useForm(initialFormData);

    useEffect(() => {
        if (selectedCustomer) {
            setFormState(selectedCustomer);
            if (!isOpen) onOpen(); 
        }
    }, [selectedCustomer]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formState.id) {
                await updateCustomer(formState.id, formState);
                addToast({
                    title: "Éxito",
                    description: "Cliente actualizado correctamente",
                    color: "success",
                });
            } else {
                await createCustomer(formState);
                addToast({
                    title: "Éxito",
                    description: "Cliente creado correctamente",
                    color: "success",
                });
            }

            refresh(); 
            onResetForm();
            onClose();
        } catch (error) {
            addToast({
                title: "Error",
                description: error.response?.data?.message || "Ocurrió un error al guardar el cliente",
                color: "danger",
            });
        }
    };

    const fields = [
        { type: "text", name: "name", label: "Nombre", required: true, value: formState.name, onChange: onInputChange, className: 'col-span-1' },
        { type: "text", name: "phone", label: "Teléfono", required: true, value: formState.phone, onChange: onInputChange, className: 'col-span-1' },
        { type: "email", name: "email", label: "Email", required: true, value: formState.email, onChange: onInputChange, className: 'col-span-2' },
        { type: "text", name: "address", label: "Dirección", required: true, value: formState.address, onChange: onInputChange, className: 'col-span-2' },
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
                title={formState.id ? "Editar Cliente" : "Agregar Cliente"}
                fields={fields}
                onSubmit={handleSubmit}
            />
        </>
    );
};
