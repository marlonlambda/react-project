import React, { useState, useMemo } from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Pagination,
    Chip,
    Tooltip,
    Spacer,
} from "@heroui/react";

export const CustomTable = ({ headers, data, onEdit, onDelete }) => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;

    const pages = Math.ceil(data.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [page, data]);

    const statusColorMap = {
        true: "success",
        false: "danger",
    };

    return (
        <>
            <Table color="primary" isStriped aria-label="Dynamic content table">
                <TableHeader columns={headers}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody className="p-4" emptyContent={"No hay información para mostrar"} items={paginatedData}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {headers.map((column) => (
                                <TableCell key={column.key}>
                                    {column.key === "is_active" ? (
                                        <Chip
                                            className="capitalize border-none gap-1 text-default-600"
                                            color={statusColorMap[item.is_active]}
                                            size="sm"
                                            variant="dot"
                                        >
                                            {item.is_active ? "Activo" : "Inactivo"}
                                        </Chip>
                                    ) : column.key === "actions" ? (
                                        <div className="flex gap-2">
                                            <Tooltip content="Editar">  
                                                <span
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                    onClick={() => onEdit(item)}
                                                >
                                                    <FiEdit3 />
                                                </span>
                                            </Tooltip>
                                            <Tooltip color="danger" content="Eliminar">
                                                <span
                                                    className="text-lg text-danger cursor-pointer active:opacity-50"
                                                    onClick={() => onDelete(item.id)}
                                                >
                                                    <FiTrash2 size={16} />
                                                </span>
                                            </Tooltip>
                                        </div>
                                    ) : (
                                        item[column.key]
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-center mt-4">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                    className="bg-white rounded-xl"
                />
            </div>
        </>
    );
};
