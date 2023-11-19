import React, {Fragment} from 'react'
import {
    ChevronDownIcon,
    DocumentDuplicateIcon,
    EllipsisVerticalIcon,
    PencilIcon,
    PlusCircleIcon,
    TrashIcon,
} from '@heroicons/react/24/outline'
import type {Selection, SortDescriptor} from "@nextui-org/react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import {SearchIcon} from "@nextui-org/shared-icons";
import {matchSorter} from 'match-sorter';
import {Link} from '@remix-run/react';
import type {DataGridColumn} from "~/src/shared/types";
import {formatValue} from "~/src/constants";

export default function DataGrid<T extends {
    url?: string, id?: string
}>(props: {
    columns: DataGridColumn<T>[],
    rows: T[],
    isEditable?: boolean,
    isDeletable?: boolean,
    isCreatable?: boolean,
    isCopyable?: boolean,
}) {
    const {
        columns, rows, isCopyable = true, isCreatable = true, isDeletable = true, isEditable = true,
    } = props
    const [filterValue, setFilterValue] = React.useState("");
    const [, setSelectedKeys] = React.useState<Selection>(new Set([]));
    const keys = React.useMemo(() => {
        return columns
            .filter(f => f.sortable ?? true)
            .map((column) => column.key)
    }, [columns]);
    const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(keys));
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({});
    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = React.useMemo(() => {
        let options = [...rows];

        if (hasSearchFilter) {
            options = matchSorter(options, filterValue.trim(), {
                keys
            })
        }

        return options;
    }, [rows, hasSearchFilter, filterValue, keys]);

    const sortedItems = React.useMemo(() => {
        return [...filteredItems].sort((a: any, b: any) => {
            const first = a[sortDescriptor.column?.toString() ?? ''] as number;
            const second = b[sortDescriptor.column?.toString() ?? ''] as number;
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);
    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return sortedItems.slice(start, end);
    }, [page, sortedItems, rowsPerPage]);
    const headerColumns = React.useMemo(() => {
        if (columns.length === Array.from(visibleColumns).length) return columns;
        return columns.filter((column) => Array.from(visibleColumns).includes(column.key));
    }, [columns, visibleColumns]);

    const pages = Math.ceil(rows.length / rowsPerPage);
    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);
    const onSearchChange = React.useCallback((value?: string) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(() => {
        setFilterValue("")
        setPage(1)
    }, [])
    const columnsDictionary = React.useMemo(() => {
        return columns.reduce((acc, column) => {
            acc[column.key] = column;
            return acc;
        }, {} as Record<keyof T, DataGridColumn<T>>);
    }, [columns]);

    const topContent = React.useMemo(() => {
        return (<div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-center">
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small"/>}
                                        radius="sm"
                                        color="primary"
                                        variant="flat">
                                    Колонки
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (<DropdownItem key={column.key} textValue={column.key} className="capitalize">
                                        {column.label}
                                    </DropdownItem>))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="Введите текст для пошуку"
                        startContent={<SearchIcon/>}
                        type="text"
                        variant="faded"
                        radius="sm"
                        size="sm"
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Всього {rows.length} записів</span>
                    <label className="flex items-center text-default-400 text-small">
                        Записів на сторінці:
                        <select
                            className="bg-transparent outline-none text-default-400 text-small"
                            onChange={onRowsPerPageChange}
                            value={rowsPerPage}
                        >
                            {[5, 10, 20, 30, 40, 50, 100].map((option) => (
                                <option key={option} value={option}>{option}</option>))}
                        </select>
                    </label>
                </div>
            </div>);
    }, [filterValue, onSearchChange, visibleColumns, columns, rows.length, onRowsPerPageChange, rowsPerPage, onClear]);


    const bottomContent = React.useMemo(() => {
        return (<div className="py-2 px-2 flex justify-between items-center">
                <span className="w-[30%] text-small text-default-400"/>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                    variant="flat"
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-4">
                    <Button isDisabled={pages === 1} color='primary' size="md" radius="sm" variant="flat"
                            onPress={onPreviousPage}>
                        Назад
                    </Button>
                    <Button isDisabled={pages === 1} color='primary' size="md" radius="sm" variant="flat"
                            onPress={onNextPage}>
                        Вперед
                    </Button>
                </div>
            </div>);
    }, [page, pages, onPreviousPage, onNextPage]);
    const renderCell = React.useCallback((entity: any, columnKey: React.Key) => {
        const cellValue = entity[columnKey as keyof T];
        switch (columnKey) {
            case "url":
            case "id":
                return (<>
                        <div className="relative md:hidden flex justify-end items-center gap-2">
                            <Dropdown>
                                <DropdownTrigger>
                                    <Button isIconOnly size="sm" variant="light" radius="sm">
                                        <Tooltip content="Створити">
                                            <EllipsisVerticalIcon
                                                className="text-default-300 cursor-pointer w-7 h-7"/>
                                        </Tooltip>
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu>
                                    {isCopyable ? <DropdownItem startContent={<DocumentDuplicateIcon
                                        className="h-7 w-7 cursor-pointer"
                                        aria-hidden="true"
                                    />}>
                                        <Link
                                            to={cellValue + "/copy"}
                                            prefetch="intent"
                                        />
                                        Скопіювати
                                    </DropdownItem> : <span/>}
                                    {isEditable ? <DropdownItem startContent={<PencilIcon
                                        className="h-7 w-7 cursor-pointer text-blue-500"
                                        aria-hidden="true"
                                    />}>
                                        Редагувати
                                    </DropdownItem> : <span/>}
                                    {isDeletable ? <DropdownItem startContent={<TrashIcon
                                        className="h-7 w-7 cursor-pointer text-red-500"
                                        aria-hidden="true"
                                    />}>
                                        Видалити
                                    </DropdownItem> : <span/>}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="relative hidden md:flex justify-end items-center gap-2">
                            {isCopyable ? <Tooltip content="Скопіювати">
                                <Link
                                    to={`${cellValue}/copy`}
                                    prefetch="intent"
                                >
                                    <DocumentDuplicateIcon
                                        className="h-7 w-7 cursor-pointer"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Tooltip> : null}
                            {isEditable ? <Tooltip content="Редагувати">
                                <Link
                                    to={`${cellValue}/edit`}
                                    prefetch="intent"
                                >
                                    <PencilIcon
                                        className="h-7 w-7 cursor-pointer text-blue-500"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Tooltip> : null}
                            {isDeletable ? <Tooltip content="Видалити">
                                <Link
                                    to={`${cellValue}/delete`}
                                    prefetch="intent"
                                >
                                    <TrashIcon
                                        className="h-7 w-7 cursor-pointer text-red-500"
                                        aria-hidden="true"
                                    />
                                </Link>
                            </Tooltip> : null}
                        </div>
                    </>);
            default:
                const column = columnsDictionary[columnKey as keyof T];
                if(column?.type === 'date') {
                    return formatValue(cellValue);
                }
                return cellValue;
        }
    }, [isCopyable, isDeletable, isEditable]);

    return (<Table aria-label="table"
                   isHeaderSticky isStriped
                   bottomContent={bottomContent}
                   topContent={topContent}
                   sortDescriptor={sortDescriptor}
                   topContentPlacement="outside"
                   onSelectionChange={setSelectedKeys}
                   onSortChange={setSortDescriptor}
        >
            <TableHeader columns={headerColumns}>
                {(column) => {
                    if ((column.key === 'url' || column.key === "id") && isCreatable) {
                        return (<TableColumn
                                className="w-10"
                                key={column.key}>
                                <div className="flex justify-center">
                                    <Button
                                        as={Link}
                                        to="new"
                                        radius="sm"
                                        prefetch="intent"
                                        isIconOnly variant="light" color="success">
                                        <PlusCircleIcon className="h-7 w-7"/>
                                    </Button>
                                </div>
                            </TableColumn>)
                    }
                    return (<TableColumn
                            key={column.key}
                            allowsSorting={column.sortable}
                        >
                            {column.label}
                        </TableColumn>);
                }}
            </TableHeader>
            <TableBody items={items}>
                {(item) => (<TableRow key={item?.url ?? item?.id ?? ''}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>)}
            </TableBody>
        </Table>)
}
