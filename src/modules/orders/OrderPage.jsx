import React, { useState } from "react";
import { CustomTable } from "../../ui/Table";
import { useFetch } from "../../hooks/useFetch";
import { HeaderList } from "../../ui/HeaderList";
import { deleteOrder } from "./services/orders.service";
import { OrdersForm } from "./components/OrdersForm";
import OrderDetailModal from "./components/OrderDetailModal";

const headers = [
    { key: "customerName", label: "Cliente" },
    { key: "total", label: "Total" },
    { key: "actions", label: "Acciones" },
];

export const OrdersPage = () => {
    const { data, refresh } = useFetch("orders/");
    const { data: dataCustomers } = useFetch("customers/");
    const { data: dataProducts } = useFetch("products/");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedOrderDetail, setSelectedOrderDetail] = useState(null);

    const getCustomerName = (customerId) => {
        const customer = dataCustomers?.find((c) => c.id === customerId);
        return customer ? customer.name : "Desconocido";
    };

    const handleEdit = (order) => {
        setSelectedOrder({
            id: order.id,
            customer: String(order.customer),
            products: order.details.map(detail => ({
                product: detail.product,
                quantity: detail.quantity,
                unit_price: detail.unit_price,
            })),
        });
    };

    const handleDelete = async (id) => {
        if (confirm("¿Estás seguro de eliminar este pedido?")) {
            await deleteOrder(id);
            refresh();
        }
    };

    const handleViewDetail = (order) => {
        setSelectedOrderDetail(order);
        setIsDetailModalOpen(true);
    };

    const formattedData = data?.map((order) => ({
        ...order,
        customerName: getCustomerName(order.customer),
        customer: order.customer,
        total: order.details.reduce((acc, item) => acc + item.subtotal, 0),
    })) || [];

    return (
        <div className="h-screen">
            <HeaderList>
                <OrdersForm
                    selectedOrder={selectedOrder}
                    customers={dataCustomers || []}
                    productsList={dataProducts || []}
                    refresh={refresh}
                />
            </HeaderList>
            <CustomTable
                headers={headers}
                data={formattedData || []}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onViewDetail={handleViewDetail}

            />
            <OrderDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                order={selectedOrderDetail}
            />
        </div>
    );
};
