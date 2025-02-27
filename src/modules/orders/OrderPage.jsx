import React from "react";
import { CustomTable } from "../../ui/Table";
import { useFetch } from "../../hooks/useFetch";
import { HeaderList } from "../../ui/HeaderList";

const headers = [
  { key: "id", label: "ID" },
  { key: "customer", label: "Cliente" },
  { key: "date", label: "Fecha" },
  { key: "products", label: "Productos" },
  { key: "total", label: "Total" },
];

export const OrdersPage = () => {
  const { data: ordersData } = useFetch("orders/");
  const { data: customersData } = useFetch("customers/");

  const orders = ordersData?.results || [];
  const customers = customersData || [];

  const getCustomerName = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    return customer ? customer.name : "Desconocido";
  };

  const formattedData = orders.map((order) => ({
    id: order.id,
    customer: getCustomerName(order.customer),
    date: new Date(order.date).toLocaleString(),
    total: order.details
      .reduce((acc, item) => acc + item.subtotal, 0)
      .toLocaleString(),
  }));

  return (
    <div className="h-screen">
      <HeaderList />
      <CustomTable headers={headers} data={formattedData} />
    </div>
  );
};
