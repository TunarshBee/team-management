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
import { Input } from '@/shared/components/ui/input';
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
        const rowIndex = row.index;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='h-8 w-8 p-0'
                aria-label={`Actions for row ${rowIndex + 1}`}
                aria-haspopup='menu'
              >
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-48' role='menu'>
              <DropdownMenuLabel className='p-0 sr-only'>Actions</DropdownMenuLabel>
              {actionItems.map((item) => (
                <DropdownMenuItem
                  key={item.value}
                  onClick={() => onRowAction?.(item.value, rowData)}
                  className={`flex items-center px-3 py-2 text-sm cursor-pointer ${
                    item.variant === 'destructive'
                      ? 'text-red-600 hover:bg-red-50'
                      : 'text-bazara-gray hover:bg-bazara-gray-light'
                  }`}
                  role='menuitem'
                >
                  {item.icon && (
                    <span className='mr-2' aria-hidden='true'>
                      {item.icon}
                    </span>
                  )}
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
          aria-label='Select all rows on current page'
          className='rounded border-bazara-blue-light'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label={`Select row ${row.index + 1}`}
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
      <div className='rounded-md overflow-hidden' role='region' aria-label='Data table'>
        <div className='overflow-x-auto'>
          <Table role='table' aria-label='Teams data table' className='min-w-full'>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className='bg-bazara-blue hover:bg-bazara-blue'>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className='text-background font-semibold border-none whitespace-nowrap'
                      scope='col'
                      aria-sort={
                        header.column.getIsSorted() === 'asc'
                          ? 'ascending'
                          : header.column.getIsSorted() === 'desc'
                            ? 'descending'
                            : 'none'
                      }
                    >
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
                table.getRowModel().rows.map((row, rowIndex) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                    className='hover:bg-bazara-blue-light'
                    role='row'
                    aria-selected={row.getIsSelected()}
                    aria-rowindex={rowIndex + 2}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                        key={cell.id}
                        role='cell'
                        aria-colindex={cellIndex + 1}
                        className='whitespace-nowrap'
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={finalColumns.length}
                    className='h-24 text-center'
                    role='cell'
                    aria-colspan={finalColumns.length}
                  >
                    <span role='status' aria-live='polite'>
                      No results found.
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {enablePagination && (
        <nav
          className='flex flex-col sm:flex-row items-center justify-between bg-white px-4 sm:px-6 py-4 border-t border-bazara-gray-light gap-4'
          role='navigation'
          aria-label='Table pagination'
        >
          <div className='flex items-center space-x-2 order-1 sm:order-none'>
            <label htmlFor='page-size-select' className='text-sm text-bazara-gray font-medium'>
              Page Size
            </label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='h-8 w-16'
                  id='page-size-select'
                  aria-label={`Current page size: ${table.getState().pagination.pageSize} items per page`}
                  aria-haspopup='listbox'
                >
                  {table.getState().pagination.pageSize}
                  <ChevronDown className='ml-2 h-4 w-4' aria-hidden='true' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start' role='listbox'>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <DropdownMenuItem
                    key={size}
                    onClick={() => table.setPageSize(size)}
                    role='option'
                    aria-selected={size === table.getState().pagination.pageSize}
                  >
                    {size} items per page
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div
            className='flex items-center space-x-2 order-2 sm:order-none'
            role='group'
            aria-label='Page navigation'
          >
            <Button
              variant='ghost'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='text-bazara-gray-light hover:text-bazara-gray disabled:text-bazara-gray-light'
              aria-label='Go to previous page'
            >
              <span aria-hidden='true'>&lt;</span>
            </Button>

            <div className='hidden sm:flex items-center space-x-1'>
              {Array.from({ length: Math.min(5, table.getPageCount()) }, (_, i) => {
                const pageIndex =
                  Math.max(
                    0,
                    Math.min(table.getPageCount() - 5, table.getState().pagination.pageIndex - 2)
                  ) + i;
                const isCurrentPage = pageIndex === table.getState().pagination.pageIndex;
                return (
                  <Button
                    key={pageIndex}
                    variant={isCurrentPage ? 'default' : 'ghost'}
                    size='sm'
                    onClick={() => table.setPageIndex(pageIndex)}
                    className={`w-6 h-6 p-0 text-sm rounded-full ${
                      isCurrentPage
                        ? 'bg-bazara-blue text-background hover:bg-bazara-blue/90'
                        : 'text-bazara-gray hover:text-foreground hover:bg-bazara-blue-light'
                    }`}
                    aria-label={`Go to page ${pageIndex + 1}`}
                    aria-current={isCurrentPage ? 'page' : undefined}
                  >
                    {pageIndex + 1}
                  </Button>
                );
              })}
            </div>

            <div className='sm:hidden flex items-center space-x-2'>
              <span className='text-sm text-bazara-gray'>
                {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
              </span>
            </div>

            <Button
              variant='ghost'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='text-bazara-gray-light hover:text-bazara-gray disabled:text-bazara-gray-light'
              aria-label='Go to next page'
            >
              <span aria-hidden='true'>&gt;</span>
            </Button>
          </div>

          <div className='flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 order-3 sm:order-none'>
            <span
              className='text-sm text-bazara-gray hidden sm:block'
              role='status'
              aria-live='polite'
            >
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <div className='flex items-center space-x-2'>
              <label htmlFor='go-to-page-input' className='text-sm text-bazara-gray'>
                Go to page
              </label>
              <Input
                type='number'
                min={1}
                max={table.getPageCount()}
                value={table.getState().pagination.pageIndex + 1}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className='w-16 h-8 text-center'
                id='go-to-page-input'
                aria-label='Go to page number'
                aria-describedby='page-range'
              />
              <span id='page-range' className='sr-only'>
                Enter a page number between 1 and {table.getPageCount()}
              </span>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
}
