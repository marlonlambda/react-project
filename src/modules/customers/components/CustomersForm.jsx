import React, { useEffect } from "react";
import { Button, useDisclosure } from "@heroui/react";
import { DynamicFormModal } from "../../../ui/DynamicFormModal";
import { useForm } from "../../../hooks/useForm";
import { createCustomer, updateCustomer } from "../services/customers.service";
import { IoIosAdd } from "react-icons/io";
import { HiMail, HiUser, HiPhone, HiHashtag    } from "react-icons/hi";


const initialFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
};

export const CustomersForm = ({ selectedCustomer }) => {
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
            } else {
                await createCustomer(formState);
            }
            onResetForm();
            onClose();
        } catch (error) {
            console.log(error.response?.data || error.message);
        }
    };

    const fields = [
        { type: "text", name: "name", label: "Nombre", required: true, value: formState.name, onChange: onInputChange },
        { type: "text", name: "phone", label: "Teléfono", required: true, value: formState.phone, onChange: onInputChange },
        { type: "email", name: "email", label: "Email", required: true, value: formState.email, onChange: onInputChange },
        { type: "text", name: "address", label: "Dirección", required: true, value: formState.address, onChange: onInputChange },
    ];

    return (
        <>
            <Button color="primary" endContent={<IoIosAdd className="text-4xl" />} onPress={onOpen}>
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
