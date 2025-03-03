import api from "../../../api/api";

export const createOrder = async (ordersData) => {
    return api.post("orders/", ordersData);
};

export const updateOrder = async (id, ordersData) => {
    console.log("Actualizando pedido con ID:", id);
    console.log("Datos enviados:", JSON.stringify(ordersData, null, 2)); // 🛠 Para depuración

    return api.put(`orders/${id}/`, ordersData);
};

export const deleteOrder = async (id) => {
    return api.delete(`orders/${id}/`);
};