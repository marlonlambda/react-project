import { useFetch } from "./useFetch";

export const useEntityName = (endpoint) => {
    const { data: entities } = useFetch(endpoint);

    const getEntityName = (id) => {
        const entity = entities?.find((e) => e.id === id);
        return entity ? entity.name : "Desconocido";
    };

    return { getEntityName };
};
