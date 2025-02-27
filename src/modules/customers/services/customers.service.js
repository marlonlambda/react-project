import api from "../../../api/api";

export const createCustomer = async (customerData) => {
    return api.post("customers/", customerData);
};

export const updateCustomer = async (id, customerData) => {
    return api.put(`customers/${id}/`, customerData);
};

export const deleteCustomer = async (id) => {
    return api.delete(`customers/${id}/`);
};