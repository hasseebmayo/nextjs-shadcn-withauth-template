import React, { useState, useCallback } from 'react';
import {
 Card,
 CardHeader,
 CardTitle,
 CardDescription,
 CardFooter,
} from '@/components/ui/card';
import { AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { cn } from '@/lib/utils';

export default function ErrorCard({
 error,
 onRetry,
 isLoading,
}: {
 error: unknown;
 isLoading?: boolean;
 onRetry?: () => void;
}) {
 // Memoized function to get the error message
 const getErrorMessage = useCallback((error: unknown): string => {
  if (axios.isAxiosError(error)) {
   return (
    error.message || 'An error occurred while communicating with the server.'
   );
  }
  if (error instanceof Error) {
   return error.message;
  }
  return 'An unexpected error occurred.';
 }, []);

 // Set initial error message
 const [message] = useState<string>(getErrorMessage(error));

 return (
  <Card>
   <CardHeader>
    <CardTitle className="flex items-center text-destructive">
     <AlertCircle className="mr-2 h-5 w-5" />
     Error
    </CardTitle>
    <CardDescription>{message}</CardDescription>
   </CardHeader>
   {onRetry && (
    <CardFooter className="flex items-center justify-center gap-x-3">
     <Button onClick={onRetry} variant="outline" size="lg" disabled={isLoading}>
      <RefreshCcw
       className={cn('mr-2 h-4 w-4', {
        'animate-spin': isLoading,
       })}
      />
      Try Again
     </Button>
    </CardFooter>
   )}
  </Card>
 );
}
