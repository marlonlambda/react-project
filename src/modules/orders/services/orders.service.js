import api from "../../../api/api";

export const createOrder = async (ordersData) => {
    return api.post("orders/", ordersData);
};

export const updateOrder = async (id, ordersData) => {
    return api.put(`orders/${id}/`, ordersData);
};

export const deleteOrder = async (id) => {
    return api.delete(`orders/${id}/`);
};