import api from "../../../api/api";

export const createProduct = async (productData) => {
    return api.post("products/", productData);
};

export const updateProduct = async (id, productData) => {
    return api.put(`products/${id}/`, productData);
};

export const deleteProduct = async (id) => {
    return api.delete(`products/${id}/`);
};