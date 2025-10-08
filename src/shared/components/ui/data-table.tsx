/**
 * DataTable component using TanStack Table
 * Features: Sorting, filtering, pagination, column visibility, row selection
 */

'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/shared/components/ui/button';
import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table';
import { PAGE_SIZE_OPTIONS } from '@/shared/constants/navigation';

interface IDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  onRowAction?: (action: string, row: TData) => void;
  actionItems?: Array<{
    label: string;
    value: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'destructive';
  }>;
  enableRowSelection?: boolean;
  enableColumnVisibility?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  createButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  };
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey: _searchKey,
  searchPlaceholder: _searchPlaceholder = 'Search...',
  onRowAction,
  actionItems = [],
  enableRowSelection = true,
  enableColumnVisibility: _enableColumnVisibility = true,
  enableSorting: _enableSorting = true,
  enableFiltering: _enableFiltering = true,
  enablePagination = true,
  pageSize = 10,
  pageSizeOptions: _pageSizeOptions = [10, 20, 50, 100],
  createButton: _createButton,
}: IDataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const tableColumns = React.useMemo(() => {
    if (actionItems.length === 0) return columns;

    const actionColumn: ColumnDef<TData, TValue> = {
      id: 'actions',
      cell: ({ row }) => {
        const rowData = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48'>
              <DropdownMenuLabel className='p-0'></DropdownMenuLabel>
              {actionItems.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => onRowAction?.(item.value, rowData)}
                  className={`flex items-center px-3 py-2 text-sm cursor-pointer ${
                    item.variant === 'destructive'
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-bazara-gray hover:bg-bazara-gray-light'
                  }`}
                >
                  {item.icon && <span className='mr-2'>{item.icon}</span>}
                  {item.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    };

    return [...columns, actionColumn];
  }, [columns, actionItems, onRowAction]);

  const finalColumns = React.useMemo(() => {
    if (!enableRowSelection) return tableColumns;

    const selectionColumn: ColumnDef<TData, TValue> = {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
          className='rounded border-bazara-blue-light'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
          className='rounded border-bazara-blue-light'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    };

    return [selectionColumn, ...tableColumns];
  }, [tableColumns, enableRowSelection]);

  const table = useReactTable({
    data,
    columns: finalColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    initialState: {
      pagination: {
        pageSize,
      },
    },
  });

  return (
    <div className='space-y-0'>
      <div className='rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className='bg-bazara-blue hover:bg-bazara-blue'>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className='text-background font-semibold border-none'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='hover:bg-bazara-blue-light'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={finalColumns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className='flex items-center justify-between bg-white px-6 py-4 border-t border-bazara-gray-light'>
          {/* Left Side - Page Size */}
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-bazara-gray font-medium'>Page Size</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className='h-8 w-16'>
                  {table.getState().pagination.pageSize}
                  <ChevronDown className='ml-2 h-4 w-4' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <DropdownMenuItem key={size} onClick={() => table.setPageSize(size)}>
                    {size}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Center - Page Navigation */}
          <div className='flex items-center space-x-2'>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='text-bazara-gray-light hover:text-bazara-gray disabled:text-bazara-gray-light'
            >
              &lt;
            </Button>

            {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
              const pageIndex =
                Math.max(
                  0,
                  Math.min(table.getPageCount() - 5, table.getState().pagination.pageIndex - 2)
                ) + i;
              return (
                <Button
                  key={pageIndex}
                  variant={
                    pageIndex === table.getState().pagination.pageIndex ? 'default' : 'ghost'
                  }
                  size='sm'
                  onClick={() => table.setPageIndex(pageIndex)}
                  className={`w-6 h-6 p-0 text-sm rounded-full ${
                    pageIndex === table.getState().pagination.pageIndex
                      ? 'bg-bazara-blue text-background hover:bg-bazara-blue/90'
                      : 'text-bazara-gray hover:text-foreground hover:bg-bazara-blue-light'
                  }`}
                >
                  {pageIndex + 1}
                </Button>
              );
            })}

            <Button
              variant='ghost'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='text-bazara-gray-light hover:text-bazara-gray disabled:text-bazara-gray-light'
            >
              &gt;
            </Button>
          </div>

          {/* Right Side - Page Status */}
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-bazara-gray'>
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
