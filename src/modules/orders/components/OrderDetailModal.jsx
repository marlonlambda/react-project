import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { useFetch } from "../../../hooks/useFetch";

const OrderDetailModal = ({ isOpen, onClose, order }) => {
    const { data: categories = [] } = useFetch("products/");

    if (!order) return null;
    const getCategoryName = (categoryId) => {
        const category = categories?.find((c) => c.id === categoryId);
        return category ? category.name : "Desconocido";
    };
    return (
        <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <ModalHeader className="flex justify-around gap-2">
                    <div className="border w-full shadow-md rounded-md p-2 ">
                        <h3 className="text-xs">Informacion del pedido</h3>
                        <span className="text-xs font-semibold text-black/60">Pedido ID: #{order.id}</span>
                    </div>
                    <div className="border w-full shadow-md rounded-md p-2 ">
                        <h3 className="text-xs">Cliente</h3>
                        <span className="text-xs font-semibold text-black/60">Cliente: {order.customerName}</span>
                    </div>
                    <div className="border w-full shadow-md rounded-md p-2 ">
                        <h3 className="text-xs">Fecha</h3>
                        <span className="text-xs font-semibold text-black/60">Fecha: {new Date(order.date).toLocaleDateString()}</span>
                    </div>
                </ModalHeader>
                <ModalBody>
                    <h2 className="font-semibold">Lista de productos</h2>

                    <Table aria-label="Detalles del pedido">
                        <TableHeader>
                            <TableColumn>Producto</TableColumn>
                            <TableColumn>Cantidad</TableColumn>
                            <TableColumn>Precio Unitario</TableColumn>
                            <TableColumn>Subtotal</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {order.details.map((detail) => (
                                <TableRow key={detail.id}>
                                    <TableCell>{getCategoryName(detail.product)}</TableCell>
                                    <TableCell>{detail.quantity}</TableCell>
                                    <TableCell>{detail.unit_price}</TableCell>
                                    <TableCell>{detail.subtotal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <p className="text-sm font-semibold">Total: {order.total}</p>
                </ModalBody>
                <ModalFooter>
                    <Button size="sm" color="primary" onPress={onClose}>
                        Cerrar
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default OrderDetailModal;