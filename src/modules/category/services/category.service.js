import api from "../../../api/api";

export const createCategory = async (CategoryData) => {
    return api.post("categories/", CategoryData);
};

export const updateCategory = async (id, CategoryData) => {
    return api.put(`categories/${id}/`, CategoryData);
};

export const deleteCategory = async (id) => {
    return api.delete(`categories/${id}/`);
};