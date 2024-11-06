import React from 'react';
import ErrorCard from '@/components/error-card';
import { type UseQueryResult } from '@tanstack/react-query';
import { cn } from '../lib/utils';
import { Loader2 } from 'lucide-react';
import EmptyCard from '@/components/empty-card';

function Loader({
 className,
 loaderClassName,
}: {
 className?: string;
 loaderClassName?: string;
}) {
 return (
  <div className={cn('h-8 w-full', className)}>
   <Loader2 className={cn('size animate-spin', loaderClassName)} />
  </div>
 );
}

type MatchQueryStatusProps<T> =
 | {
    query: UseQueryResult<T>;
    render: (data: T, isLoading: boolean) => JSX.Element;
    Errored?:
     | JSX.Element
     | ((
        error: unknown,
        refetch: () => void,
        isLoading: boolean
       ) => JSX.Element);
    Loading?: never;
    Empty?: never;
    Success?: never;
   }
 | {
    query: UseQueryResult<T>;
    Loading?:
     | JSX.Element
     | ((className?: string, loaderClassName?: string) => JSX.Element);
    Errored?:
     | JSX.Element
     | ((
        error: unknown,
        refetch: () => void,
        isLoading: boolean
       ) => JSX.Element);
    Empty?: JSX.Element;
    Success: (data: NonNullable<T>) => JSX.Element;
    render?: never;
   };

// Type guard to check if props contain the render prop
function hasRender<T>(props: MatchQueryStatusProps<T>): props is {
 query: UseQueryResult<T>;
 render: (data: T, isLoading: boolean) => JSX.Element;
 Errored?:
  | JSX.Element
  | ((error: unknown, refetch: () => void, isLoading: boolean) => JSX.Element);
} {
 return 'render' in props && typeof props.render === 'function';
}

function MatchQueryStatus<T>(props: MatchQueryStatusProps<T>): JSX.Element {
 const { query } = props;

 if (hasRender(props)) {
  // Handle custom error UI if Errored is provided in the render case
  if (query.isError && props.Errored) {
   return typeof props.Errored === 'function'
    ? props.Errored(query.error, query.refetch, query.isLoading)
    : props.Errored;
  }
  // If no error, render the main content
  return props.render(query.data as T, query.isLoading);
 }

 const {
  Loading = (c, l) => <Loader className={c} loaderClassName={l} />,
  Errored = (error, refetch, isLoading) => (
   <ErrorCard error={error} isLoading={isLoading} onRetry={refetch} />
  ),
  Empty = <EmptyCard />,
  Success,
 } = props;

 if (query.isLoading)
  return typeof Loading === 'function' ? Loading() : Loading;

 if (query.isError) {
  return typeof Errored === 'function'
   ? Errored(query.error, query.refetch, query.isLoading)
   : Errored;
 }

 const isEmptyData = (data: unknown): boolean =>
  data === undefined ||
  data === null ||
  (Array.isArray(data) && data.length === 0);

 if (isEmptyData(query.data) && Empty) return Empty;

 return Success(query.data as NonNullable<T>);
}

export default MatchQueryStatus;
