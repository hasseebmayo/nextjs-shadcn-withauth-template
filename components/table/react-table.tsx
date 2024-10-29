import {
 ColumnDef,
 flexRender,
 getCoreRowModel,
 getFilteredRowModel,
 getPaginationRowModel,
 getSortedRowModel,
 useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';
import useSearchURL from '@/hooks/use-search-params';
import { useEffect } from 'react';
import TableLoading from './loading-table';
interface ITable<TData, TValue> {
 columns: ColumnDef<TData, TValue>[];
 data: TData[];
 isLoading: boolean;
 enableSorting?: boolean;
}
export function DataTable<TData, TValue>({
 columns,
 data,
 isLoading,
 enableSorting = false,
}: ITable<TData, TValue>) {
 const table = useReactTable({
  data,
  columns,
  getCoreRowModel: getCoreRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
 });
 const { params } = useSearchURL();
 const tableSearch = params.get('qtable');
 useEffect(() => {
  // Apply the global filter only if the tableSearch is not null
  if (tableSearch) {
   table.setGlobalFilter(tableSearch);
  } else {
   table.setGlobalFilter(''); // Reset filter when search term is cleared
  }
 }, [table, tableSearch]);
 if (isLoading) return <TableLoading length={columns.length} />;
 return (
  <>
   <div className="rounded-md border shadow-xl">
    <Table>
     <TableHeader>
      {table.getHeaderGroups().map((headerGroup, i) => (
       <TableRow key={headerGroup.id + i}>
        {headerGroup.headers.map((header, i) => {
         return (
          <TableHead key={header.id + i} className="text-xs">
           {enableSorting ? (
            <button
             type="button"
             className="flex items-center"
             onClick={() => {
              header.column.toggleSorting();
             }}
            >
             {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
             <ArrowUpDown className="ml-2 h-4 w-4" />
            </button>
           ) : header.isPlaceholder ? null : (
            flexRender(header.column.columnDef.header, header.getContext())
           )}
          </TableHead>
         );
        })}
       </TableRow>
      ))}
     </TableHeader>
     <TableBody>
      {table.getRowModel().rows?.length ? (
       table.getRowModel().rows.map((row, i) => (
        <TableRow
         key={row.id + i}
         data-state={row.getIsSelected() && 'selected'}
        >
         {row.getVisibleCells().map((cell, i) => (
          <TableCell key={cell.id + i}>
           {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
         ))}
        </TableRow>
       ))
      ) : (
       <TableRow>
        <TableCell colSpan={columns.length} className="h-24 w-full text-center">
         No results.
        </TableCell>
       </TableRow>
      )}
     </TableBody>
    </Table>
   </div>
   {data.length > 10 ? (
    <div className="flex w-full flex-wrap items-center justify-end space-x-2 py-4">
     <div className="flex-1 text-sm text-muted-foreground">
      {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
     </div>
     <div className="space-x-2">
      <Button
       variant="outline"
       size="sm"
       onClick={() => table.previousPage()}
       disabled={!table.getCanPreviousPage()}
      >
       Previous
      </Button>
      <Button
       variant="outline"
       size="sm"
       onClick={() => table.nextPage()}
       disabled={!table.getCanNextPage()}
      >
       Next
      </Button>
     </div>
    </div>
   ) : null}
  </>
 );
}
