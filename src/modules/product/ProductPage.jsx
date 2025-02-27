import React from 'react'
import { CustomTable } from '../../ui/Table';
import { useFetch } from '../../hooks/useFetch';

const headers = [
    { key: "name", label: "Nombre" },
    { key: "description", label: "Descripcion" },
    { key: "price", label: "Precio" },
    { key: "stock", label: "Stock" },
    // { key: "category", label: "Role" },
  ];
  

export const ProductPage = () => {

    const { data } = useFetch('products/')
  return (
    <div>
        <CustomTable headers={headers} data={data || []} />
    </div>
  )
}
