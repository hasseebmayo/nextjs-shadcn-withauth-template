import { Card, CardContent } from '@/components/ui/card';
import { InboxIcon } from 'lucide-react';

export default function EmptyCard() {
 return (
  <Card className={`w-full`}>
   <CardContent className="flex flex-col items-center justify-center px-4 py-8 text-center">
    <div className="mb-4">
     <InboxIcon className="h-12 w-12 text-muted-foreground" />,
    </div>
    <p className="text-lg font-medium text-muted-foreground">
     No data available
    </p>
   </CardContent>
  </Card>
 );
}
