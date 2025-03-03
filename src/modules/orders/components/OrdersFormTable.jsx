import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Input, Button } from "@heroui/react";
import { IoMdTrash } from 'react-icons/io'; // Assuming you're using react-icons

export const OrdersFormTable = ({ orderProducts, productsList, handleProductChange, handleRemoveProduct  }) => {
  return (
    <Table aria-label="Orders Form Table">
      <TableHeader>
        <TableColumn>Producto</TableColumn>
        <TableColumn>Precio</TableColumn>
        <TableColumn>Cantidad</TableColumn>
        <TableColumn>Subtotal</TableColumn>
        <TableColumn>Acciones</TableColumn>
      </TableHeader>
      <TableBody>
        {orderProducts.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{productsList.find(p => p.id === item.product)?.name || "-"}</TableCell>
            <TableCell>${item.unit_price}</TableCell>
            <TableCell>
              <Input
                type="number"
                value={item.quantity}
                min={1}
                onChange={(e) => handleProductChange(index, "quantity", Number(e.target.value))}
              />
            </TableCell>
            <TableCell>${item.quantity * item.unit_price}</TableCell>
            <TableCell>
              <Button onPress={() => handleRemoveProduct(index)}>
                <IoMdTrash className="text-danger" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};