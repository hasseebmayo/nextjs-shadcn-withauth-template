import React from 'react';
import ErrorCard from '@/components/error-card';
import { type UseQueryResult } from '@tanstack/react-query';

type MatchQueryStatusProps<T> = {
 query: UseQueryResult<T>;
 Loading: JSX.Element;
 Errored?:
  | JSX.Element
  | ((error: unknown, refetch: () => void, isLoading: boolean) => JSX.Element);
 Empty?: JSX.Element;
 Success: (data: NonNullable<T>) => JSX.Element; // Pass only data of type T
};

function MatchQueryStatus<T>({
 query,
 Loading,
 Errored = (error, refetch, isLoading) => (
  <ErrorCard error={error} isLoading={isLoading} onRetry={refetch} />
 ),
 Empty,
 Success,
}: MatchQueryStatusProps<T>): JSX.Element {
 if (query.isLoading) return Loading;

 if (query.isError) {
  return typeof Errored === 'function'
   ? Errored(query.error, query.refetch, query.isLoading)
   : Errored;
 }

 const isEmptyData = (data: unknown): boolean =>
  data === undefined ||
  data === null ||
  (Array.isArray(data) && data.length === 0);

 // If data is empty and Empty component is provided, render it
 if (isEmptyData(query.data) && Empty) return Empty;

 // Pass only query.data to the Success component
 return Success(query.data as NonNullable<T>);
}

export default MatchQueryStatus;
