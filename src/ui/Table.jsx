import React, { useState, useMemo } from "react";
import { FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import { Spinner } from "@heroui/react";
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
    Select,
    SelectItem,
    Button,
    Card
} from "@heroui/react";

export const CustomTable = ({ headers, data, onEdit, onDelete, onViewDetail}) => {
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const pages = Math.ceil(data.length / rowsPerPage);

    const paginatedData = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return data.slice(start, start + rowsPerPage);
    }, [page, data, rowsPerPage]);

    const statusColorMap = {
        true: "success",
        false: "danger",
    };

    const handlePreviousPage = () => {
        if (page > 1) setPage(page - 1);
    };

    const handleNextPage = () => {
        if (page < pages) setPage(page + 1);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-black/50 w-auto">Total de registros: {data.length}</span>

                <Select
                    aria-label="Seleccionar cantidad de filas por página"
                    value={rowsPerPage.toString()}
                    onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    className="w-40"
                    variant="bordered"
                    placeholder="Por página"
                    size="sm"
                >
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                </Select>

            </div>

            <Table
                defaultSelectedKeys={["2"]}
                selectionMode="single"
                rowHeight="100px" color="primary"
                isStriped
                aria-labelledby="table-title"
            >
                <TableHeader columns={headers}>
                    {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
                </TableHeader>
                <TableBody className="p-4" emptyContent={"No hay información para mostrar"} items={paginatedData}
                    isLoading={paginatedData.length === 0}
                    loadingContent={<Spinner label="Cargando..." />}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {headers.map((column) => (
                                <TableCell key={column.key}>
                                    {column.key === "is_active" || column.key === "status" ? (
                                        <Chip
                                            className="capitalize border-none gap-1 text-default-600"
                                            color={statusColorMap[item[column.key]]}
                                            size="sm"
                                            variant="dot"
                                        >
                                            {item[column.key] ? "Activo" : "Inactivo"}
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
                                            {
                                                onViewDetail && <Tooltip content="Ver detalle">
                                                <span
                                                    className="text-lg text-default-400 cursor-pointer active:opacity-50"
                                                    onClick={() => onViewDetail(item)}
                                                >
                                                    <FiEye />
                                                </span>
                                            </Tooltip>
                                            }
                                            
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

            <div className="flex justify-between items-center mt-4 ">
                <span className="text-xs font-semibold text-black/50">
                    Mostrando {((page - 1) * rowsPerPage) + 1} - {Math.min(page * rowsPerPage, data.length)} de {data.length} registros
                </span>
                <Pagination
                    isCompact
                    showControls={false}
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={(page) => setPage(page)}
                    className="bg-white rounded-xl"
                    size="sm"
                />
                <div className="flex items-center">
                    <Button
                        color="default"
                        variant="flat"
                        onPress={handlePreviousPage}
                        disabled={page === 1}
                        className="w-auto px-2 text-xs mr-2"
                        size="sm"
                    >
                        Anterior
                    </Button>
                    <Button
                        color="default"
                        variant="flat"
                        onPress={handleNextPage}
                        disabled={page === pages}
                        className="w-auto px-2 text-xs"
                        size="sm"

                    >
                        Siguiente
                    </Button>
                </div>
            </div>

        </>
    );
};