import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const TableLoading = ({ length }: { length: number }) => {
 return (
  (<div className="w-full">
   <div className="rounded-md border">
    <Table>
     <TableHeader>
      <TableRow>
       {Array.from({ length }).map((_, index: number) => (
        <TableHead key={index + 'abcd'}>
         <Skeleton className="h-4 w-full" />
        </TableHead>
       ))}
      </TableRow>
     </TableHeader>
     <TableBody>
      {Array.from({ length: 6 }).map((_, index: number) => (
       // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
       (<TableRow key={index + index + index}>
        {Array.from({ length }).map((_, i) => (
         // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
         (<TableCell key={i + i + i}>
          <Skeleton className="h-4 w-full" />
         </TableCell>)
        ))}
       </TableRow>)
      ))}
     </TableBody>
    </Table>
   </div>
  </div>)
 );
};

export default TableLoading;
