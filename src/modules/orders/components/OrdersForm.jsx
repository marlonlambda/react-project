import React, { useEffect, useState } from "react";
import { Button, Input, Select, SelectItem, useDisclosure } from "@heroui/react";
import { DynamicFormModal } from "../../../ui/DynamicFormModal";
import { useForm } from "../../../hooks/useForm";
import { createOrder, updateOrder } from "../services/orders.service";
import { IoIosAdd, IoMdTrash } from "react-icons/io";
import { OrdersFormTable } from "./OrdersFormTable";
import { addToast } from "@heroui/react";

const initialFormData = {
    customer: "",
    products: []
};

export const OrdersForm = ({ selectedOrder, customers, productsList, refresh }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { formState, setFormState, onInputChange, onResetForm } = useForm(initialFormData);
    const [orderProducts, setOrderProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState("");
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    useEffect(() => {
        if (selectedOrder) {
            setFormState({
                ...selectedOrder,
                customer: selectedOrder.customer?.id || selectedOrder.customer
            });
    
            const formattedProducts = selectedOrder.products?.map(detail => ({
                product: detail.product?.id || detail.product,
                quantity: detail.quantity,
                unit_price: detail.unit_price,
            })) || [];
    
            setOrderProducts(formattedProducts);
    
            if (!isOpen) onOpen();
        }
    }, [selectedOrder]);

    const handleAddProduct = () => {
        if (!selectedProduct) return;
        const productDetails = productsList.find(p => p.id === parseInt(selectedProduct));
        if (!productDetails) return;

        setOrderProducts([...orderProducts, {
            product: productDetails.id,
            quantity: selectedQuantity,
            unit_price: productDetails.price
        }]);
        setSelectedProduct("");
        setSelectedQuantity(1);
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...orderProducts];
        updatedProducts[index][field] = value;
        setOrderProducts(updatedProducts);
    };

    const handleRemoveProduct = (index) => {
        setOrderProducts(orderProducts.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return orderProducts.reduce((total, item) => total + (item.quantity * item.unit_price), 0);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const orderData = { ...formState, products: orderProducts };
            if (formState.id) {
                await updateOrder(formState.id, orderData);
                addToast({
                    title: 'Éxito',
                    description: 'Pedido editado con éxito',
                    color: 'success',
                });
            } else {
                await createOrder(orderData);
                addToast({
                    title: 'Éxito',
                    description: 'Pedido creado con éxito',
                    color: 'success',
                    variant: 'flat'
                });
            }
            onResetForm();
            setOrderProducts([]);
            refresh()
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

    return (
        <>
            <Button color="primary" size="sm" endContent={<IoIosAdd className="text-4xl" />} onPress={onOpen}>
                Agregar Pedido
            </Button>
            <DynamicFormModal
                isOpen={isOpen}
                onClose={() => {
                    onResetForm();
                    setOrderProducts([]);
                    onClose();
                }}
                size={'3xl'}

                title={formState.id ? "Editar Pedido" : "Agregar Pedido"}
                onSubmit={handleSubmit}
            >
                <div className="space-y-4 mb-4">
                    <div className="flex flex-col ">
                        <div>
                            <span className="text-xs font-semibold">Cliente</span>
                        </div>
                        <Select
                            variant="bordered"
                            size="sm"
                            className="w-full flex-1"
                            name="customer"
                            selectedKeys={formState.customer ? [formState.customer.toString()] : []}
                            onSelectionChange={(keys) => {
                                const selectedKey = Array.from(keys)[0];
                                onInputChange({
                                    target: {
                                        name: "customer",
                                        value: parseInt(selectedKey, 10)
                                    }
                                });
                            }}
                            placeholder="Seleccione un Cliente"
                        >
                            {customers.map(cust => (
                                <SelectItem key={cust.id.toString()} value={cust.id.toString()}>{cust.name}</SelectItem>
                            ))}
                        </Select>
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex flex-col gap-y-4">
                            <h2 className="text-md font-semibold">Agregar productos</h2>
                            <span className="text-xs font-semibold">Producto</span>
                        </div>
                        <div className="flex space-x-2">
                            <Select
                                variant="bordered"
                                size="sm"
                                className="flex-1"
                                selectedKeys={selectedProduct ? [selectedProduct.toString()] : []}
                                onSelectionChange={(keys) => setSelectedProduct(Array.from(keys)[0])}
                                placeholder="Seleccionar producto"
                            >
                                {productsList.map(prod => (
                                    <SelectItem key={prod.id.toString()} value={prod.id.toString()}>{prod.name}</SelectItem>
                                ))}
                            </Select>
                            <Input
                                type="number"
                                className="w-20"
                                value={selectedQuantity}
                                min={1}
                                onValueChange={(value) => setSelectedQuantity(Number(value))}
                                size="sm"
                                variant="bordered"
                            />
                            <Button color="primary" size="sm" onPress={handleAddProduct}>Agregar</Button>
                        </div>
                    </div>
                    <OrdersFormTable orderProducts={orderProducts} productsList={productsList} handleProductChange={handleProductChange} handleRemoveProduct={handleRemoveProduct} />
                    <div className="text-right font-bold text-md">Total: ${calculateTotal()}</div>
                </div>
            </DynamicFormModal>
        </>
    );
};
